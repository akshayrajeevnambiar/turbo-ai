import { SEO } from "../components/SEO";
import { publicPath, type CmsEntry } from "./types";

export function CmsSEO({ entry }: { entry: CmsEntry }) {
  const siteUrl = import.meta.env.VITE_BASE_URL || "https://turbo-ai.ca";
  const path = publicPath(entry);
  const canonical = entry.canonical_url || `${siteUrl}${path === "/" ? "" : path}`;
  const image = entry.og_image || entry.hero_image || "";
  const absoluteImage = image ? image.startsWith("http") ? image : new URL(image, siteUrl).href : undefined;
  return <SEO title={entry.seo_title || entry.title} description={entry.seo_description || entry.summary || entry.hero_description}
    image={absoluteImage} url={canonical} keywords={entry.seo_keywords}
    ogTitle={entry.og_title || entry.seo_title || entry.title}
    ogDescription={entry.og_description || entry.seo_description || entry.summary}
    robots={entry.robots} type={entry.kind === "blog" ? "article" : "website"}
    articleMeta={entry.kind === "blog" ? { publishedTime: entry.published_at || entry.created_at, updatedTime: entry.updated_at, author: entry.author, tags: entry.tags } : undefined} />;
}
