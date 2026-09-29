import { ArrowLongRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Helmet } from "react-helmet-async";
import { seoConfig } from "../content/seo";
import { SEO } from "./SEO";
import { Container } from "./Container";
import { SectionLink } from "./SectionLink";
import { CmsSEO } from "../cms/CmsSEO";
import type { CmsEntry } from "../cms/types";

type ProductPageKey = "dci360" | "iLakehouse" | "adrs";

export function ProductSEO({ pageKey, cmsEntry }: { pageKey: ProductPageKey; cmsEntry?: CmsEntry | null }) {
  const meta = seoConfig[pageKey];
  const siteUrl = import.meta.env.VITE_BASE_URL || "https://turbo-ai.ca";
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Products", item: `${siteUrl}/products` },
      { "@type": "ListItem", position: 3, name: pageKey === "dci360" ? "DCI 360" : pageKey === "iLakehouse" ? "i-Lakehouse" : "ADRS", item: meta.url },
    ],
  };

  return (
    <>
      {cmsEntry ? <CmsSEO entry={cmsEntry} /> : <SEO pageKey={pageKey} />}
      <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>
    </>
  );
}

interface RelatedLink {
  href: string;
  title: string;
  description: string;
}

interface ProductQuestion {
  question: string;
  answer: string;
}

export function ProductRelatedLinks({ links }: { links: RelatedLink[] }) {
  return (
    <section className="product-section product-related">
      <Container>
        <p className="product-eyebrow">EXPLORE MORE</p>
        <h2>Related capabilities</h2>
        <nav className="product-related-grid" aria-label="Related Turbo AI pages">
          {links.map((link) => (
            <SectionLink href={link.href} className="product-related-link" key={link.href}>
              <div>
                <h3>{link.title}</h3>
                <p>{link.description}</p>
              </div>
              <ArrowLongRightIcon aria-hidden="true" />
            </SectionLink>
          ))}
        </nav>
      </Container>
    </section>
  );
}

export function ProductFAQ({ title, intro, items }: { title: string; intro: string; items: ProductQuestion[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
  };
  return (
    <section className="product-section product-faq">
      <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>
      <Container className="product-faq-layout">
        <div>
          <p className="product-eyebrow">FREQUENTLY ASKED QUESTIONS</p>
          <h2>{title}</h2>
          <p className="product-faq-intro">{intro}</p>
        </div>
        <div className="product-faq-list">
          {items.map((item, index) => (
            <details key={item.question} name="product-faq" open={index === 0}>
              <summary>
                <span>{item.question}</span>
                <ChevronDownIcon aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
