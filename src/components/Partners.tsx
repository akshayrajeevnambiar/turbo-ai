import { Container, Section } from "./Container";
import { useReveal } from "../hooks/useReveal";
import { partners } from "../content/turboai";

export function Partners() {
  const { addElement } = useReveal(60);

  return (
    <Section
      id={partners.id}
      className="bg-white !py-6 md:!py-8"
      aria-labelledby="partners-heading"
    >
      <Container>
        <div className="text-center mb-6 md:mb-8">
          <h2
            id="partners-heading"
            ref={addElement}
            className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 text-charcoal"
          >
            {partners.heading}
          </h2>
          <p
            ref={addElement}
            className="text-base md:text-lg text-charcoal/70 max-w-2xl mx-auto px-4"
          >
            {partners.lead}
          </p>
        </div>

        <div
          ref={addElement}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 items-center justify-items-center"
        >
          {partners.brands.map((brand, idx) => (
            <a
              key={idx}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center p-2 transition-all duration-300 hover:scale-125"
              aria-label={`Visit ${brand.name} website`}
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="h-10 md:h-14 w-auto max-w-full object-contain transition-all duration-300"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </Container>
    </Section>
  );
}
