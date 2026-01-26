import { Container, Section } from "./Container";
import { useReveal } from "../hooks/useReveal";
import { copy } from "../content/turboai";
import { blogPosts } from "../content/blog";
import { Link } from "react-router-dom";

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

  // Sort posts by date (newest first) and take the top 3
  const recentPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

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
            {recentPosts.map((post) => (
              <article
                key={post.slug}
                ref={addElement}
                className="border-b border-emeraldTint/10 pb-8 last:border-b-0"
              >
                <div className="flex flex-col space-y-4">
                  {/* Date */}
                  <time
                    dateTime={post.date}
                    className="text-sm text-emeraldTint uppercase tracking-wider"
                  >
                    {formatDate(post.date)}
                  </time>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-semibold text-emeraldNeon leading-tight">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="hover:text-emeraldTint transition-colors duration-300"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-white/80 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="flex items-center space-x-2 text-sm">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-emeraldTint hover:text-emeraldNeon transition-colors duration-300 font-medium inline-flex items-center gap-1 group"
                    >
                      Read Analysis
                      <svg
                        className="w-3 h-3 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-12 text-center" ref={addElement}>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 border border-emeraldTint/30 rounded-full text-emeraldTint hover:bg-emeraldTint/10 transition-colors duration-300 font-medium text-sm"
            >
              View All Insights
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
