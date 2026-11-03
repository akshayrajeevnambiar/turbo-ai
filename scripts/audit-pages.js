import puppeteer from 'puppeteer';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const base = process.env.AUDIT_BASE_URL || 'http://localhost:5173';
const routes = [
  '/', '/ai-transformation', '/generative-ai-agentic-ai',
  '/data-engineering-ai-foundations', '/ai-engineering-software-development',
  '/ai-governance-cybersecurity', '/cloud-infrastructure-ai-compute',
  '/industries-we-serve', '/enterprise-ai-solutions', '/products', '/about',
  '/products/adrs',
  '/blog/retail-demand-customer-intelligence',
  '/industries/financial-services', '/industries/insurance', '/industries/healthcare',
  '/industries/manufacturing', '/industries/construction', '/industries/automotive-mobility',
  '/industries/retail', '/industries/supply-chain-logistics', '/industries/telecommunications',
  '/industries/utilities', '/industries/government', '/industries/defence-intelligence',
  '/industries/semiconductors', '/industries/technology-saas', '/industries/data-centres',
];
const selectedRoutes = process.env.AUDIT_ROUTES?.split(',') || routes;
const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
const knownPaths = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => new URL(match[1]).pathname));
const internalLinks = new Set();
const pageTitles = new Map();

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
let failures = 0;

try {
  for (const [width, height] of [[1440, 900], [390, 844]]) {
    const page = await browser.newPage();
    await page.setViewport({ width, height });
    for (const route of selectedRoutes) {
      const errors = [];
      const onError = (error) => errors.push(error.message);
      page.on('pageerror', onError);
      const response = await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('h1', { timeout: 5000 }).catch(() => {});
      await new Promise((resolve) => setTimeout(resolve, 350));
      const state = await page.evaluate(() => ({
        h1: document.querySelectorAll('h1').length,
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        overflowElements: [...document.querySelectorAll('body *')]
          .filter((element) => element.getBoundingClientRect().right > document.documentElement.clientWidth + 1)
          .slice(0, 5)
          .map((element) => `${element.tagName.toLowerCase()}.${String(element.className).slice(0, 60)}`),
        broken: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src),
        links: [...document.querySelectorAll('a[href]')].map((anchor) => anchor.href),
      }));
      for (const href of state.links) {
        const url = new URL(href);
        if (url.origin === base || url.hostname === 'turbo-ai.ca') {
          internalLinks.add(`${route} -> ${url.pathname}`);
        }
      }
      page.off('pageerror', onError);
      const htmlPath = route === '/' ? 'dist/index.html' : path.join('dist', route.slice(1), 'index.html');
      const head = fs.readFileSync(htmlPath, 'utf8').split('</head>')[0];
      const title = head.match(/<title[^>]*>(.*?)<\/title>/s)?.[1];
      const issues = [];
      if (response && response.status() !== 304 && !response.ok()) issues.push(`HTTP ${response.status()}`);
      const missingMeta = [
        !title && 'title',
        !head.includes('name="description"') && 'description',
        !head.includes('rel="canonical"') && 'canonical',
        !head.includes('property="og:title"') && 'ogTitle',
      ].filter(Boolean);
      if (missingMeta.length) issues.push(`incomplete SEO metadata: ${missingMeta.join(', ')}`);
      if (state.h1 !== 1) issues.push(`${state.h1} H1 headings`);
      if (state.overflow > 1) issues.push(`${state.overflow}px horizontal overflow (${state.overflowElements.join(', ')})`);
      if (state.broken.length) issues.push(`${state.broken.length} broken images`);
      issues.push(...errors);
      if (issues.length) failures++;
      if (width === 1440) {
        const previous = pageTitles.get(title);
        if (previous) {
          failures++;
          console.log(`Duplicate title: ${previous} and ${route}`);
        }
        pageTitles.set(title, route);
      }
      console.log(`${width} ${route}: ${issues.length ? issues.join('; ') : 'OK'}`);
      if (['/products', '/products/adrs', '/industries-we-serve', '/ai-transformation'].includes(route)) {
        const routeName = route.slice(1).replaceAll('/', '-');
        const filename = `turbo-${width}-${routeName}.png`;
        await page.screenshot({ path: path.join(os.tmpdir(), filename) });
        if (route === '/ai-transformation') {
          const insights = await page.$('#service-insights');
          if (insights) {
            await insights.screenshot({ path: path.join(os.tmpdir(), `turbo-${width}-service-insights.png`) });
          }
        }
        if (width === 1440 && route !== '/ai-transformation') {
          await page.evaluate(() => window.scrollTo(0, 650));
          await new Promise((resolve) => setTimeout(resolve, 500));
          await page.screenshot({ path: path.join(os.tmpdir(), `turbo-${width}-${routeName}-section.png`) });
        }
      }
    }
    await page.close();
  }
} finally {
  await browser.close();
}

for (const link of internalLinks) {
  const destination = link.slice(link.indexOf(' -> ') + 4);
  const publicFile = path.join('public', destination.slice(1));
  if (!knownPaths.has(destination) && !fs.existsSync(publicFile)) {
    failures++;
    console.log(`Broken internal link: ${link}`);
  }
}

if (failures) process.exitCode = 1;
