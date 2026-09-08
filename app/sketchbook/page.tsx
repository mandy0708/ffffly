import type { Metadata } from "next";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
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

        <div className="sketchbook-masonry">
          {sketchbookImages.map((image) => (
            <div
              className="sketchbook-item"
              key={image.src}
              style={{ aspectRatio: `${image.width} / ${image.height}` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.src} alt={image.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
