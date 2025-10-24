export const site = {
  meta: {
    siteName: "Turbo AI",
    domain: "turbo-ai.co.uk",
    defaultTitle: "Turbo AI — Architecting Intelligence",
    description:
      "We design and deploy intelligent systems for enterprises navigating complexity.",
    ogImage: "/og.jpg",
    locale: "en_GB",
  },
  nav: {
    items: [
      { label: "Home", href: "#hero" },
      { label: "About", href: "#about" },
      { label: "Expertise", href: "#expertise" },
      { label: "Our Impact", href: "#impact" },
      { label: "Perspectives", href: "#perspectives" },
      { label: "Connect", href: "#connect" },
    ],
  },
};

export const tokens = {
  colors: {
    charcoal: "#0A0A0A",
    charcoalDeep: "#0F0F0F",
    white: "#FFFFFF",
    emerald: "#1E40AF", // Changed to blue-700
    emeraldNeon: "#3B82F6", // Changed to blue-500 (bright blue)
    emeraldTint: "#1D4ED8", // Changed to blue-600
    navy: "#1E293B",
    midGray: "#78716C",
  },
  type: {
    headings: ["Söhne", "GT America", "Inter", "system-ui"],
    body: ["Inter", "IBM Plex Sans", "system-ui"],
    base: 18,
    key: 21,
    line: 1.7,
    headingTracking: -0.02,
  },
  layout: {
    maxWidth: 1280,
    gutterVW: 5,
    sectionY: { desktop: 120, mobile: 80 },
    grid: 12,
    headerH: 80,
  },
  motion: {
    transitionMs: 275,
    easing: "ease-out",
    allowParallax: true,
    allowScrollJacking: true,
    parallax: { maxDepth: 0.6, lerp: 0.12, mobileDisabledBelowPx: 768 },
    scrollJacking: {
      enabledSections: [
        "hero",
        "about",
        "credentials",
        "expertise",
        "impact",
        "perspectives",
        "connect",
      ],
      stepDurationMs: 650,
      wheelThrottleMs: 700,
      touchSwipeMin: 32,
    },
  },
  lines: { opacity: 0.15, thickness: 1 },
} as const;

