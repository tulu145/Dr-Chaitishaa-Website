import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-alt-surface border-t border-line mt-auto no-print">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16">

        {/* ── Main grid ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">

          {/* Brand — full width on the smallest screens */}
          <div className="col-span-2 sm:col-span-2 md:col-span-2 space-y-3">
            <h2 className="font-display font-semibold text-xl sm:text-2xl text-accent-text">
              Dr. Chaitishaa
            </h2>
            <p className="text-sm sm:text-base text-muted-text max-w-sm">
              Guiding You | Empowering You | Transforming You
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm sm:text-base text-text">Quick Links</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li><NavLink to="/services" className="text-muted-text hover:text-accent-text transition-colors">Services</NavLink></li>
              <li><NavLink to="/about"    className="text-muted-text hover:text-accent-text transition-colors">About</NavLink></li>
              <li><NavLink to="/faq"      className="text-muted-text hover:text-accent-text transition-colors">FAQ</NavLink></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm sm:text-base text-text">Contact</h3>
            <ul className="space-y-2 text-sm sm:text-base text-muted-text">
              <li>
                <a href="tel:+919051375635" className="hover:text-accent-text transition-colors break-all">
                  +91 9051375635
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
