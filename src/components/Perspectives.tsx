import { Container, Section } from "./Container";
import { useReveal } from "../hooks/useReveal";
import { copy } from "../content/turboai";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
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
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-white/80 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
