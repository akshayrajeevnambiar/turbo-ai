import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import puppeteer from 'puppeteer';

// Exercise the production homepage with a cold cache and no third-party services.
const measureOnly = process.argv.includes('--measure-only');
const port = 4175;
const origin = `http://127.0.0.1:${port}`;
const preview = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], { stdio: 'ignore' });
let browser;

try {
  let ready = false;
  for (let attempt = 0; attempt < 40; attempt++) {
    try { ready = (await fetch(origin)).ok; } catch { /* Server is starting. */ }
    if (ready) break;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  assert.ok(ready, 'Production preview did not start.');
  browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.setCacheEnabled(false);
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    if (new URL(request.url()).origin === origin || request.url().startsWith('data:')) request.continue();
    else request.abort();
  });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const scripts = new Map();
  const scriptReads = [];
  page.on('response', (response) => {
    if (response.url().startsWith(`${origin}/assets/`) && response.request().resourceType() === 'script') {
      scriptReads.push(response.buffer().then((buffer) => scripts.set(response.url(), buffer)));
    }
  });
  await page.goto(origin, { waitUntil: 'load' });
  await page.waitForFunction(() => {
    const heading = document.querySelector('#hero h1');
    return window.__TURBOAI_RENDERED_PATH__ === '/' && heading && Number(getComputedStyle(heading).opacity) === 1;
  });
  // A playable video confirms the optimized encoding still works in Chromium.
  await page.waitForFunction(() => {
    const video = document.querySelector('#hero video');
    return video && video.readyState >= 2 && video.currentTime > 0;
  }, { timeout: 15000 });
  await Promise.all(scriptReads);
  const jsBytes = [...scripts.values()].reduce((sum, buffer) => sum + buffer.length, 0);
  const jsGzipBytes = [...scripts.values()].reduce((sum, buffer) => sum + gzipSync(buffer).length, 0);
  const media = await page.evaluate(async () => {
    const video = document.querySelector('#hero video');
    const sheet = document.querySelector('#certifications image');
    const logoUrl = sheet.href.baseVal;
    const image = new Image();
    image.src = logoUrl;
    await image.decode();
    return { videoUrl: video.currentSrc, logoUrl, logoWidth: image.naturalWidth, logoHeight: image.naturalHeight };
  });
  const [videoResponse, logoResponse] = await Promise.all([fetch(media.videoUrl), fetch(new URL(media.logoUrl, origin))]);
  assert.ok(videoResponse.ok && logoResponse.ok, 'Homepage media must be available.');
  const videoBytes = (await videoResponse.arrayBuffer()).byteLength;
  const logoBytes = (await logoResponse.arrayBuffer()).byteLength;
  const metrics = { initialJsBytes: jsBytes, initialJsGzipBytes: jsGzipBytes, videoBytes, logoBytes, initialScriptCount: scripts.size };
  console.log(JSON.stringify(metrics, null, 2));

  if (!measureOnly) {
    assert.deepEqual(errors, [], 'Homepage must not have runtime errors.');
    assert.ok(jsGzipBytes < 300_000, `Initial compressed JS exceeded the 300 KB budget: ${jsGzipBytes}`);
    assert.ok(videoBytes < 2_000_000, `Hero video exceeded the 2 MB budget: ${videoBytes}`);
    assert.ok(logoBytes < 500_000, `Logo sheet exceeded the 500 KB budget: ${logoBytes}`);
    assert.equal(media.logoWidth, 1536);
    assert.equal(media.logoHeight, 1024);
    const html = readFileSync('dist/index.html', 'utf8');
    assert.ok(!/<script\b[^>]+src=["'][^"']*googletagmanager\.com/.test(html), 'Prerender must not capture analytics scripts injected at runtime.');
    assert.ok(html.includes('GTM-TNL375SC'), 'The original analytics bootstrap must be preserved.');

    // Slow/disabled JavaScript must still leave readable hero content and logos.
    const staticPage = await browser.newPage();
    await staticPage.setJavaScriptEnabled(false);
    for (const width of [1440, 390]) {
      await staticPage.setViewport({ width, height: 900 });
      await staticPage.goto(origin, { waitUntil: 'domcontentloaded' });
      const visible = await staticPage.$eval('#hero h1', (heading) => ({ text: heading.textContent.trim(), opacity: getComputedStyle(heading).opacity }));
      assert.equal(visible.text, 'Architecting Intelligence.');
      assert.equal(visible.opacity, '1', 'The hero heading must be visible before JavaScript starts.');
      assert.equal(await staticPage.$$eval('#certifications svg[role="img"]', (logos) => logos.length), 6);
      const overflow = await staticPage.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2);
      assert.equal(overflow, false, `Homepage overflows at ${width}px.`);
    }
    await staticPage.close();
    // Anchors must still land correctly when a secondary route downloads slowly.
    const coldRoute = await browser.newPage();
    await coldRoute.setViewport({ width: 1440, height: 900 });
    await coldRoute.setCacheEnabled(false);
    await coldRoute.setRequestInterception(true);
    coldRoute.on('request', async (request) => {
      if (new URL(request.url()).origin !== origin) return request.abort();
      if (/\/IndustryDetail-[^/]+\.js$/.test(request.url())) await new Promise((resolve) => setTimeout(resolve, 750));
      await request.continue();
    });
    await coldRoute.goto(`${origin}/industries/mining#connect`, { waitUntil: 'domcontentloaded' });
    await coldRoute.waitForSelector('main h1');
    await coldRoute.waitForFunction(() => {
      const section = document.querySelector('#connect');
      if (window.__TURBOAI_RENDERED_PATH__ !== '/industries/mining' || !section || document.querySelector('[data-route-loading]')) return false;
      const top = section.getBoundingClientRect().top;
      return top >= 0 && top <= 160;
    }, { timeout: 10000 });
    await coldRoute.close();
    console.log('Loading checks passed: asset budgets, playable video, full logo sheet, visible prerendered hero, analytics bootstrap, desktop/mobile layout, and cold-route anchors.');
  }
} finally {
  if (browser) await browser.close();
  if (process.platform === 'win32' && preview.pid) spawnSync('taskkill', ['/pid', String(preview.pid), '/f', '/t']);
  else preview.kill();
}
