import { Container, Section } from "./Container";
import { SectionLink } from "./SectionLink";
import { useReveal } from "../hooks/useReveal";
import { about } from "../content/turboai";

export function About() {
  const { addElement } = useReveal(60);

  return (
    <Section id={about.id} className="bg-charcoalDeep/50">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12 sm:mb-16">
            <h2
              id="about-heading"
              ref={addElement}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8"
            >
              {about.heading}
            </h2>
            <p
              ref={addElement}
              className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
            >
              {about.lead}
            </p>
          </div>

          {/* Who we are */}
          <div className="mb-12 sm:mb-16">
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {about.who.map((item, index) => (
                <div
                  key={index}
                  ref={addElement}
                  className="text-center md:text-left"
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-emeraldNeon mb-3 sm:mb-4">
                    {item.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed text-sm sm:text-base">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Principles */}
          <div className="mb-12 sm:mb-16">
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {about.principles.map((item, index) => (
                <div
                  key={index}
                  ref={addElement}
                  className="text-center md:text-left"
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-emeraldNeon mb-3 sm:mb-4">
                    {item.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed text-sm sm:text-base">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership */}
          <div className="text-center mb-8 sm:mb-12">
            <p
              ref={addElement}
              className="text-base sm:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8"
            >
              {about.leadership}
            </p>

            {/* CTA */}
            <div ref={addElement}>
              <SectionLink
                href={about.cta.href}
                className="cta-link text-base sm:text-lg"
                aria-label="See our impact and client results"
              >
                {about.cta.label}
              </SectionLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
