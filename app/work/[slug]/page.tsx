import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { RelatedWorks } from "@/components/site/related-works";
import { getWorkProject, workProjects } from "@/lib/work-projects";
import { coverImages } from "@/lib/work-images";

export function generateStaticParams() {
  return workProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getWorkProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Mandy ZhangMan`,
    description: project.description,
  };
}

export default async function WorkProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getWorkProject(slug);
  if (!project) notFound();

  const cover = coverImages[project.slug as keyof typeof coverImages];
  const galleryImages = project.gallery.map(
    (name) => `/images/work/gallery/${project.slug}/${encodeURIComponent(name)}`,
  );

  const currentIndex = workProjects.findIndex((p) => p.slug === project.slug);
  const relatedCount = workProjects.length - 1;
  const relatedProjects = Array.from({ length: relatedCount }, (_, i) => {
    const p = workProjects[(currentIndex + 1 + i) % workProjects.length];
    return { slug: p.slug, tag: p.tag, year: p.year, title: p.title, image: coverImages[p.slug as keyof typeof coverImages] };
  });

  return (
    <main className="site-shell">
      <SiteNav />
      <div className="site-main project-detail">
        <div className="project-title-block">
          <span className="project-tag">{project.tag} · {project.year}</span>
          <h1>{project.title}</h1>
        </div>

        <div className="project-hero">
          <Image src={cover} alt={project.title} fill sizes="(max-width: 900px) 100vw, 900px" style={{ objectFit: "cover" }} priority />
        </div>

        <div className="project-overview">
          <aside className="project-meta-sidebar">
            <div className="project-meta-item">
              <span className="label">服务品牌</span>
              <span className="value">{project.client}</span>
            </div>
            <div className="project-meta-item">
              <span className="label">角色</span>
              <span className="value">{project.role}</span>
            </div>
            <div className="project-meta-item">
              <span className="label">交付成果</span>
              <span className="value">{project.deliverables.join("、")}</span>
            </div>
            {project.projectLink && project.projectLink !== "learn-more" && (
              <div className="project-meta-item">
                <span className="label">项目地址</span>
                <a className="value" href={project.projectLink} target="_blank" rel="noreferrer">
                  {project.projectLink}
                </a>
              </div>
            )}
          </aside>
          <div className="project-narrative">
            {project.narrative.map((paragraph) => (
              <p key={paragraph.slice(0, 12)}>{paragraph}</p>
            ))}
          </div>
        </div>

        {galleryImages.length > 0 && (
          <div className={`project-gallery${project.galleryColumns === 2 ? " project-gallery--two" : ""}`}>
            {galleryImages.map((src) => (
              <div className="project-gallery-item" key={src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={project.title} loading="lazy" />
              </div>
            ))}
          </div>
        )}

        <RelatedWorks projects={relatedProjects} />
      </div>
      <SiteFooter />
    </main>
  );
}
