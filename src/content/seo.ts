import { site } from "./turboai";

export interface PageSEO {
    title: string;
    description: string;
    image?: string;
    url?: string;
    keywords?: string;
}

const baseUrl = import.meta.env.VITE_BASE_URL || "https://turbo-ai.ca";

export const seoConfig: Record<string, PageSEO> = {
    home: {
        title: "AI Consulting Services in Calgary, Canada | Expert AI Consultants",
        description: "Looking for AI consulting companies in Calgary, Canada? Our expert AI consultants deliver custom AI strategies and enterprise-ready solutions.",
        image: `${baseUrl}/home-og.png`,
        url: baseUrl,
        keywords: "AI transformation, artificial intelligence consulting, machine learning, enterprise AI, digital transformation, strategic intelligence, AI architecture, cyber security, cloud solutions, data analytics, offshore development, AI consulting UK, AI consulting Canada, enterprise intelligence, technology consulting, AI implementation, AI strategy",
    },
    aiTransformation: {
        title: "AI Transformation Services in Canada",
        description: "End-to-end AI transformation services in Canada, delivering intelligent systems designed, deployed, and operationalized for measurable business outcomes.",
        image: `${baseUrl}/assets/Hero Background.jpg`,
        url: `${baseUrl}/ai-transformation`,
        keywords: "AI transformation, AI strategy, enterprise AI, machine learning operationalization, AI consulting Canada",
    },
    strategicIntelligence: {
        title: "Strategic Intelligence Services in Canada",
        description: "Strategic intelligence services in Canada combining technology research, data modeling, and market insights for enterprise decision-making.",
        image: `${baseUrl}/assets/Hero Background.jpg`,
        url: `${baseUrl}/strategic-intelligence`,
        keywords: "strategic intelligence, due diligence, market research, data modelling, technology forecasting, competitive intelligence",
    },
    digitalArchitecture: {
        title: "Digital Architecture & Modernization Canada",
        description: "Scalable digital architecture solutions in Canada focused on platform modernization, risk reduction, and faster delivery.",
        image: `${baseUrl}/assets/digital-architecture-hero.png`,
        url: `${baseUrl}/digital-architecture`,
        keywords: "digital architecture Canada, modern software engineering, platform engineering, legacy modernization, cloud architecture, scalable systems, technical debt reduction",
    },
    cyberSecuritySolutions: {
        title: "Cyber Security Solutions in Canada",
        description: "Enterprise-grade cybersecurity solutions in Canada covering security architecture, threat detection, and compliance frameworks.",
        image: `${baseUrl}/assets/cyber-security-hero.png`,
        url: `${baseUrl}/cyber-security-solutions`,
        keywords: "cyber security Canada, AI security, threat detection, security architecture, compliance, enterprise security",
    },
    cloudSolutions: {
        title: "Cloud Solutions & Multi-Cloud Services in Canada",
        description: "Secure cloud solutions in Canada with multi-cloud architecture, migration, and optimization for performance, compliance, and cost efficiency.",
        image: `${baseUrl}/assets/cloud-solutions-hero.png`,
        url: `${baseUrl}/cloud-solutions`,
        keywords: "cloud solutions Canada, multi-cloud architecture, cloud migration, cloud optimization, secure cloud infrastructure",
    },
    aiDataInsights: {
        title: "AI & Data Insights Services Canada",
        description: "AI and data insights services in Canada using advanced analytics, machine learning, and data science for strategic growth.",
        image: `${baseUrl}/assets/ai-data-insights-hero.png`,
        url: `${baseUrl}/ai-data-insights`,
        keywords: "AI data insights, advanced analytics, machine learning Canada, data science services, business intelligence",
    },
    remoteInfrastructureManagement: {
        title: "Remote Infrastructure Management Services in Canada",
        description: "Remote infrastructure management in Canada with 24/7 monitoring, proactive optimization, and maintenance of distributed IT systems to ensure performance, reliability, and rapid issue resolution.",
        image: `${baseUrl}/assets/remote-infrastructure-hero.png`,
        url: `${baseUrl}/remote-infrastructure-management`,
        keywords: "remote infrastructure management, RIM Canada, IT infrastructure monitoring, 24/7 IT support, distributed systems management, managed IT services Canada",
    },
    offshoreDevelopment: {
        title: "Offshore Development Services in Canada",
        description: "Scalable offshore development services for Canadian enterprises, delivering high-quality software through distributed engineering teams and proven delivery models.",
        image: `${baseUrl}/assets/offshore-development-hero.png`,
        url: `${baseUrl}/offshore-development`,
        keywords: "offshore development Canada, distributed engineering teams, software outsourcing, scalable development, agile offshore",
    },
    qualityEngineering: {
        title: "Quality Engineering & Testing Services in Canada",
        description: "Quality engineering services in Canada ensuring software reliability through automation, performance testing, and continuous quality assurance frameworks.",
        image: `${baseUrl}/assets/quality-engineering-hero.png`,
        url: `${baseUrl}/quality-engineering`,
        keywords: "quality engineering Canada, software testing, test automation, performance testing, QA services, continuous quality",
    },
    blog: {
        title: "Insights & Perspectives — Turbo AI",
        description: "Explore our latest thinking on artificial intelligence, strategic transformation, and digital architecture.",
        image: `${baseUrl}/assets/digital-architecture-hero.png`,
        url: `${baseUrl}/blog`,
        keywords: "AI insights, artificial intelligence blog, digital transformation trends, strategic intelligence articles, Turbo AI blog",
    },
};
