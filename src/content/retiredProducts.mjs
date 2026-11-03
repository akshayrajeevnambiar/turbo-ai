/* global URL */
// Apply the same retirement policy to browser reads and static CMS builds.
export const retiredProductSlugs = ['i-lakehouse', 'dci-360'];

const asText = (value) => typeof value === 'string' ? value : '';
const decode = (value) => {
  const source = asText(value);
  try { return decodeURIComponent(source); } catch { return source; }
};
const normalizedSlug = (slug) => decode(slug).toLowerCase().replace(/[^a-z0-9]/g, '');

export function isRetiredProduct(kind, slug) {
  return kind === 'product' && ['ilakehouse', 'dci360'].includes(normalizedSlug(slug));
}

export function isRetiredProductPath(value) {
  if (typeof value !== 'string' || !value) return false;
  try {
    const pathname = decode(new URL(value, 'https://turbo-ai.ca').pathname).replace(/\/+$/, '');
    return /^\/products\//i.test(pathname) && isRetiredProduct('product', pathname.split('/').pop());
  } catch {
    return false;
  }
}

const retiredName = /i[-_\s]?lakehouse|dci[-_\s]?360/i;
const retiredMedia = (value) => /i[-_\s]?lakehouse|dci[-_\s]?(?:360|data-center)/i.test(decode(value));

export function sanitizeRetiredText(value) {
  return asText(value)
    .replace(/\bi[-_\s]?lakehouse\b/gi, 'governed data foundations')
    .replace(/\bdci[-_\s]?360\b/gi, 'infrastructure management');
}

export function sanitizeRetiredMedia(value) {
  return retiredMedia(value) ? '' : asText(value);
}

// Strip retired destinations before replacing prose, preserving retained URLs.
// References are resolved first so full, collapsed and shortcut links agree.
export function sanitizeRetiredMarkdown(value) {
  const references = new Map();
  const protectedMarkup = [];
  const protect = (markup) => `\uE000${protectedMarkup.push(markup) - 1}\uE001`;
  const referenceKey = (label) => label.trim().replace(/\s+/g, ' ').toLowerCase();
  const retiredTarget = (target) => isRetiredProductPath(target) || retiredMedia(target);
  let source = asText(value).replace(
    /^[ \t]{0,3}\[([^\]\r\n]+)\]:[ \t]*(?:<([^>\r\n]+)>|(\S+))(?:[ \t]+(?:"[^"\r\n]*"|'[^'\r\n]*'|\([^\r\n)]*\)))?[ \t]*(?:\r?\n|$)/gm,
    (definition, label, angleUrl, url) => {
      const target = angleUrl || url;
      references.set(referenceKey(label), target);
      return retiredTarget(target) ? '' : protect(definition);
    },
  );
  source = source.replace(
    /(!?)\[([^\]\r\n]*)\]\([ \t]*(?:<([^>\r\n]+)>|([^\s)]+))(?:[ \t]+(?:"[^"\r\n]*"|'[^'\r\n]*'|\([^\r\n)]*\)))?[ \t]*\)/g,
    (markup, image, label, angleUrl, url) => {
      if (image && (retiredTarget(angleUrl || url) || retiredName.test(label))) return '';
      if (retiredTarget(angleUrl || url)) return sanitizeRetiredText(label);
      return protect(markup.replace(`[${label}]`, `[${sanitizeRetiredText(label)}]`));
    },
  );
  source = source.replace(/(!?)\[([^\]\r\n]*)\][ \t]*\[([^\]\r\n]*)\]/g,
    (markup, image, label, reference) => {
      const target = references.get(referenceKey(reference || label));
      if (!target) return markup;
      if (image && (retiredTarget(target) || retiredName.test(label))) return '';
      if (retiredTarget(target)) return sanitizeRetiredText(label);
      return protect(`${image}[${sanitizeRetiredText(label)}][${reference || label}]`);
    });
  source = source.replace(/(!?)\[([^\]\r\n]+)\]/g, (markup, image, label) => {
    const target = references.get(referenceKey(label));
    if (!target) return markup;
    if (image && (retiredTarget(target) || retiredName.test(label))) return '';
    if (retiredTarget(target)) return sanitizeRetiredText(label);
    return protect(`${image}[${sanitizeRetiredText(label)}][${label}]`);
  });
  source = source.replace(/<(https?:\/\/[^>\s]+)>/gi,
    (markup, target) => retiredTarget(target) ? '' : protect(markup));
  return sanitizeRetiredText(source).replace(/\uE000(\d+)\uE001/g,
    (marker, index) => protectedMarkup[Number(index)] ?? marker);
}

// Older CMS records can retain shared-page copy from before retirement.
export function sanitizePublishedEntry(entry) {
  const result = { ...entry };
  for (const key of ['title', 'summary', 'hero_title', 'hero_description', 'cta_text', 'seo_title', 'seo_description', 'seo_keywords', 'og_title', 'og_description', 'author', 'category']) {
    if (typeof result[key] === 'string') result[key] = sanitizeRetiredText(result[key]);
  }
  if (typeof result.body === 'string') result.body = sanitizeRetiredMarkdown(result.body);
  for (const key of ['hero_image', 'og_image']) {
    if (typeof result[key] === 'string') result[key] = sanitizeRetiredMedia(result[key]);
  }
  for (const key of ['cta_url', 'canonical_url']) {
    if (isRetiredProductPath(result[key]) || retiredMedia(result[key])) result[key] = '';
  }
  for (const key of ['features', 'benefits', 'tags']) {
    if (Array.isArray(result[key])) result[key] = result[key].map(sanitizeRetiredText).filter(Boolean);
  }
  if (Array.isArray(result.related_products)) result.related_products = result.related_products
    .filter((slug) => typeof slug === 'string' && !isRetiredProduct('product', slug));
  if (Array.isArray(result.sections)) result.sections = result.sections
    .filter((section) => section && typeof section === 'object')
    .map((section) => ({ ...section, title: sanitizeRetiredText(section.title),
      body: sanitizeRetiredMarkdown(section.body), image: sanitizeRetiredMedia(section.image) }));
  return result;
}
