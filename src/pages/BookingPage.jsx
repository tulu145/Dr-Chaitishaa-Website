import { useSearchParams } from 'react-router-dom';
import usePageMeta from '@/hooks/usePageMeta.js';
import BookingWizard from '@/components/forms/BookingWizard.jsx';
import { servicesCatalog } from '@/data/services.js';

export default function BookingPage() {
  usePageMeta({
    title: 'Book a Consultation',
    description: 'Schedule a Vedic astrology, numerology, Vastu or tarot consultation with Dr. Chaitishaa.',
    path: '/book',
  });

  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service');
  const typeParam = searchParams.get('type');
  
  // Find consultation type from service ID
  let initialType = typeParam || null;
  
  if (serviceParam) {
    // Find which category contains this service
    for (const category of servicesCatalog.categories) {
      const service = category.services.find(s => s.id === serviceParam);
      if (service) {
        // For Vastu services, use the specific service as consultation type
        if (category.id === 'vastu') {
          initialType = serviceParam; // e.g., "vastu-residential", "vastu-commercial"
        } else {
          initialType = category.consultationType;
        }
        break;
      }
    }
  }

  return (
    <div className="flex-1 w-full max-w-[720px] mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-20">
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-text mb-2 sm:mb-3">
          Book a Consultation
        </h1>
        <p className="text-sm sm:text-base text-muted-text max-w-[480px] mx-auto">
          Share your details below and Dr. Chaitishaa will be in touch to confirm your session.
        </p>
      </div>

      <div className="bg-bg border border-line rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-10 shadow-sm">
        <BookingWizard initialType={initialType} />
      </div>

      {/* Disclaimer */}
      <p className="mt-5 sm:mt-6 text-xs text-muted-text text-center max-w-[480px] mx-auto leading-relaxed px-2">
        Astrology, numerology, Vastu, tarot, sound healing and counselling are traditional and
        wellness practices. They are not a substitute for professional medical, psychological,
        legal or financial advice.
      </p>
    </div>
  );
}
