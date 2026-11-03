"use client";

import { useEffect, useRef } from "react";

export function DotField({ fixed = false }: { fixed?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    const dotColor =
      getComputedStyle(document.documentElement).getPropertyValue("--dot-color").trim() || "#171717";

    // The cursor-light origin follows the cursor. `pointer*` is the latest cursor
    // position in canvas coords; `current*` is the eased origin that trails toward
    // it. After the cursor goes idle (or leaves), the origin drifts back to the
    // automatic motion so the field never feels frozen.
    let pointerX = 0;
    let pointerY = 0;
    let currentX = 0;
    let currentY = 0;
    let hasCurrent = false;
    let lastPointerMove = -Infinity;
    const POINTER_IDLE_MS = 2500;

    function onPointerMove(event: PointerEvent) {
      const bounds = canvas!.getBoundingClientRect();
      if (bounds.width === 0 || bounds.height === 0) return;
      pointerX = (event.clientX - bounds.left) * (width / bounds.width);
      pointerY = (event.clientY - bounds.top) * (height / bounds.height);
      lastPointerMove = performance.now();
    }
    function onPointerLeave() {
      lastPointerMove = -Infinity; // revert to automatic drift immediately
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);

    // Dense, small dots, kept cheap on purpose: the flow field is sampled on a
    // coarse lattice and bilinearly interpolated; every dot is a blit of a
    // pre-rendered sprite (no per-frame Path2D allocation — that used to balloon
    // native memory by gigabytes and get the tab killed); dot count, canvas
    // pixels and frame rate are all capped so wide / hi-dpi screens stay light.
    const COARSE = 4;
    const BUCKETS = 8; // opacity levels
    const RADIUS_LEVELS = 6;
    const R_MIN = 0.35;
    const R_MAX = 1.25;
    const MAX_ENERGY = 1.27;
    const MAX_DOTS = 36000;
    const MAX_CANVAS_PIXELS = 4_000_000;
    const FRAME_MS = 33; // ~30fps — the flow is slow, nobody sees the difference

    let spacing = 6;
    let cols = 0;
    let rows = 0;
    let coarseCols = 0;
    let coarseRows = 0;
    let coarse = new Float32Array(0);
    let sprites: HTMLCanvasElement[] = [];
    let spriteCss = 0;

    function buildSprites() {
      sprites = [];
      const size = Math.ceil((R_MAX * 2 + 1) * pixelRatio);
      spriteCss = size / pixelRatio;
      for (let b = 0; b < BUCKETS; b++) {
        const alpha = 0.2 + ((b + 0.5) / BUCKETS) * MAX_ENERGY * 0.3;
        for (let k = 0; k < RADIUS_LEVELS; k++) {
          const sprite = document.createElement("canvas");
          sprite.width = size;
          sprite.height = size;
          const ctx = sprite.getContext("2d");
          if (ctx) {
            const radius = (R_MIN + (k / (RADIUS_LEVELS - 1)) * (R_MAX - R_MIN)) * pixelRatio;
            ctx.globalAlpha = alpha;
            ctx.fillStyle = dotColor;
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
            ctx.fill();
          }
          sprites.push(sprite);
        }
      }
    }

    function layout() {
      spacing = Math.max(6, Math.ceil(Math.sqrt((width * height) / MAX_DOTS)));
      cols = Math.ceil(width / spacing) + 2;
      rows = Math.ceil(height / spacing) + 2;
      coarseCols = Math.ceil(cols / COARSE) + 2;
      coarseRows = Math.ceil(rows / COARSE) + 2;
      coarse = new Float32Array(coarseCols * coarseRows);
    }

    function resize() {
      if (!canvas || !context) return;

      const bounds = canvas.getBoundingClientRect();
      width = Math.ceil(bounds.width);
      height = Math.ceil(bounds.height);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      // Cap the backing store so very large / hi-dpi windows don't allocate a huge bitmap.
      if (width * height * pixelRatio * pixelRatio > MAX_CANVAS_PIXELS) {
        pixelRatio = Math.max(1, Math.sqrt(MAX_CANVAS_PIXELS / (width * height)));
      }
      canvas.width = Math.ceil(width * pixelRatio);
      canvas.height = Math.ceil(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      layout();
      buildSprites();
    }

    let lastFrame = 0;

    function draw(now: number) {
      if (!context) return;
      if (!reduceMotion.matches && now - lastFrame < FRAME_MS) {
        animationFrame = requestAnimationFrame(draw);
        return;
      }
      lastFrame = now;

      const time = reduceMotion.matches ? 0 : now * 0.00022;
      // Dedicated, faster clock for the autonomous flow so it visibly moves on
      // its own — independent of the cursor.
      const flowTime = reduceMotion.matches ? 0 : now * 0.001;

      // Automatic drift, used as the origin whenever the cursor is idle/away.
      const autoX = width * (0.5 + Math.sin(time * 0.64) * 0.23);
      const autoY = height * (0.48 + Math.cos(time * 0.48) * 0.19);
      const pointerFresh = now - lastPointerMove < POINTER_IDLE_MS;
      const targetX = pointerFresh ? pointerX : autoX;
      const targetY = pointerFresh ? pointerY : autoY;
      if (!hasCurrent) {
        currentX = targetX;
        currentY = targetY;
        hasCurrent = true;
      }
      // Trail toward the target — small factor = slower, lazier follow.
      currentX += (targetX - currentX) * 0.03;
      currentY += (targetY - currentY) * 0.03;
      const lightX = currentX;
      const lightY = currentY;

      // Flow field on the coarse lattice (this is the only trig-heavy part).
      const step = spacing * COARSE;
      for (let j = 0; j < coarseRows; j++) {
        const y = (j - 1) * step;
        const ny = y * 0.009;
        for (let i = 0; i < coarseCols; i++) {
          const x = (i - 1) * step;
          // Autonomous flow: several traveling waves whose coordinates are warped
          // by other slow waves (domain warping) — no single origin, never symmetric.
          const nx = x * 0.009;
          const wx =
            Math.sin(ny * 0.8 + flowTime * 0.7) +
            Math.cos(ny * 1.7 - flowTime * 0.5);
          const wy =
            Math.sin(nx * 0.9 - flowTime * 0.6) +
            Math.cos(nx * 1.5 + flowTime * 0.4);
          const v =
            Math.sin(nx + wx * 0.9 + flowTime) +
            Math.sin(ny * 1.1 + wy * 0.9 - flowTime * 0.9) +
            Math.sin((nx + ny) * 0.7 + (wx + wy) * 0.5 + flowTime * 0.6);
          const base = (v + 3) / 6; // 0..1
          // Thresholded so dots form flowing patches with clear empty space between.
          const t = Math.min(1, Math.max(0, (base - 0.5) / 0.3));
          coarse[j * coarseCols + i] = t * t * (3 - 2 * t); // smoothstep: ~35% of the field is lit, the rest stays empty
        }
      }

      context.clearRect(0, 0, width, height);

      const half = spriteCss / 2;
      for (let j = 0; j < rows; j++) {
        const y = (j - 1) * spacing;
        const fy = y / step + 1;
        const j0 = Math.floor(fy);
        const ty = fy - j0;
        for (let i = 0; i < cols; i++) {
          const x = (i - 1) * spacing;
          const fx = x / step + 1;
          const i0 = Math.floor(fx);
          const tx = fx - i0;
          const k = j0 * coarseCols + i0;
          const top = coarse[k] * (1 - tx) + coarse[k + 1] * tx;
          const bottom = coarse[k + coarseCols] * (1 - tx) + coarse[k + coarseCols + 1] * tx;
          const shaped = top * (1 - ty) + bottom * ty;

          // Cursor gently lifts the nearby flow; it is an accent, not the subject.
          const dx = x - lightX;
          const dy = y - lightY;
          const glow = Math.exp(-Math.sqrt(dx * dx + dy * dy) / 260) * 0.55;

          const energy = shaped * (0.72 + glow) + glow * 0.3;
          if (energy < 0.05) continue;
          const radius = 0.3 + energy * 0.7;
          const bucket = Math.min(BUCKETS - 1, Math.floor((energy / MAX_ENERGY) * BUCKETS));
          const level = Math.min(
            RADIUS_LEVELS - 1,
            Math.max(0, Math.round(((radius - R_MIN) / (R_MAX - R_MIN)) * (RADIUS_LEVELS - 1))),
          );
          context.drawImage(sprites[bucket * RADIUS_LEVELS + level], x - half, y - half, spriteCss, spriteCss);
        }
      }

      if (!reduceMotion.matches) animationFrame = requestAnimationFrame(draw);
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();
    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`dot-field${fixed ? " dot-field-fixed" : ""}`}
      aria-hidden="true"
    />
  );
}
