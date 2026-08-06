"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import { useSquirclePath } from "@/components/portfolio/use-squircle";

type WorkCardProps = {
  className: string;
  href: string;
  image: StaticImageData;
  imageAlt: string;
  objectPosition?: string;
  title: string;
  subtitle?: string;
};

const CARD_CORNER_RADIUS = 22;
const CARD_CORNER_SMOOTHING = 0.6;

export function WorkCard({
  className,
  href,
  image,
  imageAlt,
  objectPosition,
  title,
  subtitle,
}: WorkCardProps) {
  const { ref, clipPath } = useSquirclePath<HTMLAnchorElement>(CARD_CORNER_RADIUS, CARD_CORNER_SMOOTHING);

  return (
    <a
      ref={ref}
      className={`work-card ${className}`}
      href={href}
      aria-label={`${title}${subtitle ? ` — ${subtitle}` : ""}`}
      style={{ clipPath, WebkitClipPath: clipPath }}
    >
      <div className="card-art">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 900px) 40vw, 290px"
          style={{ objectFit: "cover", objectPosition }}
        />
        <div className="card-shade" aria-hidden="true" />
      </div>
      <svg className="card-arrow" viewBox="0 0 42 42" fill="none" aria-hidden="true">
        <circle className="card-arrow-ring" cx="21" cy="21" r="20.4" fill="white" fillOpacity="0.1" stroke="white" strokeOpacity="0.5" strokeWidth="1.2" />
        <path className="card-arrow-glyph" d="M14.8 27.79 28 14.59M28 25V14.59H17.5" stroke="white" strokeOpacity="0.7" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <div className="card-copy">
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </a>
  );
}
