import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Container, Section } from "../components/Container";
import { Connect } from "../components/Connect";
import { LandingFAQ, RelatedInsights } from "../components/LandingSEOSections";
import { SectionLink } from "../components/SectionLink";
import { SEO } from "../components/SEO";
import { cmsPublicEnabled } from "../cms/client";
import { usePublishedEntries } from "../cms/hooks";

const platforms = [
  {
    id: "i-lakehouse",
    name: "i-Lakehouse",
    description: "A hybrid-native data platform that connects DataOps, AI/ML, and governed data across cloud, hybrid, on-premise, and edge environments.",
    problem: "Fragmented data and disconnected workloads make analytics and AI difficult to trust, maintain, and scale.",
    architecture: "Enterprise sources feed integration and open lakehouse layers. Governance, lineage, and access controls stay close to the data as analytics and AI workloads consume it.",
    workflow: ["Enterprise data", "Integration", "i-Lakehouse", "Analytics & AI", "Insight"],
    capabilities: ["Data integration and DataOps", "Open lakehouse formats", "Streaming and analytics", "AI/ML workloads", "Security and lineage"],
    useCases: ["Enterprise analytics", "Governed AI data products", "Hybrid and edge data access"],
    value: "Give teams a more connected foundation for decisions while keeping deployment choice and data governance visible.",
    href: "/products/i-lakehouse",
    relatedHref: "/data-engineering-ai-foundations",
    relatedLabel: "Data Engineering & AI Foundations",
  },
  {
    id: "adrs",
    name: "ADRS",
    description: "The Autonomous Detection & Response System presents a clear path from incoming signals through analysis, risk identification, alerting, and response.",
    problem: "Security and operational teams can lose time when signals, context, and response steps are spread across disconnected workflows.",
    architecture: "Signals enter a detection layer, are assessed for relevance and risk, then move to alerting and a controlled response path. Human oversight and permissions remain essential to consequential actions.",
    workflow: ["Signals", "Detection", "Risk analysis", "Alert", "Response"],
    capabilities: ["Signal detection", "Analysis and risk identification", "Alert routing", "Response coordination", "Human oversight"],
    useCases: ["Security-event triage", "Operational risk visibility", "Incident response coordination"],
    value: "Help teams follow a signal, understand its context, and act through a defined, auditable workflow.",
    href: "/products/adrs",
    relatedHref: "/ai-governance-cybersecurity",
    relatedLabel: "AI Governance & Cybersecurity",
  },
];

const productFaqs = [
  { question: "How do Turbo AI platforms relate to consulting services?", answer: "The platforms provide focused product approaches, while Turbo AI services address strategy, data, software, cloud, security, governance, and implementation around the operating need." },
  { question: "Which platform should an organization evaluate first?", answer: "Start from the problem. i-Lakehouse fits governed data and AI foundations; ADRS fits detection-to-response workflows; DCI 360 fits data-centre infrastructure visibility. Seismic AI has its own external product site." },
  { question: "Are all product integrations available by default?", answer: "No. Source systems, APIs, identity, latency, security, and deployment requirements must be assessed for the customer's environment before an integration is confirmed." },
  { question: "Can Turbo AI platforms operate with human oversight?", answer: "Yes. The product descriptions emphasize review, permissions, traceability, and human control for consequential decisions and actions." },
];

