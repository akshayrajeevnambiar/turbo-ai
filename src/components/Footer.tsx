import { useState } from "react";
import { Container } from "./Container";
import { SectionLink } from "./SectionLink";
import { Modal } from "./Modal";
import { PrivacyPolicyContent, TermsOfUseContent } from "./LegalContent";
import { site, copy, blog } from "../content/turboai";

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
                <div className="font-semibold text-white/90">
                  Light House Corporate Inc.
                </div>
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
          <div className="flex items-center gap-6">
            {/* Social Media Links */}
            <div className="flex gap-4">
              {blog.posts.map((post, idx) => (
                <a
                  key={idx}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-midGray hover:text-emeraldNeon transition-colors duration-200"
                  aria-label={`Visit our ${post.platform} page (opens in new tab)`}
                  title={post.platform}
                >
                  {post.icon === 'linkedin' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )}
                  {post.icon === 'twitter' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  )}
                  {post.icon === 'facebook' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
            {/* Legal Links */}
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
