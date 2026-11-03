"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/sketchbook", label: "Sketchbook" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="site-nav" aria-label="Main navigation" data-open={open}>
      {/* Phones: the link row collapses into this two-line menu button */}
      <button type="button" className="nav-burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span />
        <span />
      </button>
      <div className="site-nav-links">
        {links.map((link) => (
          <Link key={link.href} href={link.href} data-active={pathname === link.href} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
      </div>
      <Link className="site-nav-cta" href="/about#contact" onClick={() => setOpen(false)}>
        <span className="nav-cta-label">Let&apos;s talk</span>
        <ArrowUpRight className="nav-cta-icon" size={18} strokeWidth={2} aria-hidden="true" />
      </Link>
    </nav>
  );
}
