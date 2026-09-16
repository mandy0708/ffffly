import Image from "next/image";
import Link from "next/link";
import { workProjects, comingSoonProjects } from "@/lib/work-projects";
import { coverImages } from "@/lib/work-images";

const slugs = ["yuanhuan-intelligent", "zhipu-brand-upgrade", "4paradigm-branding", "4paradigm-onboarding-gifts"];

const projects = slugs.map((slug) => {
  const detail = workProjects.find((p) => p.slug === slug);
  const comingSoon = comingSoonProjects.find((p) => p.slug === slug);
  const project = detail ?? comingSoon;
  if (!project) throw new Error(`Unknown project slug: ${slug}`);
  return {
    slug,
    title: project.title,
    tag: project.tag,
    image: coverImages[slug as keyof typeof coverImages],
    href: detail ? `/work/${slug}` : "/work",
  };
});

export function ProjectsShowcase() {
  return (
    <section className="home-projects">
      <div className="home-projects-heading">
        <h2>Projects</h2>
        <p>A selection of brand work spanning strategy, identity, and rollout.</p>
      </div>
      <div className="home-projects-grid">
        {projects.map((project) => (
          <Link className="home-project-card" href={project.href} key={project.slug}>
            <div className="home-project-image">
              <Image src={project.image} alt={project.title} fill sizes="(max-width: 640px) 100vw, 25vw" style={{ objectFit: "cover" }} />
            </div>
            <div className="home-project-body">
              <span className="home-project-tag">{project.tag}</span>
              <h3>{project.title}</h3>
            </div>
          </Link>
        ))}
      </div>
      <Link className="home-projects-cta" href="/work">
        View All Projects <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
