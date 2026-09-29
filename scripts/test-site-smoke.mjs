import { spawn } from 'node:child_process';
import puppeteer from 'puppeteer';

const port = 4174;
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
  const routes = ['/', '/about', '/products', '/products/i-lakehouse', '/industries/financial-services',
    '/enterprise-ai-solutions', '/blog', '/blog/energy-ai-asset-intelligence-foundations'];
  for (const route of routes) {
    await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('main h1', { timeout: 10000 });
    const heading = await page.$eval('main h1', (node) => node.textContent.trim());
    if (!heading) throw new Error(`${route} has no heading.`);
  }
  await page.goto(`http://127.0.0.1:${port}/admin/login`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('main h1');
  const setup = await page.$eval('main h1', (node) => node.textContent.trim());
  if (setup !== 'CMS setup required') throw new Error('Unconfigured admin did not show setup state.');

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('button[aria-label="Open menu"]');
  await page.click('button[aria-label="Open menu"]');
  await page.waitForSelector('nav[aria-label="Mobile navigation"]');
  const mobile = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, viewport: innerWidth }));
  if (mobile.width > mobile.viewport + 2) throw new Error(`Mobile horizontal overflow: ${mobile.width}px > ${mobile.viewport}px`);
  console.log(`Smoke passed: ${routes.length} public routes, admin setup, and mobile navigation.`);
} finally {
  if (browser) await browser.close();
  if (process.platform === 'win32' && preview.pid) {
    const { spawnSync } = await import('node:child_process');
    spawnSync('taskkill', ['/pid', String(preview.pid), '/f', '/t']);
  } else preview.kill();
}
