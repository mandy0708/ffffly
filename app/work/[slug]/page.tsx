import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
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
  const galleryImages = Array.from({ length: project.galleryCount }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return `/images/work/gallery/${project.slug}/${n}.jpg`;
  });

  const currentIndex = workProjects.findIndex((p) => p.slug === project.slug);
  const relatedCount = Math.min(3, workProjects.length - 1);
  const relatedProjects = Array.from({ length: relatedCount }, (_, i) => workProjects[(currentIndex + 1 + i) % workProjects.length]);

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
          <div className="project-narrative">
            {project.narrative.map((paragraph) => (
              <p key={paragraph.slice(0, 12)}>{paragraph}</p>
            ))}
          </div>
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
        </div>

        {galleryImages.length > 0 && (
          <div className="project-gallery">
            {galleryImages.map((src) => (
              <div className="project-gallery-item" key={src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={project.title} loading="lazy" />
              </div>
            ))}
          </div>
        )}

        <div className="project-related">
          <h2>Related Works</h2>
          <div className="project-related-grid">
            {relatedProjects.map((related) => (
              <Link className="project-related-item" href={`/work/${related.slug}`} key={related.slug}>
                <div className="project-related-image">
                  <Image
                    src={coverImages[related.slug as keyof typeof coverImages]}
                    alt={related.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 280px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <span className="project-related-tag">{related.tag} · {related.year}</span>
                <span className="project-related-title">{related.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
