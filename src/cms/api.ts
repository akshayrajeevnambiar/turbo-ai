import { cmsClient, cmsPublicEnabled, mediaBucket } from "./client";
import type { CmsEntry, CmsEntryInput, CmsEntrySummary, CmsMedia, ContentKind, ContentStatus } from "./types";

const listCache = new Map<string, { expires: number; promise: Promise<CmsEntrySummary[]> }>();
const entryCache = new Map<string, { expires: number; promise: Promise<CmsEntry | null> }>();
const cacheMs = 30_000;
function clearPublicCache() { listCache.clear(); entryCache.clear(); }

function requireClient() {
  if (!cmsClient) throw new Error("CMS is not configured. Set the Supabase URL and publishable key.");
  return cmsClient;
}

export async function getPublishedEntries(kind: ContentKind, limit = 100): Promise<CmsEntrySummary[]> {
  if (!cmsPublicEnabled) return [];
  const cacheKey = `${kind}:${limit}`;
  const cached = listCache.get(cacheKey);
  if (cached && cached.expires > Date.now()) return cached.promise;
  const promise = (async () => {
    const { data, error } = await requireClient().from("cms_entries")
    .select("id,kind,slug,title,status,summary,hero_title,hero_description,hero_image,sections,features,benefits,related_products,related_industries,cta_text,cta_url,seo_title,seo_description,seo_keywords,canonical_url,og_title,og_description,og_image,robots,author,category,tags,reading_time,published_at,created_at,updated_at")
    .eq("kind", kind).eq("status", "published")
    .order("published_at", { ascending: false }).limit(limit);
    if (error) throw error;
    return (data ?? []) as CmsEntrySummary[];
  })();
  listCache.set(cacheKey, { expires: Date.now() + cacheMs, promise });
  promise.catch(() => listCache.delete(cacheKey));
  return promise;
}

export async function getPublishedEntry(kind: ContentKind, slug: string): Promise<CmsEntry | null> {
  if (!cmsPublicEnabled) return null;
  const cacheKey = `${kind}:${slug}`;
  const cached = entryCache.get(cacheKey);
  if (cached && cached.expires > Date.now()) return cached.promise;
  const promise = (async () => {
    const { data, error } = await requireClient().from("cms_entries")
    .select("*").eq("kind", kind).eq("slug", slug).eq("status", "published").maybeSingle();
    if (error) throw error;
    return data as CmsEntry | null;
  })();
  entryCache.set(cacheKey, { expires: Date.now() + cacheMs, promise });
  promise.catch(() => entryCache.delete(cacheKey));
  return promise;
}

export async function getAdminEntries(kind: ContentKind, search = "", status: ContentStatus | "all" = "all", page = 0) {
  let query = requireClient().from("cms_entries").select("*", { count: "exact" })
    .eq("kind", kind).order("updated_at", { ascending: false }).range(page * 20, page * 20 + 19);
  if (status !== "all") query = query.eq("status", status);
  if (search.trim()) query = query.ilike("title", `%${search.trim().replace(/[%_]/g, "")}%`);
  const { data, error, count } = await query;
  if (error) throw error;
  return { entries: (data ?? []) as CmsEntry[], count: count ?? 0 };
}

export async function getAdminEntry(id: string): Promise<CmsEntry> {
  const { data, error } = await requireClient().from("cms_entries").select("*").eq("id", id).single();
  if (error) throw error;
  return data as CmsEntry;
}

export async function saveEntry(input: CmsEntryInput, id?: string): Promise<CmsEntry> {
  const safeUrl = (value: string) => !value || /^(https?:\/\/|\/|#)/i.test(value);
  for (const field of ["cta_url", "canonical_url", "hero_image", "og_image"] as const) {
    if (!safeUrl(input[field])) throw new Error(`${field.replace("_", " ")} must be an HTTP(S), site-relative, or anchor URL.`);
  }
  if (input.sections.some((section) => !safeUrl(section.image || ""))) throw new Error("Section images must use HTTP(S) or site-relative URLs.");
  const payload = {
    ...input,
    slug: input.slug.trim().toLowerCase(),
    title: input.title.trim(),
    published_at: input.status === "published" ? input.published_at || new Date().toISOString() : input.published_at,
  };
  const query = id
    ? requireClient().from("cms_entries").update(payload).eq("id", id)
    : requireClient().from("cms_entries").insert(payload);
  const { data, error } = await query.select("*").single();
  if (error) throw error;
  clearPublicCache();
  return data as CmsEntry;
}

export async function deleteEntry(id: string) {
  const { error } = await requireClient().from("cms_entries").delete().eq("id", id);
  if (error) throw error;
  clearPublicCache();
}

export async function getMedia(): Promise<CmsMedia[]> {
  const { data, error } = await requireClient().from("cms_media").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as CmsMedia[];
}

export function mediaUrl(path: string) {
  return requireClient().storage.from(mediaBucket).getPublicUrl(path).data.publicUrl;
}

export async function uploadMedia(file: File, alt: string, category: string): Promise<CmsMedia> {
  if (!["image/png", "image/jpeg", "image/webp", "image/avif", "image/gif"].includes(file.type)) throw new Error("Choose a PNG, JPEG, WebP, AVIF, or GIF image.");
  if (file.size > 8 * 1024 * 1024) throw new Error("Images must be 8 MB or smaller.");
  const ext = file.name.split(".").pop()?.toLowerCase() || "img";
  const path = `${crypto.randomUUID()}.${ext}`;
  const client = requireClient();
  const uploaded = await client.storage.from(mediaBucket).upload(path, file, { contentType: file.type, upsert: false });
  if (uploaded.error) throw uploaded.error;
  const { data, error } = await client.from("cms_media").insert({ name: file.name, path, alt, category }).select("*").single();
  if (error) {
    await client.storage.from(mediaBucket).remove([path]);
    throw error;
  }
  return data as CmsMedia;
}

export async function deleteMedia(media: CmsMedia) {
  const client = requireClient();
  const { error } = await client.storage.from(mediaBucket).remove([media.path]);
  if (error) throw error;
  const deleted = await client.from("cms_media").delete().eq("id", media.id);
  if (deleted.error) throw deleted.error;
}
