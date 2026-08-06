const links = [
  { href: "#home", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
];

export function PortfolioNav() {
  return (
    <nav className="top-nav" aria-label="Main navigation">
      <div className="nav-links">
        {links.map((link, index) => (
          <a key={link.href} href={link.href} data-active={index === 0}>
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
