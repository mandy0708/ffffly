import { AskBar } from "@/components/portfolio/ask-bar";
import { DotField } from "@/components/portfolio/dot-field";
import { Hero } from "@/components/portfolio/hero";
import { PortfolioNav } from "@/components/portfolio/portfolio-nav";
import { SiteFooter } from "@/components/site/site-footer";

export default function Home() {
  return (
    <main id="home" className="portfolio-shell">
      <DotField fixed />
      <div className="stage">
        <PortfolioNav />
        <Hero />
        <AskBar />
        <SiteFooter />
      </div>
    </main>
  );
}
