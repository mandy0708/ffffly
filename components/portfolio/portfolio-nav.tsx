import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { copy } from "@/lib/copy";
import { getLang } from "@/lib/i18n-server";
import { LangSwitch } from "@/components/site/lang-switch";

export async function PortfolioNav() {
  const t = copy[await getLang()].nav;
  const links = [
    { href: "/", label: t.home },
    { href: "/work", label: t.work },
    { href: "/sketchbook", label: t.sketchbook },
    { href: "/about", label: t.about },
  ];

  return (
    <>
    <nav className="top-nav" aria-label="Main navigation">
      <div className="nav-links">
        {links.map((link, index) => (
          <Link key={link.href} href={link.href} data-active={index === 0}>
            {link.label}
          </Link>
        ))}
      </div>
      <Link className="nav-cta" href="/about#contact">
        <span className="nav-cta-label">{t.cta}</span>
        <ArrowUpRight className="nav-cta-icon" size={18} strokeWidth={2} aria-hidden="true" />
      </Link>
    </nav>
    <LangSwitch />
    </>
  );
}
