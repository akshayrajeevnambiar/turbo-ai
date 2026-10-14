import blogGridImage from "../assets/blog-grid-analytics.jpg";
import blogMaintenanceImage from "../assets/blog-predictive-maintenance.jpg";
import blogHydrogenImage from "../assets/blog-hydrogen-facility.jpg";
import dciImage from "../assets/dci-data-center.webp";
import oilAndGasImage from "../assets/energy-hero-platform.jpg";

const photo = (name: string) => `/enterprise/${name}`;

export interface Diagram {
  title: string;
  subtitle?: string;
  steps: string[];
}

export interface ContentBlock {
  eyebrow?: string;
  title: string;
  body: string;
  items?: string[];
  image?: string;
  imageAlt?: string;
}

export interface DetailSection {
  eyebrow?: string;
  title: string;
  intro: string;
  items: { title: string; body: string }[];
}

export interface EnterprisePageContent {
  seoKey: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  diagrams?: Diagram[];
  blocks: ContentBlock[];
  detailSections?: DetailSection[];
  technologies?: string[];
  ctaTitle: string;
  ctaBody: string;
}

export interface IndustryCard {
  name: string;
  description: string;
  image: string;
  alt: string;
  applications: string[];
  href: string;
  relatedHref: string;
  foundation: string;
  outcome: string;
}

export interface ProductCard {
  name: string;
  purpose: string;
  problem: string;
  capabilities: string[];
  diagram: Diagram;
  ctaHref: string;
}

