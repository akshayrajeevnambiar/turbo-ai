import { EnterprisePage } from "../components/EnterprisePage";
import { enterprisePages } from "../content/enterprisePages";
import { Container, Section } from "../components/Container";
import { SectionLink } from "../components/SectionLink";
import { cmsPublicEnabled } from "../cms/client";
import { usePublishedEntries } from "../cms/hooks";

export function EnterpriseAISolutions() {
  const { entries, loading, failed } = usePublishedEntries("solution");
  return <>
    {cmsPublicEnabled && loading && <span hidden data-cms-loading />}
    {cmsPublicEnabled && failed && <span hidden data-cms-error />}
    <EnterprisePage content={enterprisePages.enterpriseSolutions} />
    {cmsPublicEnabled && entries.length > 0 && <Section className="bg-[#07111f] text-white"><Container>
      <h2 className="text-3xl font-bold md:text-5xl">Explore solutions</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{entries.map((entry) =>
        <SectionLink key={entry.id} href={`/solutions/${entry.slug}`} className="block border-t border-blue-400 bg-white/[0.03] p-6 hover:bg-white/[0.06]">
          <h3 className="text-xl font-bold">{entry.title}</h3><p className="mt-3 text-slate-300">{entry.summary}</p>
          <span className="mt-5 inline-block font-semibold text-blue-300">Explore solution →</span>
        </SectionLink>)}</div>
    </Container></Section>}
  </>;
}
