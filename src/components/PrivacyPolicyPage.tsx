import { Container, Section } from "./Container";

export function PrivacyPolicyPage() {
  return (
    <Section className="bg-charcoal text-white py-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
          <div className="text-sm text-white/60 mb-12">
            Last Updated: October 30, 2025
          </div>
          
          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Welcome to Turbo AI Technologies Inc. ("Turbo AI," "we," "us," or "our").
                This Privacy Policy describes how we collect, use, disclose, and protect information across all of our products, websites, and services, including Turbo AI Labs, Seismic AI, and affiliated technology initiatives.
              </p>
              <p className="text-white/80 leading-relaxed mb-4">
                Turbo AI is a technology and AI research company based in Toronto, Ontario, Canada, focusing on AI infrastructure, software development, drone intelligence, and industrial automation.
                By accessing turbo-ai.ca or using our Services, you consent to this Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Scope</h2>
              <p className="text-white/80 leading-relaxed mb-4">This Policy applies to:</p>
              <ul className="list-disc list-inside text-white/80 space-y-2 mb-4">
                <li>Visitors accessing turbo-ai.ca and other Turbo AI-managed domains.</li>
                <li>Clients using Turbo AI's software platforms, APIs, or SaaS dashboards.</li>
                <li>Partners, affiliates, and research collaborators engaged with Turbo AI projects.</li>
              </ul>
              <p className="text-white/80 leading-relaxed">
                It does not apply to anonymized or aggregated data or to third-party websites linked from our pages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-blue-400">a) Personal Information</h3>
              <ul className="list-disc list-inside text-white/80 space-y-2 mb-4">
                <li>Name, company name, professional title, and contact details.</li>
                <li>Login credentials for any client dashboards.</li>
                <li>Communication records, meeting logs, or business proposals.</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-blue-400">b) Technical Information</h3>
              <ul className="list-disc list-inside text-white/80 space-y-2 mb-4">
                <li>IP address, browser type, device ID, and session timestamps.</li>
                <li>Website analytics, cookies, and heat-map data to optimize site performance.</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-blue-400">c) Operational Data</h3>
              <p className="text-white/80 leading-relaxed mb-4">
                When you use our software (e.g., Turbo AI cloud systems, APIs, or tools like Seismic AI), we may collect logs, API usage, performance metrics, and other non-personal operational data for analytics and maintenance.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-blue-400">d) Payment Information</h3>
              <p className="text-white/80 leading-relaxed">
                If you purchase or subscribe to a Turbo AI service, payment information is handled through secure third-party gateways. Turbo AI does not store raw credit-card data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. How We Use Information</h2>
              <p className="text-white/80 leading-relaxed mb-4">We use collected data to:</p>
              <ul className="list-disc list-inside text-white/80 space-y-2 mb-4">
                <li>Provide, maintain, and improve our products and Services.</li>
                <li>Manage client relationships, billing, and communications.</li>
                <li>Conduct analytics and research to improve system performance.</li>
                <li>Protect against unauthorized use, fraud, and security risks.</li>
                <li>Comply with applicable legal obligations and corporate governance standards.</li>
              </ul>
              <p className="text-white/80 leading-relaxed">
                We do not sell personal data. We may use anonymized data to improve algorithms or system insights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Cookies and Tracking</h2>
              <p className="text-white/80 leading-relaxed">
                Turbo AI uses cookies and similar technologies to authenticate sessions, analyze website usage, and personalize user experience.
                You can modify your browser settings to disable non-essential cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Data Sharing</h2>
              <p className="text-white/80 leading-relaxed mb-4">Turbo AI may share limited information with:</p>
              <ul className="list-disc list-inside text-white/80 space-y-2 mb-4">
                <li>Affiliated companies (e.g., Seismic AI, IntBrains) for research or joint projects.</li>
                <li>Service providers (e.g., AWS, Vercel, Google Cloud) for hosting and data processing.</li>
                <li>Legal authorities, when required by law.</li>
              </ul>
              <p className="text-white/80 leading-relaxed">
                All partners operate under strict data-protection contracts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Data Storage, Transfers, and Retention</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Data is securely stored in Canadian and international cloud environments compliant with ISO 27001, SOC 2, and GDPR standards.
                If data is transferred abroad, equivalent safeguards such as Standard Contractual Clauses (SCCs) are applied.
              </p>
              <p className="text-white/80 leading-relaxed">
                We retain data only as long as necessary for contractual, operational, or legal reasons.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Security</h2>
              <p className="text-white/80 leading-relaxed mb-4">We employ industry-grade protections:</p>
              <ul className="list-disc list-inside text-white/80 space-y-2 mb-4">
                <li>AES-256 encryption at rest, TLS 1.3 in transit.</li>
                <li>Network segmentation, access controls, and logging.</li>
                <li>Regular security audits and vulnerability scanning.</li>
              </ul>
              <p className="text-white/80 leading-relaxed">
                Despite these safeguards, no system is 100% secure, and we cannot guarantee absolute protection.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Your Rights</h2>
              <p className="text-white/80 leading-relaxed mb-4">Depending on your jurisdiction, you have the right to:</p>
              <ul className="list-disc list-inside text-white/80 space-y-2 mb-4">
                <li>Access and obtain a copy of your personal data.</li>
                <li>Correct inaccuracies.</li>
                <li>Request deletion or restriction of processing.</li>
                <li>Withdraw consent for optional uses.</li>
              </ul>
              <p className="text-white/80 leading-relaxed">
                Requests can be made to{" "}
                <a 
                  href="mailto:privacy@turbo-ai.ca" 
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  privacy@turbo-ai.ca
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Children's Privacy</h2>
              <p className="text-white/80 leading-relaxed">
                Turbo AI Services are intended for professional users. We do not knowingly collect data from minors under 18.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Changes to this Policy</h2>
              <p className="text-white/80 leading-relaxed">
                We may update this Policy periodically. The latest version will always appear at{" "}
                <a 
                  href="https://turbo-ai.ca/privacy-policy" 
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  https://turbo-ai.ca/privacy-policy
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Contact</h2>
              <div className="text-white/80 leading-relaxed">
                <p className="mb-2">Turbo AI Technologies Inc.</p>
                <p className="mb-2">Toronto, Ontario, Canada</p>
                <p>
                  Email:{" "}
                  <a 
                    href="mailto:support@turbo-ai.ca" 
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    support@turbo-ai.ca
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </Section>
  );
}