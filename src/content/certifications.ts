// The six groups selected by the user from Strategic Mix's Corresponding Frameworks column.
// Preserve their order and repeated groups, which correspond to separate service lines.
export const frameworkGroups = [
  { id: "ai-strategy", label: "ISO 42001" },
  { id: "generative-ai", label: "ISO 42001, SOC 2" },
  { id: "data-engineering", label: "ISO 27001, GDPR" },
  { id: "ai-engineering", label: "SOC 2, CIS Benchmarks" },
  { id: "cybersecurity", label: "NIST, ISO 27001" },
  { id: "cloud-infrastructure", label: "SOC 2, CIS Benchmarks" },
] as const;
