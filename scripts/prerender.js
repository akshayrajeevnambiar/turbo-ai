import puppeteer from 'puppeteer';
import { spawn, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { loadEnv } from 'vite';
import { createClient } from '@supabase/supabase-js';

const env = loadEnv('production', process.cwd(), 'VITE_');
const cmsEnabled = env.VITE_CMS_ENABLED === 'true';
const baseUrl = (env.VITE_BASE_URL || 'https://turbo-ai.ca').replace(/\/$/, '');
const cmsPath = (entry) => entry.kind === 'page'
    ? entry.slug === 'home' ? '/' : `/${entry.slug}`
    : entry.kind === 'solution' ? `/solutions/${entry.slug}`
    : `/${entry.kind === 'industry' ? 'industries' : entry.kind === 'product' ? 'products' : 'blog'}/${entry.slug}`;
const xmlEscape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
const publicDocuments = [{ route: '/image-credits', file: 'image-credits.html' }];
const analyticsDomains = ['googletagmanager.com', 'google-analytics.com'];

async function renderedHtml(page) {
    // Runtime loaders belong to the visitor's session, not the static snapshot.
    // Keep the original inline GTM bootstrap and noscript fallback intact.
    await page.evaluate((domains) => {
        for (const script of document.querySelectorAll('script[src]')) {
            const hostname = new URL(script.src).hostname;
            if (domains.some(domain => hostname === domain || hostname.endsWith(`.${domain}`))) {
                script.remove();
            }
        }
    }, analyticsDomains);
    return page.content();
}

// Keep reviewed modification dates; a deployment alone does not change page content.
function knownModificationDates() {
    const dates = new Map();
    const source = fs.readFileSync(path.resolve('public', 'sitemap.xml'), 'utf8');
    for (const match of source.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
        const location = match[1].match(/<loc>([^<]+)<\/loc>/)?.[1];
        const modified = match[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
        if (location && modified && !Number.isNaN(Date.parse(modified))) {
            dates.set(new URL(location).pathname, modified);
        }
    }
    return dates;
}

async function publishedCmsRoutes() {
    if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_PUBLISHABLE_KEY) {
        throw new Error('CMS is enabled but Supabase URL or publishable key is missing.');
    }
    const client = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_PUBLISHABLE_KEY,
        { auth: { persistSession: false, autoRefreshToken: false } });
    const entries = [];
    for (let offset = 0; ; offset += 500) {
        const { data, error } = await client.from('cms_entries')
            .select('kind,slug,robots,updated_at').eq('status', 'published')
            .order('kind').order('slug').range(offset, offset + 499);
        if (error) throw error;
        entries.push(...(data || []));
        if (!data || data.length < 500) break;
    }
    if (!entries.length) throw new Error('CMS is enabled but no published content exists. Import and review the seed first.');
    return entries;
}

