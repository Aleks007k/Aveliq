// Affiliate links: how the site recognises them.
// A link counts as affiliate if EITHER
//   1) it has class="aff-btn" (the button the agent writes), OR
//   2) its address starts with one of the prefixes below.
// When a partner program approves you, add your personal affiliate link prefix here,
// e.g. 'https://partners.example.com/abc123' or 'https://example.com/?via=aveliq'.
// Every matching link then gets rel="sponsored nofollow" and a * after its text.
export const AFFILIATE_PREFIXES: string[] = [
  '/go/',
];
