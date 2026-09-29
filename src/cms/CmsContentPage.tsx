import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Container } from "../components/Container";
import { SectionLink } from "../components/SectionLink";
import { cmsPublicEnabled } from "./client";
import { usePublishedEntry } from "./hooks";
import { CmsSEO } from "./CmsSEO";
import type { CmsEntry, ContentKind } from "./types";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { cmsClient } from "./client";

export function CmsContent({ entry }: { entry: CmsEntry }) {
  return <main data-cms-ready="true" className="min-h-screen bg-[#020617] text-white">
    <CmsSEO entry={entry} />
    <section className="relative flex min-h-[560px] items-center overflow-hidden pb-20 pt-36">
      {entry.hero_image && <img src={entry.hero_image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/85 to-[#020617]/40" />
      <Container className="relative z-10 w-full"><div className="max-w-4xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-200">{entry.kind}</p><h1 className="mt-4 text-4xl font-extrabold md:text-7xl">{entry.hero_title || entry.title}</h1><p className="mt-6 max-w-3xl text-xl leading-relaxed text-slate-200">{entry.hero_description || entry.summary}</p>{entry.cta_text && entry.cta_url && <SectionLink href={entry.cta_url} className="mt-8 inline-flex rounded-lg bg-blue-600 px-6 py-3 font-bold hover:bg-blue-500">{entry.cta_text}</SectionLink>}</div></Container>
    </section>
    {entry.body && <section className="py-16"><Container><div className="prose prose-invert max-w-4xl text-slate-200"><ReactMarkdown>{entry.body}</ReactMarkdown></div></Container></section>}
    {entry.sections.map((section, index) => <section key={`${section.title}-${index}`} className={`border-t border-white/10 py-16 ${index % 2 ? "bg-[#07111f]" : "bg-[#0b192a]"}`}><Container><div className="grid gap-8 lg:grid-cols-2 lg:items-center"><div><h2 className="text-3xl font-bold md:text-5xl">{section.title}</h2><div className="prose prose-invert mt-6 text-slate-200"><ReactMarkdown>{section.body}</ReactMarkdown></div></div>{section.image && <img src={section.image} alt="" loading="lazy" className="max-h-[440px] w-full rounded-xl object-cover" />}</div></Container></section>)}
    {(entry.features.length > 0 || entry.benefits.length > 0) && <section className="border-t border-white/10 py-16"><Container><div className="grid gap-10 md:grid-cols-2">{entry.features.length > 0 && <div><h2 className="text-2xl font-bold">Features</h2><ul className="mt-6 space-y-3 text-slate-200">{entry.features.map((item) => <li key={item} className="border-l-2 border-cyan-400 pl-4">{item}</li>)}</ul></div>}{entry.benefits.length > 0 && <div><h2 className="text-2xl font-bold">Benefits</h2><ul className="mt-6 space-y-3 text-slate-200">{entry.benefits.map((item) => <li key={item} className="border-l-2 border-blue-400 pl-4">{item}</li>)}</ul></div>}</div></Container></section>}
  </main>;
}

export function CmsContentPage({ kind }: { kind: ContentKind }) {
  const { slug } = useParams();
  const { entry, loading, failed } = usePublishedEntry(kind, slug);
  if (!cmsPublicEnabled) return <CmsNotFound />;
  if (loading) return <main data-cms-loading className="min-h-screen bg-[#020617] pt-40 text-center text-slate-300">Loading…</main>;
  if (failed) return <CmsUnavailable />;
  if (!entry) return <CmsNotFound />;
  return <CmsContent entry={entry} />;
}

export function CmsUnavailable() {
  return <main data-cms-error className="flex min-h-screen items-center justify-center bg-[#020617] px-4 text-center text-white"><Helmet><title>Content unavailable | Turbo AI</title><meta name="robots" content="noindex,nofollow" /></Helmet><div><h1 className="text-4xl font-bold">Content temporarily unavailable</h1><p className="mt-4 text-slate-300">Please try again shortly.</p></div></main>;
}

export function CmsNotFound() {
  const { pathname } = useLocation();
  const [redirect, setRedirect] = useState("");
  useEffect(() => {
    if (!cmsPublicEnabled || !cmsClient) return;
    let active = true;
    cmsClient.from("cms_redirects").select("target_path").eq("old_path", pathname).maybeSingle()
      .then(({ data }) => { if (active && data?.target_path && data.target_path !== pathname) setRedirect(data.target_path); });
    return () => { active = false; };
  }, [pathname]);
  if (redirect) return <Navigate to={redirect} replace />;
  return <main className="flex min-h-screen items-center justify-center bg-[#020617] px-4 text-center text-white" data-cms-ready="true"><Helmet><title>Page not found | Turbo AI</title><meta name="robots" content="noindex,nofollow" /></Helmet><div><h1 className="text-5xl font-bold">Page not found</h1><p className="mt-4 text-slate-300">The page may have moved or is not published.</p><a href="/" className="mt-8 inline-block text-blue-300">Return home</a></div></main>;
}
