import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
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
        Let&apos;s talk
      </Link>
    </nav>
  );
}
