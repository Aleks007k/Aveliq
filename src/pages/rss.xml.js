import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = await getCollection('articles');

  const sortedArticles = articles
    .filter((a) => a.data.draft !== true)
    .sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return rss({
    title: 'Aveliq',
    description: 'AI, technology, markets and future-focused reporting.',
    site: context.site,
    items: sortedArticles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: new Date(article.data.date),
      link: `/articles/${article.id}/`
    }))
  });
}