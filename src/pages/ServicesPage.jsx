import { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import usePageMeta from '@/hooks/usePageMeta';
import { servicesCatalog } from '@/data/services';
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

function Accordion({ service }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(() => location.hash === `#${service.id}`);

  useEffect(() => {
    if (location.hash === `#${service.id}`) {
      setTimeout(() => {
        document.getElementById(service.id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.hash, service.id]);

  return (
    <motion.div variants={fadeUp} id={service.id} className="border border-line rounded-lg overflow-hidden bg-bg mb-4 hover:shadow-sm transition-shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between p-5 text-left focus-visible:outline-accent-text hover:bg-alt-surface transition-colors"
      >
        <span className="font-semibold text-text text-lg pr-4">{service.title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-muted-text" />
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
            <div className="p-5 pt-0 border-t border-line mt-2">
              <p className="text-muted-text mb-4 leading-relaxed">{service.description}</p>
              <a 
                href={`/book?service=${service.id}`}
                className="inline-block text-sm font-medium text-brand-btn-text bg-brand-btn-bg px-5 py-2.5 rounded focus-visible:outline-accent-text hover:opacity-90 hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                Book this service
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ServicesPage() {
  usePageMeta({ title: 'Services', path: '/services' });
  const [searchParams, setSearchParams] = useSearchParams();
  
  const categoryParam = searchParams.get('category');
  const initialIndex = categoryParam 
    ? Math.max(0, servicesCatalog.categories.findIndex(c => c.id === categoryParam))
    : 0;

  const [activeTab, setActiveTab] = useState(initialIndex);

  const handleTabClick = (index, catId) => {
    setActiveTab(index);
    setSearchParams({ category: catId }, { replace: true });
  };

  const currentCategory = servicesCatalog.categories[activeTab];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="flex-1 max-w-[1200px] w-full mx-auto px-6 py-12 md:py-20"
    >
      <motion.div variants={fadeUp} className="text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl text-text mb-4">Our Services</h1>
        <p className="text-muted-text max-w-2xl mx-auto">Explore our comprehensive range of spiritual, wellness, and consulting services tailored for your growth and harmony.</p>
        <p className="text-xs text-muted-text mt-6 uppercase tracking-wider">
          Last updated: {servicesCatalog.updatedAt}
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Tabs sidebar */}
        <motion.div variants={fadeUp} className="w-full md:w-64 flex flex-col gap-2 shrink-0 sticky top-24">
          {servicesCatalog.categories.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => handleTabClick(idx, cat.id)}
              aria-selected={activeTab === idx}
              role="tab"
              className={`text-left px-4 py-3 rounded-lg font-medium transition-all focus-visible:outline-accent-text relative overflow-hidden ${
                activeTab === idx 
                  ? 'text-accent-text' 
                  : 'text-text hover:bg-alt-surface hover:pl-5'
              }`}
            >
              {activeTab === idx && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-alt-surface border-l-4 border-accent-text"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.title}</span>
            </button>
          ))}
        </motion.div>

        {/* Tab content */}
        <div className="flex-1 w-full min-h-[400px]" role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <h2 className="font-display text-3xl text-text mb-2">{currentCategory.title}</h2>
              <p className="text-muted-text mb-8">{currentCategory.summary}</p>
              
              <motion.div 
                variants={staggerContainer} 
                initial="hidden" 
                animate="visible"
                className="flex flex-col"
              >
                {currentCategory.services.map(service => (
                  <Accordion key={service.id} service={service} />
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
          
          <motion.div variants={fadeUp} className="mt-12 p-6 bg-alt-surface border border-line rounded-lg text-sm text-muted-text">
            <strong>Disclaimer:</strong> Astrology, numerology, Vastu, tarot, sound healing and counselling are traditional and wellness practices. They are not a substitute for professional medical, psychological, legal or financial advice.
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
