import { useParams, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import usePageMeta from '@/hooks/usePageMeta';
import { posts } from '@/data/posts';

/* ── animation variants ─────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

/* ── helpers ─────────────────────────────────────────────────── */
function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

/* ── 404 within blog ─────────────────────────────────────────── */
function PostNotFound() {
  return (
    <div className="flex-1 w-full max-w-[800px] mx-auto px-4 sm:px-6 py-20 text-center">
      <span className="font-display text-6xl text-accent-text opacity-30 block mb-6">✦</span>
      <h1 className="font-display text-3xl sm:text-4xl text-text mb-4">Post not found</h1>
      <p className="text-muted-text mb-8 text-sm sm:text-base">
        This article doesn't exist yet — or it may have moved.
      </p>
      <NavLink
        to="/blog"
        className="inline-block bg-brand-btn-bg text-brand-btn-text px-6 py-3 rounded-lg text-sm font-semibold hover:opacity-90 hover:scale-105 transition-all focus-visible:outline-accent-text"
      >
        ← Back to Blog
      </NavLink>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function BlogPostPage() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);

  usePageMeta({
    title: post ? `${post.title} — Dr. Chaitishaa` : 'Post Not Found',
    path: `/blog/${slug}`,
  });

  if (!post) return <PostNotFound />;

  return (
    <motion.article
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="flex-1 w-full"
    >
      {/* ── Cover image ─────────────────────────────────── */}
      {post.coverImage && (
        <motion.div variants={fadeUp} className="w-full max-h-[480px] overflow-hidden bg-alt-surface">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
            fetchpriority="high"
          />
        </motion.div>
      )}

      {/* ── Content shell ───────────────────────────────── */}
      <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-10 sm:py-14">

        {/* Back link */}
        <motion.div variants={fadeUp}>
          <NavLink
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-text hover:text-accent-text transition-colors focus-visible:outline-accent-text mb-8 group"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
            All articles
          </NavLink>
        </motion.div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-5">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-alt-surface text-muted-text border border-line"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          className="font-display text-3xl sm:text-4xl md:text-5xl text-text leading-tight mb-5"
        >
          {post.title}
        </motion.h1>

        {/* Author + date */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-text mb-8 pb-8 border-b border-line"
        >
          <span className="font-medium text-text">{post.author ?? 'Dr. Chaitishaa'}</span>
          <span aria-hidden="true" className="text-line">·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </motion.div>

        {/* Excerpt / lead */}
        {post.excerpt && (
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-muted-text italic leading-relaxed mb-8 font-display"
          >
            {post.excerpt}
          </motion.p>
        )}

        {/* Body content — rendered as HTML */}
        {post.content ? (
          <motion.div
            variants={fadeUp}
            className="
              prose prose-sm sm:prose-base max-w-none
              text-text
              prose-headings:font-display prose-headings:text-text
              prose-p:text-muted-text prose-p:leading-relaxed
              prose-a:text-accent-text prose-a:underline prose-a:underline-offset-4
              prose-strong:text-text
              prose-blockquote:border-l-4 prose-blockquote:border-accent-text
              prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-text
              prose-li:text-muted-text
              prose-img:rounded-xl prose-img:shadow-md
              prose-hr:border-line
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <motion.div
            variants={fadeUp}
            className="py-16 text-center text-muted-text border border-dashed border-line rounded-xl"
          >
            <span className="font-display text-4xl block mb-3 opacity-30">✦</span>
            <p className="text-sm">Content coming soon.</p>
          </motion.div>
        )}

        {/* ── Divider + CTA ───────────────────────────── */}
        <motion.div
          variants={fadeUp}
          className="mt-14 sm:mt-16 pt-10 border-t border-line text-center space-y-4"
        >
          <p className="font-display text-xl sm:text-2xl text-text">
            Ready to apply these insights?
          </p>
          <p className="text-sm text-muted-text">
            Book a personalised consultation with Dr. Chaitishaa.
          </p>
          <NavLink
            to="/book"
            className="inline-block bg-brand-btn-bg text-brand-btn-text px-7 py-3 rounded-lg text-sm font-semibold hover:opacity-90 hover:scale-105 transition-all focus-visible:outline-accent-text"
          >
            Book a consultation
          </NavLink>
        </motion.div>

        {/* Back link (bottom) */}
        <motion.div variants={fadeUp} className="mt-10 text-center">
          <NavLink
            to="/blog"
            className="text-sm text-muted-text hover:text-accent-text transition-colors focus-visible:outline-accent-text"
          >
            ← Back to all articles
          </NavLink>
        </motion.div>

      </div>
    </motion.article>
  );
}