export const enterprisePages: Record<string, EnterprisePageContent> = {
  generativeAgenticAI: {
    seoKey: "generativeAgenticAI",
    eyebrow: "Enterprise AI Systems",
    title: "Generative & Agentic AI",
    subtitle: "From AI That Answers to AI That Acts",
    intro:
      "Turbo AI helps organizations move from isolated generative AI experiments to secure, integrated systems that support knowledge work, automate workflows, and stay accountable to human oversight.",
    heroImage: photo("ai-team.jpg"),
    heroAlt: "Engineers collaborating at a technology workshop",
    diagrams: [
      {
        title: "Traditional Software",
        subtitle: "Deterministic logic",
        steps: ["Input", "Rules", "Output"],
      },
      {
        title: "Generative AI",
        subtitle: "Knowledge and content assistance",
        steps: ["Question", "Model", "Response"],
      },
      {
        title: "Agentic AI",
        subtitle: "Goal-directed enterprise workflow",
        steps: ["Objective", "Reasoning", "Information", "Tools", "Action", "Verification"],
      },
    ],
    blocks: [
      {
        eyebrow: "Generative AI",
        title: "Enterprise Generative AI",
        body:
          "We design generative AI capabilities around real operating context: trusted content, secure access, measurable usefulness, and workflows employees can rely on.",
        items: [
          "Enterprise AI Assistants",
          "AI Copilots",
          "Knowledge Assistants",
          "Enterprise Search",
          "RAG",
          "Document Intelligence",
          "Natural Language Interfaces",
          "Research Assistants",
          "Internal Knowledge Systems",
        ],
      },
      {
        eyebrow: "Agentic AI",
        title: "AI Agents With Control, Context, and Evaluation",
        body:
          "Agentic systems need more than prompts. They require defined tools, permission boundaries, observability, evaluation, and human-in-the-loop controls before they can be trusted inside enterprise workflows.",
        items: [
          "AI Agents",
          "Multi-Agent Systems",
          "Agent Orchestration",
          "Tool Integration",
          "Workflow Automation",
          "Human-in-the-Loop",
          "Agent Evaluation",
          "Agent Observability",
          "MCP Integrations",
        ],
      },
    ],
    detailSections: [
      {
        eyebrow: "Enterprise Applications",
        title: "Where generative and agentic AI fit",
        intro: "Generative systems help people work with information. Agents can carry out bounded steps across approved tools, with permissions and review matched to the risk of each action.",
        items: [
          { title: "Knowledge and document work", body: "Ground answers in approved enterprise sources, show evidence, and route uncertain results to a person." },
          { title: "Service workflows", body: "Assist with triage, drafting, and next steps while keeping customer records and decisions under controlled access." },
          { title: "Tool-using agents", body: "Give agents narrow tool permissions, clear goals, audit trails, and a human approval point before consequential actions." },
        ],
      },
    ],
    technologies: ["OpenAI", "Anthropic", "Microsoft", "Google", "NVIDIA"],
    ctaTitle: "Design AI that can be trusted in the workflow.",
    ctaBody: "Start with a bounded use case, a clear control model, and a path to production.",
  },
  dataFoundations: {
    seoKey: "dataFoundations",
    eyebrow: "Data and AI Foundations",
    title: "Data Engineering & AI Foundations",
    subtitle: "Building the Data Foundation for Intelligence",
    intro:
      "Enterprise AI depends on reliable data movement, governed data products, and operational pipelines that can support analytics, automation, and machine learning in production.",
    heroImage: photo("data-centre-operations.jpg"),
    heroAlt: "Server infrastructure supporting enterprise data workloads",
    diagrams: [
      {
        title: "Enterprise Data Architecture",
        steps: [
          "Enterprise Sources",
          "Data Integration",
          "Lakehouse",
          "Governance",
          "Analytics / AI",
          "Enterprise Applications",
        ],
      },
      {
        title: "ADRS Workflow",
        subtitle: "Conservative detection and response model",
        steps: ["Detection", "Analysis", "Risk Identification", "Alert", "Response"],
      },
    ],
    blocks: [
      {
        title: "Data Engineering for AI-Ready Operations",
        body:
          "We build the pipelines, lakehouse patterns, metadata practices, and quality controls that give AI systems dependable data to work from.",
        items: [
          "Data Engineering",
          "Data Integration",
          "Data Migration",
          "Data Lakehouse",
          "Data Governance",
          "Metadata",
          "Data Quality",
          "Data Lineage",
          "Batch Processing",
          "Streaming",
          "Real-Time Analytics",
          "AI/ML Pipelines",
          "MLOps",
        ],
      },
      {
        eyebrow: "Proprietary Capability",
        title: "i-Lakehouse",
        body:
          "i-Lakehouse is presented as Turbo AI's modern data and AI foundation capability, helping organizations organize governed enterprise data for analytics, AI, and application use cases.",
      },
      {
        eyebrow: "Detection and Response",
        title: "Autonomous Detection & Response System",
        body:
          "ADRS brings detection, assessment, and response into a connected workflow. Teams can review signals in context, identify emerging risks, and coordinate the next action with greater clarity.",
      },
    ],
    detailSections: [
      {
        eyebrow: "Data Foundation",
        title: "From fragmented sources to usable data",
        intro: "AI depends on reliable movement, quality, ownership, and access to data. Modernization begins with the systems and decisions that matter most, then expands through governed data products.",
        items: [
          { title: "Integrate and modernize", body: "Connect existing applications, files, and event streams without assuming every workload must move at once." },
          { title: "Quality and lineage", body: "Validate critical fields, document transformations, and make the origin of important data inspectable." },
          { title: "i-Lakehouse", body: "Organize open, governed data for analytics and AI across cloud, hybrid, on-premise, and edge environments." },
          { title: "ADRS", body: "Feed detection and risk-identification workflows with dependable signals; response remains subject to defined controls and oversight." },
        ],
      },
    ],
    technologies: ["Apache Iceberg", "Databricks", "Snowflake", "Apache Spark", "NVIDIA"],
    ctaTitle: "Make enterprise data usable by intelligent systems.",
    ctaBody: "We can help assess the data foundation required for your AI roadmap.",
  },
  aiEngineering: {
    seoKey: "aiEngineering",
    eyebrow: "Engineering and Delivery",
    title: "AI Engineering & Software Development",
    subtitle: "Engineering Intelligence Into Enterprise Applications",
    intro:
      "Turbo AI combines product thinking, software engineering, and applied AI delivery to build applications that move from prototype to production with discipline.",
    heroImage: photo("software-engineering.jpg"),
    heroAlt: "Software engineers working together at laptops",
    diagrams: [
      {
        title: "AI Engineering Lifecycle",
        steps: [
          "Business Requirement",
          "Architecture",
          "Prototype",
          "Validation",
          "Engineering",
          "Production",
          "Continuous Improvement",
        ],
      },
    ],
    blocks: [
      {
        title: "Production AI Software",
        body:
          "We engineer AI into applications, platforms, and workflows with attention to usability, integrations, reliability, security, and maintainability.",
        items: [
          "Enterprise AI applications",
          "SaaS platforms",
          "AI copilots",
          "RAG applications",
          "Intelligent automation",
          "Application modernisation",
        ],
      },
      {
        title: "Built With Engineering Discipline",
        body:
          "AI delivery succeeds when the software around the model is strong: architecture, testing, deployment, monitoring, and continuous improvement are treated as part of the product.",
      },
    ],
    detailSections: [
      {
        eyebrow: "Delivery Lifecycle",
        title: "From requirement to reliable operation",
        intro: "Each stage has a clear output and a decision point so promising prototypes do not become unowned production systems.",
        items: [
          { title: "Business requirement", body: "Define the user workflow, measurable objective, constraints, and who will own the result." },
          { title: "Architecture", body: "Select data, application, model, integration, and security patterns that fit the existing environment." },
          { title: "Prototype", body: "Test the highest-risk assumptions with representative data and a bounded user journey." },
          { title: "Validation", body: "Evaluate quality, reliability, failure modes, accessibility, and human review before wider release." },
          { title: "Engineering", body: "Build tested interfaces, APIs, pipelines, and deployment automation around the model or workflow." },
          { title: "Production", body: "Release with access controls, monitoring, support ownership, and rollback procedures." },
          { title: "Continuous improvement", body: "Review feedback, drift, incidents, and cost; update the system when needs and evidence change." },
        ],
      },
      {
        eyebrow: "Engineering Capabilities",
        title: "Software that makes AI usable",
        intro: "The model is one part of a dependable enterprise application. The surrounding software determines whether people can trust and operate it.",
        items: [
          { title: "Enterprise AI applications", body: "Connect AI functions to roles, business rules, records, and existing work rather than isolating them in demos." },
          { title: "SaaS and product engineering", body: "Design usable interfaces and scalable services with clear tenancy, security, and maintenance boundaries." },
          { title: "Copilots and RAG", body: "Build assistants around governed retrieval, cited answers, evaluation, and appropriate human oversight." },
          { title: "Intelligent automation", body: "Orchestrate repetitive steps with validation, exception paths, and accountable approvals." },
          { title: "Application modernization", body: "Improve existing systems and integrations incrementally while preserving operational continuity." },
          { title: "MLOps and LLMOps", body: "Version data and models, automate testing and deployment, and monitor behavior after release." },
        ],
      },
    ],
    technologies: ["Python", "GitHub", "Docker", "Kubernetes", "Terraform"],
    ctaTitle: "Turn AI prototypes into usable enterprise software.",
    ctaBody: "Bring us a workflow, application idea, or stalled pilot and we will help shape the delivery path.",
  },
  governanceCybersecurity: {
    seoKey: "governanceCybersecurity",
    eyebrow: "Trust, Risk, and Security",
    title: "AI Governance & Cybersecurity",
    subtitle: "Innovation Requires Trust",
    intro:
      "Turbo AI helps organizations establish the policies, controls, security practices, and oversight needed to adopt AI responsibly in complex enterprise environments.",
    heroImage: photo("security-operations.jpg"),
    heroAlt: "Analysts collaborating in a cyber operations centre",
    blocks: [
      {
        eyebrow: "AI Governance",
        title: "Responsible AI Operating Models",
        body:
          "Governance turns AI from an experiment into an accountable enterprise capability. We help define the controls needed across data, models, applications, and users.",
        items: [
          "AI governance frameworks",
          "AI policies",
          "AI risk assessment",
          "Model governance",
          "AI lifecycle controls",
          "Human oversight",
          "Responsible AI",
          "AI observability",
          "Data governance",
          "Auditability",
        ],
      },
      {
        eyebrow: "Security",
        title: "Cybersecurity for AI-Enabled Enterprises",
        body:
          "AI introduces new threat surfaces across prompts, data access, APIs, applications, identities, and model behavior. We assess and strengthen these systems before they scale.",
        items: [
          "AI/LLM security assessment",
          "Application security",
          "API security",
          "Prompt-injection assessment",
          "Data leakage assessment",
          "Identity and access management",
          "Threat modelling",
          "Vulnerability assessment",
          "Penetration testing",
        ],
      },
    ],
    detailSections: [
      {
        eyebrow: "Operating Controls",
        title: "Governance across the AI lifecycle",
        intro: "Controls should be proportionate to the use case, the data it touches, and the impact of a wrong or unauthorized result. Frameworks can guide assessment; listing them does not claim certification.",
        items: [
          { title: "Risk and responsibility", body: "Document intended use, owners, evaluation criteria, escalation paths, and the human decisions that must remain explicit." },
          { title: "Identity and data access", body: "Apply least privilege to users, tools, APIs, and retrieval sources; inspect how sensitive information moves." },
          { title: "Monitoring and response", body: "Observe model behavior and security events, investigate anomalies, and maintain a practical incident-response process." },
        ],
      },
    ],
    technologies: ["NIST", "ISO 27001", "ISO 42001", "SOC 2"],
    ctaTitle: "Build confidence before AI scales.",
    ctaBody: "We can help review governance, security, and operational risk for your AI initiatives.",
  },
  cloudCompute: {
    seoKey: "cloudCompute",
    eyebrow: "Cloud and Compute",
    title: "Cloud, Infrastructure & AI Compute",
    subtitle: "Infrastructure for the Intelligent Enterprise",
    intro:
      "AI workloads need cloud architecture, data platforms, compute planning, observability, and automation that can support both experimentation and production demand.",
    heroImage: photo("data-centre.jpg"),
    heroAlt: "Rows of server racks inside a data centre",
    diagrams: [
      {
        title: "AI Infrastructure Architecture",
        steps: ["Data", "Compute", "Models", "AI Services", "Enterprise Applications"],
      },
    ],
    blocks: [
      {
        title: "Infrastructure for AI-Driven Operations",
        body:
          "We design cloud and platform foundations for enterprise AI: resilient, observable, automated, and aligned to the workloads they need to run.",
        items: [
          "Cloud architecture",
          "Hybrid cloud",
          "Multi-cloud",
          "Cloud migration",
          "Cloud optimisation",
          "Infrastructure automation",
          "Kubernetes",
          "Infrastructure as Code",
          "Platform engineering",
          "Observability",
          "Performance optimisation",
          "AI compute architecture",
        ],
      },
    ],
    detailSections: [
      {
        eyebrow: "AI Compute",
        title: "Infrastructure matched to model workloads",
        intro: "Training, tuning, retrieval, and inference place different demands on compute, storage, networking, latency, and cost. The right architecture starts with the workload and the data it needs.",
        items: [
          { title: "Accelerated compute", body: "Plan GPU and other accelerator capacity around model size, utilization, scheduling, and the economics of each workload." },
          { title: "Data and compute placement", body: "Keep data movement, locality, privacy, and network throughput visible when choosing cloud, hybrid, or on-premise deployment." },
          { title: "Reliable deployment", body: "Use repeatable infrastructure, monitoring, access controls, and recovery practices so services remain observable in production." },
          { title: "Scale with evidence", body: "Measure latency, throughput, resilience, and cost before expanding capacity or changing deployment patterns." },
        ],
      },
    ],
    technologies: ["AWS", "Microsoft Azure", "Google Cloud", "NVIDIA", "Kubernetes"],
    ctaTitle: "Prepare your infrastructure for enterprise AI.",
    ctaBody: "We can help map workloads, risks, and platform requirements before major investment.",
  },
  enterpriseSolutions: {
    seoKey: "enterpriseSolutions",
    eyebrow: "Enterprise AI Solutions",
    title: "Enterprise AI Solutions",
    subtitle: "Turning Business Problems Into Intelligent Systems",
    intro:
      "Turbo AI frames AI around business problems first, then designs the data, models, integrations, and governance needed to turn them into reliable enterprise systems.",
    heroImage: photo("data-centre-operations.jpg"),
    heroAlt: "Enterprise data-centre operations supporting intelligent systems",
    blocks: [
      {
        title: "Customer Intelligence",
        body: "Business problem: fragmented customer signals. AI approach: unify behavioral, transactional, and service data. Enterprise application: next-best-action, segmentation, and service prioritization. Expected value: clearer decisions and more relevant customer experiences.",
        image: photo("security-operations.jpg"),
        imageAlt: "Operations team reviewing enterprise signals and customer context",
      },
      {
        title: "Intelligent Document Processing",
        body: "Business problem: high-volume manual document handling. AI approach: extraction, classification, validation, and human review. Enterprise application: claims, contracts, invoices, onboarding, and compliance workflows. Expected value: faster throughput and fewer manual bottlenecks.",
        image: photo("ai-team.jpg"),
        imageAlt: "Technology team collaborating on an intelligent workflow",
      },
      {
        title: "Knowledge Intelligence",
        body: "Business problem: expertise trapped across documents and teams. AI approach: governed retrieval, semantic search, and knowledge assistants. Enterprise application: internal support, research, policy lookup, and decision preparation. Expected value: faster access to trusted information.",
        image: photo("strategy-meeting.jpg"),
        imageAlt: "Team reviewing information together in a meeting room",
      },
      {
        title: "Predictive Maintenance",
        body: "Business problem: unplanned downtime and limited asset visibility. AI approach: telemetry analysis, anomaly detection, and maintenance prioritization. Enterprise application: industrial asset monitoring and work-order intelligence. Expected value: better planning and reduced operational disruption.",
        image: blogMaintenanceImage,
        imageAlt: "Technician inspecting industrial equipment for maintenance planning",
      },
      {
        title: "Decision Intelligence",
        body: "Business problem: slow decisions across complex operating data. AI approach: signal aggregation, scenario analysis, and decision support. Enterprise application: executive dashboards, operational command centers, and planning workflows. Expected value: decisions with more context and traceability.",
        image: blogGridImage,
        imageAlt: "Operations control room with live performance dashboards",
      },
      {
        title: "Intelligent Automation",
        body: "Business problem: repetitive processes that strain teams. AI approach: workflow automation with validation and exception handling. Enterprise application: service operations, finance workflows, and back-office processes. Expected value: more consistent execution and better use of skilled staff time.",
        image: blogHydrogenImage,
        imageAlt: "Engineer working beside industrial process equipment",
      },
      {
        title: "Fraud & Anomaly Detection",
        body: "Business problem: risks hidden in high-volume transaction patterns. AI approach: anomaly detection, behavioral modeling, and alert triage. Enterprise application: payment monitoring, claims review, and security operations. Expected value: earlier detection and more focused investigation.",
        image: dciImage,
        imageAlt: "Data-centre infrastructure monitored for operational anomalies",
      },
      {
        title: "Supply-Chain Intelligence",
        body: "Business problem: limited visibility across demand, inventory, and logistics. AI approach: forecasting, event detection, and decision support. Enterprise application: logistics planning, inventory risk review, and supplier monitoring. Expected value: better resilience and coordination.",
        image: photo("enterprise-supply-chain.jpg"),
        imageAlt: "Container terminal at the Port of Montreal supporting supply-chain operations",
      },
    ],
    ctaTitle: "Start with the problem worth solving.",
    ctaBody: "We can help translate a business workflow into an AI solution architecture.",
  },
};

