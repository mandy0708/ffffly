import { AskBar } from "@/components/portfolio/ask-bar";
import { Hero } from "@/components/portfolio/hero";
import { PortfolioNav } from "@/components/portfolio/portfolio-nav";

export default function Home() {
  return (
    <main id="home" className="portfolio-shell">
      <div className="stage">
        <PortfolioNav />
        <Hero />
        <AskBar />
      </div>
    </main>
  );
}
