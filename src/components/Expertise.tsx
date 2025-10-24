import { Container, Section } from "./Container";
import { SectionLink } from "./SectionLink";
import { useReveal } from "../hooks/useReveal";
import { copy } from "../content/turboai";

export function Expertise() {
  const { addElement } = useReveal(60);

  return (
    <Section id={copy.expertise.id} className="bg-charcoalDeep/30">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2
              ref={addElement}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
            >
              {copy.expertise.heading}
            </h2>
            <p
              ref={addElement}
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
            >
              {copy.expertise.intro}
            </p>
          </div>

          {/* Expertise items */}
          <div className="mb-16">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
              {copy.expertise.items.map((item) => (
                <section
                  key={item.id}
                  id={`expertise-${item.slug}`}
                  ref={addElement}
                  className="expertise-item flex flex-col sm:flex-row gap-4 sm:gap-6 scroll-mt-header text-center sm:text-left"
                >
                  {/* Number */}
                  <div className="flex-shrink-0 self-center sm:self-start">
                    <span className="text-xl sm:text-2xl font-mono text-emeraldTint">
                      {item.id}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-semibold text-emeraldNeon mb-3 sm:mb-4">
                      {item.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed text-base sm:text-lg">
                      {item.body}
                    </p>
                  </div>
                </section>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div ref={addElement}>
              <SectionLink
                href={copy.expertise.cta.href}
                className="cta-link text-lg"
              >
                {copy.expertise.cta.label}
              </SectionLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
