import { EnterprisePage } from "../components/EnterprisePage";
import { enterprisePages } from "../content/enterprisePages";

const technologyBadges: Record<string, string> = {
  NIST: "rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-2 text-xs font-bold tracking-[0.12em] text-cyan-100",
  "ISO 27001": "rounded-full border border-blue-300/40 bg-blue-300/10 px-3 py-2 text-xs font-bold tracking-[0.12em] text-blue-100",
  "ISO 42001": "rounded-full border border-violet-300/40 bg-violet-300/10 px-3 py-2 text-xs font-bold tracking-[0.12em] text-violet-100",
  "SOC 2": "rounded-full border border-emerald-300/40 bg-emerald-300/10 px-3 py-2 text-xs font-bold tracking-[0.12em] text-emerald-100",
};

export function AIGovernanceCybersecurity() {
  return <EnterprisePage content={enterprisePages.governanceCybersecurity} technologyBadges={technologyBadges} />;
}
