import { getCollection, type CollectionEntry } from 'astro:content';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';
import path from 'path';

export async function getStaticPaths() {
  const articles = await getCollection('articles');
  return articles.map((article: CollectionEntry<'articles'>) => ({
    params: { slug: article.id },
    props: { article },
  }));
}

interface Props {
  article: CollectionEntry<'articles'>;
}

const catLabel: Record<string, string> = {
  ai: 'AI', finance: 'Finance', crypto: 'Crypto',
  business: 'Business', fintech: 'Fintech'
};

const catColor: Record<string, string> = {
  ai: '#d4a853', finance: '#4d9fff', crypto: '#f7931a',
  business: '#34d399', fintech: '#a78bfa'
};

function getVisual(cat: string): string {
  const c = catColor[cat] || '#d4a853';
  const visuals: Record<string, string> = {
    ai: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 315" width="480" height="630"><defs><radialGradient id="g" cx="65%" cy="50%" r="55%"><stop offset="0" stop-color="${c}" stop-opacity=".22"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient></defs><rect width="240" height="315" fill="url(#g)"/><g stroke="${c}" fill="none"><circle cx="160" cy="157" r="100" stroke-width="1" opacity=".25"/><circle cx="160" cy="157" r="74" stroke-width="1" opacity=".4"/><circle cx="160" cy="157" r="48" stroke-width="1.2" opacity=".6"/><circle cx="160" cy="157" r="22" stroke-width="1.5" opacity=".9"/></g><circle cx="160" cy="157" r="6" fill="${c}"/><circle cx="160" cy="57" r="4" fill="${c}"/><circle cx="234" cy="157" r="4" fill="${c}"/><circle cx="112" cy="205" r="4" fill="${c}"/></svg>`,
    finance: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 315" width="480" height="630"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c}" stop-opacity=".3"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></linearGradient></defs><path d="M0,220 L40,200 L80,230 L120,160 L160,180 L200,110 L240,130 L240,315 L0,315 Z" fill="url(#g)"/><polyline points="0,220 40,200 80,230 120,160 160,180 200,110 240,130" stroke="${c}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="200" cy="110" r="5" fill="${c}"/></svg>`,
    crypto: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 315" width="480" height="630"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c}" stop-opacity=".2"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></linearGradient></defs><rect width="240" height="315" fill="url(#g)"/><g stroke="${c}" stroke-width="2.5"><line x1="55" y1="100" x2="55" y2="210"/><rect x="48" y="130" width="14" height="55" fill="${c}"/><line x1="100" y1="120" x2="100" y2="240"/><rect x="93" y="160" width="14" height="62" fill="#0c0c0a"/><line x1="145" y1="75" x2="145" y2="185"/><rect x="138" y="105" width="14" height="58" fill="${c}"/><line x1="190" y1="130" x2="190" y2="255"/><rect x="183" y="170" width="14" height="68" fill="#0c0c0a"/></g></svg>`,
    business: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 315" width="480" height="630"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c}" stop-opacity=".3"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></linearGradient></defs><rect x="40" y="180" width="28" height="135" fill="url(#g)" stroke="${c}" stroke-width="1.5"/><rect x="85" y="120" width="28" height="195" fill="url(#g)" stroke="${c}" stroke-width="1.5"/><rect x="130" y="200" width="28" height="115" fill="url(#g)" stroke="${c}" stroke-width="1.5"/><rect x="175" y="90" width="28" height="225" fill="url(#g)" stroke="${c}" stroke-width="1.5"/><polyline points="54,180 99,120 144,200 189,90" stroke="${c}" stroke-width="2" fill="none" stroke-dasharray="3 3" opacity=".6"/></svg>`,
    fintech: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 315" width="480" height="630"><defs><radialGradient id="g" cx="55%" cy="50%" r="60%"><stop offset="0" stop-color="${c}" stop-opacity=".18"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient></defs><rect width="240" height="315" fill="url(#g)"/><g stroke="${c}" stroke-width="1.2" opacity=".4"><line x1="130" y1="157" x2="65" y2="80"/><line x1="130" y1="157" x2="195" y2="80"/><line x1="130" y1="157" x2="55" y2="230"/><line x1="130" y1="157" x2="200" y2="235"/></g><g stroke="${c}" stroke-width="1.5" fill="none"><polyline points="50,70 65,58 80,70"/><line x1="52" y1="70" x2="52" y2="88"/><line x1="65" y1="70" x2="65" y2="88"/><line x1="78" y1="70" x2="78" y2="88"/><line x1="48" y1="88" x2="82" y2="88"/><polyline points="180,70 195,58 210,70"/><line x1="182" y1="70" x2="182" y2="88"/><line x1="195" y1="70" x2="195" y2="88"/><line x1="208" y1="70" x2="208" y2="88"/><line x1="178" y1="88" x2="212" y2="88"/><polyline points="40,222 55,210 70,222"/><line x1="42" y1="222" x2="42" y2="240"/><line x1="55" y1="222" x2="55" y2="240"/><line x1="68" y1="222" x2="68" y2="240"/><line x1="38" y1="240" x2="72" y2="240"/><polyline points="185,227 200,215 215,227"/><line x1="187" y1="227" x2="187" y2="245"/><line x1="200" y1="227" x2="200" y2="245"/><line x1="213" y1="227" x2="213" y2="245"/><line x1="183" y1="245" x2="217" y2="245"/></g><circle cx="130" cy="157" r="16" fill="none" stroke="${c}" stroke-width="2"/><circle cx="130" cy="157" r="5" fill="${c}"/></svg>`,
  };
  return visuals[cat] || visuals.ai;
}

export async function GET({ props }: { props: Props }) {
  const { article } = props;
  const { title, category, type } = article.data;
  const color = catColor[category] || '#d4a853';
  const visualSvg = getVisual(category);
  const visualB64 = `data:image/svg+xml;base64,${Buffer.from(visualSvg).toString('base64')}`;

  const bebas = fs.readFileSync(path.resolve('./node_modules/@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff'));
  const monoR = fs.readFileSync(path.resolve('./node_modules/@fontsource/space-mono/files/space-mono-latin-400-normal.woff'));
  const monoB = fs.readFileSync(path.resolve('./node_modules/@fontsource/space-mono/files/space-mono-latin-700-normal.woff'));

  const typeLabel: Record<string, string> = { analysis: 'Analysis', news: 'News', 'deep-dive': 'Deep Dive' };

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: { width: '1200px', height: '630px', background: '#0c0c0a', display: 'flex', position: 'relative' },
        children: [
          {
            type: 'img',
            props: { src: visualB64, width: 480, height: 630, style: { position: 'absolute', right: '0', top: '0' } },
          },
          {
            type: 'div',
            props: {
              style: { position: 'absolute', left: '80px', top: '72px', width: '640px', height: '486px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
              children: [
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', alignItems: 'baseline' },
                    children: [
                      { type: 'span', props: { style: { display: 'flex', fontFamily: 'Bebas Neue', fontSize: '52px', color: '#f5f0e8', letterSpacing: '3px' }, children: ['A'] } },
                      { type: 'span', props: { style: { display: 'flex', fontFamily: 'Bebas Neue', fontSize: '38px', color: '#f5f0e8', letterSpacing: '3px' }, children: ['veli'] } },
                      { type: 'span', props: { style: { display: 'flex', fontFamily: 'Bebas Neue', fontSize: '52px', color: '#f5f0e8', letterSpacing: '3px' }, children: ['Q'] } },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', flexDirection: 'column' },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: { display: 'flex', fontFamily: 'Space Mono', fontSize: '20px', fontWeight: 700, color: '#0c0c0a', background: color, padding: '8px 18px', letterSpacing: '2px', marginBottom: '28px' },
                          children: [(catLabel[category] || category).toUpperCase()],
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: { display: 'flex', fontFamily: 'Bebas Neue', fontSize: '74px', color: '#f5f0e8', lineHeight: '0.98', letterSpacing: '1px' },
                          children: [title],
                        },
                      },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', fontFamily: 'Space Mono', fontSize: '22px', color: 'rgba(245,240,232,0.5)', letterSpacing: '1px', borderTop: '1px solid rgba(245,240,232,0.15)', paddingTop: '22px' },
                    children: [`Alex Reeve · ${typeLabel[type] || type}`],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200, height: 630,
      fonts: [
        { name: 'Bebas Neue', data: bebas, weight: 400, style: 'normal' },
        { name: 'Space Mono', data: monoR, weight: 400, style: 'normal' },
        { name: 'Space Mono', data: monoB, weight: 700, style: 'normal' },
      ],
    }
  );

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  const png = new Uint8Array(resvg.render().asPng());

  return new Response(png, {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' },
  });
}