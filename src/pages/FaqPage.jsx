import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import usePageMeta from '@/hooks/usePageMeta';
import { faqs } from '@/data/faqs';
import { ChevronDown } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

function FaqAccordion({ faq }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      className="border border-line rounded-lg overflow-hidden bg-bg mb-3 sm:mb-4 hover:shadow-sm transition-shadow"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus-visible:outline-accent-text hover:bg-alt-surface transition-colors"
      >
        <span className="font-semibold text-text text-base sm:text-lg pr-3 sm:pr-4">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-muted-text shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 sm:p-5 pt-0 border-t border-line mt-2">
              <p className="text-sm sm:text-base text-muted-text leading-relaxed whitespace-pre-line">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqPage() {
  usePageMeta({ title: 'Frequently Asked Questions', path: '/faq' });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="flex-1 w-full max-w-[800px] mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-20"
    >
      <motion.div variants={fadeUp} className="text-center mb-8 sm:mb-12">
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-text mb-3 sm:mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base text-muted-text">
          Find answers to common questions about consultations, bookings, and our services.
        </p>
      </motion.div>

      <motion.div variants={staggerContainer} className="flex flex-col mb-12 sm:mb-16">
        {faqs.map((faq) => (
          <FaqAccordion key={faq.id} faq={faq} />
        ))}
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="text-center p-6 sm:p-8 bg-alt-surface border border-line rounded-xl shadow-sm"
      >
        <h2 className="font-display text-xl sm:text-2xl text-text mb-3 sm:mb-4">Still have questions?</h2>
        <p className="text-sm sm:text-base text-muted-text mb-5 sm:mb-6">
          If you couldn't find the answer you were looking for, our team is here to help.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <a
            href="tel:+919051375635"
            className="bg-alt-surface border border-line text-text px-6 py-2.5 rounded font-medium hover:bg-bg transition-colors focus-visible:outline-accent-text text-sm sm:text-base"
          >
            Call Support
          </a>
          <NavLink
            to="/book"
            className="bg-brand-btn-bg text-brand-btn-text px-6 py-2.5 rounded font-medium hover:opacity-90 hover:scale-105 transition-all focus-visible:outline-accent-text text-sm sm:text-base"
          >
            Book Consultation
          </NavLink>
        </div>
      </motion.div>
    </motion.div>
  );
}
