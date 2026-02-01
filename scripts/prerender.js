import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

async function prerender() {
    console.log('Starting pre-rendering...');

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
        '/offshore-development',
        '/cloud-solutions',
        '/quality-engineering',
        '/blog',
    ];

    // Dynamic blog routes (extract from src/content/blog.ts)
    const blogRoutes = [];
    try {
        const blogContentPath = path.resolve('src', 'content', 'blog.ts');
        if (fs.existsSync(blogContentPath)) {
            const content = fs.readFileSync(blogContentPath, 'utf-8');
            // Regex to match: slug: "some-slug-string"
            const slugMatches = content.match(/slug:\s*"([^"]+)"/g);

            if (slugMatches) {
                slugMatches.forEach(match => {
                    const slug = match.match(/slug:\s*"([^"]+)"/)[1];
                    if (slug) {
                        blogRoutes.push(`/blog/${slug}`);
                    }
                });
                console.log(`Found ${blogRoutes.length} blog posts to prerender.`);
            }
        }
    } catch (e) {
        console.warn('Could not auto-discover blog posts:', e);
    }

    const routes = [...staticRoutes, ...blogRoutes];

    try {
        for (const route of routes) {
            console.log(`Pre-rendering ${route}...`);

            // Navigate to the page
            await page.goto(`${serverUrl}${route === '/' ? '' : route}`, { waitUntil: 'networkidle0' });

            // Wait for the root element to be populated
            await page.waitForSelector('#root div');

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

        let baseUrl = 'https://turbo-ai.ca'; // default fallback
        try {
            const envPath = path.resolve(process.cwd(), '.env');
            if (fs.existsSync(envPath)) {
                const envContent = fs.readFileSync(envPath, 'utf-8');
                const match = envContent.match(/VITE_BASE_URL=(.*)/);
                if (match && match[1]) {
                    baseUrl = match[1].trim();
                }
            }
        } catch (e) {
            console.warn('Could not read .env file, using default base URL:', e);
        }

        console.log(`Generating SEO files for base URL: ${baseUrl}`);

        // Generate robots.txt
        const robotsContent = `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml`;
        fs.writeFileSync(path.resolve('dist', 'robots.txt'), robotsContent);
        console.log('Generated dist/robots.txt');

        // Generate sitemap.xml
        const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route === '/' ? '' : route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

        fs.writeFileSync(path.resolve('dist', 'sitemap.xml'), sitemapContent);
        console.log('Generated dist/sitemap.xml');

    } catch (err) {
        console.error('Error during pre-rendering:', err);
        process.exit(1);
    } finally {
        await browser.close();
        preview.kill();
        if (process.platform === 'win32' && preview.pid) {
            spawn("taskkill", ["/pid", preview.pid.toString(), '/f', '/t']);
        }
        process.exit(0);
    }
}

prerender();
