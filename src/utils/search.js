import { servicesCatalog } from '@/data/services.js';
import { faqs } from '@/data/faqs.js';
import { CONSULTATION_LABELS } from './constants.js';

/**
 * Build the flat search index from all data sources.
 * Returns SearchIndexItem[]:
 *   { id, type, title, excerpt, href, keywords }
 */
export function buildSearchIndex() {
  const items = [];

  // Pages
  const pages = [
    { id: 'page-home',     title: 'Home',                excerpt: 'Welcome to Dr. Chaitishaa | Celestial Insights Healing.',                              href: '/',           keywords: ['home', 'celestial insights', 'healing'] },
    { id: 'page-services', title: 'Services',            excerpt: 'Vedic astrology, numerology, Vastu, tarot, sound healing, counselling and corporate training.', href: '/services',   keywords: ['services', 'offerings'] },
    { id: 'page-about',    title: 'About Dr. Chaitishaa',excerpt: '10+ years experience, 7,151+ projects, global practice.',                              href: '/about',       keywords: ['about', 'biography', 'credentials', 'experience'] },
    { id: 'page-faq',      title: 'FAQ',                 excerpt: 'Frequently asked questions about consultations, booking, and more.',                     href: '/faq',         keywords: ['faq', 'questions', 'help'] },
    { id: 'page-book',     title: 'Book a Consultation', excerpt: 'Schedule a consultation with Dr. Chaitishaa.',                                          href: '/book',        keywords: ['book', 'booking', 'appointment', 'schedule'] },
    { id: 'page-privacy',  title: 'Privacy Policy',      excerpt: 'How your personal information is collected, used and stored.',                           href: '/privacy',     keywords: ['privacy', 'data', 'gdpr', 'dpdp'] },
    { id: 'page-courses',  title: 'Courses',             excerpt: 'Online courses by Dr. Chaitishaa on Graphy.',                                           href: 'https://chaitishadiva.graphy.com/t/home', external: true, keywords: ['courses', 'online', 'learn', 'graphy'] },
    { id: 'page-products', title: 'Products',            excerpt: 'Browse products by Dr. Chaitishaa.',                                                    href: '/products',    keywords: ['products', 'shop', 'buy'] },
    { id: 'page-blog',     title: 'Blog',                excerpt: 'Articles and insights from Dr. Chaitishaa on numerology, Vastu and Vedic wisdom.',      href: '/blog',        keywords: ['blog', 'articles', 'insights', 'posts', 'wisdom'] },
  ];

  for (const p of pages) {
    items.push({ ...p, type: 'page' });
  }

  // Consultation types (quick-book shortcuts)
  for (const [type, label] of Object.entries(CONSULTATION_LABELS)) {
    items.push({
      id: `consult-${type}`,
      type: 'consultation',
      title: `Book ${label}`,
      excerpt: `Book a ${label.toLowerCase()} session with Dr. Chaitishaa.`,
      href: `/book?type=${type}`,
      keywords: [label.toLowerCase(), type, 'book', 'consultation'],
    });
  }

  // Services from catalog
  for (const category of servicesCatalog.categories) {
    for (const service of category.services) {
      items.push({
        id: service.id,
        type: 'service',
        title: service.title,
        excerpt: service.description,
        href: `/services?category=${category.id}#${service.id}`,
        keywords: [
          ...(service.keywords || []),
          category.title.toLowerCase(),
          service.title.toLowerCase(),
        ],
      });
    }
  }

  // FAQs
  for (const faq of faqs) {
    items.push({
      id: `faq-${faq.id}`,
      type: 'faq',
      title: faq.question,
      excerpt: faq.answer.slice(0, 120),
      href: `/faq#${faq.id}`,
      keywords: ['faq', faq.question.toLowerCase()],
    });
  }

  return items;
}

/**
 * Score a single index item against a query.
 * Returns a positive number (higher = better match) or 0 if no match.
 * @param {object} item
 * @param {string} query   lower-cased, trimmed
 */
function scoreItem(item, query) {
  if (!query) return 1; // show everything when empty
  const q = query.toLowerCase();
  let score = 0;

  // Title match (highest weight)
  const title = item.title.toLowerCase();
  if (title === q) score += 100;
  else if (title.startsWith(q)) score += 60;
  else if (title.includes(q)) score += 30;

  // Keyword match
  for (const kw of item.keywords || []) {
    const k = kw.toLowerCase();
    if (k === q) score += 40;
    else if (k.startsWith(q)) score += 20;
    else if (k.includes(q)) score += 10;
  }

  // Excerpt match (lowest weight)
  if (item.excerpt?.toLowerCase().includes(q)) score += 5;

  return score;
}

/**
 * Filter and rank the search index by query.
 * @param {object[]} index   from buildSearchIndex()
 * @param {string}   query
 * @param {number}   limit
 * @returns {object[]}
 */
export function filterIndex(index, query, limit = 20) {
  const q = query.trim().toLowerCase();
  if (!q) return index.slice(0, limit);

  return index
    .map((item) => ({ item, score: scoreItem(item, q) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item);
}

/**
 * Group search results by their `type` field.
 * Returns { pages, services, consultations, faqs }
 * @param {object[]} results   from filterIndex()
 */
export function groupResults(results) {
  return {
    pages: results.filter((r) => r.type === 'page'),
    consultations: results.filter((r) => r.type === 'consultation'),
    services: results.filter((r) => r.type === 'service'),
    faqs: results.filter((r) => r.type === 'faq'),
  };
}
