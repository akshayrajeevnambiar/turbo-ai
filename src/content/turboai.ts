// Import partner logos
import damasLogo from "../assets/damas-logo.png";
import caseConstructionLogo from "../assets/case-construction-equipment-logo.webp";
import h6systemsLogo from "../assets/h6systems-logo.png";
import finalSwipeLogo from "../assets/finalswipe-logo.png";
import gulfPlantLogo from "../assets/gulf-plant-logo.png";
import hyundaiLogo from "../assets/hyundai-logo.png";
import iPayoutLogo from "../assets/i-payout-logo.jpg";
import icuInvestigativeServicesLogo from "../assets/icu-investigative-services-logo.png";
import merchantProIncLogo from "../assets/merchantproinc-logo.jpg";
import rapidTechLogo from "../assets/rapid-tech-logo.png";
import suzukiLogo from "../assets/suzuki-logo.png";
import tangentLogo from "../assets/tangent-logo.png";
import teyseerSecurityLogo from "../assets/teyseer-security-logo.jpg";
import toddBrickhouseLogo from "../assets/todd-brickhouse-logo.png";
import zeibartLogo from "../assets/zeibart-logo.png";

export interface DropdownItem {
  label: string;
  href: string;
  external?: boolean;
}

export const site = {
  meta: {
    siteName: "Turbo AI",
    domain: "turbo-ai.ca",
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
      {
        label: "Products",
        href: "#",
        dropdown: [
          {
            label: "Seismic AI",
            href: "https://seismicai.ca",
            external: true,
          },
        ],
      },
      {
        label: "Services",
        href: "#",
        dropdown: [
          { label: "AI Transformation", href: "/ai-transformation" },
          { label: "Strategic Intelligence", href: "/strategic-intelligence" },
          { label: "Digital Architecture", href: "/digital-architecture" },
          { label: "Remote Infrastructure Management", href: "/remote-infrastructure-management" },
          { label: "All Services", href: "#expertise" },
        ],
      },
      { label: "Our Impact", href: "#impact" },
      { label: "Partners", href: "#partners" },
      { label: "Perspectives", href: "/blog" },
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
    allowScrollJacking: false,
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
      "Since 2014, Turbo AI has partnered with institutional investors, financial institutions, and technology innovators to deliver measurable transformation.",
    stats: [
      { value: "87%", label: "Client Retention Rate" },
      { value: "£8.2M", label: "Annual Cost Savings Delivered" },
      { value: "12+", label: "Fortune 500 Engagements" },
    ],
    endorsements:
      "Endorsed by the University of Nottingham, with core team members from IIT Bombay, and recognized by the British Embassy for entrepreneurship.",
  },
  expertise: {
    id: "expertise",
    heading: "Our Services",
    intro:
      "We combine strategic clarity with technical depth to build systems that last.",
    items: [
      {
        id: "01",
        slug: "ai-transformation",
        title: "AI Transformation",
        body: "End-to-end design, build, and operationalization of intelligent systems accountable for outcomes.",
        href: "/ai-transformation",
      },
      {
        id: "02",
        slug: "strategic-intelligence",
        title: "Strategic Intelligence",
        body: "Due diligence that integrates technology research, data modeling, and market insight.",
        href: "/strategic-intelligence",
      },
      {
        id: "03",
        slug: "digital-architecture",
        title: "Digital Architecture",
        body: "Modernization, scalable platforms, and engineering practices that reduce risk and accelerate delivery.",
        href: "/digital-architecture",
      },
      {
        id: "04",
        slug: "remote-infrastructure-management",
        title: "Remote Infrastructure Management",
        body: "24/7 monitoring, optimization, and maintenance of distributed systems with proactive incident resolution.",
        href: "/remote-infrastructure-management",
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
    phone: "+18257472650",
    privacy:
      "We only use your information to respond to your inquiry. No marketing lists.",
  },
};

export const clientele = {
  id: "clientele",
  heading: "Our Clientele",
  lead: "Trusted by leading organizations across diverse industries worldwide.",
  segments: [
    {
      category: "Sports & Apparel",
      clients: [
        { name: "Dragon Aire Pins", url: "https://dragonairepins.com/" },
      ],
    },
    {
      category: "Health",
      clients: [
        { name: "RJM Diagnostics", url: "https://rjmdiagnostics.com/" },
        { name: "Dr. Jacob Eapen", url: "https://www.drjacobeapen.com/" },
      ],
    },
    {
      category: "Electronics",
      clients: [
        { name: "H6 Systems", url: "http://h6systems.com/" },
        { name: "Rapid Tech", url: "https://rapid-tech.com/" },
      ],
    },
    {
      category: "Medical Equipment",
      clients: [{ name: "Tangent", url: "https://www.tangent.com/" }],
    },
    {
      category: "Payment Solutions",
      clients: [
        { name: "Merchant Pro Inc", url: "https://www.merchantproinc.com/" },
        { name: "Final Swipe", url: "https://www.finalswipe.com/" },
        { name: "i-Payout", url: "https://www.i-payout.com/" },
      ],
    },
    {
      category: "Investigation",
      clients: [{ name: "ICU Investigations", url: "https://icu.icu-is.com/" }],
    },
    {
      category: "Wigs",
      clients: [{ name: "Crown Units", url: "https://crownunits.com/" }],
    },
    {
      category: "Travel & Tourism",
      clients: [
        { name: "Funday Holidays", url: "https://www.fundayholidays.com/" },
        {
          name: "Quick Kerala Holidays",
          url: "http://www.quickeralaholidays.com/",
        },
      ],
    },
    {
      category: "Salon",
      clients: [
        { name: "Celebrity Salons", url: "http://www.celebritysalons.com/" },
      ],
    },
    {
      category: "Security",
      clients: [
        { name: "Teyseer Security", url: "https://www.teyseer-security.com/" },
      ],
    },
  ],
};

export const partners = {
  id: "partners",
  heading: "Our Clientele",
  lead: "Collaborating with industry leaders across diverse sectors.",
  brands: [
    { name: "Damas", logo: damasLogo, url: "https://www.damasjewellery.com/" },
    { name: "H6 Systems", logo: h6systemsLogo, url: "http://h6systems.com/" },
    {
      name: "Final Swipe",
      logo: finalSwipeLogo,
      url: "https://www.finalswipe.com/",
    },
    {
      name: "Gulf Plant",
      logo: gulfPlantLogo,
      url: "https://www.gulfplantqatar.com/",
    },
    {
      name: "Case Construction",
      logo: caseConstructionLogo,
      url: "https://www.casece.com/"
    },
    {
      name: "Hyundai",
      logo: hyundaiLogo,
      url: "https://www.hyundaicanada.com/",
    },
    { name: "i-Payout", logo: iPayoutLogo, url: "https://www.i-payout.com/" },
    {
      name: "ICU Investigative Services",
      logo: icuInvestigativeServicesLogo,
      url: "https://icu.icu-is.com/",
    },
    {
      name: "Merchant Pro Inc",
      logo: merchantProIncLogo,
      url: "https://www.merchantproinc.com/",
    },
    { name: "Rapid Tech", logo: rapidTechLogo, url: "https://rapid-tech.com/" },
    { name: "Suzuki", logo: suzukiLogo, url: "https://www.suzuki.ca/auto/" },
    { name: "Tangent", logo: tangentLogo, url: "https://www.tangent.com/" },
    {
      name: "Teyseer Security",
      logo: teyseerSecurityLogo,
      url: "https://www.teyseer-security.com/",
    },
    {
      name: "Todd Brickhouse",
      logo: toddBrickhouseLogo,
      url: "https://brickhousedesigns.net/",
    },
    { name: "Zeibart", logo: zeibartLogo, url: "https://www.ziebart.com/" },
  ],
};

export const blog = {
  id: "blog",
  heading: "From Our Blog",
  lead: "Stay updated with our latest insights and announcements.",
  posts: [
    {
      title: "LinkedIn Update",
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7403675619848470528",
      platform: "LinkedIn",
      icon: "linkedin",
    },
    {
      title: "Twitter/X Post",
      url: "https://x.com/_turbo_ai_/status/1997923006103068743?s=20",
      platform: "X (Twitter)",
      icon: "twitter",
    },
    {
      title: "Facebook Post",
      url: "https://www.facebook.com/share/p/1BvHsBbPvZ/",
      platform: "Facebook",
      icon: "facebook",
    },
  ],
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
