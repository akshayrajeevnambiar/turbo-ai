import type { LandingFAQItem } from "../components/LandingSEOSections";

interface ServiceLandingContent {
  overview: string;
  challenges: { title: string; body: string }[];
  opportunity: string;
  useCases: { title: string; body: string }[];
  process: { title: string; body: string }[];
  outcomes: string[];
  why: { title: string; body: string }[];
  faqs: LandingFAQItem[];
  insightSlugs: string[];
}

export const serviceLandingContent: Record<string, ServiceLandingContent> = {
  generativeAgenticAI: {
    overview: "Generative AI helps people work with enterprise information; agentic AI can coordinate bounded steps across approved tools. Both require reliable sources, clear permissions, evaluation, and human oversight before they belong in everyday operations.",
    challenges: [
      { title: "Knowledge is difficult to retrieve", body: "Staff search across documents, applications, and teams for current answers. Generic assistants cannot distinguish an approved source from an outdated or unauthorized one." },
      { title: "Pilots lack operating controls", body: "A convincing prototype may not define identity, tool permissions, evaluation, failure handling, or ownership after launch." },
      { title: "Automation can hide risk", body: "An agent that takes action without clear boundaries can magnify a wrong assumption. Consequential steps need explicit authority and a review path." },
    ],
    opportunity: "Grounded assistants can reduce time spent locating and preparing information, while controlled agents can coordinate repetitive steps across enterprise tools. The business value comes from fitting these capabilities into a known workflow with measurable quality and accountable decisions.",
    useCases: [
      { title: "Enterprise knowledge assistant", body: "Retrieve role-authorized documents, answer with citations, and defer when sources conflict or do not support an answer." },
      { title: "Document preparation", body: "Classify material, extract source-linked fields, and draft a summary for a reviewer who validates uncertain or consequential information." },
      { title: "Service copilot", body: "Bring approved guidance and permitted case context into a support workflow so an employee can prepare a relevant response." },
      { title: "Tool-using workflow agent", body: "Let an agent prepare a bounded action through approved APIs, with narrow permissions, validation, and confirmation before execution." },
    ],
    process: [
      { title: "Define the task", body: "Identify the user, decision, source material, acceptable output, and actions that must remain under human control." },
      { title: "Ground and control", body: "Connect approved knowledge and tools through identity-aware retrieval and least-privilege permissions." },
      { title: "Evaluate", body: "Test supported and unsupported questions, tool failures, unsafe requests, latency, cost, and user correction." },
      { title: "Operate", body: "Release with observability, feedback, escalation, versioning, and an owner responsible for ongoing quality." },
    ],
    outcomes: ["Faster access to approved knowledge", "Less repetitive document and service work", "Controlled automation across existing tools", "A measurable route from prototype to production"],
    why: [
      { title: "Workflow before model", body: "We define the operating task and decision rights before selecting an assistant or agent pattern." },
      { title: "Engineering around the model", body: "Identity, retrieval, integrations, evaluation, observability, and user experience are treated as product requirements." },
      { title: "Governance in the design", body: "Permissions, human review, auditability, and failure handling are designed into each stage rather than added after a pilot." },
    ],
    faqs: [
      { question: "What is the difference between generative and agentic AI?", answer: "Generative AI produces or retrieves content. Agentic AI can plan and coordinate bounded actions through approved tools; that added autonomy requires tighter permissions and oversight." },
      { question: "Does an enterprise assistant train on our data?", answer: "Not necessarily. Many systems use retrieval to provide approved context at request time. Data use, retention, and model configuration must be agreed for the selected deployment." },
      { question: "How do you reduce unsupported answers?", answer: "Use governed sources, citations, abstention rules, representative evaluation, and a human escalation path. No model can be assumed error-free." },
      { question: "When should an agent require approval?", answer: "Approval should match the impact and reversibility of an action. External communication, record changes, financial commitments, and security actions generally need explicit control." },
    ],
    insightSlugs: ["healthcare-ai-knowledge-access", "insurance-claims-document-intelligence", "llm-integration-services"],
  },
  dataFoundations: {
    overview: "Enterprise AI depends on data that can be located, understood, trusted, and accessed under the right controls. Data engineering and AI foundations connect source systems to governed data products, analytics, machine learning, and applications.",
    challenges: [
      { title: "Fragmented sources", body: "Operational information is split across applications, files, event streams, and teams with different identifiers and refresh cycles." },
      { title: "Quality lacks ownership", body: "A pipeline may run successfully while delivering incomplete or stale information. Teams need definitions, checks, lineage, and accountable data owners." },
      { title: "AI workloads outgrow pilots", body: "Experiments often bypass repeatable deployment, monitoring, and access practices, making production use difficult to support." },
    ],
    opportunity: "A governed data foundation lets analytics and AI use shared definitions without forcing every workload into one deployment model. Reliable pipelines, open formats, metadata, and lifecycle controls reduce the effort needed to create and maintain useful data products.",
    useCases: [
      { title: "AI-ready data products", body: "Prepare a defined set of quality-controlled, owned data for a model or intelligent application, with documented transformations and access." },
      { title: "Operational analytics", body: "Combine reference and event data into a timely view that shows source freshness and supports traceable decisions." },
      { title: "Streaming intelligence", body: "Process selected events for monitoring, anomaly review, or time-sensitive workflows without losing the source record." },
      { title: "Governed knowledge retrieval", body: "Organize approved documents and metadata for role-aware assistants that return citations and respect source permissions." },
    ],
    process: [
      { title: "Map decisions and sources", body: "Start with the consuming workflow, then identify required sources, owners, definitions, and latency." },
      { title: "Design the data product", body: "Establish schemas, quality rules, transformations, lineage, access, and an operating owner." },
      { title: "Build and validate", body: "Implement pipelines and storage patterns, test representative failures, and reconcile outputs with source owners." },
      { title: "Operate and evolve", body: "Monitor freshness, quality, cost, usage, and downstream impact as source systems and requirements change." },
    ],
    outcomes: ["More trustworthy analytics and AI inputs", "Clearer ownership and lineage", "Faster reuse of governed enterprise data", "Deployment choices aligned with workload needs"],
    why: [
      { title: "Decision-led architecture", body: "We avoid building a platform without a consuming workflow and accountable business purpose." },
      { title: "Data and AI together", body: "Pipelines, model operations, retrieval, and application needs are designed as one production system." },
      { title: "Practical deployment choice", body: "Cloud, hybrid, on-premise, and edge patterns are evaluated against data locality, latency, control, and cost." },
    ],
    faqs: [
      { question: "What makes data AI-ready?", answer: "It has a defined owner and meaning, sufficient quality and freshness for the use case, traceable transformations, and controlled access." },
      { question: "Do we need to replace our current data platform?", answer: "Not automatically. The architecture can connect existing systems and modernize bounded data products instead of requiring a single large migration." },
      { question: "How does ADRS relate to data foundations?", answer: "ADRS consumes dependable signals in a detection-to-response workflow. Governed pipelines, quality controls, and traceable source data help teams assess those signals." },
      { question: "How should a data-foundation project begin?", answer: "Choose one valuable analytics or AI workflow and map its sources, quality gaps, ownership, permissions, and operating measures." },
    ],
    insightSlugs: ["energy-ai-asset-intelligence-foundations", "data-centre-capacity-intelligence", "manufacturing-predictive-maintenance-workflow"],
  },
  aiEngineering: {
    overview: "AI engineering turns a model or prototype into software people can use and teams can operate. It joins product design, application architecture, integrations, data, security, testing, deployment, and monitoring around a defined workflow.",
    challenges: [
      { title: "Prototype behaviour is fragile", body: "A demonstration may depend on curated inputs and manual support. Production users introduce ambiguity, permissions, latency, and failure conditions." },
      { title: "The model is only one component", body: "Applications need interfaces, APIs, data pipelines, identity, observability, support ownership, and a maintainable release process." },
      { title: "Quality changes over time", body: "Models, source data, and user behaviour evolve. Without evaluation and versioning, teams cannot identify or safely reverse regressions." },
    ],
    opportunity: "Disciplined engineering makes AI useful inside existing products and operations. Teams can release bounded capabilities, measure how they perform with real users, and improve the full system rather than treating a model endpoint as a finished product.",
    useCases: [
      { title: "Enterprise AI application", body: "Build a role-aware application around approved data, business rules, evaluation, and an accountable user journey." },
      { title: "RAG and copilot delivery", body: "Connect cited retrieval to a usable interface with source permissions, quality tests, and escalation." },
      { title: "Intelligent automation", body: "Coordinate repetitive steps with validation, exception handling, and approval before consequential actions." },
      { title: "Application modernization", body: "Introduce AI and event-driven capabilities incrementally while preserving continuity and improving observability." },
    ],
    process: [
      { title: "Frame", body: "Define the user, workflow, outcome, constraints, ownership, and highest-risk assumptions." },
      { title: "Prototype", body: "Test the uncertain parts with representative data and a narrow end-to-end journey." },
      { title: "Engineer and validate", body: "Build interfaces, APIs, controls, tests, deployment automation, and operational evaluation." },
      { title: "Release and improve", body: "Launch with monitoring, support, rollback, feedback, and a managed backlog of evidence-led changes." },
    ],
    outcomes: ["AI features users can understand and operate", "More dependable releases and integrations", "Visible quality, cost, and failure behaviour", "Maintainable systems beyond the initial pilot"],
    why: [
      { title: "Product and platform thinking", body: "We design the user workflow and the services that make it dependable, not just the model call." },
      { title: "Full-stack delivery", body: "Software, data, cloud, security, and AI evaluation are handled as connected engineering concerns." },
      { title: "Production ownership", body: "Monitoring, support, rollback, and continuous improvement are defined before release." },
    ],
    faqs: [
      { question: "How is AI engineering different from a prototype?", answer: "AI engineering adds reliable software, integrations, permissions, testing, observability, deployment, support, and ongoing evaluation around the model." },
      { question: "Can Turbo AI work with existing applications?", answer: "Yes. Integration begins by assessing current APIs, identity, data, architecture, and operational constraints rather than assuming a complete replacement." },
      { question: "How do you evaluate an AI application?", answer: "Use representative task-level tests, user review, security and failure scenarios, and production measures such as quality, latency, cost, overrides, and incidents." },
      { question: "Who owns the system after launch?", answer: "Ownership is agreed during delivery across product, engineering, data, security, and business teams, with documented monitoring and escalation responsibilities." },
    ],
    insightSlugs: ["llm-integration-services", "digital-architecture-consulting", "retail-demand-customer-intelligence"],
  },
  governanceCybersecurity: {
    overview: "AI governance defines how systems are approved, operated, reviewed, and corrected. Cybersecurity protects the identities, data, models, applications, APIs, and tools that make those systems work.",
    challenges: [
      { title: "AI use grows faster than oversight", body: "Teams may introduce tools without a common inventory, risk classification, owner, or route to review incidents and changes." },
      { title: "New attack surfaces emerge", body: "Prompts, retrieval sources, model APIs, agent tools, and generated content create paths for injection, leakage, unauthorized action, and misuse." },
      { title: "Controls remain abstract", body: "Policies are ineffective when they do not translate into identity, evaluation, logging, approvals, monitoring, and response inside delivery workflows." },
    ],
    opportunity: "A proportionate governance and security model lets organizations adopt valuable AI with clearer accountability. Controls can be matched to data sensitivity and decision impact, helping teams move faster on lower-risk uses and scrutinize consequential ones.",
    useCases: [
      { title: "AI system inventory and risk review", body: "Record owners, users, data, models, integrations, intended use, and impact to determine the controls each system needs." },
      { title: "LLM application security assessment", body: "Test identity, retrieval, APIs, prompt injection, data leakage, tool permissions, and failure handling against the actual application." },
      { title: "Model and agent oversight", body: "Define evaluation, approval, monitoring, change control, human review, and incident response across the lifecycle." },
      { title: "Policy-to-control implementation", body: "Translate governance requirements into technical and operational controls that delivery teams can follow and evidence." },
    ],
    process: [
      { title: "Discover", body: "Identify AI systems, data, owners, users, integrations, and existing security and compliance obligations." },
      { title: "Assess", body: "Classify impact, model threats, test controls, and document gaps using a proportionate approach." },
      { title: "Implement", body: "Establish policies, identity, access, evaluation, logging, approval, monitoring, and response procedures." },
      { title: "Assure", body: "Review evidence, incidents, drift, changes, and exceptions as systems and organizational use evolve." },
    ],
    outcomes: ["Clear ownership and decision rights", "Stronger protection of data and tools", "Traceable approval and change records", "Faster, more defensible adoption of bounded AI use cases"],
    why: [
      { title: "Governance plus engineering", body: "Controls are designed so they can be implemented and tested in real applications and infrastructure." },
      { title: "Risk-based scope", body: "Oversight is matched to the data, users, autonomy, and consequence of each use case." },
      { title: "Lifecycle assurance", body: "Review continues through deployment, monitoring, incidents, and material system changes." },
    ],
    faqs: [
      { question: "What should an AI governance framework include?", answer: "It should define inventory, ownership, risk classification, acceptable use, data and model controls, evaluation, human oversight, monitoring, incident response, and change management." },
      { question: "How is AI security different from traditional application security?", answer: "Traditional controls remain essential, while AI adds risks around prompts, retrieval, model behaviour, generated output, agent tools, and changing model dependencies." },
      { question: "Do you claim certification against listed frameworks?", answer: "No. Framework names identify relevant reference points; they do not imply Turbo AI or a client system holds a certification." },
      { question: "When should governance begin?", answer: "Begin when the use case, users, data, and decision impact are being defined, so controls shape the architecture instead of blocking it later." },
    ],
    insightSlugs: ["navigating-risks-agentic-ai-governance-consulting", "ai-cybersecurity-solutions", "financial-services-ai-fraud-review"],
  },
  cloudCompute: {
    overview: "Enterprise AI workloads place different demands on compute, storage, networking, latency, resilience, security, and cost. Cloud and AI infrastructure should be designed around those workloads and the data they use.",
    challenges: [
      { title: "Workload demand is uncertain", body: "Training, tuning, retrieval, and inference have different utilization patterns. Early estimates can lead to idle capacity or constrained production services." },
      { title: "Data and compute are separated", body: "Moving large or sensitive data can affect latency, cost, privacy, and architecture choices across cloud and on-premise environments." },
      { title: "Operations lack observability", body: "Teams need a consistent view of performance, reliability, capacity, security, and spend across platforms and model services." },
    ],
    opportunity: "Workload-led infrastructure planning helps organizations place AI services where performance, control, resilience, and economics make sense. Automation and observability then make those environments repeatable and operable as demand changes.",
    useCases: [
      { title: "AI compute planning", body: "Estimate accelerator, storage, network, and scheduling needs for a defined training or inference workload before committing capacity." },
      { title: "Hybrid AI platform", body: "Place data and workloads across cloud and on-premise environments according to locality, latency, control, and support needs." },
      { title: "Platform engineering", body: "Create repeatable infrastructure, deployment paths, identity, monitoring, and service ownership for application teams." },
      { title: "Infrastructure observability", body: "Connect performance, capacity, incidents, and cost signals so teams can investigate and plan with one operating context." },
    ],
    process: [
      { title: "Profile workloads", body: "Define data, model, latency, throughput, availability, security, and growth assumptions." },
      { title: "Evaluate placement", body: "Compare cloud, hybrid, on-premise, and edge options against operational and commercial constraints." },
      { title: "Engineer the platform", body: "Implement repeatable infrastructure, identity, networking, storage, orchestration, observability, and recovery." },
      { title: "Measure and optimize", body: "Review utilization, latency, reliability, incidents, and cost before scaling or changing architecture." },
    ],
    outcomes: ["Infrastructure matched to actual AI workloads", "More repeatable deployment and recovery", "Visible capacity, performance, and cost", "A controlled path to scale compute"],
    why: [
      { title: "Workload-first planning", body: "Architecture begins with the model, data, user, and service requirements rather than a preferred platform." },
      { title: "Infrastructure and application context", body: "We connect compute decisions to data engineering, AI delivery, security, and operational ownership." },
      { title: "Evidence before scale", body: "Capacity and optimization decisions use measured utilization, performance, resilience, and cost." },
    ],
    faqs: [
      { question: "How do you choose between cloud and on-premise AI compute?", answer: "Compare data locality, privacy, latency, utilization, scalability, available skills, resilience, and total operating cost for the specific workload." },
      { question: "Does every AI workload need GPUs?", answer: "No. Compute requirements depend on model size, training or inference, throughput, latency, and available optimized services. Profiling should precede procurement." },
      { question: "What is included in AI infrastructure observability?", answer: "Relevant measures can include service availability, latency, throughput, accelerator utilization, storage and network behaviour, capacity, cost, and security events." },
      { question: "How does facility monitoring relate to AI infrastructure?", answer: "Facility monitoring provides visibility into power, cooling, and capacity constraints. Cloud and AI compute services address the wider architecture and operation of workload platforms." },
    ],
    insightSlugs: ["ai-infrastructure-investment-strategy", "data-centre-capacity-intelligence", "telecom-network-incident-triage"],
  },
  enterpriseSolutions: {
    overview: "Enterprise AI solutions begin with a business decision or workflow, then combine the data, models, applications, integrations, infrastructure, and controls required to improve it. This avoids treating AI as a disconnected feature.",
    challenges: [
      { title: "Use cases are framed too broadly", body: "Goals such as becoming AI-driven do not identify the user, decision, evidence, constraint, or outcome needed to build a useful system." },
      { title: "Data and workflows remain disconnected", body: "A model cannot create value when its inputs are unreliable or its output does not reach a person who can act." },
      { title: "Pilots do not establish ownership", body: "Without accountable product, data, security, and operational owners, a promising demonstration is difficult to support and improve." },
    ],
    opportunity: "The opportunity is to apply the right AI pattern to a bounded enterprise problem: retrieval for knowledge, document intelligence for evidence preparation, analytics for prioritization, or controlled agents for workflow steps. Each solution is evaluated by the decision it improves.",
    useCases: [
      { title: "Customer intelligence", body: "Bring permitted transaction, service, and behavioural signals together to support segmentation, next-best-action, and more relevant service." },
      { title: "Document intelligence", body: "Classify documents, extract source-linked information, identify missing evidence, and prepare a file for accountable review." },
      { title: "Predictive maintenance", body: "Connect telemetry, asset history, and operating context to prioritize inspections and maintenance planning." },
      { title: "Fraud and anomaly review", body: "Surface unusual patterns with explainable evidence so investigators can focus attention and record outcomes." },
      { title: "Supply-chain intelligence", body: "Connect demand, inventory, shipment, and supplier signals to identify and coordinate consequential exceptions." },
      { title: "Intelligent automation", body: "Coordinate repetitive steps with validation, exception handling, permissions, and human approval." },
    ],
    process: [
      { title: "Define the problem", body: "Identify the workflow, user, current baseline, decision boundary, and measurable operational outcome." },
      { title: "Design the solution", body: "Map data, AI pattern, application, integration, infrastructure, security, and governance requirements." },
      { title: "Validate end to end", body: "Test representative cases with users, including uncertainty, missing information, and system failures." },
      { title: "Deploy and learn", body: "Release with ownership, monitoring, feedback, escalation, and a route to update the full system." },
    ],
    outcomes: ["Faster, better-supported decisions", "Reduced repetitive knowledge and document work", "Earlier visibility into operational exceptions", "Governed AI embedded in real workflows"],
    why: [
      { title: "Business problem first", body: "The decision and operating context guide the technology, not the other way around." },
      { title: "Connected capabilities", body: "Strategy, data, software, cloud, security, and governance come together in one delivery path." },
      { title: "Human and machine roles", body: "Automation is bounded by impact, permissions, uncertainty, and accountable oversight." },
    ],
    faqs: [
      { question: "How do you choose an enterprise AI use case?", answer: "Look for a repeated decision or workflow with meaningful value, available evidence, an accountable owner, a measurable baseline, and a manageable risk boundary." },
      { question: "Do enterprise AI solutions require a new platform?", answer: "Not always. Many solutions can integrate with existing applications and data while modernizing only the components needed for the use case." },
      { question: "How do you move beyond a pilot?", answer: "Design ownership, integration, security, evaluation, monitoring, support, and change management during the pilot rather than after it." },
      { question: "What outcomes should be measured?", answer: "Measures should follow the workflow: decision time, rework, queue quality, adoption, overrides, reliability, customer or employee experience, and risk indicators as appropriate." },
    ],
    insightSlugs: ["manufacturing-predictive-maintenance-workflow", "insurance-claims-document-intelligence", "logistics-exception-management-ai"],
  },
};
