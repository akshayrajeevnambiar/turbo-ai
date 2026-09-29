import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Container, Section } from "./Container";
import { SectionLink } from "./SectionLink";
import { SEO } from "./SEO";
import { Connect } from "./Connect";
import { EnergyStyleInsights, LandingFAQ } from "./LandingSEOSections";
import { useReveal } from "../hooks/useReveal";
import { blogPosts } from "../content/blog";
import type { Diagram, EnterprisePageContent } from "../content/enterprisePages";
import { seoConfig } from "../content/seo";
import { serviceLandingContent } from "../content/serviceLandingContent";
import { useCmsPage } from "../cms/hooks";

interface EnterprisePageProps {
  content: EnterprisePageContent;
  technologyLogos?: Record<string, string>;
  technologyLogoOnly?: string[];
  technologyBadges?: Record<string, string>;
}

const relatedByService: Record<string, { title: string; href: string; reason: string }[]> = {
  generativeAgenticAI: [
    { title: "Data Engineering & AI Foundations", href: "/data-engineering-ai-foundations", reason: "Ground assistants in reliable, governed sources." },
    { title: "AI Governance & Cybersecurity", href: "/ai-governance-cybersecurity", reason: "Define permissions, evaluation, and oversight." },
    { title: "Safe Knowledge Access for Healthcare Teams", href: "/blog/healthcare-ai-knowledge-access", reason: "See a bounded retrieval workflow in context." },
  ],
  dataFoundations: [
    { title: "i-Lakehouse", href: "/products/i-lakehouse", reason: "Explore the hybrid-native data platform approach." },
    { title: "Building Asset Intelligence for Energy Operations", href: "/blog/energy-ai-asset-intelligence-foundations", reason: "See how source quality shapes an operational decision." },
    { title: "Cloud Infrastructure & AI Compute", href: "/cloud-infrastructure-ai-compute", reason: "Plan where data and model workloads run." },
  ],
  aiEngineering: [
    { title: "Generative & Agentic AI", href: "/generative-ai-agentic-ai", reason: "Connect applications to governed AI workflows." },
    { title: "Technology & SaaS", href: "/industries/technology-saas", reason: "Apply engineering discipline to AI product delivery." },
    { title: "AI Governance & Cybersecurity", href: "/ai-governance-cybersecurity", reason: "Build controls into the release lifecycle." },
  ],
  governanceCybersecurity: [
    { title: "ADRS", href: "/products/adrs", reason: "See a controlled detection-to-response model." },
    { title: "Designing AI-Assisted Fraud Review", href: "/blog/financial-services-ai-fraud-review", reason: "Explore oversight in a risk workflow." },
    { title: "Generative & Agentic AI", href: "/generative-ai-agentic-ai", reason: "Apply permissions and review to AI systems." },
  ],
  cloudCompute: [
    { title: "DCI 360", href: "/products/dci-360", reason: "Explore infrastructure operating visibility." },
    { title: "Data Centre Capacity Intelligence", href: "/blog/data-centre-capacity-intelligence", reason: "Read about capacity decisions beyond dashboards." },
    { title: "Data Engineering & AI Foundations", href: "/data-engineering-ai-foundations", reason: "Connect infrastructure to reliable data movement." },
  ],
  enterpriseSolutions: [
    { title: "Manufacturing", href: "/industries/manufacturing", reason: "See predictive maintenance in an operating context." },
    { title: "Insurance", href: "/industries/insurance", reason: "Explore governed document workflows." },
    { title: "Supply Chain & Logistics", href: "/industries/supply-chain-logistics", reason: "Apply decision support to exceptions." },
  ],
};

