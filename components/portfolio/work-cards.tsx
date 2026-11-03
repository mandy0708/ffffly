"use client";

import brandImage from "@/public/images/portfolio/brand-bag.jpg";
import brandImageMobile from "@/public/images/portfolio/brand-bag-phone.png";
import aboutImage from "@/public/images/portfolio/about-me.jpg";
import cultureImage from "@/public/images/portfolio/culture-cover.jpg";
import cultureImageMobile from "@/public/images/portfolio/culture-cover-phone.jpeg";
import { WorkCard } from "@/components/portfolio/work-card";
import { AwardsBadgeCard } from "@/components/portfolio/awards-badge-card";
import { copy } from "@/lib/copy";
import { useLang } from "@/components/site/lang-provider";

export function WorkCards() {
  const t = copy[useLang()].home;
  return (
    <div id="work" className="works" aria-label="Selected work">
      <WorkCard
        className="card-sketchbook"
        href="/sketchbook"
        gradient="violet"
        imageAlt="Soft violet gradient"
        title={t.sketchbook.title}
        subtitle={t.sketchbook.subtitle}
      />

      <WorkCard
        className="card-brand"
        href="/work"
        image={brandImage}
        mobileImage={brandImageMobile}
        imageAlt="Branded tote bag with a purple geometric pattern"
        objectPosition="center 65%"
        title={t.brand.title}
        subtitle={t.brand.subtitle}
      />

      <WorkCard
        className="card-about"
        href="/about"
        image={aboutImage}
        imageAlt="Portrait of Mandy ZhangMan"
        title={t.about.title}
        subtitle={t.about.subtitle}
      />

      <WorkCard
        className="card-contact"
        href="/about#contact"
        gradient="ocean"
        imageAlt="Soft blue gradient"
        title={t.contact.title}
      />

      <WorkCard
        className="card-culture"
        href="/work?category=Culture%26IP"
        image={cultureImage}
        mobileImage={cultureImageMobile}
        imageAlt="Backpack with 4Paradigm brand patches"
        title={t.culture.title}
        subtitle={t.culture.subtitle}
      />

      <div className="mandy-badge" aria-hidden="true">
        {t.hello}
      </div>

      <AwardsBadgeCard />
    </div>
  );
}
