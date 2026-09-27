import { useSearchParams } from 'react-router-dom';
import usePageMeta from '@/hooks/usePageMeta.js';
import BookingWizard from '@/components/forms/BookingWizard.jsx';

export default function BookingPage() {
  usePageMeta({
    title: 'Book a Consultation',
    description: 'Schedule a Vedic astrology, numerology, Vastu or tarot consultation with Dr. Chaitishaa.',
    path: '/book',
  });

  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || null;

  return (
    <div className="flex-1 w-full max-w-[720px] mx-auto px-6 py-12 md:py-20">
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl md:text-5xl text-text mb-3">
          Book a Consultation
        </h1>
        <p className="text-muted-text max-w-[480px] mx-auto">
          Share your details below and Dr. Chaitishaa will be in touch to confirm your session.
        </p>
      </div>

      <div className="bg-bg border border-line rounded-2xl p-6 md:p-10 shadow-sm">
        <BookingWizard initialType={initialType} />
      </div>

      {/* Disclaimer per spec §5.6b */}
      <p className="mt-6 text-xs text-muted-text text-center max-w-[480px] mx-auto leading-relaxed">
        Astrology, numerology, Vastu, tarot, sound healing and counselling are traditional and
        wellness practices. They are not a substitute for professional medical, psychological,
        legal or financial advice.
      </p>
    </div>
  );
}
