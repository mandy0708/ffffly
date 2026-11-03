import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/sketchbook", label: "Sketchbook" },
  { href: "/about", label: "About" },
];

export function PortfolioNav() {
  return (
    <nav className="top-nav" aria-label="Main navigation">
      <div className="nav-links">
        {links.map((link, index) => (
          <Link key={link.href} href={link.href} data-active={index === 0}>
            {link.label}
          </Link>
        ))}
      </div>
      <Link className="nav-cta" href="/about#contact">
        <span className="nav-cta-label">Let&apos;s talk</span>
        <ArrowUpRight className="nav-cta-icon" size={18} strokeWidth={2} aria-hidden="true" />
      </Link>
    </nav>
  );
}
