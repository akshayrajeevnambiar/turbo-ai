import { Container, Section } from "./Container";

export function TermsOfUse() {
  return (
    <Section className="bg-charcoal text-white py-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms of Use</h1>
          <div className="text-sm text-white/60 mb-12">
            Last updated: {new Date().toLocaleDateString()}
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Acceptance of Terms
              </h2>
              <p className="text-white/80 leading-relaxed">
                By accessing and using this website, you accept and agree to be
                bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Use License</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Permission is granted to temporarily access the materials on
                Turbo AI's website for personal, non-commercial transitory
                viewing only. This is the grant of a license, not a transfer of
                title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2">
                <li>Modify or copy the materials</li>
                <li>
                  Use the materials for any commercial purpose or for any public
                  display
                </li>
                <li>
                  Attempt to reverse engineer any software contained on the
                  website
                </li>
                <li>
                  Remove any copyright or other proprietary notations from the
                  materials
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
              <p className="text-white/80 leading-relaxed">
                The materials on Turbo AI's website are provided on an 'as is'
                basis. Turbo AI makes no warranties, expressed or implied, and
                hereby disclaims and negates all other warranties including
                without limitation, implied warranties or conditions of
                merchantability, fitness for a particular purpose, or
                non-infringement of intellectual property or other violation of
                rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Service Terms</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Our professional services are provided under separate service
                agreements. This website and its terms do not constitute a
                service agreement or commitment to provide services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Limitations</h2>
              <p className="text-white/80 leading-relaxed">
                In no event shall Turbo AI or its suppliers be liable for any
                damages (including, without limitation, damages for loss of data
                or profit, or due to business interruption) arising out of the
                use or inability to use the materials on this website, even if
                Turbo AI or an authorized representative has been notified
                orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
              <p className="text-white/80 leading-relaxed">
                These terms and conditions are governed by and construed in
                accordance with the laws of the United Kingdom.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Contact Information
              </h2>
              <p className="text-white/80 leading-relaxed">
                If you have any questions about these Terms of Use, please
                contact us at:{" "}
                <a
                  href="mailto:legal@turbo-ai.co.uk"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  legal@turbo-ai.co.uk
                </a>
              </p>
            </section>
          </div>
        </div>
      </Container>
    </Section>
  );
}
