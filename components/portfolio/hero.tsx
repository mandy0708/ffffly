import { WorkCards } from "@/components/portfolio/work-cards";

export function Hero() {
  return (
    <section className="hero" aria-label="Mandy ZhangMan portfolio home">
      <h1 className="sr-only">Mandy ZhangMan — Brand Designer</h1>
      <div className="hero-intro" aria-hidden="true">
        <p className="hero-intro-eyebrow">HELLO, I&apos;M MANDY !</p>
        <p className="hero-intro-title">Brand designer, AI tinkerer, and problem-solver.</p>
      </div>
      <WorkCards />
    </section>
  );
}
