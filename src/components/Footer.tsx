import { Container } from "./Container";
import { SectionLink } from "./SectionLink";
import { site, copy } from "../content/turboai";

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Derive services from expertise items
  const services = copy.expertise.items.map((item) => ({
    label: item.title,
    href: `#expertise-${item.slug}`,
  }));

  // Company navigation items
  const companyLinks = site.nav.items.filter((item) => item.href !== "#hero");

  return (
    <footer
      className="bg-charcoalDeep border-t border-emeraldTint/10 py-12 lg:py-16"
      role="contentinfo"
    >
      <Container>
        <div className="footer-grid">
          {/* Column A: Brand */}
          <div className="footer-column">
            <div className="text-lg font-heading font-semibold text-emeraldNeon mb-2">
              {site.meta.siteName}
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              {site.meta.description}
            </p>
          </div>

          {/* Column B: Services */}
          <nav aria-label="Services navigation" className="footer-column">
            <h2 className="kicker">Services</h2>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.href}>
                  <SectionLink
                    href={service.href}
                    className="footer-link text-sm"
                    aria-label={`Learn more about ${service.label}`}
                  >
                    {service.label}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column C: Company */}
          <nav aria-label="Company navigation" className="footer-column">
            <h2 className="kicker">Company</h2>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <SectionLink
                    href={link.href}
                    className="footer-link text-sm"
                    aria-label={`Navigate to ${link.label} section`}
                  >
                    {link.label}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column D: Contact */}
          <div className="footer-column">
            <h2 className="kicker">Contact</h2>
            <div className="space-y-2">
              <a
                href={`mailto:${copy.connect.email}`}
                className="footer-link text-sm block"
                aria-label={`Send email to ${copy.connect.email}`}
              >
                {copy.connect.email}
              </a>
              <SectionLink
                href="#connect"
                className="footer-link text-sm"
                aria-label="Start a conversation with our team"
              >
                Start a Conversation
              </SectionLink>
            </div>
          </div>
        </div>

        {/* Footer meta */}
        <div className="rule-hairline mt-12"></div>
        <div className="text-center mt-6">
          <div className="text-xs text-midGray">
            © {currentYear} {site.meta.siteName}. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
}
