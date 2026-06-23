import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Черновики — НЕ включать в sitemap.
// Когда статья готова к индексации: убери её строку отсюда И поставь draft:false в файле.
const draftSlugs = [
  'ai-infrastructure-capital',
  'ai-startup-funding-correction',
  'bitcoin-institutional-2026',
  'embedded-finance-growth',
  'fed-rate-path-2026',
  'midjourney-vs-dall-e-openai-best-ai-image-generator-in-2026-2',
];

export default defineConfig({
  site: 'https://aveliq.net',
  integrations: [
    sitemap({
      filter: (page) =>
        !draftSlugs.some((slug) => page.includes(`/articles/${slug}/`)),
    }),
  ],
});