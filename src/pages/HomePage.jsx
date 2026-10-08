import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import usePageMeta from '@/hooks/usePageMeta';
import StatsTicker from '@/components/ui/StatsTicker';
import { pressCoverage } from '@/data/press';
import { servicesCatalog } from '@/data/services';
import logoUrl from '@/assets/logo.webp';
import { GMB_URL } from '@/utils/constants';
import { whatsappLink } from '@/config/contact';

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
                className="group relative bg-gradient-to-r from-brand-btn-bg to-accent-text text-brand-btn-text text-center px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl hover:shadow-brand-btn-bg/25 hover:scale-[1.02] transform transition-all duration-300 ease-out w-full sm:w-auto overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform duration-300">
                    <path d="M8 2v4"/>
                    <path d="M16 2v4"/>
                    <rect width="18" height="18" x="3" y="4" rx="2"/>
                    <path d="M3 10h18"/>
                  </svg>
                  Book a consultation
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
              </NavLink>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-[#25D366] text-white text-center px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl hover:shadow-[#25D366]/30 hover:scale-[1.02] hover:bg-[#128C7E] transform transition-all duration-300 ease-out w-full sm:w-auto overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform duration-300">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>WhatsApp</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
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

      {/* ── Google Reviews ─────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={staggerContainer}
        className="py-14 sm:py-20 max-w-[1200px] mx-auto px-4 sm:px-6"
      >
        <motion.div variants={fadeUp} className="text-center mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm font-medium text-accent-text uppercase tracking-widest mb-3">
            What clients say
          </p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-text mb-4">
            Trusted by Thousands
          </h2>
          {/* Google rating summary */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-5 bg-alt-surface border border-line rounded-xl px-6 py-4 mb-6">
            <div className="flex items-center gap-2">
              {/* Google G logo */}
              <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="shrink-0">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="font-display text-3xl font-semibold text-text">5.0</span>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-0.5">
              <span className="text-[#FBBC05] text-xl tracking-tight" aria-label="5 out of 5 stars">★★★★★</span>
              <span className="text-xs text-muted-text">Google Reviews</span>
            </div>
          </div>

          {/* Placeholder review cards — replace with real quotes */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 text-left mt-6"
          >
            {[
              {
                name: 'Priya S.',
                text: 'Dr. Chaitishaa\'s numerology session gave me incredible clarity about my career path. Her insights were accurate and deeply transformative.',
                location: 'Mumbai',
              },
              {
                name: 'Rajesh K.',
                text: 'The Vastu consultation for our office was phenomenal. Within weeks we noticed a positive shift in team energy and business results.',
                location: 'Kolkata',
              },
              {
                name: 'Ananya M.',
                text: 'Her tarot reading was spot-on and compassionate. I left the session feeling empowered and with a clear sense of direction.',
                location: 'Delhi',
              },
            ].map((review) => (
              <motion.div
                key={review.name}
                variants={fadeUp}
                className="bg-bg border border-line rounded-xl p-5 sm:p-6 flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
                {/* Stars */}
                <span className="text-[#FBBC05] text-base" aria-hidden="true">★★★★★</span>
                {/* Quote */}
                <p className="text-sm sm:text-base text-muted-text leading-relaxed flex-1">
                  &ldquo;{review.text}&rdquo;
                </p>
                {/* Reviewer */}
                <div className="flex items-center gap-2 pt-2 border-t border-line">
                  <div className="w-8 h-8 rounded-full bg-alt-surface flex items-center justify-center shrink-0">
                    <span className="text-sm font-semibold text-accent-text">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text leading-none">{review.name}</p>
                    <p className="text-xs text-muted-text mt-0.5">{review.location}</p>
                  </div>
                  {/* Google G small */}
                  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" className="ml-auto shrink-0 opacity-60">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={GMB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-btn-bg text-brand-btn-text px-6 py-3 rounded-lg text-sm font-semibold hover:opacity-90 hover:scale-105 transition-all focus-visible:outline-accent-text"
              aria-label="Review Dr. Chaitishaa on Google"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Review us on Google
            </a>
            <span className="text-xs text-muted-text">
              Your review helps others find authentic healing guidance.
            </span>
          </motion.div>
        </motion.div>
      </motion.section>

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
