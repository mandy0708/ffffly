"use client";

import { useEffect, useRef } from "react";

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

      const time = reduceMotion.matches ? 0 : now * 0.00022;
      const spacing = 10;
      const waveX = width * (0.5 + Math.sin(time * 0.64) * 0.23);
      const waveY = height * (0.48 + Math.cos(time * 0.48) * 0.19);

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#171717";

      for (let y = -spacing; y <= height + spacing; y += spacing) {
        for (let x = -spacing; x <= width + spacing; x += spacing) {
          const dx = x - waveX;
          const dy = y - waveY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const ripple = Math.sin(distance * 0.038 - time * 12);
          const field = Math.sin(x * 0.018 + time * 1.4) + Math.cos(y * 0.016 - time);
          const energy = Math.max(0, ripple * 0.5 + 0.5) * Math.exp(-distance / 390);
          const radius = 0.45 + energy * 1.22 + Math.max(0, field) * 0.1;
          const opacity = 0.065 + energy * 0.16;

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
