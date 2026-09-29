import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SectionLink } from "./SectionLink";
import { Dropdown } from "./Dropdown";
import { MobileDropdown } from "./MobileDropdown";
import { site, tokens } from "../content/turboai";
import turboAiLogo from "../assets/turbo-ai-logo-removebg-preview.png";
import { cmsPublicEnabled } from "../cms/client";
import { usePublishedEntries } from "../cms/hooks";

export function Header() {
  const { entries: cmsProducts, loading: productsLoading, failed: productsFailed } = usePublishedEntries("product");
  const navItems = site.nav.items.map((item) => {
    if (!cmsPublicEnabled || item.label !== "Products" || !("dropdown" in item)) return item;
    return { ...item, dropdown: [...(item.dropdown ?? []).slice(0, 1), ...cmsProducts.map((entry) => ({ label: entry.title, href: `/products/${entry.slug}` }))] };
  });
  const { pathname } = useLocation();
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

    // Observe all sections on home page
    const sections = [
      "hero",
      "about",
      "credentials",
      "expertise",
      "industries",
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
  }, [pathname]);

  const isLinkActive = (href: string) => {
    if (href.startsWith("/#") || href.startsWith("#")) {
      const cleanSection = href.replace("/#", "").replace("#", "");
      return pathname === "/" && activeSection === cleanSection;
    }
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

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
      className="fixed top-0 left-0 right-0 z-50 bg-charcoal/95 backdrop-blur-md border-b border-emeraldTint/10 h-20 flex items-center"
      style={{ height: `${tokens.layout.headerH}px` }}
      role="banner"
    >
      {cmsPublicEnabled && productsLoading && <span hidden data-cms-loading />}
      {cmsPublicEnabled && productsFailed && <span hidden data-cms-error />}
      <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-12 h-full flex items-center justify-between">
        {/* Logo */}
        <SectionLink
          href="/#hero"
          className="flex items-center select-none cursor-pointer py-1"
          aria-label="Turbo AI home"
        >
          <img
            src={turboAiLogo}
            alt="Turbo AI"
            className="h-10 sm:h-12 md:h-14 max-h-[56px] w-auto object-contain brightness-110 hover:opacity-85 transition-opacity"
          />
        </SectionLink>

        {/* Desktop Navigation */}
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="hidden lg:flex items-center"
        >
          <ul className="flex items-center gap-3 xl:gap-5 2xl:gap-6">
            {navItems.map((item) => (
              <li key={item.label} className="flex items-center">
                {item.dropdown ? (
                  <Dropdown label={item.label} items={item.dropdown} />
                ) : (
                  <SectionLink
                    href={item.href}
                    className={`nav-link whitespace-nowrap ${isLinkActive(item.href) ? "aria-current" : ""}`}
                    aria-current={isLinkActive(item.href) ? "page" : undefined}
                    aria-label={`Navigate to ${item.label} section`}
                  >
                    <span>{item.label}</span>
                  </SectionLink>
                )}
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
          <>
            {/* Backdrop overlay */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Mobile menu */}
            <div
              id="mobile-menu"
              className="mobile-menu absolute top-full left-0 right-0 bg-charcoal border border-emeraldTint/20 shadow-2xl lg:hidden z-50"
            >
              <nav
                role="navigation"
                aria-label="Mobile navigation"
                className="py-2"
              >
                <ul className="space-y-0">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      {item.dropdown ? (
                        <MobileDropdown
                          label={item.label}
                          items={item.dropdown}
                          onItemClick={handleLinkClick}
                        />
                      ) : (
                        <SectionLink
                          href={item.href}
                          className={`mobile-nav-link ${isLinkActive(item.href) ? "aria-current" : ""}`}
                          onClick={handleLinkClick}
                          aria-current={
                            isLinkActive(item.href) ? "page" : undefined
                          }
                          aria-label={`Navigate to ${item.label} section`}
                        >
                          {item.label}
                        </SectionLink>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
