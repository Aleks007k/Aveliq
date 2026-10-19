import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeAffiliate from './src/lib/rehype-affiliate.mjs';

// Черновики — НЕ включать в sitemap.
// Когда статья готова к индексации: убери её строку отсюда И поставь draft:false в файле.
const draftSlugs = [
];

export default defineConfig({
  site: 'https://aveliq.net',
  markdown: {
    // affiliate links: rel="sponsored nofollow" + "*" (rules: src/data/affiliates.ts)
    rehypePlugins: [rehypeAffiliate],
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !draftSlugs.some((slug) => page.includes(`/articles/${slug}/`)),
    }),
  ],
});