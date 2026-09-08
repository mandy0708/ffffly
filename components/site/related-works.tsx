"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type RelatedProject = {
  slug: string;
  tag: string;
  year: string;
  title: string;
  image: StaticImageData;
};

export function RelatedWorks({ projects }: { projects: RelatedProject[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const updateArrows = () => {
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    };

    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [projects]);

  const scrollByStep = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.8 * direction, behavior: "smooth" });
  };

  return (
    <div className="project-related">
      <div className="project-related-head">
        <h2>Related Works</h2>
        <div className="project-related-arrows">
          <button type="button" aria-label="Scroll left" onClick={() => scrollByStep(-1)} disabled={!canScrollLeft}>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M12.5 15 7.5 10l5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" aria-label="Scroll right" onClick={() => scrollByStep(1)} disabled={!canScrollRight}>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M7.5 15l5-5-5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      <div className="project-related-track" ref={trackRef}>
        {projects.map((related) => (
          <Link className="project-related-item" href={`/work/${related.slug}`} key={related.slug}>
            <div className="project-related-image">
              <Image src={related.image} alt={related.title} fill sizes="(max-width: 640px) 45vw, 280px" style={{ objectFit: "cover" }} />
            </div>
            <span className="project-related-tag">{related.tag} · {related.year}</span>
            <span className="project-related-title">{related.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
