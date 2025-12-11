import { Container, Section } from "./Container";
import { useReveal } from "../hooks/useReveal";
import { partners } from "../content/turboai";

export function Partners() {
  const { addElement } = useReveal(60);

  // Duplicate brands array for seamless loop
  const brandsList = [...partners.brands, ...partners.brands];

  return (
    <Section
      id={partners.id}
      className="bg-white overflow-hidden"
      aria-labelledby="partners-heading"
    >
      <Container>
        <div className="text-center mb-8">
          <h2
            id="partners-heading"
            ref={addElement}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-charcoal"
          >
            {partners.heading}
          </h2>
          <p
            ref={addElement}
            className="text-lg md:text-xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed"
          >
            {partners.lead}
          </p>
        </div>

        <div ref={addElement} className="relative">
          <style>{`
            @keyframes marquee {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .marquee-container {
              animation: marquee 20s linear infinite;
            }
            .marquee-container:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="flex marquee-container">
            {brandsList.map((brand, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center px-8 md:px-12 flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="h-12 md:h-16 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
