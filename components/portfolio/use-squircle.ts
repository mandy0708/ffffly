"use client";

import { getSvgPath } from "figma-squircle";
import { useEffect, useRef, useState } from "react";

const STAGE_REFERENCE_WIDTH = 1440;

/**
 * Figma's "corner smoothing" isn't a plain border-radius — it's a squircle
 * whose curvature depends on the element's actual rendered size. cornerRadiusPx
 * is the design value at the 1440-wide reference canvas; it's rescaled to
 * whatever size the .stage ancestor is actually rendered at.
 */
export function useSquirclePath<T extends HTMLElement>(cornerRadiusPx: number, cornerSmoothing = 0.6) {
  const ref = useRef<T>(null);
  const [path, setPath] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const stage = el.closest<HTMLElement>(".stage");

    function recalc() {
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;

      const stageWidth = stage?.getBoundingClientRect().width || STAGE_REFERENCE_WIDTH;
      const cornerRadius = (cornerRadiusPx / STAGE_REFERENCE_WIDTH) * stageWidth;

      setPath(getSvgPath({ width, height, cornerRadius, cornerSmoothing }));
    }

    const observer = new ResizeObserver(recalc);
    observer.observe(el);
    if (stage) observer.observe(stage);
    recalc();

    return () => observer.disconnect();
  }, [cornerRadiusPx, cornerSmoothing]);

  return { ref, clipPath: path ? `path('${path}')` : undefined };
}
