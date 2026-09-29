import { ArrowLongRightIcon, BellAlertIcon, ExclamationTriangleIcon, MagnifyingGlassIcon, ShieldCheckIcon, SignalIcon } from "@heroicons/react/24/outline";
import { Container } from "../components/Container";
import { Connect } from "../components/Connect";
import { RelatedInsights } from "../components/LandingSEOSections";
import { ProductFAQ, ProductRelatedLinks, ProductSEO } from "../components/ProductSEOSections";
import { SectionLink } from "../components/SectionLink";
import "./products.css";
import "./products-theme.css";
import { useCmsProduct } from "../cms/hooks";
import { CmsProductSections } from "../cms/CmsProductSections";
import { hasCmsProductContent } from "../cms/types";

const workflow = [
  { name: "Detection", icon: SignalIcon, detail: "Bring a defined set of security or operational signals into view and record where each event originated. Data quality and timing checks help distinguish a real event from a missing feed." },
  { name: "Analysis", icon: MagnifyingGlassIcon, detail: "Add relevant asset, user, and event context so an analyst can investigate a signal. Correlation is a prompt for review, not proof of cause." },
  { name: "Risk identification", icon: ExclamationTriangleIcon, detail: "Assess potential impact and uncertainty against agreed criteria. Show why a case is prioritized and allow a reviewer to correct the assessment." },
  { name: "Alert", icon: BellAlertIcon, detail: "Route a case to the right owner with evidence and an escalation path. A useful alert identifies what needs attention instead of only raising another notification." },
  { name: "Response", icon: ShieldCheckIcon, detail: "Coordinate the next step under the organization's existing permissions and procedures. Consequential actions require explicit authorization and a record of what changed." },
];
const relatedLinks = [
  { href: "/ai-governance-cybersecurity", title: "AI Governance & Cybersecurity", description: "Explore the security and governance practices around enterprise AI." },
  { href: "/products/dci-360", title: "DCI 360", description: "See infrastructure monitoring and operational visibility in context." },
  { href: "/enterprise-ai-solutions", title: "Enterprise AI Solutions", description: "Connect intelligent workflows with wider enterprise needs." },
];
const faqs = [
  { question: "What does ADRS stand for?", answer: "ADRS stands for Autonomous Detection & Response System, a product focused on the path from detection to response." },
  { question: "What stages are shown in the ADRS workflow?", answer: "The conceptual workflow moves through detection, analysis, risk identification, alert and response." },
  { question: "How does ADRS present the operating view?", answer: "It brings the detection-to-response sequence into one conceptual view so teams can follow a signal, its context, ownership, and next step." },
  { question: "Does ADRS take action without human approval?", answer: "The workflow is designed around defined controls and human oversight. No automatic remediation or specific integration is claimed here; response authority must be agreed for each deployment." },
  { question: "What is needed to introduce ADRS?", answer: "Start with one signal source, an incident owner, a documented escalation path, and a baseline for alert quality. Integration and security requirements are assessed against the existing environment." },
];

