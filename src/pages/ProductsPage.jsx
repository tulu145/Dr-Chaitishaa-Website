import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import usePageMeta from '@/hooks/usePageMeta';
import { products, CATEGORIES } from '@/data/products';
import { whatsappLink, WHATSAPP_MESSAGES } from '@/config/contact';

/* ── animation variants ─────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.5, ease: 'easeOut' } },
};

const stagger = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariant = {
  hidden:  { opacity: 0, y: 28, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.45, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -12, scale: 0.97, transition: { duration: 0.25 } },
};

/* ── WhatsApp helper ─────────────────────────────────────────── */
function waLink(productName) {
  const message = `Hi Dr. Chaitishaa, I'm interested in the product: *${productName}*. Could you please share more details?`;
  return whatsappLink(message);
}

/* ── ProductCard ─────────────────────────────────────────────── */
function ProductCard({ product }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
      variants={cardVariant}
      layout
      className="group flex flex-col bg-bg border border-line rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-alt-surface">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          /* Fallback if image fails to load */
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-alt-surface">
            <span className="font-display text-4xl text-accent-text opacity-40">✦</span>
            <span className="text-xs text-muted-text uppercase tracking-widest">
              {CATEGORIES.find(c => c.id === product.category)?.label}
            </span>
          </div>
        )}

        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-brand-btn-bg text-brand-btn-text text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full">
          {CATEGORIES.find(c => c.id === product.category)?.label}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 gap-3">
        <div className="flex-1 space-y-1.5">
          <h3 className="font-display text-lg sm:text-xl text-text leading-snug">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-muted-text leading-relaxed line-clamp-3">
            {product.description}
          </p>
        </div>

        {/* Price (optional) */}
        {product.price && (
          <p className="font-semibold text-accent-text text-base">
            ₹{product.price.toLocaleString('en-IN')}
          </p>
        )}

        {/* CTA */}
        <a
          href={waLink(product.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-brand-btn-bg text-brand-btn-text text-sm font-semibold hover:opacity-90 hover:shadow-md transition-all focus-visible:outline-accent-text"
          aria-label={`Enquire about ${product.name} on WhatsApp`}
        >
          {/* WhatsApp icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Enquire on WhatsApp
        </a>
      </div>
    </motion.article>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function ProductsPage() {
  usePageMeta({ title: 'Products', path: '/products' });
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

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
          Sacred Products
        </h1>
        <p className="text-sm sm:text-base text-muted-text max-w-2xl mx-auto leading-relaxed">
          Handpicked, energised products to support your healing, protection and abundance journey.
          Each item is infused with intention and Vedic wisdom.
        </p>
      </motion.div>

      {/* ── Category filter tabs ─────────────────────────── */}
      <motion.div
        variants={fadeUp}
        className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12"
        role="tablist"
        aria-label="Filter products by category"
      >
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            role="tab"
            aria-selected={activeCategory === cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-accent-text border ${
              activeCategory === cat.id
                ? 'bg-brand-btn-bg text-brand-btn-text border-brand-btn-bg shadow-md scale-105'
                : 'bg-bg border-line text-text hover:border-accent-text hover:text-accent-text'
            }`}
          >
            {cat.label}
            {cat.id !== 'all' && (
              <span className={`ml-1.5 text-xs tabular-nums ${activeCategory === cat.id ? 'opacity-70' : 'text-muted-text'}`}>
                ({products.filter(p => p.category === cat.id).length})
              </span>
            )}
          </button>
        ))}
      </motion.div>

      {/* ── Product grid ─────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          variants={stagger}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
          role="tabpanel"
        >
          {filtered.length > 0 ? (
            filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <motion.div
              variants={fadeUp}
              className="col-span-full text-center py-20 text-muted-text"
            >
              <span className="font-display text-5xl block mb-4 opacity-30">✦</span>
              <p className="text-base">No products in this category yet.</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Custom order note ─────────────────────────────── */}
      <motion.div
        variants={fadeUp}
        className="mt-14 sm:mt-20 p-6 sm:p-8 bg-alt-surface border border-line rounded-xl text-center"
      >
        <h2 className="font-display text-xl sm:text-2xl text-text mb-2">
          Looking for something specific?
        </h2>
        <p className="text-sm sm:text-base text-muted-text mb-5 max-w-lg mx-auto">
          We create custom crystal kits, personalised oil blends and ritual sets based on your
          numerology chart. Reach out on WhatsApp to discuss.
        </p>
        <a
          href={waLink('Custom Product Enquiry')}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-brand-btn-bg text-brand-btn-text px-6 py-3 rounded-lg font-medium text-sm hover:opacity-90 hover:scale-105 transition-all focus-visible:outline-accent-text"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Chat on WhatsApp
        </a>
      </motion.div>

    </motion.div>
  );
}
