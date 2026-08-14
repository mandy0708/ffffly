import type { Metadata } from "next";
import { Suspense } from "react";
import { DotField } from "@/components/portfolio/dot-field";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { WorkGrid, type WorkProject } from "@/components/site/work-grid";
import { workProjects } from "@/lib/work-projects";
import { coverImages } from "@/lib/work-images";

export const metadata: Metadata = {
  title: "Work — Mandy ZhangMan",
  description: "Selected brand design work for Zhipu AI and 4Paradigm.",
};

const projects: WorkProject[] = workProjects.map((project) => ({
  slug: project.slug,
  tag: project.tag,
  title: project.title,
  description: project.description,
  image: coverImages[project.slug as keyof typeof coverImages],
}));

export default function WorkPage() {
  return (
    <main className="site-shell">
      <DotField fixed />
      <SiteNav />
      <div className="site-main">
        <div className="work-intro">
          <h1>My personal projects &amp; creative endeavors</h1>
        </div>
        <Suspense>
          <WorkGrid projects={projects} />
        </Suspense>
      </div>
      <SiteFooter />
    </main>
  );
}
