import { useState } from 'react';
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
  const [email, setEmail]     = useState('');
  const [status, setStatus]   = useState('idle'); // idle | success | error

  function handleSubscribe(e) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error');
      return;
    }
    // TODO: wire to your newsletter backend / Mailchimp / ConvertKit
    console.log('Newsletter subscribe:', trimmed);
    setStatus('success');
    setEmail('');
  }

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

      {/* Newsletter subscribe */}
      {status === 'success' ? (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-medium text-accent-text"
        >
          ✦ You&apos;re on the list! We&apos;ll notify you as soon as the blog goes live.
        </motion.p>
      ) : (
        <form
          onSubmit={handleSubscribe}
          noValidate
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-md"
        >
          <div className="flex-1 relative">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setStatus('idle'); }}
              placeholder="Enter your email address"
              required
              className={[
                'w-full px-4 py-3 rounded-lg text-sm bg-alt-surface text-text placeholder:text-muted-text',
                'border focus:outline-none focus:ring-2 focus:ring-accent-text transition-colors',
                status === 'error' ? 'border-red-400' : 'border-line',
              ].join(' ')}
            />
            {status === 'error' && (
              <p className="absolute -bottom-5 left-0 text-xs text-red-400">
                Please enter a valid email address.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 bg-brand-btn-bg text-brand-btn-text px-6 py-3 rounded-lg text-sm font-semibold hover:opacity-90 hover:scale-105 transition-all focus-visible:outline-accent-text shrink-0"
          >
            {/* Envelope icon */}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Subscribe
          </button>
        </form>
      )}
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
