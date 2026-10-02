import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import usePageMeta from '@/hooks/usePageMeta';
import StatsTicker from '@/components/ui/StatsTicker';
import { pressCoverage } from '@/data/press';
import { servicesCatalog } from '@/data/services';
import logoUrl from '@/assets/logo.webp';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function HomePage() {
  usePageMeta({ path: '/' });

  return (
    <div className="flex-1 w-full">

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-12 sm:py-16 md:py-24 max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:gap-12 items-center">

          {/* Text block */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col gap-5 relative z-10 text-center md:text-left items-center md:items-start"
          >
            <motion.p variants={fadeUp} className="font-medium text-accent-text uppercase tracking-widest text-xs sm:text-sm">
              Dr. Chaitishaa — Celestial Insights Healing
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text leading-tight">
              Healing begins when energy aligns with{' '}
              <span className="text-accent-text italic">purpose.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-muted-text max-w-lg leading-relaxed">
              Not just prediction, I help you prepare for life. Clarity Today, Stronger Tomorrow.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full sm:w-auto">
              <NavLink
                to="/book"
                className="bg-brand-btn-bg text-brand-btn-text text-center px-6 py-3 rounded font-medium hover:scale-[1.02] transition-transform focus-visible:outline-accent-text w-full sm:w-auto"
              >
                Book a consultation
              </NavLink>
              <a
                href="tel:+919051375635"
                className="bg-alt-surface border border-line text-text text-center px-6 py-3 rounded font-medium hover:bg-bg transition-colors focus-visible:outline-accent-text w-full sm:w-auto"
              >
                Call +91 9051375635
              </a>
            </motion.div>
          </motion.div>

          {/* Logo circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-[6px] md:border-[8px] border-alt-surface shadow-2xl bg-alt-surface">
              <img
                src={logoUrl}
                alt="Dr. Chaitishaa"
                width="384"
                height="384"
                className="w-full h-full object-cover"
                fetchpriority="high"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Guarantee Banner ───────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="bg-alt-surface border-y border-line py-8"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 md:gap-12 text-center">
          <div className="flex items-center gap-4">
            <span className="bg-brand-btn-bg text-accent-text p-3 rounded-full shadow-lg shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 15l-2 5-9-5 9-5 2 5z"/><path d="M12 15l2 5 9-5-9-5-2 5z"/>
              </svg>
            </span>
            <div className="flex flex-col items-start">
              <span className="font-display text-2xl sm:text-3xl font-semibold text-text">100%</span>
              <span className="text-xs sm:text-sm font-medium tracking-widest uppercase text-muted-text">Transformation</span>
            </div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-line" />
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-start">
              <span className="font-display text-2xl sm:text-3xl font-semibold text-text">0%</span>
              <span className="text-xs sm:text-sm font-medium tracking-widest uppercase text-muted-text">Risk</span>
            </div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-line" />
          <div className="flex items-center gap-4">
            <span className="font-display text-lg sm:text-xl text-text italic text-center">
              "We're Not Happy<br />Until You Are"
            </span>
          </div>
        </div>
      </motion.section>

      {/* ── Stats Ticker ───────────────────────────────────────── */}
      <StatsTicker />

      {/* ── Services Showcase ──────────────────────────────────── */}
      <section className="py-14 sm:py-20 max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-text mb-3 sm:mb-4">Our Expertise</h2>
          <p className="text-muted-text max-w-2xl mx-auto text-sm sm:text-base">
            Discover how our specialized services can bring harmony and clarity to your life and business.
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8"
        >
          {servicesCatalog.categories.slice(0, 6).map((cat) => (
            <motion.div
              variants={fadeUp}
              key={cat.id}
              className="bg-bg border border-line rounded-lg p-5 sm:p-6 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <h3 className="font-display text-lg sm:text-xl font-semibold text-text mb-2 sm:mb-3">{cat.title}</h3>
              <p className="text-muted-text mb-5 sm:mb-6 line-clamp-2 text-sm sm:text-base">{cat.summary}</p>
              <NavLink
                to={`/services?category=${cat.id}`}
                className="text-accent-text font-medium hover:underline underline-offset-4 text-sm sm:text-base"
              >
                Explore {cat.title.split(' ')[0]} &rarr;
              </NavLink>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Press Bar ──────────────────────────────────────────── */}
      <section className="py-10 sm:py-12 bg-alt-surface border-y border-line text-center overflow-hidden">
        <p className="text-xs sm:text-sm font-medium text-muted-text uppercase tracking-widest mb-4 sm:mb-6 px-4">
          As featured in
        </p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-wrap justify-center items-center gap-5 sm:gap-8 md:gap-16 max-w-[1200px] mx-auto px-4 sm:px-6"
        >
          {pressCoverage.map((press) => (
            <motion.span
              variants={fadeUp}
              key={press.id}
              className="font-display text-base sm:text-xl md:text-2xl text-text font-medium opacity-75 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-default"
            >
              {press.name}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* ── CTA Band ───────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-16 sm:py-20 bg-[#2A081C] text-[#FDFBF7] text-center border-y-4 border-[#E5B842] relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-[#E5B842]">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" />
          </svg>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl mb-4 sm:mb-6">
            Ready to transform your life?
          </h2>
          <p className="text-[#C9B8C1] text-base sm:text-lg mb-6 sm:mb-8">
            Join the thousands who have found clarity and success through our guidance.
          </p>
          <NavLink
            to="/book"
            className="inline-block bg-[#E5B842] text-[#2A081C] px-6 sm:px-8 py-3 sm:py-4 rounded font-medium hover:scale-105 hover:shadow-[0_0_20px_rgba(229,184,66,0.3)] transition-all"
          >
            Schedule Your Consultation
          </NavLink>
        </div>
      </motion.section>

    </div>
  );
}
