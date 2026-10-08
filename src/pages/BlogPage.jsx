import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import usePageMeta from '@/hooks/usePageMeta';
import { posts } from '@/data/posts';

/* ── animation variants ─────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const stagger = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

/* ── helpers ─────────────────────────────────────────────────── */
function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

/* ── BlogCard ────────────────────────────────────────────────── */
function BlogCard({ post }) {
  return (
    <motion.article
      variants={fadeUp}
      className="group flex flex-col bg-bg border border-line rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Cover image */}
      <NavLink to={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true">
        <div className="aspect-video overflow-hidden bg-alt-surface">
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-display text-5xl text-accent-text opacity-20">✦</span>
            </div>
          )}
        </div>
      </NavLink>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 gap-3">
        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-alt-surface text-muted-text border border-line"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <NavLink to={`/blog/${post.slug}`} className="group/title">
          <h2 className="font-display text-xl sm:text-2xl text-text leading-snug group-hover/title:text-accent-text transition-colors">
            {post.title}
          </h2>
        </NavLink>

        {/* Excerpt */}
        <p className="text-sm text-muted-text leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        {/* Meta + Read more */}
        <div className="flex items-center justify-between pt-2 border-t border-line mt-auto">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-text">{post.author ?? 'Dr. Chaitishaa'}</span>
            <time dateTime={post.date} className="text-xs text-muted-text">
              {formatDate(post.date)}
            </time>
          </div>
          <NavLink
            to={`/blog/${post.slug}`}
            className="text-sm font-medium text-accent-text hover:underline underline-offset-4 focus-visible:outline-accent-text"
          >
            Read more →
          </NavLink>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Coming Soon empty state ─────────────────────────────────── */
function ComingSoon() {
  return (
    <motion.div
      variants={fadeUp}
      className="col-span-full flex flex-col items-center justify-center py-20 sm:py-28 text-center px-4"
    >
      {/* Decorative mandala-ish ring */}
      <div className="relative w-28 h-28 mb-8">
        <svg viewBox="0 0 112 112" className="w-full h-full" aria-hidden="true">
          <circle cx="56" cy="56" r="50" fill="none" stroke="var(--line)" strokeWidth="1.5" strokeDasharray="6 4" />
          <circle cx="56" cy="56" r="34" fill="none" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="56" cy="56" r="18" fill="var(--alt-surface)" />
          <text x="56" y="62" textAnchor="middle" fontSize="22" fill="var(--accent-text)" fontFamily="serif">✦</text>
        </svg>
      </div>

      <h2 className="font-display text-3xl sm:text-4xl text-text mb-3">
        Coming Soon
      </h2>
      <p className="text-sm sm:text-base text-muted-text max-w-md leading-relaxed mb-8">
        Dr. Chaitishaa is preparing insightful articles on numerology, Vastu, healing and
        ancient Vedic wisdom. Be the first to know when they go live.
      </p>

      {/* WhatsApp notify CTA */}
      <a
        href="https://wa.me/919051375635?text=Hi%20Dr.%20Chaitishaa%2C%20please%20notify%20me%20when%20the%20blog%20is%20live%21"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-brand-btn-bg text-brand-btn-text px-6 py-3 rounded-lg text-sm font-semibold hover:opacity-90 hover:scale-105 transition-all focus-visible:outline-accent-text"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Notify me on WhatsApp
      </a>
    </motion.div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function BlogPage() {
  usePageMeta({ title: 'Blog', path: '/blog' });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-20"
    >
      {/* ── Page header ─────────────────────────────────── */}
      <motion.div variants={fadeUp} className="text-center mb-10 sm:mb-14">
        <p className="text-xs sm:text-sm font-medium text-accent-text uppercase tracking-widest mb-3">
          Celestial Insights Healing
        </p>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-text mb-4">
          Wisdom &amp; Insights
        </h1>
        <p className="text-sm sm:text-base text-muted-text max-w-2xl mx-auto leading-relaxed">
          Articles on numerology, Vastu, tarot, sound healing and the ancient Vedic sciences —
          written to help you live with more clarity, harmony and purpose.
        </p>
      </motion.div>

      {/* ── Grid / Empty state ───────────────────────────── */}
      <motion.div
        variants={stagger}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 sm:gap-y-8"
      >
        {posts.length > 0
          ? posts.map(post => <BlogCard key={post.slug} post={post} />)
          : <ComingSoon />
        }
      </motion.div>
    </motion.div>
  );
}
