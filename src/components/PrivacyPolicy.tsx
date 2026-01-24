import { Container, Section } from "./Container";

export function PrivacyPolicy() {
  return (
    <Section className="bg-charcoal text-white py-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            Privacy Policy
          </h1>
          <div className="text-sm text-white/60 mb-12">
            Last updated: {new Date().toLocaleDateString()}
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Information We Collect
              </h2>
              <p className="text-white/80 leading-relaxed mb-4">
                We collect information you provide directly to us, such as when
                you contact us through our website, request information about
                our services, or engage with our team.
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2">
                <li>Contact information (name, email address, phone number)</li>
                <li>Company information and project requirements</li>
                <li>Communication preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                How We Use Your Information
              </h2>
              <p className="text-white/80 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2">
                <li>
                  Respond to your inquiries and provide requested information
                </li>
                <li>Communicate with you about our services</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Information Sharing
              </h2>
              <p className="text-white/80 leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal
                information to third parties without your consent, except as
                described in this policy or as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="text-white/80 leading-relaxed">
                We implement appropriate technical and organizational security
                measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2">
                <li>Access your personal information</li>
                <li>Correct or update your information</li>
                <li>Request deletion of your information</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-white/80 leading-relaxed">
                If you have any questions about this Privacy Policy, please
                contact us at:{" "}
                <a
                  href="mailto:privacy@turbo-ai.ca"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  privacy@turbo-ai.ca
                </a>
              </p>
            </section>
          </div>
        </div>
      </Container>
    </Section>
  );
}
