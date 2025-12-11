import { Container, Section } from "./Container";

export function TermsOfUse() {
  return (
    <Section className="bg-charcoal text-white py-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms & Conditions</h1>
          <div className="text-sm text-white/60 mb-12">
            Last updated: {new Date().toLocaleDateString()}
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-white/80 leading-relaxed">
                By accessing and using this website, you accept and agree to be
                bound by these Terms and Conditions. If you do not agree with any
                part of these terms, you must discontinue use of this website
                immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Permission is granted to temporarily access the materials on
                Turbo AI's website for personal, non-commercial, transitory
                viewing only. This is the grant of a license, not a transfer of
                title. Under this license, you may NOT:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2">
                <li>Modify or copy the materials;</li>
                <li>
                  Use the materials for any commercial purpose or any public
                  display;
                </li>
                <li>
                  Attempt to reverse engineer any software contained on the
                  website;
                </li>
                <li>
                  Remove any copyright or proprietary notices from the materials.
                </li>
              </ul>
              <p className="text-white/80 leading-relaxed mt-4">
                This license shall automatically terminate if you violate any of
                these restrictions and may be terminated by Turbo AI at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                3. Partner Client Logos and Third-Party Trademarks
              </h2>
              
              <h3 className="text-xl font-semibold mb-3 text-white/90">
                Authorized Use
              </h3>
              <p className="text-white/80 leading-relaxed mb-4">
                Turbo AI may display certain client names, trademarks, and logos
                ("Partner Client Logos") belonging to clients of our authorized
                technology partner. Such use is permitted only under a valid
                Non-Disclosure Agreement (NDA) or written authorization.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-white/90">
                Scope of Permission
              </h3>
              <p className="text-white/80 leading-relaxed mb-2">
                Partner Client Logos may be used in:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 mb-4">
                <li>Website pages;</li>
                <li>Marketing brochures;</li>
                <li>Presentations and capability materials;</li>
                <li>Other factual representations of capabilities or collaboration.</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-white/90">
                Ownership
              </h3>
              <p className="text-white/80 leading-relaxed mb-4">
                All Partner Client Logos remain the exclusive property of their
                respective owners.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-white/90">
                Compliance
              </h3>
              <p className="text-white/80 leading-relaxed mb-2">
                Turbo AI will use Partner Client Logos in compliance with:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 mb-4">
                <li>The Trademarks Act (Canada);</li>
                <li>Alberta and Canadian commercial and IP laws;</li>
                <li>NDA confidentiality terms.</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-white/90">
                Right to Withdraw
              </h3>
              <p className="text-white/80 leading-relaxed mb-4">
                A logo owner or technology partner may request removal at any time.
                Turbo AI will comply within a reasonable timeframe.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-white/90">
                No Endorsement
              </h3>
              <p className="text-white/80 leading-relaxed">
                Displaying a logo does not imply endorsement or partnership.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Disclaimer</h2>
              <p className="text-white/80 leading-relaxed">
                The materials on Turbo AI's website are provided on an "as is"
                basis. Turbo AI makes no warranties, expressed or implied.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Service Terms</h2>
              <p className="text-white/80 leading-relaxed">
                All professional services are governed by separate written
                agreements. Nothing on this website constitutes a service
                commitment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Limitations</h2>
              <p className="text-white/80 leading-relaxed">
                Turbo AI shall not be liable for any damages arising out of the
                use or inability to use this website, even if advised of potential
                damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Governing Law</h2>
              <p className="text-white/80 leading-relaxed">
                These Terms and Conditions are governed by the laws of Alberta and
                the applicable federal laws of Canada.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                8. Contact Information
              </h2>
              <p className="text-white/80 leading-relaxed">
                For questions, contact:{" "}
                <a
                  href="mailto:legal@turbo-ai.ca"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  legal@turbo-ai.ca
                </a>
              </p>
            </section>
          </div>
        </div>
      </Container>
    </Section>
  );
}
