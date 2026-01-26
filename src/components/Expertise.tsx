import { Container, Section } from "./Container";
import { SectionLink } from "./SectionLink";
import { useReveal } from "../hooks/useReveal";
import { copy } from "../content/turboai";

interface ExpertiseItem {
  id: string;
  slug?: string;
  title: string;
  body: string;
}

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
              {copy.expertise.items.map((item: ExpertiseItem) => (
                <section
                  key={item.id}
                  id={`expertise-${item.slug || item.id}`}
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
                    {"slug" in item ? (
                      <SectionLink
                        href={(item as any).slug}
                        className="group inline-block"
                        aria-label={`Learn more about ${item.title}`}
                      >
                        <h3 className="text-xl sm:text-2xl font-semibold text-emeraldNeon mb-3 sm:mb-4 group-hover:text-emeraldTint transition-colors duration-200 flex items-center gap-2 justify-center sm:justify-start">
                          {item.title}
                          <svg
                            className="w-5 h-5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </h3>
                      </SectionLink>
                    ) : (
                      <h3 className="text-xl sm:text-2xl font-semibold text-emeraldNeon mb-3 sm:mb-4">
                        {item?.title}
                      </h3>
                    )}
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
