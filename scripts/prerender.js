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
    const browser = await puppeteer.launch({
        headless: true,
    });
    const page = await browser.newPage();

    const routes = [
        '/',
        '/ai-transformation',
        '/strategic-intelligence'
    ];

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
