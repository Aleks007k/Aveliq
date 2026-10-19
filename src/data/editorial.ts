// The single byline used for every article on Aveliq.
export const EDITORIAL = {
  name: 'Aveliq Editorial',
  slug: 'aveliq-editorial',
  initials: 'AE',
  role: 'Shared byline · Aveliq',
  desc:
    'Aveliq Editorial is the shared byline for every article on Aveliq. It is not a person. ' +
    "Articles are researched and drafted with AI tools from vendors' own pricing pages, checked for errors, " +
    "and approved for publication by the site's owner. The focus is the numbers: price at 1, 3 and 10 users, " +
    'where the free plan stops, and the plan you actually need.',
} as const;

export const EDITORIAL_PATH = `/author/${EDITORIAL.slug}/`;
