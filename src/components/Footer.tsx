import { useState } from "react";
import { Container } from "./Container";
import { SectionLink } from "./SectionLink";
import { Modal } from "./Modal";
import { PrivacyPolicyContent, TermsOfUseContent } from "./LegalContent";
import { site, copy } from "../content/turboai";

export function Footer() {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
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
          <div className="footer-column">
            <h2 className="kicker">Services</h2>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-sm text-white/70">{service.label}</span>
                </li>
              ))}
            </ul>
          </div>

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
            <div className="space-y-4">
              <div className="space-y-2">
                <a
                  href={`mailto:${copy.connect.email}`}
                  className="footer-link text-sm block"
                  aria-label={`Send email to ${copy.connect.email}`}
                >
                  {copy.connect.email}
                </a>
                <a
                  href={`tel:${copy.connect.phone}`}
                  className="footer-link text-sm block"
                  aria-label={`Call us at ${copy.connect.phone}`}
                >
                  {copy.connect.phone}
                </a>
                <SectionLink
                  href="#connect"
                  className="footer-link text-sm"
                  aria-label="Start a conversation with our team"
                >
                  Start a Conversation
                </SectionLink>
              </div>
              <div className="text-sm text-white/70 leading-relaxed">
                <div className="font-semibold text-white/90">Light House Corporate Inc.</div>
                <div>330 – 5th Avenue SW</div>
                <div>Tower 1, Suite 1800</div>
                <div>Calgary, AB T2P 0L4</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer meta */}
        <div className="rule-hairline mt-12"></div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
          <div className="text-xs text-midGray">
            © {currentYear} {site.meta.siteName}. All rights reserved.
          </div>
          <div className="flex gap-6 text-xs">
            <button
              onClick={() => setIsPrivacyModalOpen(true)}
              className="text-midGray hover:text-white transition-colors duration-200"
              aria-label="Read our Privacy Policy"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setIsTermsModalOpen(true)}
              className="text-midGray hover:text-white transition-colors duration-200"
              aria-label="Read our Terms of Use"
            >
              Terms of Use
            </button>
          </div>
        </div>
      </Container>

      {/* Legal Modals */}
      <Modal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        title="Privacy Policy"
      >
        <PrivacyPolicyContent />
      </Modal>

      <Modal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        title="Terms of Use"
      >
        <TermsOfUseContent />
      </Modal>
    </footer>
  );
}
