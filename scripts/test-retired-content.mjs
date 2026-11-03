import assert from 'node:assert/strict';
import { isRetiredProduct, isRetiredProductPath, sanitizePublishedEntry,
  sanitizeRetiredMarkdown, sanitizeRetiredMedia, sanitizeRetiredText } from '../src/content/retiredProducts.mjs';

for (const slug of ['i-lakehouse', 'i_lakehouse', 'ILakehouse', 'dci-360', 'DCI 360', 'dci360']) {
  assert.equal(isRetiredProduct('product', slug), true, slug);
}
assert.equal(isRetiredProduct('product', 'adrs'), false);
assert.equal(isRetiredProduct('product', undefined), false);
assert.equal(isRetiredProduct('product', '%invalid'), false);
for (const target of ['/products/i-lakehouse?from=blog#details', '/products/dci_360/',
  'https://turbo-ai.ca/products/%69%2Dlakehouse', '/products/i-lakehouse%2F']) {
  assert.equal(isRetiredProductPath(target), true, target);
}
assert.equal(isRetiredProductPath(undefined), false);
assert.equal(isRetiredProductPath('/products/%invalid'), false);
assert.equal(isRetiredProductPath('/products/adrs'), false);

for (const markdown of ['[Evaluate](/products/i-lakehouse?from=blog#details)',
  '[Evaluate](</products/i_lakehouse?from=blog> "Platform")',
  '[Evaluate](https://turbo-ai.ca/products/%64ci-360 "Platform")',
  '[Evaluate][platform]\n\n[platform]: /products/dci-360?from=blog',
  '[Evaluate][]\n\n[Evaluate]: /products/i-lakehouse',
  '[Evaluate]\n\n[Evaluate]: /products/dci-360']) {
  assert.equal(sanitizeRetiredMarkdown(markdown).trim(), 'Evaluate', markdown);
}
for (const markdown of ['![Architecture](/cms-seed/i-lakehouse-infrastructure.webp)',
  '![Architecture](/cms-seed/dci-data-center.webp?version=2)',
  '![Architecture][figure]\n\n[figure]: /cms-seed/%69-lakehouse-infrastructure.webp',
  '![Architecture][]\n\n[Architecture]: /cms-seed/dci-data-center.webp',
  '![Architecture]\n\n[Architecture]: /cms-seed/dci-data-center.webp',
  '![i-Lakehouse architecture](/storage/random-image.webp)']) {
  assert.equal(sanitizeRetiredMarkdown(markdown).trim(), '', markdown);
}
const retained = '[ADRS](/products/adrs?from=blog#workflow)\n\n![Rack](/enterprise/rack.jpg)';
assert.equal(sanitizeRetiredMarkdown(retained), retained);
assert.equal(sanitizeRetiredMarkdown('[i-Lakehouse guide](/data-engineering-ai-foundations)'),
  '[governed data foundations guide](/data-engineering-ai-foundations)');
assert.equal(sanitizeRetiredMarkdown('[i-Lakehouse]\n\n[i-Lakehouse]: /data-engineering-ai-foundations'),
  '[governed data foundations][i-Lakehouse]\n\n[i-Lakehouse]: /data-engineering-ai-foundations');
assert.doesNotThrow(() => sanitizeRetiredMarkdown('![Image](/media/%malformed.webp)'));
assert.equal(sanitizeRetiredMedia('/cms-seed/dci-data-center.webp'), '');
assert.equal(sanitizeRetiredMedia('/media/%malformed.webp'), '/media/%malformed.webp');
assert.equal(sanitizeRetiredMedia(undefined), '');
assert.equal(sanitizeRetiredText('Turbo AI i-Lakehouse'), 'Turbo AI governed data foundations');

const source = { title: 'Data foundations', body: '[Read](/products/dci-360)',
  hero_image: '/cms-seed/i-lakehouse-infrastructure.webp', og_image: '/cms-seed/dci-data-center.webp',
  cta_url: '/products/i-lakehouse?from=hero', canonical_url: '/products/dci-360',
  related_products: ['adrs', 'i-lakehouse', 'dci-360', undefined],
  features: ['Governed data', undefined], sections: [null, { body: 'Useful copy' },
    { title: 'DCI 360', body: '![View](/cms-seed/dci-data-center.webp)', image: '/cms-seed/dci-data-center.webp' }] };
const result = sanitizePublishedEntry(source);
assert.equal(result.body, 'Read');
assert.equal(result.hero_image, '');
assert.equal(result.og_image, '');
assert.equal(result.cta_url, '');
assert.equal(result.canonical_url, '');
assert.deepEqual(result.related_products, ['adrs']);
assert.deepEqual(result.features, ['Governed data']);
assert.deepEqual(result.sections, [{ title: '', body: 'Useful copy', image: '' },
  { title: 'infrastructure management', body: '', image: '' }]);
assert.equal(source.sections[2].title, 'DCI 360', 'Sanitizing must not mutate stored content.');
console.log('Retired content checks passed.');
