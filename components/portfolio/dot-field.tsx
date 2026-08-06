"use client";

import { useEffect, useRef } from "react";

function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}

function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function valueNoise(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = smooth(xf);
  const v = smooth(yf);

  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);

  return lerp(lerp(a, b, u), lerp(c, d, u), v);
}

function fbm(x: number, y: number) {
  let total = 0;
  let amp = 0.5;
  let freq = 1;
  let max = 0;

  for (let i = 0; i < 4; i++) {
    total += valueNoise(x * freq, y * freq) * amp;
    max += amp;
    amp *= 0.5;
    freq *= 2.15;
  }

  return total / max;
}

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

      const time = reduceMotion.matches ? 0 : now * 0.00012;
      const spacing = Math.max(6, width / 190);
      const scale = 0.9 / Math.max(width, height) * 100;
      const driftX = Math.cos(time * 0.6) * 6 + time * 1.1;
      const driftY = Math.sin(time * 0.5) * 6 - time * 0.7;

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#ffffff";

      for (let y = -spacing; y <= height + spacing; y += spacing) {
        for (let x = -spacing; x <= width + spacing; x += spacing) {
          const n = fbm(x * scale + driftX, y * scale + driftY);
          const energy = Math.max(0, (n - 0.42) / 0.58);
          const shaped = energy * energy;

          const radius = 0.3 + shaped * 2.2;
          const opacity = 0.05 + shaped * 0.5;

          if (opacity <= 0.052) continue;

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

  return (
    <canvas
      ref={canvasRef}
      className={`dot-field${fixed ? " dot-field-fixed" : ""}`}
      aria-hidden="true"
    />
  );
}
