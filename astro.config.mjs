import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Черновики — НЕ включать в sitemap.
// Когда статья готова к индексации: убери её строку отсюда И поставь draft:false в файле.
const draftSlugs = [
  'ai-startup-funding-correction',
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