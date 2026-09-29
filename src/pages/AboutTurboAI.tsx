import { Container, Section } from "../components/Container";
import { Connect } from "../components/Connect";
import { RelatedInsights } from "../components/LandingSEOSections";
import { SectionLink } from "../components/SectionLink";
import { SEO } from "../components/SEO";
import { aboutTurboAI } from "../content/enterprisePages";
import { useReveal } from "../hooks/useReveal";
import { useCmsPage } from "../cms/hooks";

export function AboutTurboAI() {
  const cms = useCmsPage();
  const { addElement } = useReveal(40);

  return (
    <main className="bg-[#020617] text-white" role="main">
      <SEO pageKey={aboutTurboAI.seoKey} />

      <section className="relative min-h-[680px] overflow-hidden pt-28">
        <img
          src={cms?.hero_image || aboutTurboAI.image}
          alt={aboutTurboAI.alt}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/90 to-[#020617]/45" />
        <Container className="relative z-10 flex min-h-[560px] items-center">
          <div className="max-w-4xl">
            <p className="kicker text-blue-200">
              {aboutTurboAI.eyebrow}
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-7xl">
              {cms?.hero_title || aboutTurboAI.title}
            </h1>
            <p className="mt-5 max-w-3xl text-2xl font-semibold leading-snug text-blue-200 md:text-3xl">
              {cms?.hero_description || aboutTurboAI.subtitle}
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-200">{cms?.summary || aboutTurboAI.introduction}</p>
          </div>
        </Container>
      </section>

      <Section className="bg-[#050B16]">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { label: "Mission", body: aboutTurboAI.mission },
              { label: "Vision", body: aboutTurboAI.vision },
              { label: "Approach", body: aboutTurboAI.approach, detail: aboutTurboAI.approachBody },
            ].map((item) => (
              <article key={item.label} ref={addElement} className="rounded-lg border border-white/10 bg-[#07111F] p-6 shadow-xl">
                <p className="kicker text-cyan-200">{item.label}</p>
                <h2 className="text-2xl font-bold text-white">{item.body}</h2>
                {item.detail && <p className="mt-4 leading-relaxed text-slate-300">{item.detail}</p>}
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#020617] border-y border-white/5">
        <Container>
          <div className="mb-10 max-w-3xl">
            <p className="kicker text-blue-300">Principles</p>
            <h2 className="text-3xl font-bold text-white md:text-5xl">How Turbo AI approaches enterprise technology</h2>
            <p className="mt-4 text-slate-300">
              Turbo AI is positioned around practical intelligence: strategy connected to delivery, data connected to decisions, and systems built with governance from the beginning.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aboutTurboAI.principles.map((principle) => (
              <div
                key={principle.title}
                ref={addElement}
                className="min-h-36 rounded-lg border border-white/10 bg-white/[0.04] p-5 text-white"
              >
                <h3 className="text-xl font-bold">{principle.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{principle.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-white/10 bg-[#07111F]"><Container><div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="kicker text-cyan-200">Capabilities and Expertise</p><h2 className="mt-3 text-3xl font-bold md:text-5xl">From strategy to engineered enterprise capability</h2><p className="mt-5 leading-relaxed text-slate-300">Turbo AI works across the connected disciplines required to move an intelligent system into operation.</p></div><div className="grid gap-5 sm:grid-cols-2">{[
        ["AI strategy and transformation", "/ai-transformation", "Readiness, opportunity selection, roadmaps, architecture, and operating governance."],
        ["Generative and agentic AI", "/generative-ai-agentic-ai", "Grounded assistants and controlled agents designed around enterprise workflows."],
        ["Data and AI foundations", "/data-engineering-ai-foundations", "Pipelines, governed data products, lakehouse patterns, analytics, and model operations."],
        ["AI engineering", "/ai-engineering-software-development", "Applications, integrations, testing, deployment, observability, and continuous improvement."],
        ["Governance and cybersecurity", "/ai-governance-cybersecurity", "Policies and technical controls across identity, data, models, applications, and tools."],
        ["Cloud and AI compute", "/cloud-infrastructure-ai-compute", "Workload-led infrastructure, platform engineering, automation, resilience, and observability."],
      ].map(([title, href, body]) => <SectionLink key={href} href={href} className="border-t border-blue-400/50 p-5 hover:bg-white/[0.04]"><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-300">{body}</p></SectionLink>)}</div></div></Container></Section>

      <Section className="bg-[#020617]"><Container><div className="grid gap-10 lg:grid-cols-2"><div><p className="kicker text-blue-300">Enterprise Positioning</p><h2 className="mt-3 text-3xl font-bold md:text-5xl">One partner across the operating system of AI</h2></div><div><p className="text-lg leading-relaxed text-slate-300">Enterprise AI is not a model operating alone. It depends on usable data, maintainable software, secure infrastructure, clear permissions, evaluation, and people who own the decisions and outcomes.</p><p className="mt-5 text-lg leading-relaxed text-slate-300">Turbo AI connects those concerns so leadership, domain teams, engineers, data teams, and risk owners can move through one coherent delivery path. Engagements can begin with strategy, a bounded workflow, a platform requirement, or an existing pilot that needs a credible route to production.</p></div></div></Container></Section>

      <RelatedInsights slugs={["what-is-ai-transformation-in-business", "how-to-choose-an-ai-consulting-firm", "ai-adoption-in-enterprises-2025"]} title="Perspectives on building enterprise AI" intro="Explore practical guidance on transformation, selecting an AI partner, and moving adoption beyond isolated experiments." />

      <Section className="bg-gradient-to-r from-blue-950 via-[#051225] to-cyan-950">
        <Container>
          <div className="max-w-4xl">
            <p className="kicker text-blue-200">Final CTA</p>
            <h2 className="text-3xl font-bold text-white md:text-5xl">The Intelligent Enterprise Is Being Built Now</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-200">
              Turbo AI helps organisations move from ambition to engineered capability across AI, data, software, security, cloud, and proprietary platforms.
            </p>
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
