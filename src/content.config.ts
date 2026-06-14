import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    category: z.string(),
    type: z.string(),
    author: z.string(),
    date: z.string(),
    updated: z.string().optional(),
    readTime: z.number(),
    featured: z.boolean().optional(),
    tags: z.array(z.string()),
    keywords: z.array(z.string()).optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    sources: z.array(z.string()).optional(),
    related: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { articles };