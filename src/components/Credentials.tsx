import { Container, Section, Divider } from "./Container";
import { useReveal } from "../hooks/useReveal";
import { copy } from "../content/turboai";
import StatNumber from "./StatNumber";

export function Credentials() {
  const { addElement } = useReveal(60);

  return (
    <Section id={copy.credentials.id}>
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Intro */}
          <div className="text-center mb-16">
            <p
              ref={addElement}
              className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed"
            >
              {copy.credentials.intro}
            </p>
          </div>

          {/* Stats */}
          <div className="mb-12 sm:mb-16">
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {copy.credentials.stats.map((stat, index) => (
                <div key={index} ref={addElement} className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-emeraldNeon stat-number mb-3 sm:mb-4">
                    <StatNumber
                      value={stat.value}
                      delayMs={index * 120}
                      className="font-bold"
                    />
                  </div>
                  <div className="text-base sm:text-lg text-white/80 uppercase tracking-wider opacity-75">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Animated divider */}
          <div ref={addElement} className="mb-16">
            <Divider animate />
          </div>

          {/* Endorsements */}
          <div className="text-center">
            <p
              ref={addElement}
              className="text-lg text-midGray max-w-3xl mx-auto leading-relaxed"
            >
              {copy.credentials.endorsements}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
