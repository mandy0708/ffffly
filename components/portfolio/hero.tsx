import { WorkCards } from "@/components/portfolio/work-cards";

export function Hero() {
  return (
    <section className="hero" aria-label="Mandy ZhangMan portfolio home">
      <h1 className="sr-only">Mandy ZhangMan — Brand Designer</h1>
      <WorkCards />
    </section>
  );
}
