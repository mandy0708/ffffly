"use client";

import { useEffect, useRef } from "react";
import type { SketchbookImage } from "@/lib/sketchbook-images";

const STAGGER_STEP = 0.08;
const STAGGER_MAX_INDEX = 5;

export function SketchbookMasonry({ images }: { images: SketchbookImage[] }) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const items = itemRefs.current.filter((el): el is HTMLDivElement => el !== null);

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

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sketchbook-masonry">
      {images.map((image, index) => (
        <div
          className="sketchbook-item"
          key={image.src}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          style={{
            aspectRatio: `${image.width} / ${image.height}`,
            "--stagger": `${(index % STAGGER_MAX_INDEX) * STAGGER_STEP}s`,
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
  );
}
