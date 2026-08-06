"use client";

import { useEffect, useRef } from "react";

const LATTICE_ANGLES = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];

export function DotField() {
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

      const time = reduceMotion.matches ? 0 : now * 0.00018;
      const spacing = Math.max(7, width / 160);
      const waveX = width * (0.5 + Math.sin(time * 0.5) * 0.25);
      const waveY = height * (0.55 + Math.cos(time * 0.38) * 0.2);
      const freq = 0.052;

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#ffffff";

      for (let y = -spacing; y <= height + spacing; y += spacing) {
        for (let x = -spacing; x <= width + spacing; x += spacing) {
          const dx = x - waveX;
          const dy = y - waveY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const glow = Math.exp(-distance / 460);

          // Three sine fields 120° apart interfere into a flowing hexagonal/
          // diamond lattice — the "geometric shapes" read out of point size,
          // not from drawing different glyphs.
          let lattice = 0;
          for (const angle of LATTICE_ANGLES) {
            const proj = x * Math.cos(angle) + y * Math.sin(angle);
            lattice += Math.sin(proj * freq + time * 1.6);
          }
          lattice /= LATTICE_ANGLES.length;

          const energy = Math.max(0, lattice) * (0.35 + glow * 0.65);
          const radius = 0.35 + energy * 1.5;
          const opacity = 0.06 + energy * 0.26;

          if (opacity <= 0.061) continue;

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
    };
  }, []);

  return <canvas ref={canvasRef} className="dot-field" aria-hidden="true" />;
}
