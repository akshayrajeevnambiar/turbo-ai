import { useEffect, useRef } from "react";
import { Container, Section, Divider } from "./Container";
import { SectionLink } from "./SectionLink";
import { useReveal } from "../hooks/useReveal";
import { copy } from "../content/turboai";

export function Hero() {
  const { addElement } = useReveal(60);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Add glow pulse animation to title on mount
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.classList.add("animate-glow-pulse");
    }
  }, []);

  return (
    <Section
      id={copy.hero.id}
      className="min-h-screen flex items-center justify-center relative pt-header"
      as="section"
    >
      <Container className="text-center">
        <div className="hero-content max-w-4xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Title */}
          <h1
            ref={(el) => {
              if (el) {
                titleRef.current = el;
                addElement(el);
              }
            }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold tracking-heading leading-tight px-4 sm:px-0"
          >
            {copy.hero.title}
          </h1>

          {/* Subhead */}
          <p
            ref={addElement}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
          >
            {copy.hero.subhead}
          </p>

          {/* Micro copy */}
          <p
            ref={addElement}
            className="text-sm sm:text-base md:text-lg text-midGray max-w-2xl mx-auto px-4 sm:px-0"
          >
            {copy.hero.micro}
          </p>

          {/* CTA */}
          <div ref={addElement} className="pt-2 sm:pt-4">
            <SectionLink
              href={copy.hero.cta.href}
              className="cta-link text-base sm:text-lg lg:text-xl inline-block px-6 py-3"
              aria-label="See our impact and case studies"
            >
              {copy.hero.cta.label}
            </SectionLink>
          </div>

          {/* Divider */}
          {copy.hero.divider && (
            <div
              ref={addElement}
              className="pt-6 sm:pt-8 lg:pt-12 max-w-md mx-auto px-4 sm:px-0"
            >
              <Divider animate />
            </div>
          )}
        </div>

        {/* Scroll cue */}
        <div className="scroll-cue" aria-hidden="true">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-bounce"
            role="img"
            aria-label="Scroll down indicator"
          >
            <path
              d="M7 10L12 15L17 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Container>
    </Section>
  );
}