export function ADRS() {
  const cmsEntry = useCmsProduct();
  return (
    <main className={`product-page adrs-page ${hasCmsProductContent(cmsEntry) ? "cms-has-content" : ""}`}>
      <ProductSEO pageKey="adrs" cmsEntry={cmsEntry} />
      <section className="product-hero adrs-hero" style={cmsEntry?.hero_image ? { backgroundImage: `url(${cmsEntry.hero_image})` } : undefined}>
        <Container className="adrs-hero-layout">
          <div className="adrs-hero-copy">
            <p className="product-eyebrow">DETECTION TO RESPONSE</p>
            <h1>{cmsEntry?.hero_title || cmsEntry?.title || "ADRS"}</h1>
            <p className="product-hero-subtitle">{cmsEntry?.hero_description || <>Autonomous Detection<br />&amp; Response System</>}</p>
            <p className="product-hero-intro">{cmsEntry?.summary || "Follow detection, analysis and response in one clear security-operations workflow."}</p>
            <a className="product-button adrs-button" href={cmsEntry?.cta_url || "#adrs-workflow"}>{cmsEntry?.cta_text || "Explore ADRS"} <ArrowLongRightIcon aria-hidden="true" /></a>
          </div>
          <div className="adrs-hero-visual" role="img" aria-label="Conceptual detection-to-response signal visualization">
            <div className="adrs-radar"><span className="adrs-radar-sweep" aria-hidden="true" /><span className="adrs-radar-ring" /><span className="adrs-radar-ring" /><span className="adrs-radar-ring" /><ShieldCheckIcon aria-hidden="true" /><i className="adrs-radar-node node-one" /><i className="adrs-radar-node node-two" /><i className="adrs-radar-node node-three" /></div>
            <div className="adrs-radar-caption">DETECT <span /> ASSESS <span /> RESPOND</div>
          </div>
        </Container>
      </section>
      <CmsProductSections entry={cmsEntry} />
      <section className="product-section product-copy-section"><Container className="product-copy-layout"><div><p className="product-eyebrow">WHAT IT IS</p><h2>A controlled path from signal to action.</h2></div><div><p>ADRS, the Autonomous Detection &amp; Response System, is Turbo AI's detection-to-response product concept for teams that need a clearer way to investigate and coordinate security or operational risk. It connects incoming signals with analysis, risk identification, alerting, and a defined response path.</p><p>It is intended for security operations, infrastructure, and risk teams handling high-volume events across existing tools. The page illustrates the operating model; it does not promise a specific connector, autonomous remediation, or deployment outcome. The useful starting point is a bounded incident workflow with a named owner.</p></div></Container></section>
      <section id="adrs-workflow" className="product-section adrs-workflow"><Container><div className="product-section-heading"><div><p className="product-eyebrow">01 / THE WORKFLOW</p><h2>From detection<br />to response.</h2></div><p>A clear sequence for identifying and addressing risk.</p></div><ol className="adrs-flow">{workflow.map(({ name, icon: Icon }, index) => <li key={name}><div className="adrs-flow-top"><span>0{index + 1}</span><Icon aria-hidden="true" /></div><h3>{name}</h3>{index < workflow.length - 1 && <ArrowLongRightIcon className="adrs-flow-arrow" aria-hidden="true" />}</li>)}</ol></Container></section>
      <section className="product-section product-copy-section product-copy-alt"><Container><p className="product-eyebrow">WORKFLOW IN PRACTICE</p><h2>Every stage has a decision.</h2><div className="product-copy-grid">{workflow.map(({ name, detail }, index) => <article key={name}><span>0{index + 1}</span><h3>{name}</h3><p>{detail}</p></article>)}</div></Container></section>
      <section className="product-section adrs-visual-section"><Container className="adrs-visual-layout"><div><p className="product-eyebrow">02 / OPERATING VIEW</p><h2>Follow the signal.</h2><p>Detection, analysis and response in one conceptual view of the workflow.</p><span className="product-concept-label">CONCEPTUAL WORKFLOW VISUAL</span></div><div className="adrs-console" role="img" aria-label="Conceptual workflow visual, not an ADRS product screenshot"><div className="adrs-console-header"><strong>ADRS</strong><span>DETECTION / RESPONSE</span><i /></div><div className="adrs-console-track">{workflow.map(({ name }, index) => <div key={name}><span>0{index + 1}</span><strong>{name}</strong><i /></div>)}</div><div className="adrs-console-footer"><span>WORKFLOW VIEW</span><span>CONCEPTUAL</span></div></div></Container></section>
      <section className="product-section product-copy-section"><Container><p className="product-eyebrow">DESIGN AND DEPLOYMENT</p><h2>Fit the existing operation.</h2><div className="product-copy-grid"><article><h3>Source integration</h3><p>Identify the event sources and existing case or ticket systems needed for one use case. Integration scope, latency, and source permissions depend on the customer's environment and must be validated before implementation.</p></article><article><h3>Security and oversight</h3><p>Apply least-privilege access, audit trails, retention rules, and a human approval point for consequential actions. Test how false alerts, missing context, and attempted misuse are handled.</p></article><article><h3>Operational use cases</h3><p>Possible starting points include security-event triage, infrastructure incident assessment, and operational exception routing. Each should have a defined owner, evidence standard, and response procedure.</p></article><article><h3>Implementation approach</h3><p>Start with a baseline for one alert queue. Map source quality, decision rights, and escalation; evaluate alert usefulness with reviewers; then expand only when the workflow is reliable and auditable.</p></article></div></Container></section>
      <section className="product-section product-copy-section product-copy-alt"><Container className="product-copy-layout"><div><p className="product-eyebrow">OUTCOMES AND DIFFERENTIATION</p><h2>More focused response, with the evidence intact.</h2></div><div><p>ADRS can help teams reduce the effort required to reconstruct an event, prioritize cases with clearer context, and coordinate ownership from detection through response. The expected value is better operational visibility and handoffs, not an unsupported promise that every alert will be correct or every action can be automated.</p><p>The platform is distinguished by its explicit workflow and control model: source signals, analysis, risk identification, alerting, response, and human oversight remain visible. Turbo AI connects that model to data engineering, cybersecurity, infrastructure, and governance according to the use case.</p></div></Container></section>
      <ProductRelatedLinks links={relatedLinks} />
      <RelatedInsights slugs={["financial-services-ai-fraud-review", "telecom-network-incident-triage", "ai-cybersecurity-solutions"]} title="Detection, triage, and response insights" intro="Explore governed fraud review, network incident triage, and cybersecurity considerations connected to ADRS." />
      <ProductFAQ title="ADRS questions" intro="A concise view of the detection-to-response workflow." items={faqs} />
      <section className="product-cta adrs-cta"><Container><p className="product-eyebrow">ADRS</p><h2>Explore a clearer path from detection to response.</h2><SectionLink href="#connect" className="product-button adrs-button">Start a conversation <ArrowLongRightIcon aria-hidden="true" /></SectionLink></Container></section>
      <Connect />
    </main>
  );
}
