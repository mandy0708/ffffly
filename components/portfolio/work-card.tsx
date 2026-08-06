import type { ReactNode } from "react";

type WorkCardProps = {
  className: string;
  href: string;
  number: string;
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function WorkCard({
  className,
  href,
  number,
  title,
  subtitle,
  children,
}: WorkCardProps) {
  return (
    <a
      className={`work-card ${className}`}
      href={href}
      aria-label={`${number} ${title} ${subtitle}`}
    >
      <div className="card-art">{children}</div>
    </a>
  );
}
