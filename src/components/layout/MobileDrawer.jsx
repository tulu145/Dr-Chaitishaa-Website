import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { navLinks } from '@/data/nav';
import { X } from 'lucide-react';
import useFocusTrap from '@/hooks/useFocusTrap';

export default function MobileDrawer({ isOpen, onClose }) {
  const drawerRef = useFocusTrap(isOpen);
  
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }
    return () => { document.documentElement.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-text/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        className="relative w-4/5 max-w-sm h-full bg-bg border-l border-line shadow-2xl flex flex-col p-6 animate-in slide-in-from-right duration-300"
      >
        <div className="flex justify-between items-center mb-8">
          <span className="font-display font-semibold text-xl text-accent-text">Menu</span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded hover:bg-alt-surface focus-visible:outline-accent-text"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={onClose}
              className={({ isActive }) =>
                `text-lg font-medium py-3 px-4 rounded focus-visible:outline-accent-text min-h-[48px] flex items-center ${
                  isActive ? 'bg-alt-surface text-accent-text' : 'text-text hover:bg-alt-surface'
                }`
              }
              aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/book"
            onClick={onClose}
            className="mt-4 min-h-[48px] flex justify-center items-center rounded bg-brand-btn-bg text-brand-btn-text font-medium py-3 px-4 focus-visible:outline-accent-text"
          >
            Book a consultation
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