function PlatformFlow({ steps, name }: { steps: string[]; name: string }) {
  return (
    <figure className="border border-blue-300/20 bg-[#0b192a] p-5 md:p-8">
      <figcaption className="mb-6 text-xs font-bold uppercase text-cyan-200">{name} conceptual workflow</figcaption>
      <ol className="grid gap-3 sm:grid-cols-5 sm:items-center">
        {steps.map((step, index) => (
          <li key={step} className="relative flex min-h-24 items-center border-t-2 border-blue-400 bg-[#13253b] p-3 sm:pr-5">
            <div><span className="text-xs font-bold text-cyan-200">0{index + 1}</span><strong className="mt-2 block text-sm leading-snug text-white">{step}</strong></div>
            {index < steps.length - 1 && <ArrowRightIcon className="absolute -right-5 z-10 hidden h-5 w-5 text-cyan-300 sm:block" aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function ProductsIndex() {
  const { entries: cmsProducts, loading, failed } = usePublishedEntries("product");
  const shownPlatforms = cmsPublicEnabled
    ? cmsProducts.filter((entry) => entry.slug !== "dci-360")
      .sort((a, b) => {
        const rank = (slug: string) => slug === "i-lakehouse" ? 0 : slug === "adrs" ? 1 : 2;
        return rank(a.slug) - rank(b.slug) || a.title.localeCompare(b.title);
      })
      .map((entry) => ({
        id: entry.slug, name: entry.title, description: entry.summary,
        problem: entry.hero_description || entry.summary,
        architecture: entry.sections[0]?.body || entry.summary,
        workflow: entry.features.slice(0, 5).length ? entry.features.slice(0, 5) : [entry.title],
        capabilities: entry.features,
        useCases: entry.benefits,
        value: entry.summary,
        href: `/products/${entry.slug}`,
        relatedHref: entry.related_industries[0] ? `/industries/${entry.related_industries[0]}` : "/enterprise-ai-solutions",
        relatedLabel: entry.related_industries[0] ? "Related industry" : "Enterprise AI Solutions",
      }))
    : platforms;
  const showDci = !cmsPublicEnabled || cmsProducts.some((entry) => entry.slug === "dci-360");
  return (
    <main className="bg-[#020617] text-white">
      <SEO pageKey="turboAIProducts" />
      <section className="border-b border-white/10 bg-[#07111f] pb-20 pt-40 md:pb-28">
        <Container>
          <p className="text-xs font-bold uppercase text-cyan-200">Turbo AI technology</p>
          <h1 className="mt-4 max-w-5xl text-4xl font-extrabold leading-tight sm:text-5xl md:text-7xl">Turbo AI Platforms</h1>
          <p className="mt-6 max-w-3xl text-xl font-semibold text-blue-200 md:text-3xl">Data foundations and detection-to-response intelligence.</p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-300 md:text-lg">i-Lakehouse and ADRS address different parts of the enterprise technology stack: trusted data for analytics and AI, and a controlled workflow for identifying and responding to risk.</p>
          <div className="mt-9 flex flex-wrap gap-4">
            {shownPlatforms.slice(0, 2).map((platform, index) => <a key={platform.id} href={`#${platform.id}`} className={index === 0 ? "inline-flex min-h-12 items-center rounded-md bg-blue-500 px-5 py-3 font-bold text-white hover:bg-blue-400" : "inline-flex min-h-12 items-center rounded-md border border-blue-300/40 px-5 py-3 font-bold text-blue-100 hover:border-blue-200"}>Explore {platform.name}</a>)}
          </div>
        </Container>
      </section>

      {loading && <p data-cms-loading className="py-10 text-center text-slate-300">Loading products…</p>}
      {failed && <p data-cms-error role="alert" className="py-10 text-center text-rose-300">Products are temporarily unavailable.</p>}
      {shownPlatforms.map((platform, index) => (
        <section id={platform.id} key={platform.id} className="scroll-mt-24 border-b border-white/10 py-20 md:py-28">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
              <div>
                <p className="text-xs font-bold uppercase text-cyan-200">Platform 0{index + 1}</p>
                <h2 className="mt-4 text-4xl font-extrabold md:text-5xl">{platform.name}</h2>
                <p className="mt-5 text-lg leading-relaxed text-slate-200">{platform.description}</p>
                <SectionLink href={platform.href} className="mt-7 inline-flex items-center gap-2 font-bold text-cyan-200 hover:text-white">Explore {platform.name} <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></SectionLink>
              </div>
              <div className="space-y-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div><h3 className="text-lg font-bold text-white">The problem</h3><p className="mt-3 leading-relaxed text-slate-300">{platform.problem}</p></div>
                  <div><h3 className="text-lg font-bold text-white">Architecture</h3><p className="mt-3 leading-relaxed text-slate-300">{platform.architecture}</p></div>
                </div>
                <PlatformFlow steps={platform.workflow} name={platform.name} />
                <div className="grid gap-8 sm:grid-cols-2">
                  <div><h3 className="text-lg font-bold">Major capabilities</h3><ul className="mt-3 space-y-2 text-slate-300">{platform.capabilities.map((item) => <li key={item} className="border-l-2 border-blue-400 pl-3">{item}</li>)}</ul></div>
                  <div><h3 className="text-lg font-bold">Suitable use cases</h3><ul className="mt-3 space-y-2 text-slate-300">{platform.useCases.map((item) => <li key={item} className="border-l-2 border-cyan-400 pl-3">{item}</li>)}</ul></div>
                </div>
                <div className="border-t border-white/10 pt-6"><h3 className="text-lg font-bold">Enterprise value</h3><p className="mt-3 text-slate-300">{platform.value}</p><SectionLink href={platform.relatedHref} className="mt-4 inline-block font-semibold text-blue-300 hover:text-white">{platform.relatedLabel}</SectionLink></div>
              </div>
            </div>
          </Container>
        </section>
      ))}

      <Section className="border-b border-white/10 bg-[#07111f]"><Container><div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-xs font-bold uppercase text-cyan-200">Product Family</p><h2 className="mt-3 text-3xl font-bold md:text-5xl">More ways to explore Turbo AI</h2></div><div className="grid gap-5 sm:grid-cols-2"><SectionLink href="https://seismicai.ca" className="border-t border-blue-400 p-5 hover:bg-white/5"><h3 className="text-xl font-bold">Seismic AI</h3><p className="mt-2 text-sm text-slate-300">Visit the existing Seismic AI website.</p></SectionLink>{showDci && <SectionLink href="/products/dci-360" className="border-t border-blue-400 p-5 hover:bg-white/5"><h3 className="text-xl font-bold">DCI 360</h3><p className="mt-2 text-sm text-slate-300">Explore data centre infrastructure management.</p></SectionLink>}</div></div></Container></Section>
      <Section className="bg-[#020617]"><Container><div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-xs font-bold uppercase text-cyan-200">Future Platforms</p><h2 className="mt-3 text-3xl font-bold md:text-5xl">Built around emerging enterprise needs</h2></div><p className="text-lg leading-relaxed text-slate-300">Turbo AI continues to develop technology capabilities where data, AI, and operational workflows meet. New products will be introduced here when their scope and availability are confirmed.</p></div></Container></Section>
      <Section className="border-y border-white/10 bg-[#07111f]"><Container><div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-xs font-bold uppercase text-cyan-200">Why Turbo AI Platforms</p><h2 className="mt-3 text-3xl font-bold md:text-5xl">Products connected to enterprise delivery</h2></div><div className="grid gap-5 md:grid-cols-2">{[
        ["Problem-led scope", "Each platform is framed around a specific enterprise data or operational workflow rather than a general AI promise."],
        ["Engineering integration", "Data, application, infrastructure, identity, and monitoring requirements are assessed as part of implementation."],
        ["Governance by design", "Source lineage, permissions, review, auditability, and response authority remain visible in the operating model."],
        ["Human accountability", "The platforms support teams and defined actions without claiming that consequential judgment can be removed."],
      ].map(([title, body]) => <article key={title} className="border-t border-blue-400/50 pt-5"><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 leading-relaxed text-slate-300">{body}</p></article>)}</div></div></Container></Section>
      <RelatedInsights slugs={["data-centre-capacity-intelligence", "energy-ai-asset-intelligence-foundations", "telecom-network-incident-triage"]} title="Platform and operational intelligence insights" intro="Read practical guidance about data foundations, infrastructure capacity, and detection-to-response workflows." />
      <LandingFAQ title="Turbo AI platform questions" intro="How the product family relates to enterprise problems, services, integration, and oversight." items={productFaqs} />
      <Section className="bg-[#0b1b31]"><Container><h2 className="max-w-3xl text-3xl font-bold md:text-5xl">Connect the right platform to the right problem.</h2><p className="mt-4 max-w-2xl text-slate-300">Discuss your data foundation, risk workflow, and operational requirements with Turbo AI.</p><SectionLink href="#connect" className="mt-7 inline-flex min-h-12 items-center rounded-md bg-blue-500 px-6 py-3 font-bold text-white hover:bg-blue-400">Start a conversation</SectionLink></Container></Section>
      <Connect />
    </main>
  );
}
