import { ArrowLongRightIcon, BoltIcon, ChartBarSquareIcon, CircleStackIcon, CpuChipIcon, LockClosedIcon, ServerStackIcon } from "@heroicons/react/24/outline";
import { Container } from "../components/Container";
import { Connect } from "../components/Connect";
import { RelatedInsights } from "../components/LandingSEOSections";
import { ProductFAQ, ProductRelatedLinks, ProductSEO } from "../components/ProductSEOSections";
import { SectionLink } from "../components/SectionLink";
import dataCenterImage from "../assets/dci-data-center.webp";
import "./products.css";
import "./products-theme.css";
import { useCmsProduct } from "../cms/hooks";
import { CmsProductSections } from "../cms/CmsProductSections";
import { hasCmsProductContent } from "../cms/types";

const capabilities = [
  { icon: ChartBarSquareIcon, title: "Real-time monitoring", detail: "See infrastructure signals and alerts as they happen." },
  { icon: BoltIcon, title: "Power & cooling", detail: "Bring environmental and energy controls into view." },
  { icon: ServerStackIcon, title: "Assets & racks", detail: "Keep equipment and rack resources organized." },
  { icon: CircleStackIcon, title: "Capacity planning", detail: "Plan and optimize available infrastructure." },
  { icon: CpuChipIcon, title: "Automation", detail: "Turn operational insight into efficient action." },
  { icon: LockClosedIcon, title: "Security & compliance", detail: "Build controls into everyday operations." },
];

const domains = ["IT", "Facility", "Power", "Cooling", "Environment"];
const stages = [
  { name: "Monitor", detail: "Collect current facility and IT signals with asset and location context so operators can see what changed and how fresh the source is." },
  { name: "Analyze", detail: "Relate power, cooling, environment, rack, and equipment evidence to identify constraints or incidents that need engineering review." },
  { name: "Optimize", detail: "Compare capacity and operating scenarios against resilience, maintenance, and workload requirements before approving a change." },
  { name: "Automate", detail: "Coordinate approved repetitive steps under defined permissions, validation, and rollback rather than bypassing operational control." },
];
const relatedLinks = [
  { href: "/cloud-infrastructure-ai-compute", title: "Cloud Infrastructure & AI Compute", description: "Explore resilient infrastructure for enterprise AI workloads." },
  { href: "/ai-governance-cybersecurity", title: "AI Governance & Cybersecurity", description: "Connect infrastructure operations with security and governance." },
  { href: "/products/i-lakehouse", title: "i-Lakehouse", description: "Bring operational data into a hybrid-native data platform." },
];
const faqs = [
  { question: "What does DCI 360 bring into one view?", answer: "DCI 360 connects IT, facility, power, cooling and environmental signals in one data center infrastructure view." },
  { question: "How does DCI 360 support capacity planning?", answer: "Its asset and capacity views help teams plan infrastructure use alongside live monitoring and operational analytics." },
  { question: "Which capabilities does DCI 360 bring together?", answer: "It brings together real-time monitoring, power and cooling visibility, rack and asset tracking, capacity planning, automation, and security controls." },
  { question: "Does DCI 360 automatically control facility systems?", answer: "This page does not claim autonomous facility control. Any integration or automated action requires validated interfaces, explicit permissions, operational approval, and a tested response design." },
  { question: "What data is needed to begin?", answer: "A bounded starting point normally needs a current asset and rack inventory, relevant power or cooling measurements, change records, and named owners who can validate the infrastructure view." },
];

function ConceptDashboard() {
  return (
    <div className="product-dashboard" role="img" aria-label="Conceptual dashboard showing infrastructure domains, capacity bars, and an operations timeline; not a product screenshot">
      <div className="product-dashboard-top"><span className="product-dashboard-brand">DCI <b>360</b></span><span>INFRASTRUCTURE OVERVIEW</span><span className="product-live"><i /> CONCEPTUAL VIEW</span></div>
      <div className="product-dashboard-body">
        <div className="product-dashboard-sidebar"><span className="selected">Overview</span><span>Infrastructure</span><span>Capacity</span><span>Operations</span></div>
        <div className="product-dashboard-main">
          <div className="product-dashboard-heading"><strong>One view of your infrastructure</strong><span>IT / FACILITY / POWER</span></div>
          <div className="product-dashboard-metrics">
            {[["Power", "#fbbf24", "72%"], ["Cooling", "#5dc7ff", "59%"], ["Capacity", "#768dff", "81%"]].map(([name, color, width]) => <div key={name}><span>{name}</span><div className="product-meter"><i style={{ width, backgroundColor: color }} /></div></div>)}
          </div>
          <div className="product-dashboard-chart" aria-hidden="true">{[43, 55, 38, 62, 50, 72, 60, 78, 67, 84, 73, 90].map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}</div>
          <div className="product-dashboard-footer"><span><i /> Assets</span><span><i /> Environmental</span><span><i /> Alerts</span></div>
        </div>
      </div>
    </div>
  );
}

