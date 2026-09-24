"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { SketchbookImage } from "@/lib/sketchbook-images";

const STAGGER_STEP = 0.08;
const STAGGER_MAX_INDEX = 5;
const GAP_RATIO = 0.02;

const BREAKPOINTS = [
  { query: "(max-width: 720px)", columns: 2 },
  { query: "(max-width: 1080px)", columns: 3 },
];

function getColumnCount() {
  if (typeof window === "undefined") return 4;
  for (const bp of BREAKPOINTS) {
    if (window.matchMedia(bp.query).matches) return bp.columns;
  }
  return 4;
}

// Greedy "shortest column first" masonry: each image (in upload order) goes
// into whichever column currently has the least accumulated height. Unlike
// CSS multi-column's `balance` fill, this keeps newest items spread across
// the top row instead of letting one tall outlier skew an entire column.
function distributeColumns(images: SketchbookImage[], columnCount: number) {
  const columns: { image: SketchbookImage; originalIndex: number }[][] = Array.from(
    { length: columnCount },
    () => [],
  );
  const heights = new Array(columnCount).fill(0);

  images.forEach((image, originalIndex) => {
    let target = 0;
    for (let i = 1; i < columnCount; i++) {
      if (heights[i] < heights[target]) target = i;
    }
    columns[target].push({ image, originalIndex });
    heights[target] += image.height / image.width + GAP_RATIO;
  });

  return columns;
}

export function SketchbookMasonry({ images }: { images: SketchbookImage[] }) {
  const [columnCount, setColumnCount] = useState(4);
  const itemRefs = useRef(new Map<string, HTMLDivElement>());

  useEffect(() => {
    setColumnCount(getColumnCount());
    const lists = BREAKPOINTS.map((bp) => window.matchMedia(bp.query));
    const update = () => setColumnCount(getColumnCount());
    lists.forEach((mql) => mql.addEventListener("change", update));
    return () => lists.forEach((mql) => mql.removeEventListener("change", update));
  }, []);

  const columns = useMemo(() => distributeColumns(images, columnCount), [images, columnCount]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    itemRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [columns]);

  return (
    <div className="sketchbook-masonry">
      {columns.map((column, columnIndex) => (
        <div className="sketchbook-column" key={columnIndex}>
          {column.map(({ image, originalIndex }) => (
            <div
              className="sketchbook-item"
              key={image.src}
              ref={(el) => {
                if (el) itemRefs.current.set(image.src, el);
                else itemRefs.current.delete(image.src);
              }}
              style={{
                aspectRatio: `${image.width} / ${image.height}`,
                "--stagger": `${(originalIndex % STAGGER_MAX_INDEX) * STAGGER_STEP}s`,
              } as React.CSSProperties}
            >
              {image.isVideo ? (
                <video src={image.src} autoPlay muted loop playsInline aria-label={image.alt} />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image.src} alt={image.alt} loading="lazy" />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
