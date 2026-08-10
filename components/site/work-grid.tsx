"use client";

import { useState } from "react";

export type WorkProject = {
  tag: string;
  title: string;
  description: string;
  tint: string;
};

export function WorkGrid({ projects }: { projects: WorkProject[] }) {
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.tag)))];
  const [active, setActive] = useState(categories[0]);

  const visible = active === "All" ? projects : projects.filter((p) => p.tag === active);

  return (
    <>
      <div className="work-filter" role="tablist" aria-label="Filter projects by client">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            data-active={category === active}
            onClick={() => setActive(category)}
          >
            {category === "All" ? "All projects" : category}
          </button>
        ))}
      </div>

      <div className="work-grid">
        {visible.map((project) => (
          <a className="work-item" href="/about#contact" key={project.title}>
            <div className="work-item-image" style={{ background: project.tint }} />
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
