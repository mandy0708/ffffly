import { AskBar } from "@/components/portfolio/ask-bar";
import { DotField } from "@/components/portfolio/dot-field";
import { Hero } from "@/components/portfolio/hero";
import { PortfolioNav } from "@/components/portfolio/portfolio-nav";

export default function Home() {
  return (
    <main id="home" className="portfolio-shell">
      <DotField />
      <PortfolioNav />
      <Hero />
      <AskBar />
    </main>
  );
}
