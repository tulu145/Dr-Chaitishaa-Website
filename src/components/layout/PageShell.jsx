import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import MobileDrawer from './MobileDrawer.jsx';
import ScrollToTop from './ScrollToTop.jsx';
import ScrollProgress from './ScrollProgress.jsx';
import SkipLink from './SkipLink.jsx';
import FloatingActions from './FloatingActions.jsx';
import BackToTop from './BackToTop.jsx';
import OfflineBanner from './OfflineBanner.jsx';
import CookieBanner from './CookieBanner.jsx';
import BookingModal from '@/components/forms/BookingModal.jsx';
import CommandPalette from '@/components/search/CommandPalette.jsx';
import { Toaster } from 'sonner';
import {
  openDrawer,
  closeDrawer,
  selectDrawerOpen,
  selectBookingModalOpen,
  selectSearchOpen,
  setOnline,
} from '@/redux/slices/uiSlice.js';
import useUtmCapture from '@/hooks/useUtmCapture.js';

export default function PageShell({ children }) {
  const dispatch = useDispatch();
  const drawerOpen = useSelector(selectDrawerOpen);
  const bookingModalOpen = useSelector(selectBookingModalOpen);
  const searchOpen = useSelector(selectSearchOpen);

  // Capture UTM params on every render (no-op if no UTM in URL)
  useUtmCapture();

  // Sync online status into Redux on mount
  useEffect(() => {
    const goOnline = () => dispatch(setOnline(true));
    const goOffline = () => dispatch(setOnline(false));
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, [dispatch]);

  // When any overlay is open, make main content inert
  const anyOverlay = drawerOpen || bookingModalOpen || searchOpen;

  return (
    <div className="min-h-screen flex flex-col relative bg-bg text-text selection:bg-accent-text/30">
      {/* Subtle noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent-text/5 blur-[120px] pointer-events-none z-[-1]" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-rose-text/5 blur-[120px] pointer-events-none z-[-1]" />

      <OfflineBanner />
      <SkipLink />
      <ScrollToTop />
      <ScrollProgress />
      <Header
        onOpenDrawer={() => dispatch(openDrawer())}
      />
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => dispatch(closeDrawer())}
      />

      {/* main is inert when any overlay is open so screen readers stay inside the overlay */}
      <main
        id="main"
        className="flex-1 flex flex-col focus:outline-none"
        tabIndex="-1"
        inert={anyOverlay ? '' : undefined}
      >
        {children}
      </main>

      <Footer />
      <FloatingActions />
      <BackToTop />
      <CookieBanner />

      {/* Global modals — mounted once, available on every page */}
      <BookingModal />
      <CommandPalette />

      <Toaster
        position="bottom-center"
        toastOptions={{ className: 'font-sans rounded shadow-lg' }}
      />
    </div>
  );
}
