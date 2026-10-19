// Marks affiliate links in article bodies: rel="sponsored nofollow" + a trailing "*".
// Rules live in src/data/affiliates.ts.
import { AFFILIATE_PREFIXES } from '../data/affiliates.ts';

function classes(node) {
  const c = node.properties?.className;
  return Array.isArray(c) ? c : typeof c === 'string' ? c.split(/\s+/) : [];
}

function isAffiliate(node) {
  const href = String(node.properties?.href ?? '');
  if (classes(node).includes('aff-btn')) return true;
  return AFFILIATE_PREFIXES.some((p) => p && href.startsWith(p));
}

// Raw HTML inside markdown (e.g. <a class="aff-btn" ...>) arrives as strings: sometimes the
// whole <a>…</a> in one piece, sometimes the opening tag, the text and "</a>" as siblings.
function attr(attrs, name) {
  return (attrs.match(new RegExp(name + '\\s*=\\s*["\']([^"\']*)["\']', 'i')) || [])[1] || '';
}

function rawIsAffiliate(attrs) {
  const href = attr(attrs, 'href');
  return attr(attrs, 'class').split(/\s+/).includes('aff-btn') ||
    AFFILIATE_PREFIXES.some((p) => p && href.startsWith(p));
}

function rewriteAttrs(attrs) {
  const rel = new Set(attr(attrs, 'rel').split(/\s+/).filter(Boolean));
  rel.add('sponsored'); rel.add('nofollow');
  if (/target\s*=\s*["']_blank["']/i.test(attrs)) rel.add('noopener');
  return attrs.replace(/\s*rel\s*=\s*["'][^"']*["']/i, '') +
    ` rel="${[...rel].join(' ')}" data-affiliate="true"`;
}

const endsWithStar = (s) => s.replace(/<[^>]*>/g, '').trimEnd().endsWith('*');

function markRaw(html) {
  return html.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (whole, attrs, inner) =>
    rawIsAffiliate(attrs) ? `<a${rewriteAttrs(attrs)}>${inner}${endsWithStar(inner) ? '' : '*'}</a>` : whole);
}

function markSplitRaw(parent) {
  const kids = parent.children || [];
  for (let i = 0; i < kids.length; i++) {
    const k = kids[i];
    if (k.type !== 'raw') continue;
    const m = k.value.match(/^<a\b([^>]*)>$/i);
    if (!m || !rawIsAffiliate(m[1])) continue;
    k.value = `<a${rewriteAttrs(m[1])}>`;
    const close = kids.findIndex((c, j) => j > i && c.type === 'raw' && /^<\/a>/i.test(c.value));
    if (close === -1) continue;
    const prev = kids[close - 1];
    if (!(prev && prev.type === 'text' && endsWithStar(prev.value))) {
      kids.splice(close, 0, { type: 'text', value: '*' });
    }
    i = close;
  }
}

function walk(node) {
  if (node.type === 'raw' && typeof node.value === 'string' && /<a\b[\s\S]*<\/a>/i.test(node.value)) {
    node.value = markRaw(node.value);
    return;
  }
  if (node.children) markSplitRaw(node);
  if (node.type === 'element' && node.tagName === 'a' && isAffiliate(node)) {
    node.properties = node.properties || {};
    const rel = new Set(
      [].concat(node.properties.rel || []).flatMap((r) => String(r).split(/\s+/)).filter(Boolean)
    );
    rel.add('sponsored');
    rel.add('nofollow');
    if (node.properties.target === '_blank') rel.add('noopener');
    node.properties.rel = [...rel];
    node.properties.dataAffiliate = 'true';
    const last = node.children?.[node.children.length - 1];
    const already = last && last.type === 'text' && last.value.trimEnd().endsWith('*');
    if (!already) (node.children ||= []).push({ type: 'text', value: '*' });
    return;
  }
  for (const child of node.children || []) walk(child);
}

export default function rehypeAffiliate() {
  return (tree) => walk(tree);
}
