import { type ReactNode, type MouseEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    // Check if it's an external link
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
      onClick?.();
      return;
    }

    // Check if it's a hash link
    if (href.startsWith("#")) {
      const sectionId = href.replace("#", "");

      // If we are on the home page, scroll to section
      if (location.pathname === "/") {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
          const headerHeight = tokens.layout.headerH;
          const targetY = targetElement.offsetTop - headerHeight;

          window.scrollTo({
            top: targetY,
            behavior: "smooth",
          });

          // Update URL hash without triggering scroll
          setTimeout(() => {
            history.pushState(null, "", href);
          }, 100);
        }
      } else {
        // If not on home page, navigate to home with hash
        // The App component will handle the scrolling on mount/update
        navigate(`/${href}`);
      }
    } else {
      // It's an internal route (e.g., /ai-transformation)
      navigate(href);
      window.scrollTo(0, 0);
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
