import clientFrameworkLogos from "../assets/frameworks/client-framework-logos.webp";

// Display each mark from the original client-supplied transparent sheet.
// SVG viewBoxes preserve each mark's proportions; display filters improve dark-background contrast.
export const frameworkLogoSheet = { src: clientFrameworkLogos, width: 1536, height: 1024 } as const;
export const frameworkLogos = {
  iso42001: { name: "ISO 42001", viewBox: "77 88 363 379", filter: "brightness(0) invert(1)" },
  iso27001: { name: "ISO 27001", viewBox: "592 82 357 403", filter: "brightness(0) invert(1)" },
  gdpr: { name: "GDPR", viewBox: "1087 78 375 374", filter: "none" },
  soc2: { name: "SOC 2", viewBox: "75 542 379 381", filter: "brightness(0) invert(1)" },
  cisBenchmarks: { name: "CIS Benchmarks", viewBox: "529 577 447 327", filter: "brightness(0) invert(1)" },
  nist: { name: "NIST", viewBox: "1010 626 480 225", filter: "brightness(0) invert(1)" },
} as const;
