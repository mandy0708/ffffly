import type { Metadata } from "next";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { SketchbookMasonry } from "@/components/site/sketchbook-masonry";
import { sketchbookImages } from "@/lib/sketchbook-images";

export const metadata: Metadata = {
  title: "Sketchbook — Mandy ZhangMan",
  description: "记录创作过程中的视觉碎片、想法与实验",
};

export default function SketchbookPage() {
  return (
    <main className="site-shell">
      <SiteNav />
      <div className="site-main sketchbook-main">
        <div className="sketchbook-title-block">
          <h1>Visual Sketchbook</h1>
          <p className="sketchbook-subtitle">记录创作过程中的视觉碎片、想法与实验</p>
        </div>

        <SketchbookMasonry images={sketchbookImages} />
      </div>
      <SiteFooter />
    </main>
  );
}
