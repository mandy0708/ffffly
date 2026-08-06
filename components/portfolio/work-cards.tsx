import { WorkCard } from "@/components/portfolio/work-card";

export function WorkCards() {
  return (
    <div id="work" className="works" aria-label="Selected sections">
      <WorkCard className="blog-card" href="#sketchbook" number="01" title="Sketchbook" subtitle="Experiments and notes">
        <span className="card-label">Sketchbook</span>
      </WorkCard>

      <WorkCard className="recent-card" href="#work" number="02" title="Brand design" subtitle="Building brands from positioning to system">
        <span className="round-arrow">↗</span>
        <div className="recent-copy">
          <h2>Brand Design</h2>
          <p>Building brands from positioning to system.</p>
        </div>
      </WorkCard>

      <WorkCard className="about-card" href="#about" number="03" title="About me" subtitle="Mandy ZhangMan">
        <div className="about-copy">
          <h2>About Me</h2>
          <p>Real me: strategist, designer, and problem-solver.</p>
        </div>
      </WorkCard>

      <WorkCard className="contact-card" href="#contact" number="04" title="Contact me" subtitle="Let's talk">
        <span className="round-arrow">↗</span>
        <div className="contact-copy">Contact Me</div>
      </WorkCard>

      <WorkCard className="services-card" href="#work" number="05" title="Culture and IP" subtitle="Visual stories">
        <span className="round-arrow">↗</span>
        <div className="service-copy">Culture &amp; IP</div>
      </WorkCard>
    </div>
  );
}
