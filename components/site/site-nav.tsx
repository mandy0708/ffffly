"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/sketchbook", label: "Sketchbook" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="site-nav" aria-label="Main navigation">
      <div className="site-nav-links">
        {links.map((link) => (
          <Link key={link.href} href={link.href} data-active={pathname === link.href}>
            {link.label}
          </Link>
        ))}
      </div>
      <Link className="site-nav-cta" href="/about#contact">
        <span className="nav-cta-label">Let&apos;s talk</span>
        <ArrowUpRight className="nav-cta-icon" size={18} strokeWidth={2} aria-hidden="true" />
      </Link>
    </nav>
  );
}
