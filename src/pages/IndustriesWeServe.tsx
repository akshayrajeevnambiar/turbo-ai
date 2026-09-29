import { Container, Section } from "../components/Container";
import { SectionLink } from "../components/SectionLink";
import { SEO } from "../components/SEO";
import { Connect } from "../components/Connect";
import { LatestPerspectives } from "../components/EnterprisePage";
import { industriesHero, industriesWeServe } from "../content/enterprisePages";
import { useReveal } from "../hooks/useReveal";
import { cmsPublicEnabled } from "../cms/client";
import { usePublishedEntries, useCmsPage } from "../cms/hooks";

export function IndustriesWeServe() {
  const { addElement } = useReveal(35);
  const cms = useCmsPage();
  const { entries, loading, failed } = usePublishedEntries("industry");
  const cards = cmsPublicEnabled ? [...entries].sort((a, b) => {
    const rank = (slug: string) => {
      const index = industriesWeServe.findIndex((item) => item.href === `/industries/${slug}`);
      return index < 0 ? industriesWeServe.length : index;
    };
    return rank(a.slug) - rank(b.slug);
  }).map((entry) => {
    const authored = industriesWeServe.find((item) => item.href === `/industries/${entry.slug}`);
    return { name: entry.title, description: entry.summary, image: entry.hero_image || authored?.image || "",
      alt: authored?.alt || entry.title, applications: entry.features.length ? entry.features : authored?.applications || [],
      href: `/industries/${entry.slug}` };
  }) : industriesWeServe;

  return (
    <main className="bg-[#020617] text-white" role="main">
      <SEO pageKey={industriesHero.seoKey} />

      <section className="relative min-h-[680px] overflow-hidden pt-28">
        <img
          src={cms?.hero_image || industriesHero.image}
          alt={industriesHero.alt}
          className="absolute inset-0 h-full w-full object-cover opacity-45"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/90 to-[#020617]/30" />
        <Container className="relative z-10 flex min-h-[560px] items-center">
          <div className="max-w-4xl">
            <p className="kicker text-blue-200">
              {industriesHero.eyebrow}
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-7xl">
              {cms?.hero_title || industriesHero.title}
            </h1>
            <p className="mt-5 text-2xl font-semibold text-blue-200 md:text-3xl">
              {cms?.hero_description || industriesHero.subtitle}
            </p>
            <p ref={addElement} className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-200">
              Turbo AI applies AI, data engineering, software delivery, cloud, and governance capabilities to real operating environments where technology has to be useful, secure, and measurable.
            </p>
          </div>
        </Container>
      </section>

      <Section className="bg-[#050B16]">
        <Container>
          <div className="mb-12 max-w-3xl">
            <p className="kicker text-cyan-200">Real Economy AI</p>
            <h2 className="text-3xl font-bold text-white md:text-5xl">AI shaped by industry realities</h2>
            <p className="mt-4 text-slate-300">
              Each sector has distinct data, operational, and adoption needs. Explore where Turbo AI can connect enterprise systems, strengthen decisions, and support practical AI deployment.
            </p>
          </div>

          {loading && <p data-cms-loading className="mb-6 text-slate-300">Loading industries…</p>}
          {failed && <p data-cms-error role="alert" className="mb-6 text-rose-300">Industries are temporarily unavailable.</p>}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {cards.map((industry) => (
              <article
                key={industry.name}
                ref={addElement}
                className="group overflow-hidden rounded-lg border border-white/10 bg-[#07111F] shadow-xl transition hover:-translate-y-1 hover:border-blue-400/40"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={industry.image}
                    alt={industry.alt}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white">{industry.name}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">{industry.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {industry.applications.map((application) => (
                      <span
                        key={application}
                        className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-blue-100"
                      >
                        {application}
                      </span>
                    ))}
                  </div>
                  <SectionLink
                    href={industry.href}
                    aria-label={`Explore ${industry.name}`}
                    className="mt-6 inline-flex items-center text-sm font-bold text-blue-300 transition hover:text-white"
                  >
                    Explore Industry
                    <span className="ml-2" aria-hidden="true">
                      -&gt;
                    </span>
                  </SectionLink>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <LatestPerspectives />
      <Connect />
    </main>
  );
}
