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

    try {
        // Navigate to the page
        await page.goto(serverUrl, { waitUntil: 'networkidle0' });

        // Wait for the root element to be populated (the React app)
        await page.waitForSelector('#root div');

        // Give it a moment for any final animations or effects (optional but safer for "premium" visuals)
        await new Promise(r => setTimeout(r, 500));

        // Get the HTML
        const html = await page.content();

        // Replace the original index.html
        const distPath = path.resolve('dist', 'index.html');
        fs.writeFileSync(distPath, html);
        console.log(`Pre-rendered HTML saved to ${distPath}`);

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
