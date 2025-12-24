

import { useState } from "react";
import { Section } from "./Container";
import { useReveal } from "../hooks/useReveal";
import { partners } from "../content/turboai";

export function Partners() {
  const { addElement } = useReveal(60);
  const [isPaused, setIsPaused] = useState(false);
  const marqueeBrands = [...partners.brands, ...partners.brands];

  return (
    <Section
      id={partners.id}
      className="bg-white !py-6 md:!py-8"
      aria-labelledby="partners-heading"
    >
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

      {/* Edge-to-edge marquee, outside Container */}
      <div className="overflow-x-hidden">
        <div
          className={`hidden md:flex w-screen animate-marquee whitespace-nowrap${isPaused ? " paused" : ""}`}
          style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}
        >
          {marqueeBrands.map((brand, idx) => (
            <a
              key={idx}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center p-6 transition-all duration-300 min-w-[160px]"
              aria-label={`Visit ${brand.name} website`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="h-14 w-auto max-w-full object-contain transition-all duration-300"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
