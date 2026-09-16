"use client";

import sketchbookImage from "@/public/images/portfolio/sketchbook-desk.jpg";
import brandImage from "@/public/images/portfolio/brand-bag.jpg";
import aboutImage from "@/public/images/portfolio/about-portrait.jpg";
import contactImage from "@/public/images/portfolio/contact-phone2.jpg";
import cultureImage from "@/public/images/portfolio/culture-cover.jpg";
import { WorkCard } from "@/components/portfolio/work-card";
import { AwardsBadgeCard } from "@/components/portfolio/awards-badge-card";

export function WorkCards() {
  return (
    <div id="work" className="works" aria-label="Selected work">
      <WorkCard
        className="card-sketchbook"
        href="/sketchbook"
        image={sketchbookImage}
        imageAlt="Playful illustration of dice, a basketball and a playing card"
        title="Sketchbook"
      />

      <WorkCard
        className="card-brand"
        href="/work"
        image={brandImage}
        imageAlt="Branded tote bag with a purple geometric pattern"
        objectPosition="center 65%"
        title="Brand Design"
        subtitle="Building brands from positioning to system."
      />

      <WorkCard
        className="card-about"
        href="/about"
        image={aboutImage}
        imageAlt="Portrait of Mandy ZhangMan"
        title="About Me"
        subtitle="Brand designer, AI tinkerer, and problem-solver."
      />

      <WorkCard
        className="card-contact"
        href="/about#contact"
        image={contactImage}
        imageAlt="Abstract render of flowing glass ribbons"
        title="Contact Me"
      />

      <WorkCard
        className="card-culture"
        href="/work?category=Culture%26IP"
        image={cultureImage}
        imageAlt="Backpack with 4Paradigm brand patches"
        title="Culture & IP"
      />

      <div className="mandy-badge" aria-hidden="true">
        👋 Hello, I&apos;m Mandy !
      </div>

      <AwardsBadgeCard />
    </div>
  );
}
