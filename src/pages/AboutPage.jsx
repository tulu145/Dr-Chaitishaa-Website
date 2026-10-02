import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import usePageMeta from '@/hooks/usePageMeta';
import { pressCoverage } from '@/data/press';
import logoUrl from '@/assets/logo.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function AboutPage() {
  usePageMeta({ title: 'About Dr. Chaitishaa', path: '/about' });

  return (
    <div className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-20">

      {/* ── Bio section ─────────────────────────────────────── */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="flex flex-col md:grid md:grid-cols-12 gap-10 md:gap-12 items-center md:items-start mb-16 sm:mb-20"
      >
        {/* Circle logo */}
        <motion.div variants={fadeUp} className="md:col-span-5 flex justify-center w-full">
          <div className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-accent-text group shrink-0">
            <img
              src={logoUrl}
              alt="Dr. Chaitishaa Portrait"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Text content */}
        <motion.div variants={staggerContainer} className="md:col-span-7 flex flex-col gap-5 text-center md:text-left items-center md:items-start w-full">
          <motion.h1 variants={fadeUp} className="font-display text-3xl sm:text-4xl md:text-5xl text-text">
            About Dr. Chaitishaa
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-accent-text italic font-display">
            "Healing begins when energy aligns with purpose."
          </motion.p>

          <motion.div variants={fadeUp} className="space-y-4 text-sm sm:text-base text-muted-text leading-relaxed">
            <p>
              Dr. Chaitishaa is a renowned Numerologist, Industrial and Corporate Vastu Consultant,
              Tarot Reader, Sound Healer, Corporate Trainer, Counsellor, and Stress &amp; Anxiety
              Management Specialist.
            </p>
            <p>
              With over 10 years of profound experience, she has dedicated her life to guiding
              individuals and organizations toward clarity, harmony, and success. Her approach
              blends ancient Vedic wisdom with practical modern insights, offering solutions that
              are not just predictive but truly transformative.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-2 p-5 sm:p-6 bg-alt-surface rounded-lg border border-line w-full">
            <h2 className="font-display text-xl sm:text-2xl text-text mb-3 sm:mb-4">Professional Expertise</h2>
            <ul className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3 text-sm sm:text-base text-muted-text">
              {[
                'Numerology', 'Vastu Consulting',
                'Tarot Reading', 'Sound Healing',
                'Corporate Training', 'Counselling',
              ].map((skill) => (
                <li key={skill} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-text shrink-0" />
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Global Projects ─────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="mb-16 sm:mb-20"
      >
        <motion.h2
          variants={fadeUp}
          className="font-display text-2xl sm:text-3xl md:text-4xl text-text mb-6 sm:mb-8 text-center"
        >
          Global Projects &amp; Experience
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">
          {[
            {
              title: 'Residential & Private',
              body: "Residences of celebrities, politicians' residences and offices, judges' and lawyers' chambers.",
            },
            {
              title: 'Corporate & Commercial',
              body: 'Offices and cabins of heads of departments, corporate buildings and MNC offices, banks, showrooms, resorts.',
            },
            {
              title: 'Industrial & Institutional',
              body: 'Hospitals and healthcare spaces, warehouses and industrial units, schools and educational institutes, factories and manufacturing spaces across India and abroad.',
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              style={{ transitionDelay: `${i * 100}ms` }}
              className="p-5 sm:p-6 bg-bg border border-line rounded-lg hover:-translate-y-2 transition-transform duration-500"
            >
              <h3 className="font-semibold text-lg sm:text-xl text-text mb-2 sm:mb-3">{card.title}</h3>
              <p className="text-sm sm:text-base text-muted-text">{card.body}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Media Recognition ───────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mb-16 sm:mb-20 py-10 sm:py-12 px-4 sm:px-6 bg-alt-surface border border-line rounded-xl text-center"
      >
        <h2 className="font-display text-xl sm:text-2xl text-text mb-6 sm:mb-8">Media Recognition</h2>
        <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-8 md:gap-16">
          {pressCoverage.map((press) => (
            <motion.span
              whileHover={{ scale: 1.1, color: "var(--accent-text)" }}
              key={press.id}
              className="font-display text-base sm:text-xl text-text font-medium opacity-80 cursor-default transition-colors"
            >
              {press.name}
            </motion.span>
          ))}
        </div>
      </motion.section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-center space-y-4 sm:space-y-6 max-w-2xl mx-auto px-2"
      >
        <h2 className="font-display text-2xl sm:text-3xl text-text">
          Let's Connect for a Better Tomorrow
        </h2>
        <p className="text-sm sm:text-base text-muted-text">
          Whether you seek clarity in career, relationships, business, health or personal growth,
          we are here to guide you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <NavLink
            to="/book"
            className="bg-brand-btn-bg text-brand-btn-text px-8 py-3 rounded font-medium hover:scale-105 hover:shadow-lg transition-all focus-visible:outline-accent-text"
          >
            Book a consultation
          </NavLink>
        </div>
      </motion.div>

    </div>
  );
}
