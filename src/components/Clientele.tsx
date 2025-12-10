import { Container, Section } from "./Container";
import { useReveal } from "../hooks/useReveal";
import { clientele } from "../content/turboai";

export function Clientele() {
  const { addElement } = useReveal(60);

  return (
    <Section
      id={clientele.id}
      className="bg-charcoalDeep"
      aria-labelledby="clientele-heading"
    >
      <Container>
        <div className="text-center mb-16" ref={addElement}>
          <h2 id="clientele-heading" className="heading-xl mb-4">
            {clientele.heading}
          </h2>
          <p className="lead max-w-3xl mx-auto">{clientele.lead}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clientele.segments.map((segment, idx) => (
            <div
              key={idx}
              ref={addElement}
              className="bg-charcoal border border-emeraldTint/10 rounded-lg p-6 hover:border-emeraldTint/30 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-emeraldNeon mb-4">
                {segment.category}
              </h3>
              <ul className="space-y-2">
                {segment.clients.map((client, clientIdx) => (
                  <li key={clientIdx}>
                    <a
                      href={client.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-emeraldNeon transition-colors duration-200 text-sm flex items-center gap-2 group"
                      aria-label={`Visit ${client.name} website (opens in new tab)`}
                    >
                      <span className="w-1.5 h-1.5 bg-emeraldTint rounded-full group-hover:bg-emeraldNeon transition-colors"></span>
                      {client.name}
                      <svg
                        className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
