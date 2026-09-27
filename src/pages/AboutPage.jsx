import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import usePageMeta from '@/hooks/usePageMeta';
import { pressCoverage } from '@/data/press';
import logoUrl from '@/assets/logo.webp';

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
    <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-12 md:py-20">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="grid md:grid-cols-12 gap-12 items-start mb-20"
      >
        <motion.div variants={fadeUp} className="md:col-span-5 relative">
          <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl relative bg-alt-surface border-8 border-bg group">
            <img 
              src={logoUrl} 
              alt="Dr. Chaitishaa Portrait" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              loading="lazy"
            />
          </div>
        </motion.div>
        
        <motion.div variants={staggerContainer} className="md:col-span-7 flex flex-col gap-6">
          <motion.h1 variants={fadeUp} className="font-display text-4xl md:text-5xl text-text">About Dr. Chaitishaa</motion.h1>
          <motion.p variants={fadeUp} className="text-xl text-accent-text italic font-display">
            "Healing begins when energy aligns with purpose."
          </motion.p>
          
          <motion.div variants={fadeUp} className="space-y-4 text-muted-text leading-relaxed">
            <p>
              Dr. Chaitishaa is a renowned Numerologist, Industrial and Corporate Vastu Consultant, Tarot Reader, Sound Healer, Corporate Trainer, Counsellor, and Stress & Anxiety Management Specialist. 
            </p>
            <p>
              With over 10 years of profound experience, she has dedicated her life to guiding individuals and organizations toward clarity, harmony, and success. Her approach blends ancient Vedic wisdom with practical modern insights, offering solutions that are not just predictive but truly transformative.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-4 p-6 bg-alt-surface rounded-lg border border-line">
            <h2 className="font-display text-2xl text-text mb-4">Professional Expertise</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-muted-text">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent-text" /> Numerology</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent-text" /> Vastu Consulting</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent-text" /> Tarot Reading</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent-text" /> Sound Healing</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent-text" /> Corporate Training</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent-text" /> Counselling</li>
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="mb-20"
      >
        <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl text-text mb-8 text-center">Global Projects & Experience</motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div variants={fadeUp} className="p-6 bg-bg border border-line rounded-lg hover:-translate-y-2 transition-transform duration-500">
            <h3 className="font-semibold text-xl text-text mb-3">Residential & Private</h3>
            <p className="text-muted-text">Residences of celebrities, politicians' residences and offices, judges' and lawyers' chambers.</p>
          </motion.div>
          <motion.div variants={fadeUp} className="p-6 bg-bg border border-line rounded-lg hover:-translate-y-2 transition-transform duration-500 delay-100">
            <h3 className="font-semibold text-xl text-text mb-3">Corporate & Commercial</h3>
            <p className="text-muted-text">Offices and cabins of heads of departments, corporate buildings and MNC offices, banks, showrooms, resorts.</p>
          </motion.div>
          <motion.div variants={fadeUp} className="p-6 bg-bg border border-line rounded-lg hover:-translate-y-2 transition-transform duration-500 delay-200">
            <h3 className="font-semibold text-xl text-text mb-3">Industrial & Institutional</h3>
            <p className="text-muted-text">Hospitals and healthcare spaces, warehouses and industrial units, schools and educational institutes, factories and manufacturing spaces across India and abroad.</p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mb-20 py-12 px-6 bg-alt-surface border border-line rounded-xl text-center"
      >
        <h2 className="font-display text-2xl text-text mb-8">Media Recognition</h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {pressCoverage.map((press) => (
            <motion.span 
              whileHover={{ scale: 1.1, color: "var(--accent-text)" }}
              key={press.id} 
              className="font-display text-xl text-text font-medium opacity-80 cursor-default transition-colors"
            >
              {press.name}
            </motion.span>
          ))}
        </div>
      </motion.section>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-center space-y-6 max-w-2xl mx-auto"
      >
        <h2 className="font-display text-3xl text-text">Let's Connect for a Better Tomorrow</h2>
        <p className="text-muted-text">Whether you seek clarity in career, relationships, business, health or personal growth, we are here to guide you.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <NavLink to="/book" className="bg-brand-btn-bg text-brand-btn-text px-8 py-3 rounded font-medium hover:scale-105 hover:shadow-lg transition-all focus-visible:outline-accent-text">
            Book a consultation
          </NavLink>
        </div>
      </motion.div>
    </div>
  );
}
