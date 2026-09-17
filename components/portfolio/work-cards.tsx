"use client";

import brandImage from "@/public/images/portfolio/brand-bag.jpg";
import brandImageMobile from "@/public/images/portfolio/brand-bag-phone.png";
import aboutImage from "@/public/images/portfolio/about-portrait.jpg";
import contactImage from "@/public/images/portfolio/contactme-planB.png";
import cultureImage from "@/public/images/portfolio/culture-cover.jpg";
import cultureImageMobile from "@/public/images/portfolio/culture-cover-phone.jpeg";
import { WorkCard } from "@/components/portfolio/work-card";
import { AwardsBadgeCard } from "@/components/portfolio/awards-badge-card";

export function WorkCards() {
  return (
    <div id="work" className="works" aria-label="Selected work">
      <WorkCard
        className="card-sketchbook"
        href="/sketchbook"
        video="/images/portfolio/sketchbook-planB.mp4"
        imageAlt="Looping video illustration for the sketchbook"
        title="Sketchbook"
        subtitle="Illustration, 3D and motion — loose, unbriefed exploration."
      />

      <WorkCard
        className="card-brand"
        href="/work"
        image={brandImage}
        mobileImage={brandImageMobile}
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
        imageAlt="Illustration of a blue mailbox with an iced coffee inside"
        title="Contact Me"
      />

      <WorkCard
        className="card-culture"
        href="/work?category=Culture%26IP"
        image={cultureImage}
        mobileImage={cultureImageMobile}
        imageAlt="Backpack with 4Paradigm brand patches"
        title="Culture & IP"
        subtitle="Corporate culture, IP and merchandise design."
      />

      <div className="mandy-badge" aria-hidden="true">
        👋 Hello, I&apos;m Mandy !
      </div>

      <AwardsBadgeCard />
    </div>
  );
}
