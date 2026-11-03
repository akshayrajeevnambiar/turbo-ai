import type { BlogPost } from "./blog";
import { industryInsightChecks, industryInsightDetails, industryInsightFollowUps } from "./industryInsightDetails";

const insightDrafts: BlogPost[] = [
  {
    slug: "energy-ai-asset-intelligence-foundations",
    title: "Building Asset Intelligence for Energy Operations",
    excerpt: "Learn how energy teams can connect field data, asset records, and maintenance decisions with quality checks, human review, and measurable operational feedback.",
    date: "2026-09-20",
    author: "Turbo AI",
    image: "/blog/fresh/23-network-operations.jpg",
    tags: ["Energy", "Asset Intelligence", "Data Engineering"],
    keywords: "energy asset intelligence, AI for energy operations, predictive maintenance data",
    body: `<p>Energy operators already collect a large volume of equipment, inspection, and field data. The challenge is connecting those records to a decision that a maintenance or operations team can make with confidence.</p>
      <h2>Start with an operational question</h2><p>Choose a bounded question such as which assets need inspection first. Identify the data owners, the decision maker, and the evidence required before any model is built. This prevents a dashboard from becoming another isolated destination for information.</p>
      <h2>Build a dependable signal path</h2><p>Join telemetry to asset registers, maintenance history, and operating context. Check completeness, timestamps, and changes in equipment configuration. A predictive signal without this context can be misleading.</p>
      <h2>Keep the team in control</h2><p>Use analytics to rank and explain exceptions, then let qualified people validate the recommendation. Monitor false alerts and missed events after deployment. The value comes from better planning and traceable action, not from claiming that a model can replace field judgment.</p>
      <p>Explore <a href="/industries-we-serve">industry intelligence</a> and <a href="/data-engineering-ai-foundations">data foundations</a>.</p>`,
  },
  {
    slug: "financial-services-ai-fraud-review",
    title: "Designing AI-Assisted Fraud Review in Financial Services",
    excerpt: "A practical framework for AI-assisted fraud review: governed transaction signals, explainable alert priority, investigator feedback, and accountable customer decisions.",
    date: "2026-09-19",
    author: "Turbo AI",
    image: "/blog/fresh/24-industrial-ai.jpg",
    tags: ["Financial Services", "Fraud", "Governance"],
    keywords: "AI fraud review, financial services anomaly detection, governed AI",
    body: `<p>Fraud teams need to identify unusual activity without overwhelming investigators with weak alerts. AI can help prioritize work, but a useful system must fit the institution's controls and review process.</p>
      <h2>Combine signals with context</h2><p>Transaction patterns alone rarely explain a case. Bring together authorized account, device, behavior, and case-history data while documenting lineage and access. Separate a risk score from the decision to act.</p>
      <h2>Design for investigation</h2><p>Show which signals contributed to an alert, what evidence is missing, and which actions require approval. Investigators should be able to record outcomes so the system can be evaluated against real decisions over time.</p>
      <h2>Measure the whole workflow</h2><p>Review alert volume, false positives, time to disposition, and the impact on legitimate customers. Privacy and model governance must be addressed before deployment, not after a pilot expands.</p>
      <p>See <a href="/industries/financial-services">AI for financial services</a> and <a href="/ai-governance-cybersecurity">governance and cybersecurity</a>.</p>`,
  },
  {
    slug: "insurance-claims-document-intelligence",
    title: "Document Intelligence for Insurance Claims Teams",
    excerpt: "Explore source-linked extraction, exception queues, and reviewer oversight for insurance claims documents without automating consequential coverage decisions.",
    date: "2026-09-18",
    author: "Turbo AI",
    image: "/blog/fresh/26-ai-team.jpg",
    tags: ["Insurance", "Documents", "Human Oversight"],
    keywords: "insurance document intelligence, AI claims triage, document processing",
    body: `<p>Claims workflows bring together forms, correspondence, images, policies, and external evidence. When that material is scattered, reviewers spend time locating facts instead of assessing the claim.</p>
      <h2>Extract, then verify</h2><p>Document AI can classify incoming material and propose fields or summaries. Each extracted fact should remain connected to its source. Confidence thresholds and exception queues help route uncertain cases to a person.</p>
      <h2>Respect the decision boundary</h2><p>Automation can prepare a file, identify missing information, and suggest the next review step. Coverage judgments and consequential decisions need explicit ownership and appropriate human review.</p>
      <h2>Improve the process, not just the model</h2><p>Track rework, document quality, review time, and the reasons staff override suggested outputs. These signals reveal whether the workflow is actually becoming more useful.</p>
      <p>Explore <a href="/industries/insurance">insurance applications</a> and <a href="/enterprise-ai-solutions">enterprise AI solutions</a>.</p>`,
  },
  {
    slug: "healthcare-ai-knowledge-access",
    title: "Safe Knowledge Access for Healthcare Teams",
    excerpt: "How healthcare teams can use cited, permission-aware knowledge retrieval for staff guidance while protecting privacy and keeping clinical judgment with professionals.",
    date: "2026-09-17",
    author: "Turbo AI",
    image: "/blog/fresh/27-business-planning.jpg",
    tags: ["Healthcare", "Knowledge", "Responsible AI"],
    keywords: "healthcare AI knowledge access, governed retrieval, responsible AI healthcare",
    body: `<p>Healthcare organizations manage policies, care pathways, operating procedures, and administrative guidance across many systems. Finding the current, authorized answer can be difficult even before AI enters the picture.</p>
      <h2>Define the audience and sources</h2><p>A staff knowledge assistant should retrieve only approved material for the user's role. Source ownership, revision dates, and access permissions matter as much as search quality.</p>
      <h2>Make uncertainty visible</h2><p>Answers should cite the underlying document and make it easy to inspect. When sources conflict or the question goes beyond the system's scope, the assistant should say so and direct the user to an appropriate person.</p>
      <h2>Keep clinical judgment separate</h2><p>Knowledge access is not a substitute for a clinician's assessment. Evaluate privacy, accuracy, accessibility, and escalation before expanding the workflow to more sensitive contexts.</p>
      <p>Read about <a href="/industries/healthcare">AI for healthcare</a> and <a href="/ai-governance-cybersecurity">AI governance</a>.</p>`,
  },
  {
    slug: "manufacturing-predictive-maintenance-workflow",
    title: "Predictive Maintenance That Fits Manufacturing Workflows",
    excerpt: "Connect machine telemetry, operating context, technician validation, and work orders to make predictive maintenance useful in real manufacturing workflows.",
    date: "2026-09-16",
    author: "Turbo AI",
    image: "/blog/fresh/28-customer-service.jpg",
    tags: ["Manufacturing", "Maintenance", "Operations"],
    keywords: "manufacturing predictive maintenance, equipment analytics, industrial AI",
    body: `<p>A model can detect unusual machine behavior, but an operations team needs to know what to inspect, when, and why. Predictive maintenance succeeds when data and work orders meet in the same process.</p>
      <h2>Establish a usable baseline</h2><p>Map sensors to the correct equipment and record operating modes, maintenance events, and known failure conditions. Quality checks should catch missing periods and instrumentation changes before alerts are trusted.</p>
      <h2>Prioritize actionable exceptions</h2><p>Present risk alongside production schedules, spare-parts availability, and safety constraints. An alert that cannot be investigated or scheduled has limited operational value.</p>
      <h2>Learn from technicians</h2><p>Capture what teams found, whether the alert was useful, and what action followed. These outcomes help improve thresholds and keep the system aligned with changing equipment and processes.</p>
      <p>Explore <a href="/industries/manufacturing">manufacturing AI</a> and <a href="/enterprise-ai-solutions">predictive maintenance solutions</a>.</p>`,
  },
  {
    slug: "construction-project-intelligence",
    title: "Connecting Construction Data to Project Decisions",
    excerpt: "Bring construction schedules, site reports, current documents, and equipment constraints into reviewable project decisions and better team handoffs.",
    date: "2026-09-15",
    author: "Turbo AI",
    image: "/blog/fresh/29-supply-chain.jpg",
    tags: ["Construction", "Project Intelligence", "Data"],
    keywords: "construction project intelligence, AI construction planning, site data",
    body: `<p>Construction teams make decisions from schedules, site observations, supplier updates, and documents that often live in separate tools. Better intelligence begins with a shared view of what changed and who needs to respond.</p>
      <h2>Connect the record of work</h2><p>Link project documents and field reports to locations, activities, and dates. Preserve the source of each update so teams can distinguish a confirmed issue from an unverified note.</p>
      <h2>Surface risk early</h2><p>Analytics can highlight schedule dependencies, equipment constraints, and recurring safety observations. Present these as reviewable signals, not automatic project conclusions.</p>
      <h2>Keep adoption practical</h2><p>Bring insights into the meetings and tools that project managers already use. Evaluate whether teams resolve issues sooner and spend less time reconciling conflicting information.</p>
      <p>See <a href="/industries/construction">construction applications</a> and <a href="/data-engineering-ai-foundations">data engineering foundations</a>.</p>`,
  },
  {
    slug: "retail-demand-customer-intelligence",
    title: "Retail Intelligence Across Demand, Inventory, and Service",
    excerpt: "Explore how retailers can connect demand, inventory, returns, and service signals while preserving local context, customer privacy, and human decisions.",
    date: "2026-09-14",
    author: "Turbo AI",
    image: "/blog/fresh/30-telecom.jpg",
    tags: ["Retail", "Customer Intelligence", "Forecasting"],
    keywords: "retail demand intelligence, AI inventory forecasting, customer analytics",
    body: `<p>Retail decisions span stores, digital channels, stock, promotions, and service. A forecast or recommendation has value only when teams understand the conditions behind it.</p>
      <h2>Join signals carefully</h2><p>Bring transaction, inventory, and service data into a consistent view while respecting consent and access rules. Distinguish local store effects from broader demand shifts.</p>
      <h2>Make recommendations explainable</h2><p>Show the demand signal, product availability, and uncertainty behind a suggestion. Store and merchandising teams need room to account for events that a model has not seen.</p>
      <h2>Measure more than clicks</h2><p>Review stock availability, service outcomes, returns, and customer experience together. This prevents one optimized metric from creating problems elsewhere in the operation.</p>
      <p>Explore <a href="/industries/retail">AI for retail</a> and <a href="/enterprise-ai-solutions">customer intelligence solutions</a>.</p>`,
  },
  {
    slug: "logistics-exception-management-ai",
    title: "AI-Assisted Exception Management in Logistics",
    excerpt: "A practical exception-management workflow for logistics teams that connects shipment events, inventory, and commitments to prioritized human action.",
    date: "2026-09-13",
    author: "Turbo AI",
    image: "/blog/fresh/31-engineering.jpg",
    tags: ["Logistics", "Supply Chain", "Decision Support"],
    keywords: "logistics exception management, supply chain AI, shipment analytics",
    body: `<p>Supply-chain teams encounter delays, stock imbalances, and supplier changes throughout the day. The goal of AI is not to produce more alerts; it is to make the most consequential exceptions easier to understand and resolve.</p>
      <h2>Build a timely operational view</h2><p>Connect shipment events, inventory positions, orders, and supplier updates. Record when each source last changed so a late feed does not look like a current fact.</p>
      <h2>Rank by business impact</h2><p>Consider delivery commitments, available alternatives, and the cost of delay. Show why a case was prioritized and let planners adjust the recommendation when local context changes.</p>
      <h2>Close the loop</h2><p>Capture which action was taken and whether it reduced disruption. This feedback supports a better exception process over time, even when forecasts remain imperfect.</p>
      <p>See <a href="/industries/supply-chain-logistics">supply-chain applications</a> and <a href="/enterprise-ai-solutions">enterprise AI solutions</a>.</p>`,
  },
  {
    slug: "telecom-network-incident-triage",
    title: "Network Incident Triage for Telecom Operators",
    excerpt: "Turn telecom alarms, topology, and service-impact data into a reviewable incident timeline with operator validation and controlled response.",
    date: "2026-09-12",
    author: "Turbo AI",
    image: "/blog/fresh/32-document-workflow.jpg",
    tags: ["Telecommunications", "Network Operations", "AI"],
    keywords: "telecom incident triage, AI network operations, network telemetry analytics",
    body: `<p>Telecom operators manage a distributed network where one issue can create many downstream alarms. Intelligent triage helps teams identify the likely service impact before they spend time on repetitive investigation.</p>
      <h2>Connect the network picture</h2><p>Relate telemetry, topology, change history, and customer-impact data. Without topology and timing, correlated alerts may still point to the wrong cause.</p>
      <h2>Support the operator</h2><p>Present a concise incident timeline, affected assets, and the evidence behind a suggested priority. Keep actions within approved operational procedures and role-based access.</p>
      <h2>Evaluate in production</h2><p>Monitor alert duplication, time to identify cause, and incident handoff quality. Review cases where the system grouped unrelated events or missed a dependency.</p>
      <p>Explore <a href="/industries/telecommunications">telecommunications AI</a> and <a href="/cloud-infrastructure-ai-compute">infrastructure capabilities</a>.</p>`,
  },
  {
    slug: "data-centre-capacity-intelligence",
    title: "Data Centre Capacity Intelligence Beyond Dashboards",
    excerpt: "Learn how data-centre teams can assess usable capacity across racks, power, cooling, assets, and planned workloads with traceable engineering review.",
    date: "2026-09-11",
    author: "Turbo AI",
    image: "/blog/fresh/33-insight-operations.jpg",
    tags: ["Data Centres", "Infrastructure", "Capacity Planning"],
    keywords: "data centre capacity intelligence, DCIM analytics, power cooling planning",
    body: `<p>Capacity decisions depend on more than a count of empty racks. Power, cooling, equipment age, and planned workloads all shape whether space is genuinely available.</p>
      <h2>Unify the infrastructure record</h2><p>Connect asset inventories, rack layouts, power feeds, environmental data, and incident history. Keep location and configuration changes current so planning is based on the actual estate.</p>
      <h2>Model operational constraints</h2><p>Compare possible placements against power and cooling limits, maintenance windows, and reliability requirements. Treat model output as planning support rather than an automatic change request.</p>
      <h2>Plan and learn</h2><p>Review forecast accuracy and the operational effect of each decision. A strong capacity view helps teams discuss trade-offs before they become urgent constraints.</p>
      <p>Explore <a href="/industries/data-centres">AI for data centres</a> and <a href="/cloud-infrastructure-ai-compute">cloud and AI compute services</a>.</p>`,
  },
];

const imageAlt: Record<string, string> = {
  "energy-ai-asset-intelligence-foundations": "Industrial pipes and equipment at an energy facility",
  "financial-services-ai-fraud-review": "Interior of a financial services office",
  "insurance-claims-document-intelligence": "Professionals reviewing documents in an office",
  "healthcare-ai-knowledge-access": "Healthcare professionals working in a clinical setting",
  "manufacturing-predictive-maintenance-workflow": "Industrial assembly line with equipment in operation",
  "construction-project-intelligence": "Construction workers coordinating work at a building site",
  "retail-demand-customer-intelligence": "Retail store interior with merchandise on display",
  "logistics-exception-management-ai": "Warehouse workers moving goods near storage racks",
  "telecom-network-incident-triage": "Telecommunications towers supporting a network",
  "data-centre-capacity-intelligence": "Rows of server racks inside a data centre",
};

export const industryInsights: BlogPost[] = insightDrafts.map((post) => ({
  ...post,
  imageAlt: imageAlt[post.slug],
  body: `${post.body}${industryInsightFollowUps[post.slug] || ""}<h2>Review before expansion</h2><p>${industryInsightChecks[post.slug] || ""}</p>${industryInsightDetails[post.slug] || ""}`,
}));
