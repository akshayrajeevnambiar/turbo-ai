import fs from 'node:fs';
import http from 'node:http';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';

const seed = JSON.parse(fs.readFileSync('supabase/seed/cms-entries.json', 'utf8'));
const newIndustries = [
  { slug: 'mining', title: 'Mining', city: 'Saskatoon' },
  { slug: 'real-estate', title: 'Real Estate', city: 'Toronto' },
  { slug: 'oil-and-gas', title: 'Oil & Gas', city: 'Calgary' },
];
const wanted = new Set(['page:home', 'page:blog', 'product:i-lakehouse', 'blog:energy-ai-asset-intelligence-foundations',
  ...newIndustries.map(({ slug }) => `industry:${slug}`)]);
const rows = seed.filter((entry) => wanted.has(`${entry.kind}:${entry.slug}`));
for (const { slug, title, city } of newIndustries) {
  const entry = rows.find((row) => row.kind === 'industry' && row.slug === slug);
  assert.ok(entry, `The CMS seed is missing the ${title} industry. Run npm run cms:export first.`);
  assert.equal(entry.status, 'published', `${title} must be published in the CMS fixture.`);
  assert.equal(entry.seo_title, `${title} AI Solutions | Turbo AI`);
  assert.ok(entry.seo_description.includes(city), `${title} metadata must include its target market.`);
}
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
const notFound = fs.readFileSync('dist/404.html', 'utf8');
assert.ok(notFound.includes('data-not-found'), 'CMS builds must prerender the branded 404.');
assert.ok(/<header\b/.test(notFound) && /<footer\b/.test(notFound), 'The CMS 404 must keep the site navigation and footer.');
assert.ok(/<meta\b(?=[^>]*\bname="robots")[^>]*\bcontent="[^"]*noindex/.test(notFound), 'The CMS 404 must not be indexed.');
assert.ok(!/<link\b[^>]*\brel="canonical"/.test(notFound), 'The CMS 404 must not inherit a canonical URL.');
assert.ok(!notFound.includes('data-cms-error'), 'The 404 must work without a CMS entry.');
assert.ok(!sitemap.includes('/404'), 'The CMS sitemap must exclude the error page.');
const post = fs.readFileSync('dist/blog/energy-ai-asset-intelligence-foundations/index.html', 'utf8');
const draft = rows.find((entry) => entry.status === 'draft');
if (!sitemap.includes('/blog/energy-ai-asset-intelligence-foundations') || sitemap.includes(`/blog/${draft.slug}`)) {
  throw new Error('Sitemap did not filter published/draft content.');
}
if (!post.includes('Building Asset Intelligence for Energy Operations') || !post.includes('Start with an operational question')) {
  throw new Error('Published article was not prerendered with its CMS content.');
}
if (fs.existsSync(`dist/blog/${draft.slug}/index.html`)) throw new Error('Draft article was prerendered.');
for (const { slug, title, city } of newIndustries) {
  const route = `/industries/${slug}`;
  const html = fs.readFileSync(`dist${route}/index.html`, 'utf8');
  const encodedTitle = title.replaceAll('&', '&amp;');
  assert.equal(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1], `${encodedTitle} AI Solutions | Turbo AI`,
    `${route} must prerender the location-free CMS title.`);
  assert.equal(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1], `AI for ${encodedTitle}`,
    `${route} must prerender its own industry heading.`);
  const description = html.match(/<meta\b(?=[^>]*\bname="description")[^>]*\bcontent="([^"]*)"/i)?.[1];
  assert.ok(description?.includes(city), `${route} must prerender its target market in the SEO description.`);
  const canonical = html.match(/<link\b(?=[^>]*\brel="canonical")[^>]*\bhref="([^"]*)"/i)?.[1];
  assert.ok(canonical, `${route} must prerender a canonical URL.`);
  assert.equal(new URL(canonical).pathname, route);
  assert.ok(sitemap.includes(`${route}</loc>`), `${route} must appear in the CMS-generated sitemap.`);
}
console.log('CMS mock passed: published content and three industry pages rendered with SEO metadata, branded noindex 404 without CMS errors, draft hidden, sitemap filtered.');
