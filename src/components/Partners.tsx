import { Container, Section } from "./Container";
import { useReveal } from "../hooks/useReveal";
import { partners } from "../content/turboai";

export function Partners() {
  const { addElement } = useReveal(60);

  return (
    <Section
      id={partners.id}
      className="bg-white"
      aria-labelledby="partners-heading"
    >
      <Container>
        <div className="text-center mb-16">
          <h2
            id="partners-heading"
            ref={addElement}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-charcoal"
          >
            {partners.heading}
          </h2>
          <p
            ref={addElement}
            className="text-xl md:text-2xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed"
          >
            {partners.lead}
          </p>
        </div>

        <div
          ref={addElement}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 items-center"
        >
          {partners.brands.map((brand, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="max-h-16 md:max-h-20 w-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
