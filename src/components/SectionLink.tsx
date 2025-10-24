import { type ReactNode, type MouseEvent } from "react";
import { tokens } from "../content/turboai";

interface SectionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
  "aria-current"?: "page" | "true" | undefined;
}

export function SectionLink({
  href,
  children,
  className = "",
  onClick,
  "aria-label": ariaLabel,
  "aria-current": ariaCurrent,
}: SectionLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    // Extract section ID from href
    const sectionId = href.replace("#", "");
    const targetElement = document.getElementById(sectionId);

    if (targetElement) {
      // Calculate scroll position with header offset
      const headerHeight = tokens.layout.headerH;
      const targetY = targetElement.offsetTop - headerHeight;

      // Smooth scroll
      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      });

      // Update URL hash without triggering scroll
      setTimeout(() => {
        history.replaceState(null, "", href);
      }, 100);
    }

    // Call optional onClick handler
    onClick?.();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
    >
      {children}
    </a>
  );
}
