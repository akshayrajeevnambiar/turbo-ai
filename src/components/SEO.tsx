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
        </Helmet>
    );
}
