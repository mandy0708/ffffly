import { ContactDock } from "@/components/portfolio/contact-dock";
import { DotField } from "@/components/portfolio/dot-field";
import { Hero } from "@/components/portfolio/hero";
import { PortfolioNav } from "@/components/portfolio/portfolio-nav";

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
    </main>
  );
}
