const primaryLinks = [
  { href: "#home", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
];

export function PortfolioNav() {
  return (
    <nav className="top-nav" aria-label="Main navigation">
      <div className="nav-links">
        <NavigationLinks links={primaryLinks} />
      </div>
      <a className="nav-cta" href="#contact">Let&apos;s talk <span aria-hidden="true">↗</span></a>
    </nav>
  );
}

function NavigationLinks({ links }: { links: typeof primaryLinks }) {
  return links.map((link, index) => (
    <Fragment key={link.href}>
      {index > 0 && <i aria-hidden="true">·</i>}
      <a href={link.href}>{link.label}</a>
    </Fragment>
  ));
}
import { Fragment } from "react";
