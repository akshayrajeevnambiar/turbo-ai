import { Helmet } from "react-helmet-async";
import { seoConfig } from "../content/seo";
import { useCmsPage } from "../cms/hooks";
import { useCmsSiteSettings } from "../cms/settings";

interface SEOProps {
    pageKey?: keyof typeof seoConfig;
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    keywords?: string;
    robots?: "index,follow" | "noindex,nofollow";
    ogTitle?: string;
    ogDescription?: string;
    type?: "website" | "article";
    articleMeta?: {
        publishedTime: string;
        updatedTime?: string;
        author: string;
        tags?: string[];
    };
}

export function SEO({ pageKey, title, description, image, url, keywords, robots, ogTitle, ogDescription, type = "website", articleMeta }: SEOProps) {
    const configMeta = pageKey ? seoConfig[pageKey] : null;
    const cms = useCmsPage();
    const settings = useCmsSiteSettings();
    const siteUrl = import.meta.env.VITE_BASE_URL || "https://turbo-ai.ca";
    const cmsPath = cms?.kind === "page" ? (cms.slug === "home" ? "/" : `/${cms.slug}`) : cms?.kind === "industry" ? `/industries/${cms.slug}` : cms?.kind === "solution" ? `/solutions/${cms.slug}` : "";
    const cmsUrl = cms ? cms.canonical_url || `${siteUrl}${cmsPath === "/" ? "" : cmsPath}` : "";
    const chosenImage = cms?.og_image || cms?.hero_image || image || configMeta?.image || settings.defaultOg;

    // Merge config meta with manual props (manual props take precedence)
    const meta = {
        title: cms?.seo_title || title || configMeta?.title || "Turbo AI",
        description: cms?.seo_description || description || configMeta?.description || "",
        image: chosenImage ? new URL(chosenImage, siteUrl).href : "",
        url: cmsUrl || url || configMeta?.url || window.location.href,
        keywords: cms?.seo_keywords || keywords || configMeta?.keywords || "",
    };

    // Base JSON-LD (Organization) - Always valid
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Turbo AI",
        "alternateName": "Turbo AI - Architecting Intelligence",
        "url": siteUrl,
        "logo": `${siteUrl}/turbo-ai-logo.png`,
        "description": "Turbo AI designs and deploys intelligent systems for enterprises navigating complexity. We provide AI transformation, strategic intelligence, digital architecture, and enterprise solutions.",
        "slogan": "Architecting Intelligence",
        "knowsAbout": [
            "Artificial Intelligence", "Machine Learning", "Digital Transformation",
            "Enterprise AI", "Cloud Solutions", "Cyber Security", "Data Analytics"
        ],
        "sameAs": [
            "https://www.linkedin.com/company/turbo-ai",
            "https://twitter.com/_turbo_ai_",
            "https://www.facebook.com/turboai"
        ],
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Calgary",
            "addressRegion": "Alberta",
            "addressCountry": "CA"
        },
        "contactPoint": [
            {
                "@type": "ContactPoint",
                "contactType": "Business Inquiries",
                "email": "hello@turbo-ai.ca",
                "telephone": "+18257472650",
                "url": `${siteUrl}/#connect`
            },
            {
                "@type": "ContactPoint",
                "contactType": "Legal",
                "email": "legal@turbo-ai.ca"
            }
        ],
        "areaServed": ["GB", "CA", "US", "EU"],
        "serviceType": [
            "AI Strategy and Enterprise Transformation",
            "Generative and Agentic AI",
            "Data Engineering and AI Foundations",
            "AI Engineering and Software Development",
            "AI Governance and Cybersecurity",
            "Cloud Infrastructure and AI Compute"
        ]
    };

    // Article JSON-LD (BlogPosting)
    const articleSchema = type === "article" && articleMeta ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": meta.url
        },
        "headline": meta.title,
        "image": meta.image ? [meta.image] : [],
        "datePublished": articleMeta.publishedTime,
        "dateModified": articleMeta.updatedTime || articleMeta.publishedTime,
        "author": {
            "@type": "Organization", // Or Person if you prefer
            "name": articleMeta.author
        },
        "publisher": organizationSchema,
        "description": meta.description
    } : null;

    const pageSchema = type !== "article" ? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": meta.url,
        "url": meta.url,
        "name": meta.title,
        "description": meta.description,
        "isPartOf": { "@type": "WebSite", "name": "Turbo AI", "url": siteUrl },
        "publisher": { "@type": "Organization", "name": "Turbo AI", "url": siteUrl }
    } : null;
    const websiteSchema = pageKey === "home" ? {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "name": "Turbo AI",
        "url": siteUrl,
        "inLanguage": "en-CA",
        "publisher": { "@type": "Organization", "name": "Turbo AI", "url": siteUrl }
    } : null;

    return (
        <Helmet defer={false} prioritizeSeoTags>
            <title>{meta.title}</title>
            <meta name="description" content={meta.description} />
            {(cms?.robots || robots) && <meta name="robots" content={cms?.robots || robots} />}
            {meta.keywords && <meta name="keywords" content={meta.keywords} />}

            {/* Canonical URL */}
            <link rel="canonical" href={meta.url} />

            {/* Hreflang Tags (Multi-region targeting) */}
            <link rel="alternate" hrefLang="en-gb" href={meta.url} />
            <link rel="alternate" hrefLang="en-ca" href={meta.url} />
            <link rel="alternate" hrefLang="en" href={meta.url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={settings.siteName} />
            <meta property="og:url" content={meta.url} />
            <meta property="og:title" content={cms?.og_title || ogTitle || meta.title} />
            <meta property="og:description" content={cms?.og_description || ogDescription || meta.description} />
            {meta.image && <meta property="og:image" content={meta.image} />}
            {type === "article" && articleMeta && (
                <>
                    <meta property="article:published_time" content={articleMeta.publishedTime} />
                    <meta property="article:author" content={articleMeta.author} />
                    {articleMeta.tags?.map(tag => (
                        <meta key={tag} property="article:tag" content={tag} />
                    ))}
                </>
            )}

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={meta.url} />
            <meta property="twitter:title" content={meta.title} />
            <meta property="twitter:description" content={meta.description} />
            {meta.image && <meta property="twitter:image" content={meta.image} />}

            {/* Structured Data (JSON-LD) */}
            <script type="application/ld+json">
                {JSON.stringify(type === "article" ? articleSchema : [organizationSchema, pageSchema, ...(websiteSchema ? [websiteSchema] : [])])}
            </script>
        </Helmet>
    );
}
