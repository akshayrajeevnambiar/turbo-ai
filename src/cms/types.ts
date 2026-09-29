export const contentKinds = ["page", "product", "industry", "solution", "blog"] as const;
export type ContentKind = (typeof contentKinds)[number];
export type ContentStatus = "draft" | "published";

export interface CmsSection {
  title: string;
  body: string;
  image?: string;
}

export interface CmsEntry {
  id: string;
  kind: ContentKind;
  slug: string;
  title: string;
  status: ContentStatus;
  summary: string;
  hero_title: string;
  hero_description: string;
  hero_image: string;
  body: string;
  sections: CmsSection[];
  features: string[];
  benefits: string[];
  related_products: string[];
  related_industries: string[];
  cta_text: string;
  cta_url: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  canonical_url: string;
  og_title: string;
  og_description: string;
  og_image: string;
  robots: "index,follow" | "noindex,nofollow";
  author: string;
  category: string;
  tags: string[];
  reading_time: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export type CmsEntryInput = Omit<CmsEntry, "id" | "created_at" | "updated_at">;
export type CmsEntrySummary = Omit<CmsEntry, "body">;

export interface CmsMedia {
  id: string;
  name: string;
  path: string;
  alt: string;
  category: string;
  created_at: string;
}

export const kindLabels: Record<ContentKind, string> = {
  page: "Pages",
  product: "Products",
  industry: "Industries",
  solution: "Solutions",
  blog: "Blog",
};

export const kindPaths: Record<ContentKind, string> = {
  page: "pages",
  product: "products",
  industry: "industries",
  solution: "solutions",
  blog: "blog",
};

export function publicPath(entry: Pick<CmsEntry, "kind" | "slug">) {
  if (entry.kind === "page") return entry.slug === "home" ? "/" : `/${entry.slug}`;
  if (entry.kind === "solution") return `/solutions/${entry.slug}`;
  return `/${kindPaths[entry.kind]}/${entry.slug}`;
}

export function emptyEntry(kind: ContentKind): CmsEntryInput {
  return {
    kind, slug: "", title: "", status: "draft", summary: "", hero_title: "",
    hero_description: "", hero_image: "", body: "", sections: [], features: [],
    benefits: [], related_products: [], related_industries: [], cta_text: "", cta_url: "",
    seo_title: "", seo_description: "", seo_keywords: "", canonical_url: "",
    og_title: "", og_description: "", og_image: "", robots: "index,follow",
    author: "Turbo AI", category: "", tags: [], reading_time: 0, published_at: null,
  };
}

export function hasCmsProductContent(entry: CmsEntry | null) {
  return Boolean(entry && (entry.body || entry.sections.length || entry.features.length || entry.benefits.length));
}
