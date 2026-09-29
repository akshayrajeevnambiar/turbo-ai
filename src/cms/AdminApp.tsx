import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import type { User } from "@supabase/supabase-js";
import { cmsClient, cmsConfigured } from "./client";
import { deleteEntry, deleteMedia, getAdminEntries, getAdminEntry, getMedia, mediaUrl, saveEntry, uploadMedia } from "./api";
import { contentKinds, emptyEntry, kindLabels, kindPaths, publicPath, type CmsEntry, type CmsEntryInput, type CmsMedia, type CmsSection, type ContentKind, type ContentStatus } from "./types";

function toInput(entry: CmsEntry): CmsEntryInput {
  const { id: _id, created_at: _created, updated_at: _updated, ...input } = entry;
  void _id; void _created; void _updated;
  return input;
}

function adminKind(segment: string): ContentKind | null {
  return contentKinds.find((kind) => kindPaths[kind] === segment) ?? null;
}

function Field({ label, value, onChange, multiline = false, required = false, hint }: {
  label: string; value: string; onChange: (value: string) => void; multiline?: boolean; required?: boolean; hint?: string;
}) {
  const props = { value, onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value), required,
    className: "mt-1 w-full rounded-lg border border-slate-600 bg-[#0c1729] px-3 py-2.5 text-white outline-none focus:border-blue-400" };
  return <label className="block text-sm font-medium text-slate-200">{label}
    {multiline ? <textarea {...props} rows={5} /> : <input {...props} />}
    {hint && <span className="mt-1 block text-xs font-normal text-slate-400">{hint}</span>}
  </label>;
}

