import { Container, Section } from "./Container";
import { useReveal } from "../hooks/useReveal";
import { partners } from "../content/turboai";

export function Partners() {
  const { addElement } = useReveal(60);

  return (
    <Section
      id={partners.id}
      className="bg-white !py-4 md:!py-6 overflow-hidden"
      aria-labelledby="partners-heading"
    >
      <Container>
        <div className="text-center mb-3 md:mb-4">
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
      </Container>

      <div ref={addElement} className="relative overflow-hidden w-full">
        <style>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-500px * ${partners.brands.length}));
            }
          }
          
          .scroll-container {
            display: flex;
            width: max-content;
            animation: scroll 80s linear infinite;
          }
          
          .scroll-container:hover {
            animation-play-state: paused;
          }
          
          @media (max-width: 768px) {
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(calc(-280px * ${partners.brands.length}));
              }
            }
            .scroll-container {
              animation: scroll 100s linear infinite;
            }
          }
        `}</style>

        <div className="flex py-2 md:py-3">
          <div className="scroll-container">
            {[...Array(4)].map((_, setIndex) => (
              <div key={setIndex} className="flex">
                {partners.brands.map((brand, idx) => (
                  <a
                    key={`${setIndex}-${idx}`}
                    href={brand.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-10 md:px-20 py-2 md:py-3 flex-shrink-0 transition-all duration-300 group"
                    style={{ width: "280px", minWidth: "280px" }}
                    aria-label={`Visit ${brand.name} website`}
                  >
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="h-14 md:h-20 w-auto max-w-full object-contain group-hover:scale-110 md:group-hover:scale-125 transition-transform duration-300"
                      loading="lazy"
                    />
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
