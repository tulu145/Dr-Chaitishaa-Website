/**
 * Blog posts for Dr. Chaitishaa — Celestial Insights Healing.
 *
 * Each post object shape:
 * {
 *   slug:        string   — URL-safe identifier, used in /blog/:slug
 *   title:       string
 *   excerpt:     string   — 1-2 sentence teaser shown on the listing card
 *   coverImage:  string   — path under /public, e.g. '/blog/my-post.jpg'
 *   date:        string   — ISO 8601, e.g. '2026-10-15'
 *   author:      string   — defaults to 'Dr. Chaitishaa'
 *   tags:        string[] — used for future filtering
 *   content:     string   — HTML string or markdown (render as you prefer)
 * }
 *
 * Leave the array empty to show the "Coming soon" state on the listing page.
 * Add a post object here and it appears automatically on /blog and /blog/:slug.
 */

export const posts = [
  // Example — uncomment and fill in to publish your first post:
  // {
  //   slug: 'power-of-numerology',
  //   title: 'The Power of Numerology in Everyday Life',
  //   excerpt: 'Discover how the ancient science of numbers can bring clarity, direction and abundance to your daily decisions.',
  //   coverImage: '/blog/power-of-numerology.jpg',
  //   date: '2026-10-15',
  //   author: 'Dr. Chaitishaa',
  //   tags: ['numerology', 'wellness', 'life-path'],
  //   content: `<p>Your content goes here...</p>`,
  // },
];
