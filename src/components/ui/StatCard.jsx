import { motion } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';
import { addCommas } from '@/utils/numberFormat';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function StatCard({ 
  icon, 
  value, 
  suffix = '', 
  label, 
  description, 
  delay = 0,
  inView = false 
}) {
  const animatedValue = useCountUp(value, 2000 + delay * 200, inView);
  
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay: delay * 0.1 }}
      className="flex flex-col items-center text-center group"
    >
      {/* Icon */}
      {icon && (
        <div className="mb-3 sm:mb-4">
          <span className="bg-brand-btn-bg text-accent-text p-3 rounded-full shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </span>
        </div>
      )}
      
      {/* Number */}
      <div className="flex flex-col items-center">
        <span className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-text mb-1">
          {value >= 1000 ? addCommas(animatedValue) : animatedValue}{suffix}
        </span>
        <span className="text-xs sm:text-sm font-medium tracking-widest uppercase text-muted-text">
          {label}
        </span>
      </div>
      
      {/* Description */}
      {description && (
        <p className="font-display text-sm sm:text-base text-text italic text-center mt-2">
          {description}
        </p>
      )}
    </motion.div>
  );
}