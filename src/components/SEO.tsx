import { Helmet } from "react-helmet-async";
import { seoConfig } from "../content/seo";

interface SEOProps {
    pageKey: keyof typeof seoConfig;
}

export function SEO({ pageKey }: SEOProps) {
    const meta = seoConfig[pageKey];

    if (!meta) {
        console.warn(`SEO: No metadata found for page key "${pageKey}"`);
        return null;
    }

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
            <meta property="og:type" content="website" />
            <meta property="og:url" content={meta.url} />
            <meta property="og:title" content={meta.title} />
            <meta property="og:description" content={meta.description} />
            {meta.image && <meta property="og:image" content={meta.image} />}


            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={meta.url} />
            <meta property="twitter:title" content={meta.title} />
            <meta property="twitter:description" content={meta.description} />
            {meta.image && <meta property="twitter:image" content={meta.image} />}

            {/* Structured Data (JSON-LD) */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Turbo AI",
                    "alternateName": "Turbo AI - Architecting Intelligence",
                    "url": meta.url, // Uses dynamic base URL from config
                    "logo": `${meta.url}/favicon.svg`,
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
                            "url": `${meta.url}/#connect`
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
                })}
            </script>
        </Helmet>
    );
}
