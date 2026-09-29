import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'vite';
import TurndownService from 'turndown';

const server = await createServer({
  appType: 'custom',
  optimizeDeps: { noDiscovery: true, include: [] },
  server: { middlewareMode: true },
});

try {
  const [{ blogPosts }, enterprise, { industryLandingContent }, { seoConfig }, { copy }] = await Promise.all([
    server.ssrLoadModule('/src/content/blog.ts'),
    server.ssrLoadModule('/src/content/enterprisePages.ts'),
    server.ssrLoadModule('/src/content/industryLandingContent.ts'),
    server.ssrLoadModule('/src/content/seo.ts'),
    server.ssrLoadModule('/src/content/turboai.ts'),
  ]);
  const markdown = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-' });
  const defaults = {
    status: 'published', summary: '', hero_title: '', hero_description: '', hero_image: '',
    body: '', sections: [], features: [], benefits: [], related_products: [],
    related_industries: [], cta_text: '', cta_url: '', seo_title: '', seo_description: '',
    seo_keywords: '', canonical_url: '', og_title: '', og_description: '', og_image: '',
    robots: 'index,follow', author: 'Turbo AI', category: '', tags: [], reading_time: 0, published_at: null,
  };
  const entries = [];
  const add = (record) => entries.push({ ...defaults, ...record });
  const seo = (key) => ({
    seo_title: seoConfig[key]?.title || '',
    seo_description: seoConfig[key]?.description || '',
    seo_keywords: seoConfig[key]?.keywords || '',
    canonical_url: seoConfig[key]?.url || '',
    og_image: seoConfig[key]?.image || '',
  });

  add({ kind: 'page', slug: 'home', title: copy.hero.title, summary: copy.hero.subhead,
    hero_title: copy.hero.title, hero_description: copy.hero.subhead,
    cta_text: copy.hero.cta.label, cta_url: copy.hero.cta.href, ...seo('home') });
  add({ kind: 'page', slug: 'about', title: enterprise.aboutTurboAI.title,
    summary: enterprise.aboutTurboAI.introduction, hero_title: enterprise.aboutTurboAI.title,
    hero_description: enterprise.aboutTurboAI.subtitle, hero_image: enterprise.aboutTurboAI.image,
    ...seo(enterprise.aboutTurboAI.seoKey) });
  add({ kind: 'page', slug: 'products', title: 'Turbo AI Platforms',
    summary: 'Data foundations and detection-to-response intelligence.', ...seo('turboAIProducts') });
  add({ kind: 'page', slug: 'industries-we-serve', title: enterprise.industriesHero.title,
    summary: enterprise.industriesHero.subtitle, hero_title: enterprise.industriesHero.title,
    hero_description: enterprise.industriesHero.subtitle, hero_image: enterprise.industriesHero.image,
    ...seo(enterprise.industriesHero.seoKey) });
  add({ kind: 'page', slug: 'blog', title: 'Insights & Perspectives',
    summary: 'Explore our latest thinking on artificial intelligence, strategic transformation, and digital architecture.',
    ...seo('blog') });

  const enterprisePaths = {
    generativeAgenticAI: 'generative-ai-agentic-ai',
    dataFoundations: 'data-engineering-ai-foundations',
    aiEngineering: 'ai-engineering-software-development',
    governanceCybersecurity: 'ai-governance-cybersecurity',
    cloudCompute: 'cloud-infrastructure-ai-compute',
    enterpriseSolutions: 'enterprise-ai-solutions',
  };
  for (const [key, content] of Object.entries(enterprise.enterprisePages)) {
    add({ kind: 'page', slug: enterprisePaths[key], title: content.title,
      summary: content.intro, hero_title: content.title, hero_description: content.subtitle,
      hero_image: content.heroImage, cta_text: content.ctaTitle, cta_url: '#connect',
      ...seo(content.seoKey) });
  }

  const additionalPages = [
    ['ai-transformation', 'aiTransformation'],
    ['strategic-intelligence', 'strategicIntelligence'],
    ['remote-infrastructure-management', 'remoteInfrastructureManagement'],
    ['digital-architecture', 'digitalArchitecture'],
    ['cyber-security-solutions', 'cyberSecuritySolutions'],
    ['ai-data-insights', 'aiDataInsights'],
    ['cloud-solutions', 'cloudSolutions'],
    ['quality-engineering', 'qualityEngineering'],
  ];
  for (const [slug, key] of additionalPages) {
    add({ kind: 'page', slug, title: seoConfig[key]?.title || slug, summary: seoConfig[key]?.description || '', ...seo(key) });
  }

  for (const industry of enterprise.industriesWeServe) {
    const slug = industry.href.split('/').pop();
    const detail = industryLandingContent[slug];
    add({ kind: 'industry', slug, title: industry.name, summary: industry.description,
      hero_title: `AI for ${industry.name}`, hero_description: detail?.intro || industry.description,
      hero_image: industry.image, cta_text: detail?.cta || 'Start a conversation',
      cta_url: '#connect', related_products: detail?.products.map((item) => item.href.split('/').pop()) || [],
      seo_title: `AI for ${industry.name} | Turbo AI`, seo_description: detail?.intro || industry.description,
      seo_keywords: `${industry.name}, enterprise AI, data engineering, operational intelligence` });
  }

  const products = [
    ['i-lakehouse', 'i-Lakehouse', 'iLakehouse'],
    ['adrs', 'ADRS', 'adrs'],
    ['dci-360', 'DCI 360', 'dci360'],
  ];
  for (const [slug, title, seoKey] of products) {
    const meta = seoConfig[seoKey] || {};
    add({ kind: 'product', slug, title, summary: meta.description || '',
      hero_title: title, hero_description: meta.description || '', hero_image: meta.image || '',
      ...seo(seoKey) });
  }

  for (const post of blogPosts) {
    add({ kind: 'blog', slug: post.slug, title: post.title, summary: post.excerpt,
      hero_title: post.title, hero_description: post.excerpt, hero_image: post.image || '',
      body: markdown.turndown(post.body), author: post.author,
      category: post.tags?.[0] || '', tags: post.tags || [],
      reading_time: Math.max(1, Math.ceil(markdown.turndown(post.body).split(/\s+/).length / 200)),
      published_at: new Date(`${post.date}T12:00:00Z`).toISOString(),
      seo_title: `${post.title} | Turbo AI`, seo_description: post.excerpt,
      seo_keywords: post.keywords || '', og_image: post.image || '' });
  }

  const copiedAssets = new Set();
  for (const entry of entries) {
    for (const field of ['hero_image', 'og_image']) {
      const value = entry[field];
      if (!value?.includes('/src/assets/')) continue;
      const filename = decodeURIComponent(new URL(value).pathname.split('/').pop());
      if (!copiedAssets.has(filename)) {
        await fs.mkdir('public/cms-seed', { recursive: true });
        await fs.copyFile(path.resolve('src/assets', filename), path.resolve('public/cms-seed', filename));
        copiedAssets.add(filename);
      }
      entry[field] = `/cms-seed/${encodeURIComponent(filename)}`;
    }
  }
  const output = path.resolve('supabase/seed/cms-entries.json');
  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, `${JSON.stringify(entries, null, 2)}\n`);
  console.log(`Exported ${entries.length} authored entries to ${output}`);
} finally {
  await server.close();
}
