import { NavLink } from 'react-router-dom';
import { GMB_URL } from '@/utils/constants';
import { whatsappLink, CONTACT } from '@/config/contact';

/* ── Google star icon ─────────────────────────────────────────── */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-alt-surface border-t border-line mt-auto no-print">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16">

        {/* ── Main grid ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 md:col-span-2 space-y-4">
            <h2 className="font-display font-semibold text-xl sm:text-2xl text-accent-text">
              Dr. Chaitishaa
            </h2>
            <p className="text-sm sm:text-base text-muted-text max-w-sm">
              Guiding You | Empowering You | Transforming You
            </p>

            {/* ── Review us on Google ── */}
            <a
              href={GMB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-line bg-bg text-sm font-medium text-text hover:border-accent-text hover:text-accent-text transition-colors focus-visible:outline-accent-text group"
              aria-label="Review Dr. Chaitishaa on Google"
            >
              <GoogleIcon />
              <span>Review us on Google</span>
              {/* Five star row */}
              <span className="flex gap-px text-[#FBBC05] text-xs" aria-hidden="true">
                {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
              </span>
            </a>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm sm:text-base text-text">Quick Links</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li><NavLink to="/services"  className="text-muted-text hover:text-accent-text transition-colors">Services</NavLink></li>
              <li>
                <a
                  href="https://chaitishadiva.graphy.com/t/home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-text hover:text-accent-text transition-colors"
                >
                  Courses
                </a>
              </li>
              <li><NavLink to="/products"  className="text-muted-text hover:text-accent-text transition-colors">Products</NavLink></li>
              <li><NavLink to="/blog"      className="text-muted-text hover:text-accent-text transition-colors">Blog</NavLink></li>
              <li><NavLink to="/about"     className="text-muted-text hover:text-accent-text transition-colors">About</NavLink></li>
              <li><NavLink to="/faq"       className="text-muted-text hover:text-accent-text transition-colors">FAQ</NavLink></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm sm:text-base text-text">Contact</h3>
            <ul className="space-y-3 text-sm sm:text-base text-muted-text">
              <li>
                <a 
                  href={whatsappLink()} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-text transition-colors inline-flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#25D366]">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                  {CONTACT.phone}
                </a>
              </li>
              {/* Review CTA — compact version for contact column on small screens */}
              <li>
                <a
                  href={GMB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted-text hover:text-accent-text transition-colors focus-visible:outline-accent-text"
                  aria-label="Leave a Google review"
                >
                  <GoogleIcon />
                  <span>Leave a review</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ─── */}
        <div className="pt-6 sm:pt-8 border-t border-line space-y-4">
          <p className="text-xs sm:text-sm text-muted-text leading-relaxed max-w-4xl">
            <strong>Disclaimer:</strong> Astrology, numerology, Vastu, tarot, sound healing and
            counselling are traditional and wellness practices. They are not a substitute for
            professional medical, psychological, legal or financial advice.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm text-muted-text">
            <span>&copy; {new Date().getFullYear()} Dr. Chaitishaa. All rights reserved.</span>
            <div className="flex gap-4">
              <NavLink to="/privacy" className="hover:text-accent-text transition-colors">
                Privacy Policy
              </NavLink>
              <button className="hover:text-accent-text transition-colors">
                Cookie Settings
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
