// Single source of truth for site categories (rubrics).
// Menus, category pages, labels, colors and OG images all read from here.

export interface Category {
  slug: string;   // URL: /category/<slug>
  label: string;  // label for tags, footer and mobile menu
  nav: string;    // very short label for the top menu (one line on laptops)
  title: string;  // category page H1
  desc: string;   // category page description + meta description
  color: string;  // accent color (cards, OG image)
  visual: 'ai' | 'finance' | 'crypto' | 'business' | 'fintech'; // OG background style
  icon: string;   // inline SVG for the category page header
}

export const CATEGORIES: Category[] = [
  {
    slug: 'payments',
    label: 'Payments & Invoicing',
    nav: 'Payments',
    title: 'Payments & Invoicing',
    desc: 'Payment processors, invoicing and client billing tools for freelancers and small teams, compared on real fees.',
    color: '#a78bfa',
    visual: 'fintech',
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="2" y="8" width="28" height="18" rx="2" stroke="#d4a853" stroke-width="1.5"/>
      <line x1="2" y1="14" x2="30" y2="14" stroke="#d4a853" stroke-width="1.5"/>
      <rect x="6" y="18" width="6" height="4" fill="#d4a853" opacity=".5"/>
    </svg>`,
  },
  {
    slug: 'email-marketing',
    label: 'Email & Marketing',
    nav: 'Email',
    title: 'Email & Marketing',
    desc: 'Email, newsletter and marketing tools for freelancers and small teams, with prices worked out for your list size.',
    color: '#4d9fff',
    visual: 'finance',
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="2" y="7" width="28" height="18" rx="1" stroke="#d4a853" stroke-width="1.5"/>
      <polyline points="2,8 16,18 30,8" stroke="#d4a853" stroke-width="1.5" fill="none" stroke-linejoin="round"/>
    </svg>`,
  },
  {
    slug: 'scheduling-forms',
    label: 'Scheduling & Forms',
    nav: 'Scheduling',
    title: 'Scheduling & Forms',
    desc: 'Booking, scheduling and form builders for freelancers and small teams, compared plan by plan.',
    color: '#34d399',
    visual: 'business',
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="3" y="6" width="26" height="23" rx="1" stroke="#d4a853" stroke-width="1.5"/>
      <line x1="3" y1="12" x2="29" y2="12" stroke="#d4a853" stroke-width="1.5"/>
      <line x1="10" y1="3" x2="10" y2="9" stroke="#d4a853" stroke-width="1.5"/>
      <line x1="22" y1="3" x2="22" y2="9" stroke="#d4a853" stroke-width="1.5"/>
      <rect x="9" y="17" width="5" height="5" fill="#d4a853" opacity=".5"/>
    </svg>`,
  },
  {
    slug: 'sales',
    label: 'Sales & Projects',
    nav: 'Sales',
    title: 'Sales & Projects',
    desc: 'CRMs, outreach and project management tools for small teams, with per-seat costs worked out for real team sizes.',
    color: '#f7931a',
    visual: 'crypto',
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="2" y="14" width="8" height="16" stroke="#d4a853" stroke-width="1.5"/>
      <rect x="12" y="8" width="8" height="22" stroke="#d4a853" stroke-width="1.5"/>
      <rect x="22" y="2" width="8" height="28" stroke="#d4a853" stroke-width="1.5"/>
    </svg>`,
  },
  {
    slug: 'ai',
    label: 'AI Tools for Work',
    nav: 'AI Tools',
    title: 'AI Tools for Work',
    desc: 'AI writing, meeting, voice, video and presentation tools for freelancers and small teams, compared on what you actually pay.',
    color: '#d4a853',
    visual: 'ai',
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="8" y="8" width="16" height="16" stroke="#d4a853" stroke-width="1.5"/>
      <circle cx="16" cy="16" r="3" fill="#d4a853"/>
      <line x1="16" y1="2" x2="16" y2="8" stroke="#d4a853" stroke-width="1.5"/>
      <line x1="16" y1="24" x2="16" y2="30" stroke="#d4a853" stroke-width="1.5"/>
      <line x1="2" y1="16" x2="8" y2="16" stroke="#d4a853" stroke-width="1.5"/>
      <line x1="24" y1="16" x2="30" y2="16" stroke="#d4a853" stroke-width="1.5"/>
    </svg>`,
  },
];

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug) as [string, ...string[]];

// Old rubrics still carried by articles not yet reassigned. They get no category
// page; /category/<legacy> is redirected in public/_redirects.
export const LEGACY_CATEGORY_SLUGS = ['finance', 'fintech', 'business', 'crypto'] as const;

const bySlug = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c]));
const legacyLabel: Record<string, string> = {
  finance: 'Finance', fintech: 'Fintech', business: 'Business', crypto: 'Crypto',
};

export function getCategory(slug: string): Category | undefined {
  return bySlug[slug];
}

export function catLabel(slug: string): string {
  return bySlug[slug]?.label ?? legacyLabel[slug] ?? slug;
}

export function catColor(slug: string): string {
  return bySlug[slug]?.color ?? '#d4a853';
}

// Link target for a category tag/breadcrumb (legacy rubrics have no page).
export function catHref(slug: string): string {
  return bySlug[slug] ? `/category/${slug}/` : '/articles/';
}
