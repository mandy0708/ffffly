"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/sketchbook", label: "Sketchbook" },
  { href: "/about", label: "About" },
];

export function PortfolioNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="top-nav" aria-label="Main navigation" data-open={open}>
      {/* Phones: the link row collapses into this two-line menu button */}
      <button type="button" className="nav-burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span />
        <span />
      </button>
      <div className="nav-links">
        {links.map((link, index) => (
          <Link key={link.href} href={link.href} data-active={index === 0} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
      </div>
      <Link className="nav-cta" href="/about#contact" onClick={() => setOpen(false)}>
        <span className="nav-cta-label">Let&apos;s talk</span>
        <ArrowUpRight className="nav-cta-icon" size={18} strokeWidth={2} aria-hidden="true" />
      </Link>
    </nav>
  );
}