function AdminLogin({ onLogin }: { onLogin: () => Promise<void> }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError("");
    const result = await cmsClient!.auth.signInWithPassword({ email, password });
    if (result.error) setError(result.error.message);
    else await onLogin();
    setBusy(false);
  }
  return <main className="flex min-h-screen items-center justify-center bg-[#020617] px-4 text-white">
    <form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0b192a] p-8 shadow-2xl">
      <Link to="/" className="text-sm text-blue-300">← Turbo AI website</Link>
      <h1 className="mt-8 text-3xl font-bold">Admin login</h1>
      <p className="mt-2 text-sm text-slate-300">Sign in with your administrator account.</p>
      <div className="mt-8 space-y-5">
        <label className="block text-sm">Email<input type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-600 bg-[#07111f] px-3 py-3" /></label>
        <label className="block text-sm">Password<input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-600 bg-[#07111f] px-3 py-3" /></label>
      </div>
      {error && <p role="alert" className="mt-4 text-sm text-rose-300">{error}</p>}
      <button disabled={busy} className="mt-7 w-full rounded-lg bg-blue-600 px-4 py-3 font-bold hover:bg-blue-500 disabled:opacity-50">{busy ? "Signing in…" : "Sign in"}</button>
    </form>
  </main>;
}

function AdminShell({ children, user, logout }: { children: ReactNode; user: User; logout: () => Promise<void> }) {
  const location = useLocation();
  const links = [{ name: "Dashboard", href: "/admin/dashboard" }, ...contentKinds.map((kind) => ({ name: kindLabels[kind], href: `/admin/${kindPaths[kind]}` })),
    { name: "Media", href: "/admin/media" }, { name: "Settings", href: "/admin/settings" }];
  return <div className="min-h-screen bg-[#020617] text-white lg:flex">
    <aside className="border-b border-white/10 bg-[#07111f] p-5 lg:min-h-screen lg:w-64 lg:flex-none lg:border-b-0 lg:border-r">
      <Link to="/admin/dashboard" className="text-xl font-extrabold tracking-wide">TURBO AI <span className="text-blue-400">CMS</span></Link>
      <nav aria-label="Admin" className="mt-7 flex gap-2 overflow-x-auto lg:flex-col">
        {links.map((link) => <Link key={link.href} to={link.href} className={`shrink-0 rounded-lg px-3 py-2 text-sm font-semibold ${location.pathname === link.href || location.pathname.startsWith(`${link.href}/`) ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-white/10"}`}>{link.name}</Link>)}
      </nav>
      <div className="mt-8 border-t border-white/10 pt-5 text-xs text-slate-400">
        <p className="truncate">{user.email}</p>
        <button onClick={logout} className="mt-3 text-blue-300 hover:text-white">Log out</button>
        <Link to="/" className="ml-5 text-blue-300 hover:text-white">View site</Link>
      </div>
    </aside>
    <main className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">{children}</main>
  </div>;
}

function Dashboard() {
  const [entries, setEntries] = useState<CmsEntry[]>([]);
  const [totals, setTotals] = useState([0, 0, 0, 0, 0]);
  const [error, setError] = useState("");
  useEffect(() => {
    const client = cmsClient!;
    const count = async (kind: ContentKind, status?: ContentStatus) => {
      let query = client.from("cms_entries").select("id", { count: "exact", head: true }).eq("kind", kind);
      if (status) query = query.eq("status", status);
      const result = await query;
      if (result.error) throw result.error;
      return result.count ?? 0;
    };
    Promise.all([
      client.from("cms_entries").select("*").order("updated_at", { ascending: false }).limit(8),
      count("page"), count("page", "published"), count("page", "draft"), count("product"), count("blog"),
    ]).then(([recent, ...counts]) => {
      if (recent.error) throw recent.error;
      setEntries((recent.data ?? []) as CmsEntry[]);
      setTotals(counts as number[]);
    }).catch((failure: Error) => setError(failure.message));
  }, []);
  const cards = [
    ["Total pages", totals[0]],
    ["Published pages", totals[1]],
    ["Draft pages", totals[2]],
    ["Total products", totals[3]],
    ["Blog posts", totals[4]],
  ] as const;
  return <><h1 className="text-3xl font-bold">Dashboard</h1><p className="mt-2 text-slate-300">Content overview and recent updates.</p>
    {error && <p role="alert" className="mt-5 text-rose-300">{error}</p>}
    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{cards.map(([label, value]) => <div key={label} className="rounded-xl border border-white/10 bg-[#0b192a] p-5"><p className="text-sm text-slate-300">{label}</p><p className="mt-3 text-3xl font-bold text-blue-300">{value}</p></div>)}</div>
    <h2 className="mt-12 text-xl font-bold">Recent updates</h2><div className="mt-4 divide-y divide-white/10 rounded-xl border border-white/10 bg-[#0b192a]">
      {entries.map((entry) => <Link key={entry.id} to={`/admin/${kindPaths[entry.kind]}/${entry.id}`} className="flex flex-wrap items-center justify-between gap-2 p-4 hover:bg-white/5"><span>{entry.title} <span className="ml-2 text-xs text-slate-400">{kindLabels[entry.kind]}</span></span><span className="text-xs text-slate-400">{new Date(entry.updated_at).toLocaleString()}</span></Link>)}
      {entries.length === 0 && <p className="p-5 text-slate-400">No CMS entries yet. Import the seed before enabling public CMS content.</p>}
    </div>
  </>;
}

function ContentList({ kind }: { kind: ContentKind }) {
  const [items, setItems] = useState<CmsEntry[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ContentStatus | "all">("all");
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");
  const refresh = useCallback(() => {
    getAdminEntries(kind, search, status, page).then(({ entries, count: total }) => { setItems(entries); setCount(total); setError(""); }).catch((failure: Error) => setError(failure.message));
  }, [kind, search, status, page]);
  useEffect(refresh, [refresh]);
  async function remove(entry: CmsEntry) {
    if (!window.confirm(`Delete “${entry.title}”? This cannot be undone.`)) return;
    try { await deleteEntry(entry.id); refresh(); } catch (failure) { setError((failure as Error).message); }
  }
  async function toggle(entry: CmsEntry) {
    try { await saveEntry({ ...toInput(entry), status: entry.status === "published" ? "draft" : "published" }, entry.id); refresh(); }
    catch (failure) { setError((failure as Error).message); }
  }
  return <><div className="flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-3xl font-bold">{kindLabels[kind]}</h1><p className="mt-2 text-sm text-slate-300">Create, edit, preview, publish, and manage {kindLabels[kind].toLowerCase()}.</p></div><Link to={`/admin/${kindPaths[kind]}/new`} className="rounded-lg bg-blue-600 px-4 py-3 font-bold hover:bg-blue-500">New {kind}</Link></div>
    <div className="mt-8 flex flex-wrap gap-3"><input aria-label="Search by title" placeholder="Search by title" value={search} onChange={(event) => { setSearch(event.target.value); setPage(0); }} className="min-w-56 flex-1 rounded-lg border border-slate-600 bg-[#0b192a] px-3 py-2" /><select aria-label="Filter by status" value={status} onChange={(event) => { setStatus(event.target.value as ContentStatus | "all"); setPage(0); }} className="rounded-lg border border-slate-600 bg-[#0b192a] px-3 py-2"><option value="all">All statuses</option><option value="published">Published</option><option value="draft">Draft</option></select></div>
    {error && <p role="alert" className="mt-4 text-rose-300">{error}</p>}
    <div className="mt-5 overflow-x-auto rounded-xl border border-white/10 bg-[#0b192a]"><table className="w-full min-w-[650px] text-left text-sm"><thead className="bg-white/5 text-slate-300"><tr><th className="p-4">Title</th><th className="p-4">Slug</th><th className="p-4">Status</th><th className="p-4">Updated</th><th className="p-4">Actions</th></tr></thead><tbody>{items.map((entry) => <tr key={entry.id} className="border-t border-white/10"><td className="p-4 font-semibold"><Link className="hover:text-blue-300" to={`/admin/${kindPaths[kind]}/${entry.id}`}>{entry.title}</Link></td><td className="p-4 text-slate-300">{entry.slug}</td><td className="p-4">{entry.status}</td><td className="p-4 text-slate-400">{new Date(entry.updated_at).toLocaleDateString()}</td><td className="space-x-3 whitespace-nowrap p-4"><Link to={`/admin/${kindPaths[kind]}/${entry.id}`} className="text-blue-300">Edit</Link><button onClick={() => toggle(entry)} className="text-blue-300">{entry.status === "published" ? "Unpublish" : "Publish"}</button><button onClick={() => remove(entry)} className="text-rose-300">Delete</button></td></tr>)}</tbody></table>{items.length === 0 && <p className="p-5 text-slate-400">No entries found.</p>}</div>
    <div className="mt-5 flex items-center gap-4 text-sm"><button disabled={page === 0} onClick={() => setPage(page - 1)} className="disabled:opacity-40">Previous</button><span>Page {page + 1} · {count} entries</span><button disabled={(page + 1) * 20 >= count} onClick={() => setPage(page + 1)} className="disabled:opacity-40">Next</button></div>
  </>;
}

function Editor({ kind, id }: { kind: ContentKind; id?: string }) {
  const navigate = useNavigate();
  const [entry, setEntry] = useState<CmsEntryInput>(emptyEntry(kind));
  const [media, setMedia] = useState<CmsMedia[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(false);
  useEffect(() => { setEntry(emptyEntry(kind)); if (id) getAdminEntry(id).then((record) => setEntry(toInput(record))).catch((failure: Error) => setError(failure.message)); getMedia().then(setMedia).catch(() => {}); }, [kind, id]);
  function update<K extends keyof CmsEntryInput>(field: K, value: CmsEntryInput[K]) { setEntry((current) => ({ ...current, [field]: value })); }
  function listField(field: "features" | "benefits" | "related_products" | "related_industries" | "tags", value: string) { update(field, value.split("\n").map((part) => part.trim()).filter(Boolean)); }
  function sectionUpdate(index: number, field: keyof CmsSection, value: string) { update("sections", entry.sections.map((section, position) => position === index ? { ...section, [field]: value } : section)); }
  async function submit(event: FormEvent) {
    event.preventDefault(); setError("");
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug)) { setError("Slug must use lowercase letters, numbers, and hyphens."); return; }
    setBusy(true);
    try { const saved = await saveEntry(entry, id); navigate(`/admin/${kindPaths[kind]}/${saved.id}`, { replace: true }); setEntry(toInput(saved)); }
    catch (failure) { setError((failure as Error).message); }
    finally { setBusy(false); }
  }
  const mediaPicker = (field: "hero_image" | "og_image") => <select aria-label={`Choose ${field.replace("_", " ")}`} value="" onChange={(event) => update(field, event.target.value)} className="mt-2 w-full rounded-lg border border-slate-600 bg-[#0c1729] px-3 py-2 text-sm"><option value="">Choose uploaded image…</option>{media.map((item) => <option key={item.id} value={mediaUrl(item.path)}>{item.name}</option>)}</select>;
  return <><div className="flex flex-wrap items-center justify-between gap-3"><div><Link to={`/admin/${kindPaths[kind]}`} className="text-sm text-blue-300">← {kindLabels[kind]}</Link><h1 className="mt-2 text-3xl font-bold">{id ? `Edit ${kind}` : `New ${kind}`}</h1></div>{id && entry.status === "published" && <Link to={publicPath(entry)} target="_blank" className="text-blue-300">View published page ↗</Link>}</div>
    <form onSubmit={submit} className="mt-8 grid max-w-5xl gap-8 xl:grid-cols-[minmax(0,1fr)_290px]">
      <div className="space-y-8">
        <section className="space-y-5 rounded-xl border border-white/10 bg-[#0b192a] p-5"><h2 className="text-xl font-bold">Content</h2>
          <Field label={kind === "product" ? "Product name" : kind === "industry" || kind === "solution" ? "Name" : "Title"} value={entry.title} onChange={(value) => update("title", value)} required />
          <Field label="Slug" value={entry.slug} onChange={(value) => update("slug", value.toLowerCase().replace(/\s+/g, "-"))} required hint={`Public URL: ${publicPath(entry)}`} />
          <Field label={kind === "blog" ? "Excerpt" : "Short description"} value={entry.summary} onChange={(value) => update("summary", value)} multiline />
          <Field label="Hero title" value={entry.hero_title} onChange={(value) => update("hero_title", value)} />
          <Field label="Hero description" value={entry.hero_description} onChange={(value) => update("hero_description", value)} multiline />
          <div><Field label={kind === "blog" ? "Featured image URL" : "Hero image URL"} value={entry.hero_image} onChange={(value) => update("hero_image", value)} />{mediaPicker("hero_image")}</div>
          <Field label={kind === "blog" ? "Article (Markdown)" : "Full content (Markdown)"} value={entry.body} onChange={(value) => update("body", value)} multiline hint="Use Markdown for headings, lists, links, and emphasis. Raw HTML is not rendered." />
          <button type="button" onClick={() => setPreview(!preview)} className="text-sm text-blue-300">{preview ? "Hide" : "Show"} content preview</button>
          {preview && <div className="prose prose-invert max-w-none rounded-lg border border-white/10 bg-[#07111f] p-5"><ReactMarkdown>{entry.body}</ReactMarkdown></div>}
        </section>
        {kind !== "blog" && <section className="space-y-5 rounded-xl border border-white/10 bg-[#0b192a] p-5"><div className="flex items-center justify-between"><h2 className="text-xl font-bold">Sections</h2><button type="button" className="text-sm text-blue-300" onClick={() => update("sections", [...entry.sections, { title: "", body: "", image: "" }])}>+ Add section</button></div>
          {entry.sections.map((section, index) => <div key={index} className="space-y-3 rounded-lg border border-white/10 p-4"><Field label={`Section ${index + 1} title`} value={section.title} onChange={(value) => sectionUpdate(index, "title", value)} /><Field label="Body (Markdown)" value={section.body} onChange={(value) => sectionUpdate(index, "body", value)} multiline /><Field label="Image URL" value={section.image ?? ""} onChange={(value) => sectionUpdate(index, "image", value)} /><button type="button" onClick={() => update("sections", entry.sections.filter((_, position) => position !== index))} className="text-sm text-rose-300">Remove section</button></div>)}
        </section>}
        {(kind === "product" || kind === "solution") && <section className="space-y-5 rounded-xl border border-white/10 bg-[#0b192a] p-5"><h2 className="text-xl font-bold">Details</h2><Field label="Features (one per line)" value={entry.features.join("\n")} onChange={(value) => listField("features", value)} multiline /><Field label="Benefits (one per line)" value={entry.benefits.join("\n")} onChange={(value) => listField("benefits", value)} multiline /></section>}
        {kind !== "page" && <section className="space-y-5 rounded-xl border border-white/10 bg-[#0b192a] p-5"><h2 className="text-xl font-bold">Relationships</h2><Field label="Related product slugs (one per line)" value={entry.related_products.join("\n")} onChange={(value) => listField("related_products", value)} multiline /><Field label="Related industry slugs (one per line)" value={entry.related_industries.join("\n")} onChange={(value) => listField("related_industries", value)} multiline /></section>}
        {kind === "blog" && <section className="space-y-5 rounded-xl border border-white/10 bg-[#0b192a] p-5"><h2 className="text-xl font-bold">Article details</h2><Field label="Author" value={entry.author} onChange={(value) => update("author", value)} /><Field label="Category" value={entry.category} onChange={(value) => update("category", value)} /><Field label="Tags (one per line)" value={entry.tags.join("\n")} onChange={(value) => listField("tags", value)} multiline /><Field label="Reading time (minutes)" value={String(entry.reading_time)} onChange={(value) => update("reading_time", Math.max(0, Number(value) || 0))} /><Field label="Published date (ISO 8601)" value={entry.published_at ?? ""} onChange={(value) => update("published_at", value || null)} hint="Leave empty to use the publish time." /></section>}
        {kind !== "blog" && <section className="space-y-5 rounded-xl border border-white/10 bg-[#0b192a] p-5"><h2 className="text-xl font-bold">Call to action</h2><Field label="Button text" value={entry.cta_text} onChange={(value) => update("cta_text", value)} /><Field label="Button URL" value={entry.cta_url} onChange={(value) => update("cta_url", value)} /></section>}
        <section className="space-y-5 rounded-xl border border-white/10 bg-[#0b192a] p-5"><h2 className="text-xl font-bold">SEO</h2><Field label="SEO title" value={entry.seo_title} onChange={(value) => update("seo_title", value)} /><Field label="SEO description" value={entry.seo_description} onChange={(value) => update("seo_description", value)} multiline /><Field label="Keywords" value={entry.seo_keywords} onChange={(value) => update("seo_keywords", value)} /><Field label="Canonical URL" value={entry.canonical_url} onChange={(value) => update("canonical_url", value)} /><Field label="Open Graph title" value={entry.og_title} onChange={(value) => update("og_title", value)} /><Field label="Open Graph description" value={entry.og_description} onChange={(value) => update("og_description", value)} multiline /><div><Field label="Open Graph image URL" value={entry.og_image} onChange={(value) => update("og_image", value)} />{mediaPicker("og_image")}</div><label className="block text-sm">Robots<select value={entry.robots} onChange={(event) => update("robots", event.target.value as CmsEntryInput["robots"])} className="mt-1 w-full rounded-lg border border-slate-600 bg-[#0c1729] px-3 py-2"><option value="index,follow">Index, follow</option><option value="noindex,nofollow">Noindex, nofollow</option></select></label></section>
      </div>
      <aside className="h-fit space-y-4 rounded-xl border border-white/10 bg-[#0b192a] p-5 xl:sticky xl:top-6"><h2 className="text-xl font-bold">Publishing</h2><label className="block text-sm">Status<select value={entry.status} onChange={(event) => update("status", event.target.value as ContentStatus)} className="mt-1 w-full rounded-lg border border-slate-600 bg-[#0c1729] px-3 py-2"><option value="draft">Draft</option><option value="published">Published</option></select></label><p className="text-xs text-slate-400">Published content becomes available to the public CMS API. Rebuild the static site to refresh prerendered HTML and the sitemap.</p>{error && <p role="alert" className="text-sm text-rose-300">{error}</p>}<button disabled={busy} className="w-full rounded-lg bg-blue-600 px-4 py-3 font-bold hover:bg-blue-500 disabled:opacity-50">{busy ? "Saving…" : "Save entry"}</button></aside>
    </form></>;
}

function MediaManager() {
  const [items, setItems] = useState<CmsMedia[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState("");
  const [category, setCategory] = useState("General");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const refresh = () => getMedia().then(setItems).catch((failure: Error) => setError(failure.message));
  useEffect(() => { void refresh(); }, []);
  async function submit(event: FormEvent) { event.preventDefault(); if (!file) return; setBusy(true); setError(""); try { await uploadMedia(file, alt, category); setFile(null); setAlt(""); refresh(); } catch (failure) { setError((failure as Error).message); } finally { setBusy(false); } }
  async function remove(item: CmsMedia) { if (!window.confirm(`Delete ${item.name}?`)) return; try { await deleteMedia(item); refresh(); } catch (failure) { setError((failure as Error).message); } }
  return <><h1 className="text-3xl font-bold">Media</h1><p className="mt-2 text-slate-300">Upload and manage images for content and Open Graph previews.</p><form onSubmit={submit} className="mt-8 grid gap-4 rounded-xl border border-white/10 bg-[#0b192a] p-5 sm:grid-cols-2"><label className="text-sm">Image<input type="file" accept="image/png,image/jpeg,image/webp,image/avif,image/gif" required onChange={(event) => setFile(event.target.files?.[0] ?? null)} className="mt-2 block w-full text-sm" /></label><Field label="Alt text" value={alt} onChange={setAlt} required /><label className="text-sm">Category<select value={category} onChange={(event) => setCategory(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-600 bg-[#0c1729] px-3 py-2"><option>General</option><option>Blog</option><option>Product</option><option>Industry</option><option>Open Graph</option></select></label><button disabled={busy} className="rounded-lg bg-blue-600 px-4 py-2 font-bold disabled:opacity-50">{busy ? "Uploading…" : "Upload image"}</button></form>{error && <p role="alert" className="mt-4 text-rose-300">{error}</p>}<div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{items.map((item) => <div key={item.id} className="overflow-hidden rounded-xl border border-white/10 bg-[#0b192a]"><img src={mediaUrl(item.path)} alt={item.alt} loading="lazy" className="aspect-video w-full object-cover" /><div className="space-y-2 p-4"><p className="truncate font-semibold">{item.name}</p><p className="text-xs text-slate-400">{item.category}</p><div className="flex gap-3 text-sm"><button onClick={() => navigator.clipboard.writeText(mediaUrl(item.path))} className="text-blue-300">Copy URL</button><button onClick={() => remove(item)} className="text-rose-300">Delete</button></div></div></div>)}</div></>;
}

function Settings() {
  const [siteName, setSiteName] = useState("Turbo AI");
  const [defaultOg, setDefaultOg] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => { cmsClient!.from("cms_settings").select("key,value").in("key", ["site_name", "default_og_image"]).then(({ data }) => { for (const row of data ?? []) { if (row.key === "site_name") setSiteName(String(row.value)); if (row.key === "default_og_image") setDefaultOg(String(row.value)); } }); }, []);
  async function submit(event: FormEvent) { event.preventDefault(); const { error } = await cmsClient!.from("cms_settings").upsert([{ key: "site_name", value: siteName }, { key: "default_og_image", value: defaultOg }]); setMessage(error ? error.message : "Settings saved."); }
  return <><h1 className="text-3xl font-bold">Settings</h1><p className="mt-2 text-slate-300">General CMS defaults. Secrets and user accounts are managed in Supabase.</p><form onSubmit={submit} className="mt-8 max-w-xl space-y-5 rounded-xl border border-white/10 bg-[#0b192a] p-5"><Field label="Site name" value={siteName} onChange={setSiteName} /><Field label="Default Open Graph image URL" value={defaultOg} onChange={setDefaultOg} /><button className="rounded-lg bg-blue-600 px-4 py-2 font-bold">Save settings</button>{message && <p role="status" className="text-sm text-blue-200">{message}</p>}</form></>;
}

export function AdminApp() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const check = useCallback(async () => {
    if (!cmsClient) { setChecking(false); return; }
    const { data } = await cmsClient.auth.getUser();
    const currentUser = data.user;
    setUser(currentUser);
    if (!currentUser) { setAuthorized(false); setChecking(false); return; }
    const membership = await cmsClient.from("cms_admins").select("user_id").eq("user_id", currentUser.id).maybeSingle();
    setAuthorized(Boolean(membership.data) && !membership.error);
    setChecking(false);
  }, []);
  useEffect(() => {
    void check();
    const subscription = cmsClient?.auth.onAuthStateChange(() => { window.setTimeout(() => { void check(); }, 0); });
    return () => subscription?.data.subscription.unsubscribe();
  }, [check]);
  async function logout() { await cmsClient!.auth.signOut(); setUser(null); setAuthorized(false); navigate("/admin/login"); }
  if (!cmsConfigured) return <main className="min-h-screen bg-[#020617] p-10 text-white"><h1 className="text-3xl font-bold">CMS setup required</h1><p className="mt-4">Configure the Supabase URL and publishable key to activate the admin dashboard.</p></main>;
  if (checking) return <main className="min-h-screen bg-[#020617] p-10 text-white">Checking admin access…</main>;
  if (!user) return pathname === "/admin/login" ? <AdminLogin onLogin={check} /> : <Navigate to="/admin/login" replace />;
  if (!authorized) return <main className="min-h-screen bg-[#020617] p-10 text-white"><h1 className="text-3xl font-bold">Access denied</h1><p className="mt-3">This account is not on the CMS administrator list.</p><button onClick={logout} className="mt-5 text-blue-300">Log out</button></main>;
  if (pathname === "/admin" || pathname === "/admin/login") return <Navigate to="/admin/dashboard" replace />;
  const [, , section, action] = pathname.split("/");
  const kind = adminKind(section ?? "");
  let content: ReactNode;
  if (section === "dashboard") content = <Dashboard />;
  else if (section === "media") content = <MediaManager />;
  else if (section === "settings") content = <Settings />;
  else if (kind && action === "new") content = <Editor kind={kind} />;
  else if (kind && action) content = <Editor kind={kind} id={action} />;
  else if (kind) content = <ContentList kind={kind} />;
  else content = <h1 className="text-3xl font-bold">Admin page not found</h1>;
  return <AdminShell user={user} logout={logout}>{content}</AdminShell>;
}
