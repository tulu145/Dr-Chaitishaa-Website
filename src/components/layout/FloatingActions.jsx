import { Phone } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/BrandIcons';

export default function FloatingActions() {
  const whatsappUrl = import.meta.env.VITE_WHATSAPP_COMMUNITY_URL || 'https://chat.whatsapp.com/IBYTLSaMOYaKli4goU5sFe';

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4 no-print" data-floating>
      {whatsappUrl && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform focus-visible:outline-accent-text flex items-center justify-center group"
          aria-label="Join our WhatsApp Community"
        >
          <WhatsAppIcon className="w-6 h-6" />
        </a>
      )}
      <a
        href="tel:+919051375635"
        className="bg-brand-btn-bg text-brand-btn-text p-3 rounded-full shadow-lg hover:scale-105 transition-transform focus-visible:outline-accent-text flex items-center justify-center group"
        aria-label="Call +91 9051375635"
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
}
