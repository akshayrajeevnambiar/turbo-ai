import ReactMarkdown from "react-markdown";
import { Container } from "../components/Container";
import type { CmsEntry } from "./types";

export function CmsProductSections({ entry }: { entry: CmsEntry | null }) {
  if (!entry || (!entry.body && entry.sections.length === 0 && entry.features.length === 0 && entry.benefits.length === 0)) return null;
  return <>
    {entry.body && <section className="product-section cms-product-section product-copy-section"><Container><div className="prose prose-invert max-w-4xl text-slate-200"><ReactMarkdown>{entry.body}</ReactMarkdown></div></Container></section>}
    {entry.sections.map((section, index) => <section key={`${section.title}-${index}`} className="product-section cms-product-section product-copy-section"><Container><div className="grid gap-10 lg:grid-cols-2 lg:items-center"><div><p className="product-eyebrow">0{index + 1} / PRODUCT</p><h2>{section.title}</h2><div className="prose prose-invert mt-6 text-slate-200"><ReactMarkdown>{section.body}</ReactMarkdown></div></div>{section.image && <img src={section.image} alt="" loading="lazy" className="max-h-[440px] w-full rounded-lg object-cover" />}</div></Container></section>)}
    {(entry.features.length > 0 || entry.benefits.length > 0) && <section className="product-section cms-product-section product-copy-section"><Container><div className="grid gap-10 md:grid-cols-2">{entry.features.length > 0 && <div><p className="product-eyebrow">FEATURES</p><h2>Capabilities</h2><ul className="mt-8 space-y-3 text-slate-200">{entry.features.map((feature) => <li className="border-l-2 border-cyan-400 pl-4" key={feature}>{feature}</li>)}</ul></div>}{entry.benefits.length > 0 && <div><p className="product-eyebrow">BENEFITS</p><h2>Outcomes</h2><ul className="mt-8 space-y-3 text-slate-200">{entry.benefits.map((benefit) => <li className="border-l-2 border-blue-400 pl-4" key={benefit}>{benefit}</li>)}</ul></div>}</div></Container></section>}
  </>;
}
