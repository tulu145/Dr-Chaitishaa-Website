import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { navLinks } from '@/data/nav.js';
import ThemeToggle from '@/components/ui/ThemeToggle.jsx';
import { Menu, Search } from 'lucide-react';
import { openSearch } from '@/redux/slices/uiSlice.js';
import { openBookingModal } from '@/redux/slices/uiSlice.js';

export default function Header({ onOpenDrawer }) {
  const dispatch = useDispatch();
  const sentinelRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        headerRef.current?.classList.toggle('is-glass', !entry.isIntersecting);
      },
      { root: null, rootMargin: '0px', threshold: 0 }
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* 1px sentinel above the fold — when it leaves view the header gets glass */}
      <div ref={sentinelRef} className="absolute top-0 left-0 w-full h-[1px] invisible" aria-hidden="true" />

      <header
        ref={headerRef}
        className="sticky top-0 z-40 transition-colors duration-300 [&.is-glass]:bg-bg/70 [&.is-glass]:backdrop-blur-md [&.is-glass]:border-b [&.is-glass]:border-line"
      >
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo / brand */}
          <NavLink
            to="/"
            className="font-display font-semibold text-base sm:text-xl md:text-2xl text-accent-text focus-visible:outline-2 focus-visible:outline-accent-text rounded truncate max-w-[160px] sm:max-w-none"
          >
            Dr. Chaitishaa
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium relative py-1 focus-visible:outline-2 focus-visible:outline-accent-text rounded transition-colors ${
                    isActive ? 'text-accent-text' : 'text-text hover:text-accent-text'
                  }`
                }
                aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[2px] bg-accent-text origin-left transition-transform duration-200 ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                      aria-hidden="true"
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Search button */}
            <button
              type="button"
              onClick={() => dispatch(openSearch())}
              aria-label="Search (Ctrl+K)"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-line text-muted-text hover:text-text hover:border-text text-sm transition-colors focus-visible:outline-2 focus-visible:outline-accent-text"
            >
              <Search size={14} aria-hidden="true" />
              <span className="hidden lg:inline">Search</span>
              <kbd className="hidden lg:inline text-xs font-mono bg-alt-surface px-1 rounded">Ctrl K</kbd>
            </button>

            {/* Book CTA */}
            <button
              type="button"
              onClick={() => dispatch(openBookingModal(null))}
              className="px-4 py-2 rounded-lg bg-brand-btn-bg text-brand-btn-text text-sm font-semibold hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-accent-text"
            >
              Book
            </button>

            <ThemeToggle />
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              type="button"
              onClick={() => dispatch(openSearch())}
              aria-label="Search"
              className="p-2 rounded hover:bg-alt-surface focus-visible:outline-2 focus-visible:outline-accent-text text-muted-text"
            >
              <Search size={18} aria-hidden="true" />
            </button>
            <ThemeToggle />
            <button
              type="button"
              onClick={onOpenDrawer}
              aria-label="Open menu"
              aria-expanded="false"
              className="p-2 rounded hover:bg-alt-surface focus-visible:outline-2 focus-visible:outline-accent-text"
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
