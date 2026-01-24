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
        title: `${site.meta.siteName} — Architecting Intelligence`,
        description: "Turbo AI designs and deploys intelligent systems for enterprises. We combine strategic clarity with technical depth to build systems that last.",
        image: `${baseUrl}/home-og.png`,
        url: baseUrl,
        keywords: "AI transformation, artificial intelligence consulting, machine learning, enterprise AI, digital transformation, strategic intelligence, AI architecture, cyber security, cloud solutions, data analytics, offshore development, AI consulting UK, AI consulting Canada, enterprise intelligence, technology consulting, AI implementation, AI strategy",
    },
    aiTransformation: {
        title: "AI Transformation Canada — Turbo AI",
        description: "End-to-end design, build, and operationalization of intelligent systems. Turning AI ambition into real-world impact for Canadian organizations.",
        image: `${baseUrl}/assets/Hero Background.jpg`,
        url: `${baseUrl}/ai-transformation`,
        keywords: "AI transformation, AI strategy, enterprise AI, machine learning operationalization, AI consulting Canada",
    },
    strategicIntelligence: {
        title: "Strategic Intelligence — Turbo AI",
        description: "Due diligence that blends technology research, data modelling, and market insight. Make smarter moves with Turbo AI Strategic Intelligence.",
        image: `${baseUrl}/assets/Hero Background.jpg`,
        url: `${baseUrl}/strategic-intelligence`,
        keywords: "strategic intelligence, due diligence, market research, data modelling, technology forecasting, competitive intelligence",
    },
    remoteInfrastructureManagement: {
        title: "Remote Infrastructure Management Canada — Turbo AI",
        description: "24/7 monitoring, optimization, and maintenance of distributed systems. Proactive issue resolution for Canada's always-on economy.",
        image: `${baseUrl}/assets/remote-infrastructure-hero.png`,
        url: `${baseUrl}/remote-infrastructure-management`,
        keywords: "remote infrastructure management, RIM Canada, IT infrastructure monitoring, 24/7 IT support, distributed systems management, managed IT services Canada",
    },
};
