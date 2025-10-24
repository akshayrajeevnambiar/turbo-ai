import { useEffect, useState } from "react";
import { Container } from "./Container";
import { SectionLink } from "./SectionLink";
import { site, tokens } from "../content/turboai";

export function Header() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      rootMargin: `-${tokens.layout.headerH}px 0px -60% 0px`,
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = [
      "hero",
      "about",
      "credentials",
      "expertise",
      "impact",
      "perspectives",
      "connect",
    ];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        isMobileMenuOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".mobile-menu-button")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-charcoal/95 backdrop-blur-md border-b border-emeraldTint/10"
      style={{ height: `${tokens.layout.headerH}px` }}
      role="banner"
    >
      <Container className="h-full flex items-center justify-between">
        {/* Logo */}
        <SectionLink href="#hero" className="logo" aria-label="Turbo AI home">
          {site.meta.siteName}
        </SectionLink>

        {/* Desktop Navigation */}
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="hidden lg:block"
        >
          <ul className="flex items-center space-x-8">
            {site.nav.items.map((item) => (
              <li key={item.href}>
                <SectionLink
                  href={item.href}
                  className={`nav-link ${
                    activeSection === item.href.replace("#", "")
                      ? "aria-current"
                      : ""
                  }`}
                  aria-current={
                    activeSection === item.href.replace("#", "")
                      ? "page"
                      : undefined
                  }
                  aria-label={`Navigate to ${item.label} section`}
                >
                  {item.label}
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button lg:hidden p-2 text-white/80 hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="mobile-menu absolute top-full left-0 right-0 bg-charcoal/98 backdrop-blur-md border-b border-emeraldTint/10 lg:hidden"
          >
            <nav
              role="navigation"
              aria-label="Mobile navigation"
              className="py-4"
            >
              <ul className="space-y-2">
                {site.nav.items.map((item) => (
                  <li key={item.href}>
                    <SectionLink
                      href={item.href}
                      className={`mobile-nav-link ${
                        activeSection === item.href.replace("#", "")
                          ? "aria-current"
                          : ""
                      }`}
                      onClick={handleLinkClick}
                      aria-current={
                        activeSection === item.href.replace("#", "")
                          ? "page"
                          : undefined
                      }
                      aria-label={`Navigate to ${item.label} section`}
                    >
                      {item.label}
                    </SectionLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
