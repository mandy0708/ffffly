"use client";

import Image from "next/image";
import { useState } from "react";
import type { StaticImageData } from "next/image";

export type WorkProject = {
  tag: string;
  title: string;
  description: string;
  image: StaticImageData;
};

const CATEGORIES = ["All Projects", "Branding", "Marketing", "Culture&IP", "Web design"];

export function WorkGrid({ projects }: { projects: WorkProject[] }) {
  const [active, setActive] = useState(CATEGORIES[0]);

  const visible = active === "All Projects" ? projects : projects.filter((p) => p.tag === active);

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
        {visible.map((project) => (
          <a className="work-item" href="/about#contact" key={project.title}>
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
        ))}
      </div>
    </>
  );
}
