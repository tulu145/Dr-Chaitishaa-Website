import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-alt-surface border-t border-line mt-auto no-print">
      <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2 space-y-4">
            <h2 className="font-display font-semibold text-2xl text-accent-text">Dr. Chaitishaa</h2>
            <p className="text-muted-text max-w-sm">
              Guiding You | Empowering You | Transforming You
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-text">Quick Links</h3>
            <ul className="space-y-2">
              <li><NavLink to="/services" className="text-muted-text hover:text-accent-text">Services</NavLink></li>
              <li><NavLink to="/about" className="text-muted-text hover:text-accent-text">About</NavLink></li>
              <li><NavLink to="/faq" className="text-muted-text hover:text-accent-text">FAQ</NavLink></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-text">Contact</h3>
            <ul className="space-y-2 text-muted-text">
              <li><a href="tel:+919051375635" className="hover:text-accent-text">+91 9051375635</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-line space-y-4">
          <p className="text-sm text-muted-text leading-relaxed max-w-4xl">
            <strong>Disclaimer:</strong> Astrology, numerology, Vastu, tarot, sound healing and counselling are traditional and wellness practices. They are not a substitute for professional medical, psychological, legal or financial advice.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-text">
            <span>&copy; {new Date().getFullYear()} Dr. Chaitishaa. All rights reserved.</span>
            <div className="flex gap-4">
              <NavLink to="/privacy" className="hover:text-accent-text">Privacy Policy</NavLink>
              <button className="hover:text-accent-text">Cookie Settings</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
