"use client";

import { useState } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
];

export function PortfolioNav() {
  const [active, setActive] = useState(links[0].href);

  return (
    <nav className="top-nav" aria-label="Main navigation">
      <div className="nav-links">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            data-active={link.href === active}
            onClick={() => setActive(link.href)}
          >
            {link.label}
          </a>
        ))}
      </div>
      <a className="nav-cta" href="#contact">
        Let&apos;s talk
      </a>
    </nav>
  );
}