function DiagramCard({ diagram }: { diagram: Diagram }) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#07111F] p-5 shadow-xl">
      <div className="mb-5">
        <h3 className="text-xl font-bold text-white">{diagram.title}</h3>
        {diagram.subtitle && <p className="mt-1 text-sm text-slate-400">{diagram.subtitle}</p>}
      </div>
      <div className="flex flex-col gap-3">
        {diagram.steps.map((step, index) => (
          <div key={`${diagram.title}-${step}`} className="flex items-center gap-3">
            <div className="flex min-h-11 flex-1 items-center rounded-md border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-white">
              {step}
            </div>
            {index < diagram.steps.length - 1 && (
              <div className="hidden h-px w-8 bg-gradient-to-r from-blue-400 to-cyan-300 sm:block" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function LatestPerspectives() {
  const recentPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <Section className="bg-[#07111F] border-y border-white/5">
      <Container>
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="kicker text-blue-300">Latest Perspectives</p>
            <h2 className="text-3xl font-bold text-white md:text-5xl">Insights for enterprise AI leaders</h2>
          </div>
          <Link to="/blog" className="cta-link justify-start sm:justify-center">
            View all insights
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group rounded-lg border border-white/10 bg-black/25 p-5 transition hover:-translate-y-1 hover:border-blue-400/40"
            >
              <time dateTime={post.date} className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                {new Date(post.date).toLocaleDateString("en-CA", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
              <h3 className="mt-3 text-xl font-bold text-white transition group-hover:text-blue-300">{post.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function EnterprisePage({ content, technologyLogos, technologyLogoOnly, technologyBadges }: EnterprisePageProps) {
  const cms = useCmsPage();
  const { addElement } = useReveal(40);
  const journey = serviceLandingContent[content.seoKey];
  const siteUrl = import.meta.env.VITE_BASE_URL || "https://turbo-ai.ca";
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: content.title, item: seoConfig[content.seoKey].url },
    ],
  };

  return (
    <main className="bg-[#020617] text-white" role="main">
      <SEO pageKey={content.seoKey} />
      <Helmet><script type="application/ld+json">{JSON.stringify(breadcrumb)}</script></Helmet>

      <section className="relative min-h-[720px] overflow-hidden pt-28">
        <img
          src={cms?.hero_image || content.heroImage}
          alt={content.heroAlt}
          className="absolute inset-0 h-full w-full object-cover opacity-45"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/88 to-[#020617]/45" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(59,130,246,0.20),transparent_36%,rgba(45,212,191,0.10))]" />

        <Container className="relative z-10 flex min-h-[600px] items-center">
          <div className="max-w-4xl">
            <p className="kicker text-blue-200">
              {content.eyebrow}
            </p>
            <h1
              className="text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-7xl"
            >
              {cms?.hero_title || content.title}
            </h1>
            <p className="mt-5 max-w-3xl text-2xl font-semibold leading-snug text-blue-200 md:text-3xl">
              {cms?.hero_description || content.subtitle}
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-200 md:text-xl">
              {cms?.summary || content.intro}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <SectionLink
                href={cms?.cta_url || "#connect"}
                className="inline-flex min-h-12 items-center rounded-md bg-blue-500 px-6 py-3 font-bold text-white shadow-[0_0_28px_rgba(59,130,246,0.35)] transition hover:bg-blue-400"
              >
                {cms?.cta_text || "Schedule a Consultation"}
              </SectionLink>
              <SectionLink
                href="/products"
                className="inline-flex min-h-12 items-center rounded-md border border-white/20 px-6 py-3 font-bold text-white transition hover:border-blue-300 hover:text-blue-200"
              >
                View Platforms
              </SectionLink>
            </div>
          </div>
        </Container>
      </section>

      {journey && (
        <>
          <Section className="border-y border-white/10 bg-[#050B16]"><Container><div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="kicker text-cyan-200">Service Overview</p><h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">What this service enables</h2></div><p className="text-lg leading-relaxed text-slate-300">{journey.overview}</p></div></Container></Section>
          <Section className="bg-[#020617]"><Container><p className="kicker text-blue-300">Business and Technical Challenges</p><h2 className="mt-3 max-w-3xl text-3xl font-bold text-white md:text-5xl">What prevents useful AI from reaching operation</h2><div className="mt-10 grid gap-6 md:grid-cols-3">{journey.challenges.map((item) => <article key={item.title} className="border-t border-blue-400/50 pt-5"><h3 className="text-xl font-bold text-white">{item.title}</h3><p className="mt-3 leading-relaxed text-slate-300">{item.body}</p></article>)}</div></Container></Section>
          <Section className="border-y border-white/10 bg-[#0b192a]"><Container><div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="kicker text-cyan-200">The Opportunity</p><h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">Where technology creates practical value</h2></div><p className="text-lg leading-relaxed text-slate-200">{journey.opportunity}</p></div></Container></Section>
        </>
      )}

      {content.diagrams && (
        <Section className="bg-[#020617] border-y border-white/5">
          <Container>
            <div className="mb-10 max-w-3xl">
              <p className="kicker text-blue-300">Architecture</p>
              <h2 className="text-3xl font-bold text-white md:text-5xl">How the system connects</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {content.diagrams.map((diagram) => (
                <DiagramCard key={diagram.title} diagram={diagram} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section className="bg-[#050B16]">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {content.blocks.map((block) => (
              <article
                key={block.title}
                ref={addElement}
                className="rounded-lg border border-white/10 bg-[#07111F] p-6 shadow-xl transition hover:border-blue-400/35 md:p-8"
              >
                {block.image && (
                  <img
                    src={block.image}
                    alt={block.imageAlt || ""}
                    className="mb-6 aspect-[16/9] w-full rounded-md object-cover"
                    loading="lazy"
                  />
                )}
                {block.eyebrow && <p className="kicker text-cyan-200">{block.eyebrow}</p>}
                <h2 className="text-2xl font-bold text-white md:text-3xl">{block.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-slate-300">{block.body}</p>
                {block.items && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {block.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-medium text-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {content.detailSections?.map((section) => (
        <Section key={section.title} className="border-t border-white/10 bg-[#07111F]">
          <Container>
            <div className="mb-10 max-w-3xl">
              {section.eyebrow && <p className="kicker text-cyan-200">{section.eyebrow}</p>}
              <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">{section.title}</h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-300">{section.intro}</p>
            </div>
            <div className="grid gap-x-8 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item, index) => (
                <article key={item.title} className="border-t border-blue-400/40 pt-5">
                  <p className="text-xs font-bold text-cyan-300">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.body}</p>
                </article>
              ))}
            </div>
          </Container>
        </Section>
      ))}

      {journey && (
        <>
          <Section className="border-t border-white/10 bg-[#020617]"><Container><p className="kicker text-cyan-200">Practical Use Cases</p><h2 className="mt-3 max-w-3xl text-3xl font-bold text-white md:text-5xl">Apply the capability to a defined workflow</h2><div className="mt-10 grid gap-7 md:grid-cols-2">{journey.useCases.map((item) => <article key={item.title} className="border-l-2 border-cyan-400 pl-5"><h3 className="text-xl font-bold text-white">{item.title}</h3><p className="mt-3 leading-relaxed text-slate-300">{item.body}</p></article>)}</div></Container></Section>
          <Section className="border-y border-white/10 bg-[#07111F]"><Container><p className="kicker text-blue-300">Delivery Approach</p><h2 className="mt-3 max-w-3xl text-3xl font-bold text-white md:text-5xl">From operating problem to maintained capability</h2><ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{journey.process.map((item, index) => <li key={item.title} className="border-t border-blue-400/50 pt-5"><span className="text-xs font-bold text-cyan-200">0{index + 1}</span><h3 className="mt-3 text-xl font-bold text-white">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-300">{item.body}</p></li>)}</ol></Container></Section>
          <Section className="bg-[#020617]"><Container><div className="grid gap-12 lg:grid-cols-2"><div><p className="kicker text-cyan-200">Business Outcomes</p><h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">Value the organization can operate</h2><ul className="mt-8 space-y-4">{journey.outcomes.map((outcome) => <li key={outcome} className="border-l-2 border-cyan-400 pl-4 text-lg text-slate-200">{outcome}</li>)}</ul></div><div><p className="kicker text-blue-300">Why Turbo AI</p><h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">Strategy connected to production engineering</h2><div className="mt-8 space-y-5">{journey.why.map((item) => <article key={item.title} className="border-t border-blue-400/40 pt-4"><h3 className="text-xl font-bold text-white">{item.title}</h3><p className="mt-2 leading-relaxed text-slate-300">{item.body}</p></article>)}</div></div></div></Container></Section>
        </>
      )}

      {content.technologies && (
        <Section className="bg-[#020617] border-t border-white/5">
          <Container>
            <div className={technologyLogos || technologyBadges ? "space-y-8" : "grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"}>
              <div className={technologyLogos || technologyBadges ? "max-w-3xl" : undefined}>
                <p className="kicker text-blue-300">Technology Ecosystem</p>
                <h2 className="text-3xl font-bold text-white md:text-5xl">Selective, practical technology alignment</h2>
                <p className="mt-4 text-slate-300">
                  These names identify relevant technologies and frameworks. They do not imply formal partnerships or certifications.
                </p>
              </div>
              <div className={`grid grid-cols-2 gap-3 ${technologyLogos ? "sm:grid-cols-3 lg:grid-cols-5" : technologyBadges ? "sm:grid-cols-4" : "sm:grid-cols-3"}`}>
                {content.technologies.map((technology) => (
                  <div
                    key={technology}
                    className={`flex min-w-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-4 text-center font-bold text-white ${technologyLogos ? "min-h-28 flex-col gap-3 py-4" : "min-h-20"}`}
                  >
                    {technologyLogos?.[technology] && (
                      <img src={technologyLogos[technology]} alt={`${technology} logo`} className={`h-11 w-full max-w-28 object-contain ${technology === "OpenAI" ? "brightness-0 invert" : ""}`} loading="lazy" />
                    )}
                    {!technologyLogoOnly?.includes(technology) && (
                      <span className={technologyBadges?.[technology] ?? "text-sm leading-tight"}>{technology}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {relatedByService[content.seoKey] && (
        <Section className="border-t border-white/10 bg-[#07111F]">
          <Container>
            <p className="kicker text-blue-300">Connected Work</p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">Explore related capabilities and applications</h2>
            <nav aria-label="Related capabilities and insights" className="mt-8 grid gap-6 md:grid-cols-3">
              {relatedByService[content.seoKey].map((link) => <SectionLink key={link.href} href={link.href} className="border-t border-blue-400/50 py-5 hover:text-blue-200"><h3 className="text-xl font-bold">{link.title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-300">{link.reason}</p></SectionLink>)}
            </nav>
          </Container>
        </Section>
      )}

      {journey && <LandingFAQ title={`${content.title} questions`} intro="Answers to common questions about scope, implementation, controls, and operational fit." items={journey.faqs} />}

      {journey && <EnergyStyleInsights slugs={journey.insightSlugs} title="From Our Blog" intro={`Practical guidance for the data, workflow, architecture, and governance decisions behind ${content.title.toLowerCase()}.`} />}

      <Section className="bg-gradient-to-r from-blue-950 via-[#051225] to-cyan-950">
        <Container>
          <div className="max-w-4xl">
            <p className="kicker text-blue-200">Next Step</p>
            <h2 className="text-3xl font-bold text-white md:text-5xl">{content.ctaTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-200">{content.ctaBody}</p>
            <SectionLink
              href="#connect"
              className="mt-8 inline-flex min-h-12 items-center rounded-md bg-white px-6 py-3 font-bold text-slate-950 transition hover:bg-blue-100"
            >
              Schedule a Consultation
            </SectionLink>
          </div>
        </Container>
      </Section>

      <Connect />
    </main>
  );
}

export { DiagramCard, LatestPerspectives };
