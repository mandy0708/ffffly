import type { Metadata } from "next";
import { DotField } from "@/components/portfolio/dot-field";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { SketchbookMasonry } from "@/components/site/sketchbook-masonry";
import { sketchbookImages } from "@/lib/sketchbook-images";
import { copy } from "@/lib/copy";
import { getLang } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: "Sketchbook — Mandy ZhangMan",
  description: "记录创作过程中的视觉碎片、想法与实验",
};

export default async function SketchbookPage() {
  const t = copy[await getLang()].sketchbook;
  return (
    <main className="site-shell">
      <DotField fixed />
      <SiteNav />
      <div className="site-main sketchbook-main">
        <div className="sketchbook-title-block">
          <h1>{t.title}</h1>
          <p className="sketchbook-subtitle">{t.subtitle}</p>
        </div>

        <SketchbookMasonry images={sketchbookImages} />
      </div>
      <SiteFooter />
    </main>
  );
}
