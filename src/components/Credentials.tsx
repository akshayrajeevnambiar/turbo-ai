import { Container, Section, Divider } from "./Container";
import { useReveal } from "../hooks/useReveal";
import { copy } from "../content/turboai";
import StatNumber from "./StatNumber";

// Import logos
import nottinghamLogo from "../assets/university-of-nottingham_logo.png";
import iitbLogo from "../assets/iit-b_logo.png";

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
              className="text-lg text-midGray max-w-3xl mx-auto leading-relaxed mb-12"
            >
              {copy.credentials.endorsements}
            </p>

            {/* Premium Logo Section */}
            <div ref={addElement} className="mt-12">
              <h3 className="text-sm uppercase tracking-widest text-blue-300/80 mb-8 font-medium">
                Trusted By
              </h3>

              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16 max-w-4xl mx-auto">
                {/* University of Nottingham */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-400/30 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10">
                    <img
                      src={nottinghamLogo}
                      alt="University of Nottingham"
                      className="h-16 w-auto mx-auto object-contain filter brightness-90 hover:brightness-110 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* IIT Bombay */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-400/30 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10">
                    <img
                      src={iitbLogo}
                      alt="IIT Bombay"
                      className="h-16 w-auto mx-auto object-contain filter brightness-90 hover:brightness-110 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* British Embassy - Text Badge */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-8 py-6 hover:border-blue-400/30 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10">
                    <div className="text-center">
                      <div className="text-blue-300 text-xs uppercase tracking-wider font-medium mb-1">
                        British Embassy
                      </div>
                      <div className="text-white/90 text-sm font-semibold">
                        Entrepreneurship
                      </div>
                      <div className="text-blue-400/70 text-xs mt-1">
                        Recognition
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
