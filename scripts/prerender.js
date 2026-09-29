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

    try {
        for (const route of routes) {
            console.log(`Pre-rendering ${route}...`);

            // Navigate to the page
            await page.goto(`${serverUrl}${route === '/' ? '' : route}`, { waitUntil: 'domcontentloaded' });

            // Wait for the root element to be populated
            await page.waitForSelector('main');
            if (cmsEnabled) {
                await page.waitForFunction(() => !document.querySelector('[data-cms-loading]'), { timeout: 30000 });
                if (await page.$('[data-cms-error]')) throw new Error(`CMS failed while rendering ${route}.`);
                if (await page.$('[data-cms-ready="true"] h1:first-child')) {
                    throw new Error(`Published CMS route ${route} rendered a not-found page.`);
                }
            }

            // Give it a moment for any final animations or effects
            await new Promise(r => setTimeout(r, 500));

            // Get the HTML
            const html = await page.content();

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

        // --- Generate robots.txt and sitemap.xml dynamically ---

        // Load env variables (assume production mode for verify, or development if local)
        // Since we are running 'vite preview', we might be in production mode context, but let's check .env
        // We can't easily use vite's loadEnv in this script without complex setup if vite isn't fully initialized.
        // EASIER: Manually parse .env for this simple script or use a regex since we know the format.

        console.log(`Generating SEO files for base URL: ${baseUrl}`);

        // Generate robots.txt
        const robotsContent = `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${baseUrl}/sitemap.xml`;
        fs.writeFileSync(path.resolve('dist', 'robots.txt'), robotsContent);
        console.log('Generated dist/robots.txt');

        // Generate sitemap.xml
        const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.filter((route) => !cmsEnabled || cmsByPath.get(route)?.robots !== 'noindex,nofollow').map(route => `  <url>
    <loc>${baseUrl}${route === '/' ? '' : route}</loc>
    <lastmod>${cmsByPath.get(route)?.updated_at?.split('T')[0] || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

        fs.writeFileSync(path.resolve('dist', 'sitemap.xml'), sitemapContent);
        console.log('Generated dist/sitemap.xml');
        fs.writeFileSync(path.resolve('dist', '404.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Page not found | Turbo AI</title><style>body{margin:0;background:#020617;color:white;font:16px system-ui}main{min-height:100vh;display:grid;place-content:center;text-align:center;padding:24px}h1{font-size:clamp(36px,6vw,64px);margin:0}a{color:#93c5fd}</style></head><body><main><h1>Page not found</h1><p>This page does not exist or is not published.</p><a href="/">Return home</a></main></body></html>`);
        console.log('Generated dist/404.html');

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
