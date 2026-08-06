import sketchbookImage from "@/public/images/portfolio/sketchbook-illustration.jpg";
import brandImage from "@/public/images/portfolio/brand-phone.jpg";
import aboutImage from "@/public/images/portfolio/about-portrait.jpg";
import contactImage from "@/public/images/portfolio/contact-phone.jpg";
import cultureImage from "@/public/images/portfolio/mahjong-2.jpg";
import { WorkCard } from "@/components/portfolio/work-card";

export function WorkCards() {
  return (
    <div id="work" className="works" aria-label="Selected work">
      <WorkCard
        className="card-sketchbook"
        href="#sketchbook"
        image={sketchbookImage}
        imageAlt="Sketchbook illustration of a bridge, a boat and a wind turbine"
        title="Sketchbook"
      />

      <WorkCard
        className="card-brand"
        href="#work"
        image={brandImage}
        imageAlt="Z.ai app icon shown on a phone lock screen"
        title="Brand Design"
        subtitle="Building brands from positioning to system."
      />

      <WorkCard
        className="card-about"
        href="#about"
        image={aboutImage}
        imageAlt="Portrait of Mandy ZhangMan"
        title="About Me"
        subtitle="Brand designer, AI tinkerer, and problem-solver."
      />

      <WorkCard
        className="card-contact"
        href="#contact"
        image={contactImage}
        imageAlt="Illustration of a vintage telephone"
        title="Contact Me"
      />

      <WorkCard
        className="card-culture"
        href="#work"
        image={cultureImage}
        imageAlt="Travel mahjong set open in its case"
        title="Culture & IP"
      />

      <div className="mandy-badge" aria-hidden="true">
        HELLO, I&apos;M MANDY !
      </div>
    </div>
  );
}