export const industriesWeServe: IndustryCard[] = [
  {
    name: "Financial Services",
    description:
      "Financial institutions need secure, explainable intelligence across risk, operations, customers, and compliance. AI can support better prioritization, document workflows, fraud detection, and decision intelligence.",
    image: photo("finance.jpg"),
    alt: "Interior of a financial services office",
    applications: ["Fraud detection", "Document intelligence", "Customer analytics"],
    href: "/industries/financial-services",
    relatedHref: "/enterprise-ai-solutions",
    foundation: "Bring transaction, customer, and risk data into governed pipelines with traceable access and review.",
    outcome: "Help analysts prioritize exceptions and serve customers with more relevant context.",
  },
  {
    name: "Insurance",
    description:
      "Insurance teams manage high document volume, risk assessment, claims complexity, and regulatory expectations. AI can help accelerate review while keeping human oversight in the loop.",
    image: photo("insurance.jpg"),
    alt: "Two professionals reviewing documents in an office",
    applications: ["Claims triage", "Policy intelligence", "Anomaly detection"],
    href: "/industries/insurance",
    relatedHref: "/enterprise-ai-solutions",
    foundation: "Organize policy, claims, and correspondence data so reviewers can find the right evidence without losing oversight.",
    outcome: "Reduce repetitive document work while keeping consequential decisions with accountable teams.",
  },
  {
    name: "Healthcare",
    description:
      "Healthcare organizations require careful, privacy-aware technology that supports clinicians, administrators, and patients. AI can improve knowledge access, operations, and document-heavy workflows when governed properly.",
    image: photo("healthcare.jpg"),
    alt: "Healthcare professionals working together in a clinical setting",
    applications: ["Knowledge assistants", "Operations analytics", "Document processing"],
    href: "/industries/healthcare",
    relatedHref: "/ai-governance-cybersecurity",
    foundation: "Design privacy-aware access to clinical and administrative information before introducing assistants or analytics.",
    outcome: "Support faster knowledge access and more consistent operations without replacing clinical judgment.",
  },
  {
    name: "Manufacturing",
    description:
      "Manufacturers depend on equipment uptime, quality, supply continuity, and production visibility. AI can connect operational data to practical decision support across plants and teams.",
    image: photo("manufacturing.png"),
    alt: "Manufacturing assembly line inside a production facility",
    applications: ["Predictive maintenance", "Quality intelligence", "Production analytics"],
    href: "/industries/manufacturing",
    relatedHref: "/enterprise-ai-solutions",
    foundation: "Unify production, quality, and equipment signals in data products that engineers can trust.",
    outcome: "Improve planning around maintenance, throughput, and quality exceptions.",
  },
  {
    name: "Construction",
    description:
      "Construction programs involve moving schedules, site conditions, documents, suppliers, and equipment. AI can support planning visibility, risk identification, and project knowledge management.",
    image: photo("construction.jpg"),
    alt: "Workers coordinating activity on a construction site",
    applications: ["Project intelligence", "Safety analytics", "Equipment monitoring"],
    href: "/industries/construction",
    relatedHref: "/enterprise-ai-solutions",
    foundation: "Connect schedules, site reports, equipment records, and project documents across delivery teams.",
    outcome: "Surface emerging project risks earlier and make field knowledge easier to act on.",
  },
  {
    name: "Automotive & Mobility",
    description:
      "Mobility businesses manage connected operations across manufacturing, service, logistics, and customer experience. AI can support quality, forecasting, service intelligence, and operational automation.",
    image: photo("automotive.jpg"),
    alt: "Automotive assembly line in a vehicle factory",
    applications: ["Quality analytics", "Service copilots", "Supply forecasting"],
    href: "/industries/automotive-mobility",
    relatedHref: "/ai-engineering-software-development",
    foundation: "Join manufacturing, service, and supply data across the vehicle lifecycle with reliable integration.",
    outcome: "Give teams stronger quality signals and more responsive service workflows.",
  },
  {
    name: "Mining",
    description:
      "Mining teams need reliable equipment, connected site data, and clear production signals. AI can support maintenance planning, processing insight, and operational knowledge across remote assets.",
    image: photo("mining.jpg"),
    alt: "Open-pit mine with terraced rock benches and processing infrastructure",
    applications: ["Predictive maintenance", "Processing analytics", "Operational knowledge"],
    href: "/industries/mining",
    relatedHref: "/data-engineering-ai-foundations",
    foundation: "Connect equipment telemetry, maintenance records, production logs, and approved technical documents through consistent asset identifiers. Validate sensor quality and time alignment so site engineers can trace each recommendation back to its source.",
    outcome: "Help mine teams prioritize inspections, investigate production losses, and plan interventions with evidence from across the operation.",
  },
  {
    name: "Real Estate",
    description:
      "Real estate teams coordinate leases, properties, service requests, and portfolio performance. AI can simplify document review and connect building operations to better-informed property decisions.",
    image: photo("real-estate.jpg"),
    alt: "Toronto skyline with commercial towers and residential buildings at dusk",
    applications: ["Lease intelligence", "Property operations", "Portfolio analytics"],
    href: "/industries/real-estate",
    relatedHref: "/generative-ai-agentic-ai",
    foundation: "Organize leases, asset registers, work orders, and authorized property data around a shared property record. Keep document versions, access permissions, and source references visible to leasing and operations teams.",
    outcome: "Reduce repetitive lease review and help property managers coordinate service, maintenance, and portfolio reporting with clearer context.",
  },
  {
    name: "Oil & Gas",
    description:
      "Oil and gas operators manage distributed assets, process data, and complex engineering records. AI can support equipment reliability, production monitoring, and technical knowledge with accountable operational review.",
    image: oilAndGasImage,
    alt: "Offshore oil and gas platform with processing equipment and access walkways",
    applications: ["Asset reliability", "Production intelligence", "Engineering assistants"],
    href: "/industries/oil-and-gas",
    relatedHref: "/enterprise-ai-solutions",
    foundation: "Bring historian data, inspection findings, work orders, and approved engineering documents into governed pipelines. Preserve operating context, asset lineage, and separation from control systems so engineers can evaluate signals before acting.",
    outcome: "Help operations teams investigate production deviations, prioritize maintenance, and retrieve technical evidence with clear human ownership.",
  },
  {
    name: "Retail",
    description:
      "Retail teams work across demand, inventory, pricing, service, and digital commerce. AI can strengthen customer intelligence and automate knowledge-heavy operational workflows.",
    image: photo("retail.jpg"),
    alt: "Interior of a retail store with merchandise displays",
    applications: ["Customer intelligence", "Demand signals", "Service automation"],
    href: "/industries/retail",
    relatedHref: "/enterprise-ai-solutions",
    foundation: "Connect store, commerce, inventory, and service signals without treating customers as a single data point.",
    outcome: "Improve demand decisions and help teams respond to customers with useful context.",
  },
  {
    name: "Supply Chain & Logistics",
    description:
      "Supply-chain networks require better visibility across inventory, transportation, facilities, and disruption signals. AI can improve forecasting, exception handling, and decision support.",
    image: photo("supply-chain-logistics.jpg"),
    alt: "Forklift loading palletized cargo into a shipping container",
    applications: ["Logistics intelligence", "Inventory risk", "Route and demand analysis"],
    href: "/industries/supply-chain-logistics",
    relatedHref: "/enterprise-ai-solutions",
    foundation: "Link inventory, shipment, supplier, and demand data into a timely operational view.",
    outcome: "Spot exceptions sooner and improve coordination across planning and fulfillment.",
  },
  {
    name: "Telecommunications",
    description:
      "Telecommunications providers operate distributed networks, service workflows, customer data, and infrastructure programs. AI can support network operations, customer service, and field intelligence.",
    image: photo("telecom.jpg"),
    alt: "Telecommunications towers supporting a distributed network",
    applications: ["Network operations", "Customer assistants", "Incident triage"],
    href: "/industries/telecommunications",
    relatedHref: "/cloud-infrastructure-ai-compute",
    foundation: "Bring network telemetry, incident records, and customer-service signals together with appropriate access controls.",
    outcome: "Help operators triage incidents and plan interventions across distributed assets.",
  },
  {
    name: "Utilities",
    description:
      "Utilities balance asset reliability, regulatory duties, demand shifts, and field operations. AI can support grid analytics, outage intelligence, and maintenance planning.",
    image: photo("utilities-substation-canada.jpg"),
    alt: "Industrial utility facility on the waterfront in North Vancouver, Canada",
    applications: ["Grid intelligence", "Asset analytics", "Outage support"],
    href: "/industries/utilities",
    relatedHref: "/enterprise-ai-solutions",
    foundation: "Combine grid, asset, weather, and field-service information within governed operational systems.",
    outcome: "Support outage response and maintenance planning with clearer evidence.",
  },
  {
    name: "Government",
    description:
      "Public-sector organizations need secure, accessible, and accountable technology. AI can improve citizen service, knowledge access, records workflows, and program operations when deployed with governance.",
    image: photo("government.jpg"),
    alt: "Centre Block on Parliament Hill in Ottawa",
    applications: ["Knowledge systems", "Document intelligence", "Service operations"],
    href: "/industries/government",
    relatedHref: "/ai-governance-cybersecurity",
    foundation: "Establish accessible, auditable information flows before deploying AI into public-service workflows.",
    outcome: "Make records and policy knowledge easier to use while preserving human accountability.",
  },
  {
    name: "Defence & Intelligence",
    description:
      "Defence and intelligence environments require careful controls, secure architectures, and human oversight. AI can help structure information, detect signals, and support analysis workflows.",
    image: photo("defence.jpg"),
    alt: "Personnel in a mission command operations centre",
    applications: ["Signal triage", "Knowledge intelligence", "Secure workflow automation"],
    href: "/industries/defence-intelligence",
    relatedHref: "/ai-governance-cybersecurity",
    foundation: "Apply least-privilege access, traceability, and human review to sensitive information workflows.",
    outcome: "Help authorized analysts identify relevant signals without weakening operational controls.",
  },
  {
    name: "Semiconductors",
    description:
      "Semiconductor operations involve complex engineering, supply chains, quality demands, and specialized data. AI can support process insight, engineering knowledge, and operational decision support.",
    image: photo("semiconductors.jpg"),
    alt: "Technician working inside a semiconductor clean room",
    applications: ["Engineering intelligence", "Quality analytics", "Supply risk"],
    href: "/industries/semiconductors",
    relatedHref: "/data-engineering-ai-foundations",
    foundation: "Organize process, quality, and equipment data with lineage that engineers can inspect.",
    outcome: "Improve investigation of production variation and supply risk.",
  },
  {
    name: "Technology & SaaS",
    description:
      "Technology companies need to ship reliable products while integrating AI into user workflows. Turbo AI supports product architecture, AI engineering, observability, and secure delivery.",
    image: photo("software-engineering.jpg"),
    alt: "Software developers collaborating around laptops",
    applications: ["AI copilots", "SaaS engineering", "Product analytics"],
    href: "/industries/technology-saas",
    relatedHref: "/ai-engineering-software-development",
    foundation: "Design product telemetry, data access, and AI integration alongside secure software delivery.",
    outcome: "Ship AI features that can be tested, monitored, and improved after launch.",
  },
  {
    name: "Data Centres",
    description:
      "Data centres sit at the foundation of modern AI and cloud operations. AI can support infrastructure monitoring, energy optimization, capacity planning, and incident response.",
    image: photo("data-centre.jpg"),
    alt: "Server racks in a data centre",
    applications: ["Infrastructure monitoring", "Capacity planning", "Energy analytics"],
    href: "/industries/data-centres",
    relatedHref: "/cloud-infrastructure-ai-compute",
    foundation: "Bring power, cooling, capacity, and incident signals into an integrated infrastructure view.",
    outcome: "Give infrastructure teams a better basis for capacity planning and response.",
  },
];

