import { WorkCards } from "@/components/portfolio/work-cards";

export function Hero() {
  return (
    <>
      <section className="hero" aria-label="Mandy ZhangMan portfolio home">
        <p className="intro-pill">HELLO, I&apos;M MANDY !</p>
        <div aria-hidden="true" className="hero-wordmark">
          HELLO, I&apos;M <em>MANDY</em><br />YOUR DESIGN PARTNER
        </div>
        <WorkCards />
      </section>

      <section id="about" className="sr-only">
        <h1>Mandy ZhangMan, brand designer</h1>
      </section>
      <section id="sketchbook" className="sr-only">
        <h2>Sketchbook</h2>
      </section>
      <section id="contact" className="sr-only">
        <h2>Contact Mandy</h2>
      </section>
    </>
  );
}
