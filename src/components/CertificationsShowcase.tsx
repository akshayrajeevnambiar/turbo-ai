import { frameworkLogos, frameworkLogoSheet } from "../content/certifications";
import { Container, Section } from "./Container";

export function CertificationsShowcase() {
  return (
    <Section id="certifications" className="border-y border-white/5">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h2 id="certifications-heading" className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Enterprise Compliance &amp; Frameworks</h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg">We build resilient AI systems aligned to global security and data governance benchmarks.</p>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:mt-16 lg:grid-cols-6 lg:gap-x-8" aria-label="Enterprise compliance frameworks">
          {Object.entries(frameworkLogos).map(([id, logo]) => {
            const [x, y, width, height] = logo.viewBox.split(" ").map(Number);
            const clipId = `framework-${id}-clip`;
            return (
              <li key={id} className="flex min-w-0 flex-col items-center text-center">
                <svg
                  viewBox={logo.viewBox}
                  role="img"
                  aria-label={logo.name}
                  width={144}
                  height={144}
                  preserveAspectRatio="xMidYMid meet"
                  className="h-32 w-full max-w-36 overflow-hidden sm:h-36"
                  style={{ filter: logo.filter }}
                >
                  <defs>
                    <clipPath id={clipId}>
                      <rect x={x} y={y} width={width} height={height} />
                    </clipPath>
                  </defs>
                  <image href={frameworkLogoSheet.src} width={frameworkLogoSheet.width} height={frameworkLogoSheet.height} clipPath={`url(#${clipId})`} />
                </svg>
                <p className="mt-5 text-sm font-medium leading-relaxed text-white/80 sm:text-base">{logo.name}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
