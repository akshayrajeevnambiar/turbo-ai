export const PrivacyPolicyContent = () => (
  <div className="prose prose-invert max-w-none space-y-6">
    <div className="text-sm text-white/60 mb-8">
      Last updated: {new Date().toLocaleDateString()}
    </div>

    <section>
      <h2 className="text-xl font-semibold mb-3 text-white">
        Information We Collect
      </h2>
      <p className="text-white/80 leading-relaxed mb-3">
        We collect information you provide directly to us, such as when you
        contact us through our website, request information about our services,
        or engage with our team.
      </p>
      <ul className="list-disc list-inside text-white/80 space-y-1 text-sm">
        <li>Contact information (name, email address, phone number)</li>
        <li>Company information and project requirements</li>
        <li>Communication preferences</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3 text-white">
        How We Use Your Information
      </h2>
      <p className="text-white/80 leading-relaxed mb-3">
        We use the information we collect to:
      </p>
      <ul className="list-disc list-inside text-white/80 space-y-1 text-sm">
        <li>Respond to your inquiries and provide requested information</li>
        <li>Communicate with you about our services</li>
        <li>Improve our website and services</li>
        <li>Comply with legal obligations</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3 text-white">
        Information Sharing
      </h2>
      <p className="text-white/80 leading-relaxed text-sm">
        We do not sell, trade, or otherwise transfer your personal information
        to third parties without your consent, except as described in this
        policy or as required by law.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3 text-white">Data Security</h2>
      <p className="text-white/80 leading-relaxed text-sm">
        We implement appropriate technical and organizational security measures
        to protect your personal information against unauthorized access,
        alteration, disclosure, or destruction.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3 text-white">Your Rights</h2>
      <p className="text-white/80 leading-relaxed mb-3 text-sm">
        You have the right to:
      </p>
      <ul className="list-disc list-inside text-white/80 space-y-1 text-sm">
        <li>Access your personal information</li>
        <li>Correct or update your information</li>
        <li>Request deletion of your information</li>
        <li>Opt out of marketing communications</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3 text-white">Contact Us</h2>
      <p className="text-white/80 leading-relaxed text-sm">
        If you have any questions about this Privacy Policy, please contact us
        at:{" "}
        <a
          href="mailto:privacy@turbo-ai.co.uk"
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          privacy@turbo-ai.co.uk
        </a>
      </p>
    </section>
  </div>
);

export const TermsOfUseContent = () => (
  <div className="prose prose-invert max-w-none space-y-6">
    <div className="text-sm text-white/60 mb-8">
      Last updated: {new Date().toLocaleDateString()}
    </div>

    <section>
      <h2 className="text-xl font-semibold mb-3 text-white">
        Acceptance of Terms
      </h2>
      <p className="text-white/80 leading-relaxed text-sm">
        By accessing and using this website, you accept and agree to be bound by
        the terms and provision of this agreement.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3 text-white">Use License</h2>
      <p className="text-white/80 leading-relaxed mb-3 text-sm">
        Permission is granted to temporarily access the materials on Turbo AI's
        website for personal, non-commercial transitory viewing only. This is
        the grant of a license, not a transfer of title, and under this license
        you may not:
      </p>
      <ul className="list-disc list-inside text-white/80 space-y-1 text-sm">
        <li>Modify or copy the materials</li>
        <li>
          Use the materials for any commercial purpose or for any public display
        </li>
        <li>
          Attempt to reverse engineer any software contained on the website
        </li>
        <li>
          Remove any copyright or other proprietary notations from the materials
        </li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3 text-white">Disclaimer</h2>
      <p className="text-white/80 leading-relaxed text-sm">
        The materials on Turbo AI's website are provided on an 'as is' basis.
        Turbo AI makes no warranties, expressed or implied, and hereby disclaims
        and negates all other warranties including without limitation, implied
        warranties or conditions of merchantability, fitness for a particular
        purpose, or non-infringement of intellectual property or other violation
        of rights.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3 text-white">Service Terms</h2>
      <p className="text-white/80 leading-relaxed text-sm">
        Our professional services are provided under separate service
        agreements. This website and its terms do not constitute a service
        agreement or commitment to provide services.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3 text-white">Limitations</h2>
      <p className="text-white/80 leading-relaxed text-sm">
        In no event shall Turbo AI or its suppliers be liable for any damages
        (including, without limitation, damages for loss of data or profit, or
        due to business interruption) arising out of the use or inability to use
        the materials on this website, even if Turbo AI or an authorized
        representative has been notified orally or in writing of the possibility
        of such damage.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3 text-white">Governing Law</h2>
      <p className="text-white/80 leading-relaxed text-sm">
        These terms and conditions are governed by and construed in accordance
        with the laws of the United Kingdom.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3 text-white">
        Contact Information
      </h2>
      <p className="text-white/80 leading-relaxed text-sm">
        If you have any questions about these Terms of Use, please contact us
        at:{" "}
        <a
          href="mailto:legal@turbo-ai.co.uk"
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          legal@turbo-ai.co.uk
        </a>
      </p>
    </section>
  </div>
);
