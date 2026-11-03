import puppeteer from "puppeteer";

const base = process.env.AUDIT_BASE_URL || "http://localhost:5173";
const routes = [
  "/industries/financial-services",
  "/industries/insurance",
  "/industries/healthcare",
  "/industries/manufacturing",
  "/industries/construction",
  "/industries/automotive-mobility",
  "/industries/retail",
  "/industries/supply-chain-logistics",
  "/industries/telecommunications",
  "/industries/utilities",
  "/industries/government",
  "/industries/defence-intelligence",
  "/industries/semiconductors",
  "/industries/technology-saas",
  "/industries/data-centres",
  "/ai-transformation",
  "/generative-ai-agentic-ai",
  "/data-engineering-ai-foundations",
  "/ai-engineering-software-development",
  "/ai-governance-cybersecurity",
  "/cloud-infrastructure-ai-compute",
  "/enterprise-ai-solutions",
  "/products",
  "/products/adrs",
  "/about",
];

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
let failures = 0;
const serviceRoutes = new Set([
  "/ai-transformation",
  "/generative-ai-agentic-ai",
  "/data-engineering-ai-foundations",
  "/ai-engineering-software-development",
  "/ai-governance-cybersecurity",
  "/cloud-infrastructure-ai-compute",
  "/enterprise-ai-solutions",
]);

try {
  for (const route of routes) {
    const page = await browser.newPage();
    await page.goto(`${base}${route}`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("h1", { timeout: 5000 });

    const result = await page.evaluate(({ isAbout, isService }) => {
      const sections = [...document.querySelectorAll("main section")];
      const bodyText = document.body.innerText.replace(/\s+/g, " ");
      const sectionIndex = (section) => sections.indexOf(section);
      const insightSection = [...sections]
        .reverse()
        .find((section) => section.querySelector('a[href^="/blog/"]'));
      const connectSection = document.querySelector("#connect")?.closest("section");
      const footer = document.querySelector("footer");
      const faqPresent = document.querySelectorAll("details").length >= 3
        || /frequently asked questions|common questions/i.test(bodyText);

      return {
        hero: document.querySelectorAll("h1").length === 1,
        depth: document.querySelectorAll("main section").length >= 7,
        challenges: isAbout || /challenge|problem|pressure|constraint|complexity|risk/i.test(bodyText),
        solutions: /capabilit|solution/i.test(bodyText),
        useCases: /use cases?|where .* helps?|built for|workflow/i.test(bodyText),
        process: /delivery approach|our approach|how .* works?|from .* to|workflow/i.test(bodyText),
        technology: /technology|architecture|deployment|platform/i.test(bodyText),
        outcomes: /outcomes?|impact|results?|business value/i.test(bodyText),
        related: /related|explore more|services and platforms|capabilities and expertise|modules|built for/i.test(bodyText),
        blog: Boolean(insightSection),
        faq: isAbout || faqPresent,
        form: Boolean(connectSection?.querySelector("form")),
        serviceImages: !isService || document.querySelectorAll("main img").length >= 4,
        serviceInsightLayout: !isService || document.querySelectorAll("#service-insights article img").length === 3,
        finalOrder: Boolean(
          insightSection
          && connectSection
          && footer
          && sectionIndex(insightSection) < sectionIndex(connectSection)
          && connectSection.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING
        ),
      };
    }, { isAbout: route === "/about", isService: serviceRoutes.has(route) });

    const missing = Object.entries(result)
      .filter(([, passed]) => !passed)
      .map(([check]) => check);
    if (missing.length) failures += 1;
    console.log(`${route}: ${missing.length ? `MISSING ${missing.join(", ")}` : "PASS"}`);
    await page.close();
  }
} finally {
  await browser.close();
}

if (failures) process.exitCode = 1;
