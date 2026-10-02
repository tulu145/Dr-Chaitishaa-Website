import usePageMeta from '@/hooks/usePageMeta';

export default function PrivacyPage() {
  usePageMeta({ title: 'Privacy Policy', path: '/privacy' });

  return (
    <div className="flex-1 w-full max-w-[800px] mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-20">
      <h1 className="font-display text-3xl sm:text-4xl text-text mb-6 sm:mb-8">Privacy Policy</h1>

      <div className="space-y-6 sm:space-y-8 text-sm sm:text-base text-muted-text">
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <section>
          <h2 className="text-xl sm:text-2xl text-text font-semibold mb-2 sm:mb-3">
            1. Information We Collect
          </h2>
          <p className="leading-relaxed">
            We collect personal information that you provide directly to us when booking a
            consultation or using our client portal. This includes your name, email address,
            phone number, and any details you share during sessions.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl text-text font-semibold mb-2 sm:mb-3">
            2. How We Use Your Information
          </h2>
          <p className="leading-relaxed">
            Your information is used solely for scheduling consultations, communicating important
            updates, and providing the spiritual and wellness services you request. We do not sell
            your personal data to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl text-text font-semibold mb-2 sm:mb-3">
            3. Confidentiality
          </h2>
          <p className="leading-relaxed">
            All consultations are strictly confidential. Notes and reports generated during your
            sessions are stored securely and are only accessible via your protected client portal.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl text-text font-semibold mb-2 sm:mb-3">
            4. Contact Us
          </h2>
          <p className="leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="tel:+919051375635" className="text-accent-text hover:underline">
              +91 9051375635
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
