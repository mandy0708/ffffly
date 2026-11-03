import { WorkCards } from "@/components/portfolio/work-cards";
import { copy } from "@/lib/copy";
import { getLang } from "@/lib/i18n-server";

export async function Hero() {
  const t = copy[await getLang()].home;
  return (
    <section className="hero" aria-label="Mandy ZhangMan portfolio home">
      <h1 className="sr-only">Mandy ZhangMan — Brand Designer</h1>
      <div className="hero-intro" aria-hidden="true">
        <p className="hero-intro-eyebrow">{t.heroEyebrow}</p>
        <p className="hero-intro-title">{t.heroTitle}</p>
      </div>
      <WorkCards />
    </section>
  );
}
