import { Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Container, Section } from "../components/Container";
import { Connect } from "../components/Connect";
import { LandingFAQ, RelatedInsights } from "../components/LandingSEOSections";
import { SectionLink } from "../components/SectionLink";
import { SEO } from "../components/SEO";
import { industriesWeServe } from "../content/enterprisePages";
import { industryJourneyAdditions, industryLandingContent } from "../content/industryLandingContent";
import { useCmsPage } from "../cms/hooks";
import { CmsContent } from "../cms/CmsContentPage";
import { CmsExtraContent } from "../cms/CmsExtraContent";

export function IndustryDetail() {
  const cms = useCmsPage();
  const { slug } = useParams();
  const industry = industriesWeServe.find((item) => item.href === `/industries/${slug}`);
  const content = slug ? industryLandingContent[slug] : undefined;
  const addition = slug ? industryJourneyAdditions[slug] : undefined;

  if ((!industry || !content || !addition) && cms) return <CmsContent entry={cms} />;
  if (!industry || !content || !addition) return <Navigate to="/industries-we-serve" replace />;

  const title = `AI for ${industry.name} | Turbo AI`;
  const siteUrl = import.meta.env.VITE_BASE_URL || "https://turbo-ai.ca";
  const url = `${siteUrl}${industry.href}`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Industries We Serve", item: `${siteUrl}/industries-we-serve` },
      { "@type": "ListItem", position: 3, name: industry.name, item: url },
    ],
  };

  return (
    <main className="bg-[#020617] text-white">
      <SEO title={title} description={content.intro} image={new URL(industry.image, siteUrl).href} url={url} keywords={`${industry.name}, enterprise AI, data engineering, operational intelligence`} />
      <Helmet><script type="application/ld+json">{JSON.stringify(breadcrumb)}</script></Helmet>
      <section className="relative min-h-[640px] overflow-hidden pt-28">
        <img src={cms?.hero_image || industry.image} alt={industry.alt} className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/90 to-[#020617]/35" />
        <Container className="relative z-10 flex min-h-[520px] items-center">
          <div className="max-w-4xl">
            <p className="kicker text-blue-200">Industries We Serve</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl md:text-7xl">{cms?.hero_title || `AI for ${industry.name}`}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-200 md:text-xl">{cms?.hero_description || content.intro}</p>
            <div className="mt-8 flex flex-wrap gap-4"><SectionLink href={cms?.cta_url || "#connect"} className="inline-flex min-h-12 items-center rounded-md bg-blue-500 px-6 py-3 font-bold text-white transition hover:bg-blue-400">{cms?.cta_text || content.cta}</SectionLink><SectionLink href="/industries-we-serve" className="inline-flex min-h-12 items-center rounded-md border border-white/30 px-6 py-3 font-bold text-white transition hover:border-blue-300">View all industries</SectionLink></div>
          </div>
        </Container>
      </section>

      <CmsExtraContent entry={cms} />

      <Section className="border-y border-white/10 bg-[#050B16]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="kicker text-cyan-200">Operating Context</p>
              <h2 className="mt-3 text-3xl font-bold md:text-5xl">Make industry data useful in the workflow.</h2>
            </div>
            <p className="text-lg leading-relaxed text-slate-300">{industry.foundation}</p>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#020617]">
        <Container>
          <p className="kicker text-blue-300">Industry Challenges</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold md:text-5xl">Where {industry.name.toLowerCase()} teams face friction</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {content.challenges.map((challenge) => <article key={challenge.title} className="border-t border-blue-400/50 pt-5"><h3 className="text-xl font-bold">{challenge.title}</h3><p className="mt-3 leading-relaxed text-slate-300">{challenge.body}</p></article>)}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-white/10 bg-[#0b192a]"><Container><div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="kicker text-cyan-200">The AI Opportunity</p><h2 className="mt-3 text-3xl font-bold md:text-5xl">Why intelligence matters here</h2></div><p className="text-lg leading-relaxed text-slate-200">{addition.opportunity}</p></div></Container></Section>

      <Section className="border-y border-white/10 bg-[#07111F]">
        <Container>
          <div className="mb-10 max-w-3xl">
            <p className="kicker text-blue-300">Industry AI Solutions</p>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">How intelligence fits the work</h2>
            <p className="mt-4 text-slate-300">Each approach starts with a defined problem, relevant data, and a person accountable for the outcome.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {content.solutions.map((solution, index) => (
              <article key={solution.title} className="border-t-2 border-cyan-400 bg-[#0b192a] p-6">
                <p className="text-xs font-bold text-cyan-200">0{index + 1}</p>
                <h3 className="mt-4 text-xl font-bold">{solution.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-300">{solution.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#020617]"><Container><p className="kicker text-cyan-200">Practical Use Cases</p><h2 className="mt-3 max-w-3xl text-3xl font-bold md:text-5xl">From signal to a reviewable action</h2><div className="mt-10 grid gap-8 md:grid-cols-2">{content.useCases.map((useCase) => <article key={useCase.title} className="border-l-2 border-cyan-400 pl-5"><h3 className="text-xl font-bold">{useCase.title}</h3><p className="mt-3 leading-relaxed text-slate-300">{useCase.body}</p></article>)}</div></Container></Section>

      <Section className="border-y border-white/10 bg-[#07111F]"><Container><div className="grid gap-12 lg:grid-cols-2"><div><p className="kicker text-blue-300">Delivery Approach</p><h2 className="mt-3 text-3xl font-bold md:text-5xl">A bounded path into operation</h2><ol className="mt-8 space-y-5">{[
        ["Define the decision", `Select one ${industry.name.toLowerCase()} workflow, its accountable owner, and the evidence required for action.`],
        ["Prepare the foundation", "Connect the minimum relevant sources, document quality and permissions, and establish a baseline for the current process."],
        ["Validate with users", "Test recommendations or assistance inside the real workflow, capture corrections, and evaluate useful outcomes and failure modes."],
        ["Operate and improve", "Release with monitoring, escalation, ownership, and a controlled route to update data, models, and process rules."],
      ].map(([step, body], index) => <li key={step} className="border-t border-blue-400/40 pt-4"><span className="text-xs font-bold text-cyan-200">0{index + 1}</span><h3 className="mt-2 text-lg font-bold">{step}</h3><p className="mt-2 leading-relaxed text-slate-300">{body}</p></li>)}</ol></div><div><p className="kicker text-cyan-200">Technology Enablement</p><h2 className="mt-3 text-3xl font-bold md:text-5xl">How the solution connects</h2><p className="mt-6 text-lg leading-relaxed text-slate-300">{addition.technology}</p><div className="mt-8 grid grid-cols-2 gap-3">{["Governed sources", "Data products", "AI and analytics", "Human workflow"].map((label, index) => <div key={label} className="border border-white/10 bg-white/[0.04] p-4"><span className="text-xs font-bold text-blue-300">0{index + 1}</span><strong className="mt-2 block">{label}</strong></div>)}</div></div></div></Container></Section>

      <Section className="border-y border-white/10 bg-[#07111F]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="kicker text-blue-300">Enterprise Value</p>
              <h2 className="mt-3 text-3xl font-bold md:text-5xl">From signals to better decisions</h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-300">{industry.outcome}</p>
              <ul className="mt-5 space-y-3 text-slate-200">{content.outcomes.map((outcome) => <li key={outcome} className="border-l-2 border-blue-400 pl-4">{outcome}</li>)}</ul>
            </div>
            <div className="border-l border-blue-400/40 pl-6"><p className="kicker text-cyan-200">Why Turbo AI</p><h3 className="mt-3 text-2xl font-bold">Strategy connected to engineering and control</h3><p className="mt-4 leading-relaxed text-slate-300">Turbo AI brings data engineering, AI application delivery, cloud infrastructure, security, and governance into one implementation path. We begin with the operating decision, work with existing systems, and keep human responsibility visible where risk or judgment matters.</p><p className="mt-4 leading-relaxed text-slate-300">The result is designed for production ownership: traceable inputs, evaluated behaviour, practical integrations, and a team that can improve the workflow after launch.</p></div>
          </div>
        </Container>
      </Section>
      <Section className="bg-[#020617]"><Container><p className="kicker text-blue-300">Related Services and Products</p><h2 className="mt-3 text-3xl font-bold md:text-5xl">Connect the operating need to the right capability</h2><nav aria-label="Related services and products" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[...content.services, ...content.products].map((link) => <SectionLink key={link.href} href={link.href} className="border-t border-blue-400/50 bg-white/[0.03] p-5 text-lg font-semibold text-blue-200 hover:bg-white/[0.06] hover:text-white">{link.title}</SectionLink>)}</nav></Container></Section>
      <LandingFAQ title={`AI in ${industry.name}`} intro={`Practical questions organizations ask when evaluating AI for ${industry.name.toLowerCase()}.`} items={content.faqs} />
      <RelatedInsights slugs={content.insights.map((insight) => insight.href.split("/").pop() || "")} title={`Insights for ${industry.name.toLowerCase()} leaders`} intro="Read practical guidance connected to the data, workflow, and governance decisions on this page." />
      <Section className="border-t border-white/10 bg-[#0b1b31]"><Container><p className="kicker text-cyan-200">Next Step</p><h2 className="mt-3 max-w-3xl text-3xl font-bold md:text-5xl">{content.cta}</h2><p className="mt-4 max-w-2xl text-slate-300">Bring a specific operational question, data challenge, or workflow. We can help define a bounded starting point.</p><SectionLink href="#connect" className="mt-7 inline-flex min-h-12 items-center rounded-md bg-blue-500 px-6 py-3 font-bold text-white hover:bg-blue-400">Start a conversation</SectionLink></Container></Section>
      <Connect />
    </main>
  );
}
