import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';
import { loadEnv } from 'vite';

const port = 4174;
const baseUrl = (loadEnv('production', process.cwd(), 'VITE_').VITE_BASE_URL || 'https://turbo-ai.ca').replace(/\/$/, '');
const industries = [
  { label: 'Financial Services', slug: 'financial-services' },
  { label: 'Insurance', slug: 'insurance' },
  { label: 'Healthcare', slug: 'healthcare' },
  { label: 'Manufacturing', slug: 'manufacturing' },
  { label: 'Construction', slug: 'construction' },
  { label: 'Automotive & Mobility', slug: 'automotive-mobility' },
  { label: 'Mining', slug: 'mining', city: 'Saskatoon' },
  { label: 'Real Estate', slug: 'real-estate', city: 'Toronto' },
  { label: 'Oil & Gas', slug: 'oil-and-gas', city: 'Calgary' },
  { label: 'Retail', slug: 'retail' },
  { label: 'Supply Chain & Logistics', slug: 'supply-chain-logistics' },
  { label: 'Telecommunications', slug: 'telecommunications' },
  { label: 'Utilities', slug: 'utilities' },
  { label: 'Government', slug: 'government' },
  { label: 'Defence & Intelligence', slug: 'defence-intelligence' },
  { label: 'Semiconductors', slug: 'semiconductors' },
  { label: 'Technology & SaaS', slug: 'technology-saas' },
  { label: 'Data Centres', slug: 'data-centres' },
];
const industryLinks = industries.map(({ label, slug }) => ({ label, href: `/industries/${slug}` }));
const preview = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', String(port), '--strictPort'],
  { shell: true, stdio: 'ignore' });