export const copy = {
  hero: {
    id: "hero",
    title: "Architecting Intelligence.",
    subhead:
      "We design and deploy intelligent systems for enterprises navigating complexity.",
    micro: "Trusted by leaders across finance, retail, and technology.",
    cta: { label: "See Our Impact →", href: "#impact" },
    divider: true,
  },
  credentials: {
    id: "credentials",
    intro:
      "Since 2019, Turbo AI has partnered with institutional investors, financial institutions, and technology innovators to deliver measurable transformation.",
    stats: [
      { value: "87%", label: "Client Retention Rate" },
      { value: "£8.2M", label: "Annual Cost Savings Delivered" },
      { value: "12+", label: "Fortune 500 Engagements" },
    ],
    endorsements:
      "Endorsed by the University of Oxford, IIT Bombay, and the British Embassy.",
  },
  expertise: {
    id: "expertise",
    heading: "Our Expertise",
    intro:
      "We combine strategic clarity with technical depth to build systems that last.",
    items: [
      {
        id: "01",
        slug: "ai-transformation",
        title: "AI Transformation",
        body: "End-to-end design, build, and operationalization of intelligent systems accountable for outcomes.",
      },
      {
        id: "02",
        slug: "strategic-intelligence",
        title: "Strategic Intelligence",
        body: "Due diligence that integrates technology research, data modeling, and market insight.",
      },
      {
        id: "03",
        slug: "digital-architecture",
        title: "Digital Architecture",
        body: "Modernization, scalable platforms, and engineering practices that reduce risk and accelerate delivery.",
      },
      {
        id: "04",
        slug: "remote-infrastructure-management",
        title: "Remote Infrastructure Management",
        body: "24/7 monitoring, optimization, and maintenance of distributed systems with proactive incident resolution.",
      },
      {
        id: "05",
        slug: "cyber-security-solutions",
        title: "Cyber Security Solutions",
        body: "Comprehensive security architecture, threat detection, and compliance frameworks for enterprise resilience.",
      },
      {
        id: "06",
        slug: "ai-data-insights",
        title: "AI & Data Insights",
        body: "Advanced analytics, machine learning models, and data science capabilities for strategic decision-making.",
      },
      {
        id: "07",
        slug: "offshore-development",
        title: "Offshore Development",
        body: "Distributed engineering teams delivering scalable software solutions with rigorous quality standards.",
      },
      {
        id: "08",
        slug: "cloud-solutions",
        title: "Cloud Solutions",
        body: "Multi-cloud architecture, migration strategies, and optimization for performance, security, and cost efficiency.",
      },
      {
        id: "09",
        slug: "quality-engineering",
        title: "Quality Engineering",
        body: "Automated testing frameworks, continuous integration, and quality assurance processes for reliable delivery.",
      },
    ],
    cta: { label: "Request Detailed Capabilities →", href: "#connect" },
  },
  impact: {
    id: "impact",
    heading: "Our Impact",
    case: {
      client: "UK Financial Institution",
      title: "Fraud Detection Transformation",
      challenge: "Legacy rule-based system produced 40%+ false positives.",
      solution:
        "Hybrid ML with real-time decisioning and human-in-the-loop retraining.",
      impact: [
        "73% reduction in false positives",
        "£1.8M annual savings",
        "Delivered in 12 weeks",
      ],
    },
    moreCTA: { label: "More Client Results →", href: "#connect" },
  },
  perspectives: {
    id: "perspectives",
    heading: "Perspectives",
    items: [
      {
        slug: "hidden-cost-of-ai-pilots",
        title: "The Hidden Cost of AI Pilots That Never Scale",
        date: "2025-05-10",
        excerpt:
          "Most enterprise AI projects fail from misaligned incentives and weak governance.",
        source: {
          title: "Harvard Business Review",
          url: "https://hbr.org/2025/05/the-hidden-cost-of-ai-pilots-that-never-scale",
        },
      },
      {
        slug: "due-diligence-ai-maturity",
        title: "Why Due Diligence Must Include AI Maturity",
        date: "2025-04-12",
        excerpt: "Assess algorithmic risk alongside financial health.",
        source: {
          title: "MIT Technology Review",
          url: "https://www.technologyreview.com/2025/04/12/due-diligence-ai-maturity",
        },
      },
      {
        slug: "infra-that-survives-leadership",
        title: "Building AI Infrastructure That Survives Leadership Changes",
        date: "2025-03-15",
        excerpt:
          "Systems endure when they're built on architecture, not personalities.",
        source: {
          title: "IEEE Spectrum",
          url: "https://spectrum.ieee.org/ai-infrastructure-leadership-changes",
        },
      },
    ],
  },
  connect: {
    id: "connect",
    heading: "Start a Conversation",
    body: "Whether you're evaluating a strategic initiative, conducting due diligence, or exploring AI transformation, we're here to help.",
    fields: ["name", "email", "organization", "message"],
    cta: { label: "Send Message", href: "#connect" },
    email: "hello@turbo-ai.ca",
    privacy:
      "We only use your information to respond to your inquiry. No marketing lists.",
  },
};

export const about = {
  id: "about",
  heading: "About Turbo AI",
  lead: "We're a focused team of engineers and strategists who build intelligent systems that endure.",
  who: [
    {
      title: "Independent by design.",
      body: "We partner where it adds leverage; we never outsource accountability.",
    },
    {
      title: "Engineering first.",
      body: "Architecture, data, and automation—shipped with discipline.",
    },
    {
      title: "Outcome-driven.",
      body: "Strategy tied to measurable impact, not theatre.",
    },
  ],
  principles: [
    {
      title: "Clarity.",
      body: "State the problem, define success, cut noise.",
    },
    {
      title: "Reliability.",
      body: "Observable, resilient, simple to operate.",
    },
    {
      title: "Governance.",
      body: "Secure by default; model lifecycle and risk are first-class.",
    },
  ],
  leadership:
    "Leadership experience across finance, retail, and technology in the UK, EU, and North America.",
  cta: { label: "See Our Impact →", href: "#impact" },
};
