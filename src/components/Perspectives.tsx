import { Container, Section } from "./Container";
import { useReveal } from "../hooks/useReveal";
import { copy } from "../content/turboai";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function Perspectives() {
  const { addElement } = useReveal(60);

  return (
    <Section id={copy.perspectives.id} className="bg-charcoalDeep/50">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2
              ref={addElement}
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
            >
              {copy.perspectives.heading}
            </h2>
          </div>

          {/* Articles list */}
          <div className="space-y-12">
            {copy.perspectives.items.map((article) => (
              <article
                key={article.slug}
                ref={addElement}
                className="border-b border-emeraldTint/10 pb-8 last:border-b-0"
              >
                <div className="flex flex-col space-y-4">
                  {/* Date */}
                  <time
                    dateTime={article.date}
                    className="text-sm text-emeraldTint uppercase tracking-wider"
                  >
                    {formatDate(article.date)}
                  </time>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-semibold text-emeraldNeon leading-tight">
                    <a
                      href={article.source?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emeraldTint transition-colors duration-300"
                    >
                      {article.title}
                    </a>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-white/80 leading-relaxed">
                    {article.excerpt}
                  </p>

                  {/* Source */}
                  {article.source && (
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-white/60">Published in</span>
                      <a
                        href={article.source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emeraldTint hover:text-emeraldNeon transition-colors duration-300 font-medium"
                      >
                        {article.source.title}
                      </a>
                      <svg
                        className="w-3 h-3 text-emeraldTint/60"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