let browser;
try {
  let ready = false;
  for (let attempt = 0; attempt < 40; attempt++) {
    try { const response = await fetch(`http://127.0.0.1:${port}/`); ready = response.ok; } catch { /* wait for preview */ }
    if (ready) break;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  if (!ready) throw new Error('Preview server did not start.');
  browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  const routes = ['/', '/about', '/products', '/products/i-lakehouse',
    '/enterprise-ai-solutions', '/blog', '/blog/energy-ai-asset-intelligence-foundations',
    ...industryLinks.map(({ href }) => href)];
  for (const route of routes) {
    await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('main h1', { timeout: 10000 });
    const heading = await page.$eval('main h1', (node) => node.textContent.trim());
    if (!heading) throw new Error(`${route} has no heading.`);
    const industry = industries.find(({ slug }) => route === `/industries/${slug}`);
    if (industry) assert.equal(heading, `AI for ${industry.label}`, `${route} must render its own industry page.`);
  }

  // Check the actual dropdown content and one navigation action at both breakpoints.
  const checkIndustryMenu = async (navigation) => {
    const trigger = `nav[aria-label="${navigation}"] button[aria-label="Industries We Serve menu"]`;
    await page.waitForSelector(trigger, { visible: true });
    if (navigation === 'Main navigation') await page.hover(trigger);
    else await page.click(trigger);
    await page.waitForSelector(`${trigger}[aria-expanded="true"]`);
    const links = await page.$eval(trigger, (button) => [...button.parentElement.querySelectorAll('a[href^="/industries/"]')]
      .map((link) => ({ label: link.textContent.trim(), href: link.getAttribute('href') })));
    assert.deepEqual(links, industryLinks, `${navigation} must list all 18 industry pages in the requested order.`);
    assert.ok(await page.$eval(trigger, (button) => !!button.parentElement.querySelector('a[href="/industries-we-serve"]')),
      `${navigation} needs a link to the industry overview.`);
  };
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'domcontentloaded' });
  await checkIndustryMenu('Main navigation');
  const desktopIndustryTrigger = 'nav[aria-label="Main navigation"] button[aria-label="Industries We Serve menu"]';
  await page.hover('nav[aria-label="Main navigation"] a[href="/industries/mining"]');
  await new Promise((resolve) => setTimeout(resolve, 300));
  assert.equal(await page.$eval(desktopIndustryTrigger, (button) => button.getAttribute('aria-expanded')), 'true',
    'The industry menu must stay open while hovering its links.');
  await page.mouse.move(10, 850);
  await page.waitForSelector(`${desktopIndustryTrigger}[aria-expanded="false"]`);
  await page.focus(desktopIndustryTrigger);
  await page.keyboard.press('ArrowDown');
  await page.waitForSelector(`${desktopIndustryTrigger}[aria-expanded="true"]`);
  await page.keyboard.press('Escape');
  await page.waitForSelector(`${desktopIndustryTrigger}[aria-expanded="false"]`);
  await page.hover(desktopIndustryTrigger);
  await page.waitForSelector(`${desktopIndustryTrigger}[aria-expanded="true"]`);
  await page.click('nav[aria-label="Main navigation"] a[href="/industries/mining"]');
  await page.waitForFunction(() => location.pathname === '/industries/mining' && document.querySelector('main h1')?.textContent === 'AI for Mining');

  // Disable JavaScript to ensure the new landing pages and SEO metadata are prerendered.
  const staticPage = await browser.newPage();
  await staticPage.setJavaScriptEnabled(false);
  const sitemap = readFileSync(path.resolve('dist', 'sitemap.xml'), 'utf8');
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]));
  const publicUrls = [...readFileSync(path.resolve('public', 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => new URL(match[1]));
  assert.deepEqual(sitemapUrls.map((url) => url.pathname).sort(), publicUrls.map((url) => url.pathname).sort(),
    'The public and generated sitemaps must include the same authored pages.');
  assert.equal(new Set(sitemapUrls.map((url) => url.href)).size, sitemapUrls.length, 'Sitemap URLs must be unique.');
  for (const url of sitemapUrls) {
    assert.equal(url.origin, new URL(baseUrl).origin);
    assert.ok(!url.hash && !url.search, `Sitemap must contain clean URLs: ${url}`);
    assert.ok(!['/404', '/404.html', '/industries', '/index.php', '/offshore-development'].includes(url.pathname) && !url.pathname.startsWith('/admin'),
      `Sitemap must exclude errors, administration, and redirected URLs: ${url}`);
    const filename = url.pathname === '/image-credits' ? 'image-credits.html' : `${url.pathname.slice(1)}${url.pathname === '/' ? '' : '/'}index.html`;
    assert.ok(existsSync(path.resolve('dist', filename)), `Sitemap points to missing generated content: ${url}`);
  }
  for (const industry of industries.filter(({ city }) => city)) {
    const route = `/industries/${industry.slug}`;
    assert.ok(existsSync(path.resolve('dist', route.slice(1), 'index.html')), `${route} is missing its prerendered HTML.`);
    assert.ok(sitemap.includes(`<loc>${baseUrl}${route}</loc>`), `${route} is missing from the generated sitemap.`);
    // Vite preview uses its SPA fallback for extensionless paths; read the generated file explicitly.
    await staticPage.goto(`http://127.0.0.1:${port}${route}/index.html`, { waitUntil: 'domcontentloaded' });
    assert.equal(await staticPage.title(), `${industry.label} AI Solutions | Turbo AI`);
    assert.equal(await staticPage.$eval('main h1', (node) => node.textContent.trim()), `AI for ${industry.label}`);
    assert.equal(await staticPage.$eval('link[rel="canonical"]', (node) => node.href), `${baseUrl}${route}`);
    const description = await staticPage.$eval('meta[name="description"]', (node) => node.content);
    assert.ok(description.includes(industry.city), `${route} must describe its target market.`);
    const content = await staticPage.$eval('main', (node) => node.textContent);
    assert.ok(content.includes(industry.city), `${route} must include its target market in visible page content.`);
    const relatedLinks = await staticPage.$$eval('nav[aria-label="Related services and products"] a',
      (links) => links.map((link) => link.getAttribute('href')));
    assert.ok(relatedLinks.length > 0, `${route} must link to related capabilities.`);
    for (const href of relatedLinks) {
      assert.ok(existsSync(path.resolve('dist', href.replace(/^\//, ''), 'index.html')), `${route} links to a missing page: ${href}`);
    }
    assert.ok(await staticPage.$('main a[href="#connect"]'), `${route} needs a contact call to action.`);
    assert.ok(await staticPage.$('#connect'), `${route} needs a contact section.`);
  }
  await staticPage.goto(`http://127.0.0.1:${port}/404.html`, { waitUntil: 'domcontentloaded' });
  assert.equal(await staticPage.title(), 'Page not found | Turbo AI');
  assert.ok(await staticPage.$('main[data-not-found]'), 'The static 404 must render the branded error page.');
  assert.ok(await staticPage.$('header nav[aria-label="Main navigation"]'), 'The static 404 needs the normal navigation.');
  assert.ok(await staticPage.$('footer'), 'The static 404 needs the normal footer.');
  assert.ok(await staticPage.$('link[rel="stylesheet"]'), 'The static 404 needs the site stylesheet.');
  assert.ok((await staticPage.$eval('meta[name="robots"]', (node) => node.content)).includes('noindex'), 'The error page must not be indexed.');
  assert.equal(await staticPage.$('link[rel="canonical"]'), null, 'The error page must not inherit a valid page canonical.');
  assert.ok(await staticPage.$('main a[href="/"]'), 'The error page needs a route back to the homepage.');
  await staticPage.close();

  for (const [legacy, destination] of [['/index.php', '/'], ['/offshore-development', '/ai-engineering-software-development']]) {
    await page.goto(`http://127.0.0.1:${port}${legacy}`, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction((route) => location.pathname === route, {}, destination);
    await page.waitForSelector('main h1');
    assert.equal(await page.$('[data-not-found]'), null, `${legacy} must route to its relevant replacement page.`);
  }

  await page.goto(`http://127.0.0.1:${port}/admin/login`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('main h1');
  const setup = await page.$eval('main h1', (node) => node.textContent.trim());
  if (setup !== 'CMS setup required') throw new Error('Unconfigured admin did not show setup state.');

  await page.setViewport({ width: 390, height: 568, deviceScaleFactor: 1 });
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('button[aria-label="Open menu"]');
  await page.click('button[aria-label="Open menu"]');
  await page.waitForSelector('nav[aria-label="Mobile navigation"]');
  await checkIndustryMenu('Mobile navigation');
  const mobile = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, viewport: innerWidth }));
  if (mobile.width > mobile.viewport + 2) throw new Error(`Mobile horizontal overflow: ${mobile.width}px > ${mobile.viewport}px`);
  const finalLink = 'nav[aria-label="Mobile navigation"] a[href="/industries/data-centres"]';
  await page.$eval(finalLink, (link) => link.scrollIntoView({ block: 'center' }));
  const reachable = await page.$eval(finalLink, (link) => {
    const rect = link.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return centerY > 0 && centerY < innerHeight && link.contains(document.elementFromPoint(centerX, centerY));
  });
  assert.ok(reachable, 'The last industry link must be reachable in the small mobile menu.');
  await page.click(finalLink);
  await page.waitForFunction(() => location.pathname === '/industries/data-centres' && document.querySelector('main h1')?.textContent === 'AI for Data Centres');
  await page.waitForSelector('nav[aria-label="Mobile navigation"]', { hidden: true });
  console.log(`Smoke passed: ${routes.length} public routes, three prerendered industry pages with SEO metadata, ${sitemapUrls.length} sitemap URLs, 18 desktop/mobile industry links, branded 404, legacy redirects, admin setup, and small-screen mobile navigation.`);
} finally {
  if (browser) await browser.close();
  if (process.platform === 'win32' && preview.pid) {
    const { spawnSync } = await import('node:child_process');
    spawnSync('taskkill', ['/pid', String(preview.pid), '/f', '/t']);
  } else preview.kill();
}
