import { Helmet } from "react-helmet-async";
import { seoConfig } from "../content/seo";

interface SEOProps {
    pageKey?: keyof typeof seoConfig;
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: "website" | "article";
    articleMeta?: {
        publishedTime: string;
        author: string;
        tags?: string[];
    };
}

export function SEO({ pageKey, title, description, image, url, type = "website", articleMeta }: SEOProps) {
    const configMeta = pageKey ? seoConfig[pageKey] : null;

    // Merge config meta with manual props (manual props take precedence)
    const meta = {
        title: title || configMeta?.title || "Turbo AI",
        description: description || configMeta?.description || "",
        image: image || configMeta?.image || "",
        url: url || configMeta?.url || window.location.href,
        keywords: configMeta?.keywords || "",
    };

    const siteUrl = import.meta.env.VITE_BASE_URL || "https://turbo-ai.ca";

    // Base JSON-LD (Organization) - Always valid
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Turbo AI",
        "alternateName": "Turbo AI - Architecting Intelligence",
        "url": siteUrl,
        "logo": `${siteUrl}/favicon.svg`,
        "description": "Turbo AI designs and deploys intelligent systems for enterprises navigating complexity. We provide AI transformation, strategic intelligence, digital architecture, and enterprise solutions.",
        "foundingDate": "2014",
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
            "addressCountry": "GB"
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
            "AI Transformation", "Strategic Intelligence", "Digital Architecture",
            "Cyber Security Solutions", "Cloud Solutions", "Offshore Development"
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
        "dateModified": articleMeta.publishedTime, // Assuming no separate modified date for now
        "author": {
            "@type": "Organization", // Or Person if you prefer
            "name": articleMeta.author
        },
        "publisher": organizationSchema,
        "description": meta.description
    } : null;

    return (
        <Helmet defer={false} prioritizeSeoTags>
            <title>{meta.title}</title>
            <meta name="description" content={meta.description} />
            {meta.keywords && <meta name="keywords" content={meta.keywords} />}

            {/* Canonical URL */}
            <link rel="canonical" href={meta.url} />

            {/* Hreflang Tags (Multi-region targeting) */}
            <link rel="alternate" hrefLang="en-gb" href={meta.url} />
            <link rel="alternate" hrefLang="en-ca" href={meta.url} />
            <link rel="alternate" hrefLang="en" href={meta.url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={meta.url} />
            <meta property="og:title" content={meta.title} />
            <meta property="og:description" content={meta.description} />
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
                {JSON.stringify(type === "article" ? articleSchema : organizationSchema)}
            </script>
        </Helmet>
    );
}