export function DCI360() {
  const cmsEntry = useCmsProduct();
  return (
    <main className={`product-page dci-page ${hasCmsProductContent(cmsEntry) ? "cms-has-content" : ""}`}>
      <ProductSEO pageKey="dci360" cmsEntry={cmsEntry} />
      <section className="product-hero dci-hero">
        <img className="dci-hero-image" src={cmsEntry?.hero_image || dataCenterImage} alt="Modern data center corridor with server racks" loading="eager" />
        <div className="dci-hero-shade" />
        <div className="dci-hero-racks" aria-hidden="true">
          {[0, 1, 2].map((rack) => (
            <span className="dci-rack" key={rack}>
              <i className="dci-rack-led" />
              <i className="dci-rack-scan" />
            </span>
          ))}
          <span className="dci-rack-data-path" />
        </div>
        <Container className="product-hero-inner dci-hero-inner">
          <p className="product-eyebrow">DATA CENTER INFRASTRUCTURE MANAGEMENT</p>
          <h1>{cmsEntry?.hero_title || cmsEntry?.title || <>DCI <span>360</span></>}</h1>
          <p className="product-hero-subtitle">{cmsEntry?.hero_description || <>Intelligent Data Center<br />Infrastructure Management</>}</p>
          <p className="product-hero-intro">{cmsEntry?.summary || "Bring live monitoring, asset intelligence and capacity planning together for data center operations."}</p>
          <a className="product-button dci-button" href={cmsEntry?.cta_url || "#dci-core"}>{cmsEntry?.cta_text || "Explore DCI 360"} <ArrowLongRightIcon aria-hidden="true" /></a>
        </Container>
        <div className="dci-hero-bottom"><Container><span>UNIFIED VISIBILITY</span><span>PROACTIVE OPERATIONS</span><span>INTELLIGENT CONTROLS</span></Container></div>
      </section>
      <CmsProductSections entry={cmsEntry} />
      <section className="product-section product-copy-section"><Container className="product-copy-layout"><div><p className="product-eyebrow">PRODUCT OVERVIEW</p><h2>Infrastructure intelligence for facility and IT teams.</h2></div><div><p>DCI 360 is Turbo AI's data-centre infrastructure management product concept for teams that need to understand assets, capacity, power, cooling, environment, and incidents in one operating context.</p><p>It addresses a common planning problem: an available rack does not necessarily have usable power, cooling, network, resilience, or maintenance capacity. DCI 360 organizes the evidence so engineers and operators can review a placement, constraint, or incident without reconstructing the estate from disconnected records.</p></div></Container></section>
      <section className="product-section product-copy-section product-copy-alt"><Container><p className="product-eyebrow">THE OPERATIONAL PROBLEM</p><h2>Capacity and incidents cross system boundaries.</h2><div className="product-copy-grid"><article><h3>Infrastructure records drift</h3><p>Moves, additions, and changes may not reach every source, weakening capacity and lifecycle decisions.</p></article><article><h3>Space hides constraints</h3><p>Power paths, cooling zones, workload demand, and resilience requirements determine whether apparent space is genuinely usable.</p></article><article><h3>Alerts lack shared context</h3><p>Facility and IT teams may see different symptoms of the same event, slowing investigation and ownership.</p></article><article><h3>Planning is difficult to audit</h3><p>When assumptions and source dates are not preserved, teams cannot reconstruct why a placement or upgrade was approved.</p></article></div></Container></section>
      <section id="dci-core" className="product-section dci-core">
        <Container>
          <div className="product-section-intro"><p className="product-eyebrow">01 / THE CORE IDEA</p><h2>One operational view.<br /><span>Every critical layer.</span></h2><p>Connect IT, facility and power resources in one infrastructure picture.</p></div>
          <div className="dci-domain-flow" aria-label="IT, Facility, Power, Cooling and Environment in one operational view">{domains.map((domain, index) => <div className="dci-domain" key={domain}><span className="dci-domain-index">0{index + 1}</span><span className="dci-domain-dot" /><strong>{domain}</strong></div>)}</div>
        </Container>
      </section>
      <section className="product-section dci-capabilities"><Container><div className="product-section-heading"><div><p className="product-eyebrow">02 / CAPABILITIES</p><h2>Clarity at every level.</h2></div><p>From live signals to long-range planning.</p></div><div className="dci-cap-grid">{capabilities.map(({ icon: Icon, title, detail }, index) => <article className="dci-cap" key={title}><span className="dci-cap-number">0{index + 1}</span><Icon className="dci-cap-icon" aria-hidden="true" /><h3>{title}</h3><p>{detail}</p></article>)}</div></Container></section>
      <section className="product-section dci-operations"><Container><p className="product-eyebrow">03 / INTELLIGENT OPERATIONS</p><h2>From signal to action.</h2><ol className="dci-steps">{stages.map((stage, index) => <li key={stage.name}><span>0{index + 1}</span><h3>{stage.name}</h3>{index < stages.length - 1 && <ArrowLongRightIcon aria-hidden="true" />}</li>)}</ol><div className="dci-values"><span>Unified visibility</span><span>Proactive management</span><span>Operational efficiency</span><span>Reliability</span></div></Container></section>
      <section className="product-section product-copy-section"><Container><p className="product-eyebrow">WORKFLOW</p><h2>Every stage supports an accountable decision.</h2><div className="product-copy-grid">{stages.map((stage, index) => <article key={stage.name}><span>0{index + 1}</span><h3>{stage.name}</h3><p>{stage.detail}</p></article>)}</div></Container></section>
      <section className="product-section dci-visual"><Container className="dci-visual-layout"><div className="dci-visual-copy"><p className="product-eyebrow">04 / DASHBOARDS & REPORTING</p><h2>See the whole operation.</h2><p>Customizable dashboards and reporting bring infrastructure signals into focus.</p><span className="product-concept-label">CONCEPTUAL PRODUCT VISUAL</span></div><ConceptDashboard /></Container></section>
      <section className="product-section product-copy-section product-copy-alt"><Container><p className="product-eyebrow">USE CASES AND OUTCOMES</p><h2>Decisions the infrastructure view can support.</h2><div className="product-copy-grid"><article><h3>Capacity planning</h3><p>Compare proposed workloads with rack, power, cooling, network, resilience, and reservation constraints. The outcome is a more credible engineering review.</p></article><article><h3>Incident context</h3><p>Relate facility alarms to affected assets and recent changes. Operators gain a shared timeline for coordinated investigation.</p></article><article><h3>Asset lifecycle planning</h3><p>Combine age, configuration, maintenance, and workload plans to prepare upgrade or replacement decisions with traceable assumptions.</p></article><article><h3>Power and cooling review</h3><p>Understand utilization and environmental trends by room or zone before assigning more load or planning facility work.</p></article></div></Container></section>
      <section className="product-section product-copy-section"><Container className="product-copy-layout"><div><p className="product-eyebrow">WHY DCI 360</p><h2>One view, with engineering control intact.</h2></div><div><p>DCI 360 connects operational visibility with the data, cloud, and governance capabilities required to maintain it. The platform is positioned around inspectable evidence, source freshness, and workflows that cross facility and IT responsibilities.</p><p>Deployment begins with a bounded estate or decision. Existing inventory, telemetry, ticketing, and facility interfaces must be assessed before an integration is claimed. Security, access, change control, and human authorization remain part of the design.</p></div></Container></section>
      <ProductRelatedLinks links={relatedLinks} />
      <RelatedInsights slugs={["data-centre-capacity-intelligence", "telecom-network-incident-triage", "ai-infrastructure-investment-strategy"]} title="Data-centre and infrastructure insights" intro="Explore capacity planning, incident triage, and AI infrastructure decisions related to DCI 360." />
      <ProductFAQ title="DCI 360 questions" intro="A quick look at how DCI 360 supports data center infrastructure management." items={faqs} />
      <section className="product-cta dci-cta"><Container><p className="product-eyebrow">DCI 360</p><h2>Build smarter infrastructure operations.</h2><SectionLink href="#connect" className="product-button dci-button">Start a conversation <ArrowLongRightIcon aria-hidden="true" /></SectionLink></Container></section>
      <Connect />
    </main>
  );
}
