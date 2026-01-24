import { site } from "./turboai";

export interface PageSEO {
    title: string;
    description: string;
    image?: string;
    url?: string;
}

export const seoConfig: Record<string, PageSEO> = {
    home: {
        title: `${site.meta.siteName} — Architecting Intelligence`,
        description: "Turbo AI designs and deploys intelligent systems for enterprises. We combine strategic clarity with technical depth to build systems that last.",
        image: "/og-image.jpg", // Default OG image
        url: "https://turbo.ai",
    },
    aiTransformation: {
        title: "AI Transformation Canada — Turbo AI",
        description: "End-to-end design, build, and operationalization of intelligent systems. Turning AI ambition into real-world impact for Canadian organizations.",
        image: "/assets/Hero Background.jpg", // Using the hero image as OG
        url: "https://turbo.ai/ai-transformation",
    },
    strategicIntelligence: {
        title: "Strategic Intelligence — Turbo AI",
        description: "Due diligence that blends technology research, data modelling, and market insight. Make smarter moves with Turbo AI Strategic Intelligence.",
        image: "/assets/Hero Background.jpg", // Using the Strategic Intelligence hero
        url: "https://turbo.ai/strategic-intelligence",
    },
};