export const productCards: ProductCard[] = [
  {
    name: "Seismic AI",
    purpose:
      "A Turbo AI product presence focused on applying intelligence to seismic and energy-domain data workflows.",
    problem:
      "Energy teams need better ways to interpret complex technical signals and support decisions across exploration and operations.",
    capabilities: [
      "Energy-domain AI positioning",
      "Signal and data interpretation workflows",
      "Decision-support context for technical teams",
    ],
    diagram: {
      title: "Seismic AI Conceptual Architecture",
      steps: ["Domain Data", "Signal Processing", "AI Analysis", "Expert Review", "Decision Support"],
    },
    ctaHref: "https://seismicai.ca",
  },
  {
    name: "DCI 360",
    purpose:
      "A proprietary Turbo AI capability presented for 360-degree enterprise intelligence and decision context.",
    problem:
      "Leaders often lack one governed view across operational signals, risks, controls, and decision workflows.",
    capabilities: [
      "Enterprise visibility model",
      "Decision context organization",
      "Workflow and control alignment",
    ],
    diagram: {
      title: "DCI 360 Conceptual View",
      steps: ["Signals", "Context", "Controls", "Insights", "Decisions"],
    },
    ctaHref: "/#connect",
  },
  {
    name: "i-Lakehouse",
    purpose:
      "Turbo AI's modern data and AI foundation capability for organizing governed enterprise data for analytics and AI.",
    problem:
      "AI initiatives stall when data is fragmented, poorly governed, or disconnected from business applications.",
    capabilities: [
      "Lakehouse foundation planning",
      "Governance and metadata orientation",
      "Analytics and AI data readiness",
    ],
    diagram: {
      title: "i-Lakehouse Architecture",
      steps: ["Sources", "Integration", "Lakehouse", "Governance", "Analytics", "AI Apps"],
    },
    ctaHref: "/#connect",
  },
  {
    name: "ADRS",
    purpose:
      "Autonomous Detection & Response System, presented conservatively as a detection-to-response workflow capability.",
    problem:
      "Enterprise teams need earlier identification of operational, security, or data risks and a clearer response path.",
    capabilities: [
      "Detection workflow",
      "Analysis and risk identification",
      "Alerting and response coordination",
    ],
    diagram: {
      title: "ADRS Workflow",
      steps: ["Detection", "Analysis", "Risk Identification", "Alert", "Response"],
    },
    ctaHref: "/#connect",
  },
];

