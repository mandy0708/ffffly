import { AwardsShowcase } from "@/components/portfolio/awards-showcase";
import { ContactDock } from "@/components/portfolio/contact-dock";
import { DotField } from "@/components/portfolio/dot-field";
import { Hero } from "@/components/portfolio/hero";
import { ImageShowcase } from "@/components/portfolio/image-showcase";
import { PortfolioNav } from "@/components/portfolio/portfolio-nav";
import { ProjectsShowcase } from "@/components/portfolio/projects-showcase";
import { SiteFooter } from "@/components/site/site-footer";

export default function Home() {
  return (
    <main id="home">
      <div className="portfolio-shell">
        <DotField fixed />
        <div className="stage">
          <PortfolioNav />
          <Hero />
          <ContactDock />
        </div>
      </div>
      <ImageShowcase />
      <ProjectsShowcase />
      <AwardsShowcase />
      <SiteFooter />
    </main>
  );
}
