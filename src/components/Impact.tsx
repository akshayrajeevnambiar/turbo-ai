import { Container, Section } from "./Container";
import { SectionLink } from "./SectionLink";
import { useReveal } from "../hooks/useReveal";
import { copy } from "../content/turboai";

export function Impact() {
  const { addElement } = useReveal(60);

  return (
    <Section id={copy.impact.id}>
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2
              ref={addElement}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16"
            >
              {copy.impact.heading}
            </h2>
          </div>

          {/* Case study card */}
          <div
            ref={addElement}
            className="border border-emeraldTint/20 rounded-lg p-8 md:p-12 mb-12 bg-charcoalDeep/30"
          >
            {/* Client & title */}
            <div className="mb-8">
              <div className="text-sm text-emeraldTint mb-2 uppercase tracking-wider">
                {copy.impact.case.client}
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-emeraldNeon">
                {copy.impact.case.title}
              </h3>
            </div>

            {/* Challenge */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-white mb-3">Challenge</h4>
              <p className="text-white/80 leading-relaxed">
                {copy.impact.case.challenge}
              </p>
            </div>

            {/* Solution */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-white mb-3">Solution</h4>
              <p className="text-white/80 leading-relaxed">
                {copy.impact.case.solution}
              </p>
            </div>

            {/* Impact */}
            <div>
              <h4 className="text-lg font-medium text-white mb-4">Impact</h4>
              <ul className="space-y-2">
                {copy.impact.case.impact.map((item, index) => (
                  <li key={index} className="flex items-center text-white/80">
                    <span className="w-2 h-2 bg-emeraldNeon rounded-full mr-3 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* More CTA */}
          <div className="text-center">
            <div ref={addElement}>
              <SectionLink
                href={copy.impact.moreCTA.href}
                className="cta-link text-lg"
              >
                {copy.impact.moreCTA.label}
              </SectionLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
