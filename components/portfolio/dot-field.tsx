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

    // Dot color follows the active theme (--dot-color); re-read on theme change
    // rather than every frame.
    let dotColor = "#171717";
    function readDotColor() {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue("--dot-color")
        .trim();
      if (value) dotColor = value;
    }
    readDotColor();
    const themeObserver = new MutationObserver(readDotColor);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
    colorScheme.addEventListener("change", readDotColor);

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

    function resize() {
      if (!canvas || !context) return;

      const bounds = canvas.getBoundingClientRect();
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.ceil(bounds.width);
      height = Math.ceil(bounds.height);
      canvas.width = Math.ceil(width * pixelRatio);
      canvas.height = Math.ceil(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    function draw(now: number) {
      if (!context) return;

      const time = reduceMotion.matches ? 0 : now * 0.00022;
      // Dedicated, faster clock for the autonomous flow so it visibly moves on
      // its own — independent of the cursor.
      const flowTime = reduceMotion.matches ? 0 : now * 0.0009;
      const spacing = 10;

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

      context.clearRect(0, 0, width, height);
      context.fillStyle = dotColor;

      for (let y = -spacing; y <= height + spacing; y += spacing) {
        for (let x = -spacing; x <= width + spacing; x += spacing) {
          // Autonomous flow: several traveling waves whose coordinates are warped
          // by other slow waves (domain warping). They move in different
          // directions and reshape over time, so the whole field keeps flowing
          // with or without the cursor — no single origin, never symmetric.
          const nx = x * 0.009;
          const ny = y * 0.009;
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
          // Bias toward peaks so bright dots form drifting streaks, not an even haze.
          const shaped = base * (base * 0.85 + 0.15);

          // Cursor gently lifts the nearby flow; it is an accent, not the subject.
          const dx = x - lightX;
          const dy = y - lightY;
          const glow = Math.exp(-Math.sqrt(dx * dx + dy * dy) / 260) * 0.55;

          const energy = shaped * (0.72 + glow);
          const radius = 0.4 + energy * 1.6;
          const opacity = 0.04 + energy * 0.24;

          context.globalAlpha = opacity;
          context.beginPath();
          context.arc(x, y, radius, 0, Math.PI * 2);
          context.fill();
        }
      }

      context.globalAlpha = 1;
      if (!reduceMotion.matches) animationFrame = requestAnimationFrame(draw);
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();
    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      colorScheme.removeEventListener("change", readDotColor);
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
