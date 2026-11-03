import type { Metadata } from "next";
import { Suspense } from "react";
import { DotField } from "@/components/portfolio/dot-field";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { WorkGrid, type WorkProject } from "@/components/site/work-grid";
import { workProjects, comingSoonProjects } from "@/lib/work-projects";
import { localizeProject } from "@/lib/work-projects-i18n";
import { coverImages } from "@/lib/work-images";
import { copy } from "@/lib/copy";
import { getLang } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: "Work — Mandy ZhangMan",
  description: "Selected brand design work for Zhipu AI and 4Paradigm.",
};

export default async function WorkPage() {
  const lang = await getLang();
  const projects: WorkProject[] = [
    ...comingSoonProjects.map((project) => ({
      slug: project.slug,
      tag: project.tag,
      title: project.title,
      description: project.description,
      image: coverImages[project.slug as keyof typeof coverImages],
      comingSoon: true,
    })),
    ...workProjects.map((project) => {
      const localized = localizeProject(project, lang);
      return {
        slug: project.slug,
        tag: project.tag,
        categories: project.categories,
        title: localized.title,
        description: localized.description,
        date: project.date,
        image: coverImages[project.slug as keyof typeof coverImages],
      };
    }),
  ];

  return (
    <main className="site-shell">
      <DotField fixed />
      <SiteNav />
      <div className="site-main">
        <div className="work-intro">
          <h1>{copy[lang].work.title}</h1>
        </div>
        <Suspense>
          <WorkGrid projects={projects} />
        </Suspense>
      </div>
      <SiteFooter />
    </main>
  );
}
