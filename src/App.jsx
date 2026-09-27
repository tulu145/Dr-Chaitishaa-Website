import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import RouteSkeleton from '@/components/layout/RouteSkeleton';
import PageShell from '@/components/layout/PageShell';
import ProtectedRoute from '@/components/layout/ProtectedRoute';

const HomePage = lazy(() => import('@/pages/HomePage'));
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const FaqPage = lazy(() => import('@/pages/FaqPage'));
const BookingPage = lazy(() => import('@/pages/BookingPage'));
const PortalPage = lazy(() => import('@/pages/PortalPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

function App() {
  return (
    <PageShell>
      <Suspense fallback={<RouteSkeleton />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/portal" element={<PortalPage />} />
          <Route 
            path="/portal/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </PageShell>
  );
}

export default App;
