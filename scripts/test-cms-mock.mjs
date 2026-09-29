import fs from 'node:fs';
import http from 'node:http';
import { spawn } from 'node:child_process';

const seed = JSON.parse(fs.readFileSync('supabase/seed/cms-entries.json', 'utf8'));
const wanted = new Set(['page:home', 'page:blog', 'product:i-lakehouse', 'blog:energy-ai-asset-intelligence-foundations']);
const rows = seed.filter((entry) => wanted.has(`${entry.kind}:${entry.slug}`));
rows.push({ ...seed.find((entry) => entry.kind === 'blog' && entry.slug !== 'energy-ai-asset-intelligence-foundations'), status: 'draft' });
const server = http.createServer((request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  response.setHeader('Content-Type', 'application/json');
  if (request.method === 'OPTIONS') { response.writeHead(204).end(); return; }
  const url = new URL(request.url, 'http://localhost');
  if (url.pathname === '/rest/v1/cms_settings' || url.pathname === '/rest/v1/cms_redirects') {
    response.end('[]'); return;
  }
  if (url.pathname !== '/rest/v1/cms_entries') { response.writeHead(404).end('{}'); return; }
  let result = rows.filter((entry) => entry.status === 'published');
  for (const field of ['kind', 'slug', 'status']) {
    const filter = url.searchParams.get(field);
    if (filter?.startsWith('eq.')) result = result.filter((entry) => entry[field] === filter.slice(3));
  }
  if (request.headers.accept?.includes('vnd.pgrst.object+json')) response.end(JSON.stringify(result[0] || null));
  else response.end(JSON.stringify(result));
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const port = server.address().port;
const child = spawn('npm', ['run', 'build'], {
  shell: true,
  env: { ...process.env, VITE_CMS_ENABLED: 'true', VITE_SUPABASE_URL: `http://127.0.0.1:${port}`,
    VITE_SUPABASE_PUBLISHABLE_KEY: 'mock-publishable-key' },
  stdio: 'inherit',
});
const exitCode = await new Promise((resolve) => child.on('exit', resolve));
server.close();
if (exitCode !== 0) process.exit(exitCode || 1);

const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
const post = fs.readFileSync('dist/blog/energy-ai-asset-intelligence-foundations/index.html', 'utf8');
const draft = rows.find((entry) => entry.status === 'draft');
if (!sitemap.includes('/blog/energy-ai-asset-intelligence-foundations') || sitemap.includes(`/blog/${draft.slug}`)) {
  throw new Error('Sitemap did not filter published/draft content.');
}
if (!post.includes('Building Asset Intelligence for Energy Operations') || !post.includes('Start with an operational question')) {
  throw new Error('Published article was not prerendered with its CMS content.');
}
if (fs.existsSync(`dist/blog/${draft.slug}/index.html`)) throw new Error('Draft article was prerendered.');
console.log('CMS mock passed: published content rendered, draft hidden, sitemap filtered.');
