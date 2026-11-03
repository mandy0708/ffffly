"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { copy } from "@/lib/copy";
import { useLang } from "@/components/site/lang-provider";
import { LangSwitch } from "@/components/site/lang-switch";

export function SiteNav() {
  const pathname = usePathname();
  const t = copy[useLang()].nav;
  const links = [
    { href: "/", label: t.home },
    { href: "/work", label: t.work },
    { href: "/sketchbook", label: t.sketchbook },
    { href: "/about", label: t.about },
  ];

  return (
    <nav className="site-nav" aria-label="Main navigation">
      <div className="site-nav-links">
        {links.map((link) => (
          <Link key={link.href} href={link.href} data-active={pathname === link.href}>
            {link.label}
          </Link>
        ))}
      </div>
      <LangSwitch />
      <Link className="site-nav-cta" href="/about#contact">
        <span className="nav-cta-label">{t.cta}</span>
        <ArrowUpRight className="nav-cta-icon" size={18} strokeWidth={2} aria-hidden="true" />
      </Link>
    </nav>
  );
}
