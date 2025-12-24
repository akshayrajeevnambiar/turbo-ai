import { useEffect, useRef } from "react";
import { Section } from "./Container";
import { useReveal } from "../hooks/useReveal";
import { partners } from "../content/turboai";

export function PartnersMarqueeMobile() {
  const { addElement } = useReveal(60);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    let frame: number;
    let pos = 0;
    let isPaused = false;
    const speed = 0.3; // px per frame
    const contentWidth = content.scrollWidth;

    function animate() {
      if (!isPaused && content) {
        pos -= speed;
        if (Math.abs(pos) >= contentWidth / 2) {
          pos = 0;
        }
        content.style.transform = `translateX(${pos}px)`;
      }
      frame = requestAnimationFrame(animate);
    }
    animate();

    const handleMouseEnter = () => { isPaused = true; };
    const handleMouseLeave = () => { isPaused = false; };
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      cancelAnimationFrame(frame);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Duplicate brands for seamless effect
  const marqueeBrands = [...partners.brands, ...partners.brands];

  return (
    <Section
      id={partners.id + "-mobile"}
      className="bg-white !py-6 md:!py-8 block md:hidden"
      aria-labelledby="partners-heading-mobile"
    >
      <div className="text-center mb-6 md:mb-8">
        <h2
          id="partners-heading-mobile"
          ref={addElement}
          className="text-2xl font-bold mb-2 text-charcoal"
        >
          {partners.heading}
        </h2>
      </div>
      <div
        className="overflow-x-hidden"
        ref={containerRef}
        style={{ width: "100vw", marginLeft: "auto", marginRight: "auto" }}
      >
        <div
          ref={contentRef}
          className="flex whitespace-nowrap"
          style={{ willChange: "transform" }}
        >
          {marqueeBrands.map((brand, idx) => (
            <a
              key={idx}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-2"
              style={{ minWidth: 90 }}
              aria-label={`Visit ${brand.name} website`}
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="h-8 w-auto max-w-full object-contain"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