async function prerender() {
    console.log('Starting pre-rendering...');
    const cmsEntries = cmsEnabled ? await publishedCmsRoutes() : [];

    // Start the preview server
    const preview = spawn('npm', ['run', 'preview'], {
        stdio: 'pipe',
        shell: true,
    });

    let port = 0;

    // Wait for the server to start and get the port
    const serverUrl = await new Promise((resolve) => {
        preview.stdout.on('data', (data) => {
            const output = data.toString();
            // Strip ANSI codes
            const cleanOutput = output.replace(/\u001b\[.*?m/g, '');
            console.log(`[Preview] ${cleanOutput.trim()}`);

            // Match "Local: http://localhost:PORT" or just "http://localhost:PORT"
            const match = cleanOutput.match(/(?:Local:\s+)?(http:\/\/localhost:(\d+))/);
            if (match) {
                port = parseInt(match[2]);
                resolve(match[1]);
            }
        });

        preview.stderr.on('data', (data) => {
            console.error(`[Preview Error] ${data}`);
        });
    });

    console.log(`Preview server running at ${serverUrl}`);

    // Launch Puppeteer
    let browser;
    if (process.env.VERCEL) {
        console.log('Running on Vercel, using @sparticuz/chromium');
        const chromium = await import('@sparticuz/chromium').then(m => m.default);
        const core = await import('puppeteer-core').then(m => m.default);

        browser = await core.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
        });
    } else {
        console.log('Running locally, using standard puppeteer');
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
    }
    const page = await browser.newPage();
    // Avoid recording build visits or serializing scripts injected by analytics.
    await page.setRequestInterception(true);
    page.on('request', async (request) => {
        const hostname = new URL(request.url()).hostname;
        if (analyticsDomains.some(domain => hostname === domain || hostname.endsWith(`.${domain}`))) {
            await request.abort();
        } else {
            await request.continue();
        }
    });

    // Static routes
    const staticRoutes = [
        '/',
        '/ai-transformation',
        '/strategic-intelligence',
        '/remote-infrastructure-management',
        '/digital-architecture',
        '/cyber-security-solutions',
        '/ai-data-insights',
        '/cloud-solutions',
        '/quality-engineering',
        '/generative-ai-agentic-ai',
        '/data-engineering-ai-foundations',
        '/ai-engineering-software-development',
        '/ai-governance-cybersecurity',
        '/cloud-infrastructure-ai-compute',
        '/industries-we-serve',
        '/enterprise-ai-solutions',
        '/products',
        '/products/dci-360',
        '/products/i-lakehouse',
        '/products/adrs',
        '/about',
        '/industries/financial-services',
        '/industries/insurance',
        '/industries/healthcare',
        '/industries/manufacturing',
        '/industries/construction',
        '/industries/automotive-mobility',
        '/industries/mining',
        '/industries/real-estate',
        '/industries/oil-and-gas',
        '/industries/retail',
        '/industries/supply-chain-logistics',
        '/industries/telecommunications',
        '/industries/utilities',
        '/industries/government',
        '/industries/defence-intelligence',
        '/industries/semiconductors',
        '/industries/technology-saas',
        '/industries/data-centres',
        '/blog',
    ];

    // Dynamic blog routes from the authored post collections.
    const blogRoutes = [];
    if (!cmsEnabled) try {
        for (const filename of ['blog.ts', 'industryInsights.ts']) {
          const blogContentPath = path.resolve('src', 'content', filename);
          if (!fs.existsSync(blogContentPath)) continue;
          const content = fs.readFileSync(blogContentPath, 'utf-8');
          const slugMatches = content.match(/slug:\s*"([^"]+)"/g) || [];
          slugMatches.forEach(match => {
            const slug = match.match(/slug:\s*"([^"]+)"/)[1];
            blogRoutes.push(`/blog/${slug}`);
          });
        }
        console.log(`Found ${blogRoutes.length} blog posts to prerender.`);
    } catch (e) {
        console.warn('Could not auto-discover blog posts:', e);
    }

    const routes = cmsEnabled
        ? [...new Set(cmsEntries.map(cmsPath))]
        : [...new Set([...staticRoutes, ...blogRoutes])];
    const cmsByPath = new Map(cmsEntries.map((entry) => [cmsPath(entry), entry]));
    const knownDates = knownModificationDates();
    const sitemapEntries = new Map();

    try {
        for (const route of routes) {
            console.log(`Pre-rendering ${route}...`);

            // Navigate to the page
            await page.goto(`${serverUrl}${route === '/' ? '' : route}`, { waitUntil: 'domcontentloaded' });

            // Vite's fallback may contain the already-saved homepage. Wait for this
            // route's runtime commit, not that stale HTML or a Suspense fallback.
            await page.waitForFunction((expectedPath) =>
                window.__TURBOAI_RENDERED_PATH__ === expectedPath &&
                document.querySelector('main') &&
                !document.querySelector('[data-route-loading], [data-cms-loading]'),
                { timeout: 30000 }, route);
            if (cmsEnabled) {
                await page.waitForFunction(() => !document.querySelector('[data-cms-loading]'), { timeout: 30000 });
                if (await page.$('[data-cms-error]')) throw new Error(`CMS failed while rendering ${route}.`);
            }

            // Give it a moment for any final animations or effects
            await new Promise(r => setTimeout(r, 500));
            if (await page.$('[data-not-found]')) throw new Error(`Route ${route} rendered a not-found page.`);

            const metadata = await page.evaluate(() => ({
                canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
                robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') || '',
            }));
            if (!metadata.robots.toLowerCase().includes('noindex')) {
                if (!metadata.canonical) throw new Error(`Indexable route ${route} has no canonical URL.`);
                const canonical = new URL(metadata.canonical);
                if (canonical.origin === new URL(baseUrl).origin && canonical.pathname === route && !canonical.hash && !canonical.search) {
                    const modified = cmsByPath.get(route)?.updated_at || knownDates.get(route);
                    sitemapEntries.set(metadata.canonical, modified && !Number.isNaN(Date.parse(modified)) ? modified : undefined);
                } else {
                    console.log(`Omitting ${route} from sitemap because its canonical is ${metadata.canonical}.`);
                }
            }

            // Get the HTML
            const html = await renderedHtml(page);

            // Determine write path
            let distPath;
            if (route === '/') {
                distPath = path.resolve('dist', 'index.html');
            } else {
                // Remove leading slash for folder creation
                const folder = route.substring(1);
                const dir = path.resolve('dist', folder);

                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                distPath = path.join(dir, 'index.html');
            }

            fs.writeFileSync(distPath, html);
            console.log(`Saved ${route} to ${distPath}`);
        }

        // Standalone public documents are copied by Vite and served using clean URLs.
        for (const document of publicDocuments) {
            const filename = path.resolve('dist', document.file);
            if (fs.existsSync(filename)) sitemapEntries.set(`${baseUrl}${document.route}`, knownDates.get(document.route));
        }

        // Render the same branded error route used by the app, including its navigation and footer.
        await page.goto(`${serverUrl}/404`, { waitUntil: 'domcontentloaded' });
        await page.waitForFunction(() => window.__TURBOAI_RENDERED_PATH__ === '/404', { timeout: 30000 });
        await page.waitForSelector('main[data-not-found]');
        await page.waitForFunction(() => !document.querySelector('[data-cms-loading]'), { timeout: 30000 });
        await page.waitForSelector('header');
        await page.waitForSelector('footer');
        await page.waitForFunction(() => document.querySelector('meta[name="robots"]')?.content.includes('noindex') && !document.querySelector('link[rel="canonical"]'));
        if (await page.$('[data-cms-error]')) throw new Error('CMS failed while rendering the branded 404 page.');
        fs.writeFileSync(path.resolve('dist', '404.html'), await renderedHtml(page));
        console.log('Generated branded dist/404.html');

        console.log(`Generating SEO files for base URL: ${baseUrl}`);

        // Generate robots.txt
        const robotsContent = fs.readFileSync(path.resolve('public', 'robots.txt'), 'utf8')
            .replace(/^Sitemap:.*$/m, `Sitemap: ${baseUrl}/sitemap.xml`);
        fs.writeFileSync(path.resolve('dist', 'robots.txt'), robotsContent);
        console.log('Generated dist/robots.txt');

        // Generate sitemap.xml
        const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...sitemapEntries].map(([url, modified]) => `  <url>
    <loc>${xmlEscape(url)}</loc>${modified ? `\n    <lastmod>${xmlEscape(modified)}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>\n`;

        fs.writeFileSync(path.resolve('dist', 'sitemap.xml'), sitemapContent);
        console.log('Generated dist/sitemap.xml');

    } catch (err) {
        console.error('Error during pre-rendering:', err);
        process.exitCode = 1;
    } finally {
        await browser.close();
        if (process.platform === 'win32' && preview.pid) {
            spawnSync('taskkill', ['/pid', preview.pid.toString(), '/f', '/t']);
        } else {
            preview.kill();
        }
    }
}

prerender();
