import ReactMarkdown from "react-markdown";
import { Container } from "../components/Container";
import type { CmsEntry } from "./types";

export function CmsExtraContent({ entry }: { entry: CmsEntry | null }) {
  if (!entry || (!entry.body && entry.sections.length === 0)) return null;
  return <div className="bg-[#020617] text-white" data-cms-ready="true">
    {entry.body && <section className="border-t border-white/10 py-16"><Container><div className="prose prose-invert max-w-4xl text-slate-200"><ReactMarkdown>{entry.body}</ReactMarkdown></div></Container></section>}
    {entry.sections.map((section, index) => <section key={`${section.title}-${index}`} className="border-t border-white/10 py-16"><Container><div className="grid gap-8 lg:grid-cols-2 lg:items-center"><div><h2 className="text-3xl font-bold md:text-5xl">{section.title}</h2><div className="prose prose-invert mt-5 text-slate-200"><ReactMarkdown>{section.body}</ReactMarkdown></div></div>{section.image && <img src={section.image} alt="" loading="lazy" className="w-full rounded-xl object-cover" />}</div></Container></section>)}
  </div>;
}