export const productsHero = {
  image: photo("semiconductors.jpg"),
  alt: "Semiconductor manufacturing equipment representing intelligent technology platforms",
};

export const aboutTurboAI = {
  seoKey: "aboutTurboAI",
  eyebrow: "About Turbo AI",
  title: "About Turbo AI",
  subtitle: "Building the Intelligent Enterprise",
  image: photo("government.jpg"),
  alt: "Canadian public institution representing responsible technology and enterprise partnership",
  introduction: "Turbo AI is an enterprise technology company connecting AI strategy with data engineering, software delivery, security, and infrastructure. We focus on practical systems that teams can use, govern, and improve over time.",
  mission: "To help organisations transform intelligence into measurable enterprise capability.",
  vision:
    "To become a trusted technology partner for organisations building the intelligent enterprise.",
  approach: "Strategy With the Capacity to Become Reality",
  approachBody: "We start with the operating problem, assess the data and technology environment, and design a delivery path that joins AI with software engineering, cloud infrastructure, security, and governance. This keeps transformation grounded in what an organisation can deploy and sustain.",
  principles: [
    { title: "Purpose Before Technology", body: "Define the business decision or workflow before choosing a model, platform, or tool." },
    { title: "Data as the Foundation", body: "Make quality, ownership, and access to data part of the solution from the beginning." },
    { title: "Security by Design", body: "Plan identity, privacy, and controls as core engineering requirements, not late additions." },
    { title: "Human + Machine Intelligence", body: "Use AI to support people, with oversight appropriate to the stakes of each decision." },
    { title: "Engineering Over Hype", body: "Favor tested integrations, reliability, and maintainable systems over isolated demonstrations." },
    { title: "Outcomes Over Novelty", body: "Evaluate work by its operational value and ability to improve over time." },
  ],
};

export const industriesHero = {
  seoKey: "industriesWeServe",
  eyebrow: "Industries We Serve",
  title: "Industries We Serve",
  subtitle: "AI Applied to the Real Economy",
  image: photo("industries-ontario-factory.jpg"),
  alt: "Aerial view of an industrial factory complex in Ontario, Canada",
};
