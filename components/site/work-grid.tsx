"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { StaticImageData } from "next/image";

export type WorkProject = {
  slug: string;
  tag: string;
  categories?: string[];
  title: string;
  description: string;
  image: StaticImageData;
  comingSoon?: boolean;
};

const CATEGORIES = ["All Projects", "Branding", "Marketing", "Culture&IP", "Packaging"];

// Under the Branding filter, 4Paradigm should lead ahead of Zhipu — the
// reverse of their order in "All Projects" — so this list overrides it there.
const BRANDING_ORDER = ["yuanhuan-intelligent", "4paradigm-branding", "zhipu-brand-upgrade", "tetellus-branding"];

export function WorkGrid({ projects }: { projects: WorkProject[] }) {
  const searchParams = useSearchParams();
  const requested = searchParams.get("category");
  const initial = requested && CATEGORIES.includes(requested) ? requested : CATEGORIES[0];
  const [active, setActive] = useState(initial);
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    if (!showComingSoon) return;
    const timer = setTimeout(() => setShowComingSoon(false), 2000);
    return () => clearTimeout(timer);
  }, [showComingSoon]);

  const filtered =
    active === "All Projects" ? projects : projects.filter((p) => (p.categories ?? [p.tag]).includes(active));
  const visible =
    active === "Branding"
      ? [...filtered].sort((a, b) => BRANDING_ORDER.indexOf(a.slug) - BRANDING_ORDER.indexOf(b.slug))
      : filtered;

  return (
    <>
      <div className="work-filter" role="tablist" aria-label="Filter projects by category">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            data-active={category === active}
            onClick={() => setActive(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="work-grid">
        {visible.map((project) =>
          project.comingSoon ? (
            <button
              type="button"
              className="work-item work-item--coming-soon"
              key={project.title}
              onClick={() => setShowComingSoon(true)}
            >
              <div className="work-item-image">
                <Image src={project.image} alt={project.title} fill sizes="(max-width: 640px) 100vw, 420px" style={{ objectFit: "cover" }} />
              </div>
              <div className="work-item-body">
                <div className="work-item-head">
                  <h3>{project.title}</h3>
                  <span className="tag">{project.tag}</span>
                </div>
                <p>{project.description}</p>
              </div>
            </button>
          ) : (
            <a className="work-item" href={`/work/${project.slug}`} key={project.title}>
              <div className="work-item-image">
                <Image src={project.image} alt={project.title} fill sizes="(max-width: 640px) 100vw, 420px" style={{ objectFit: "cover" }} />
              </div>
              <div className="work-item-body">
                <div className="work-item-head">
                  <h3>{project.title}</h3>
                  <span className="tag">{project.tag}</span>
                </div>
                <p>{project.description}</p>
              </div>
            </a>
          ),
        )}
      </div>

      {showComingSoon && (
        <div className="coming-soon-toast" role="status">
          筹备中
        </div>
      )}
    </>
  );
}
