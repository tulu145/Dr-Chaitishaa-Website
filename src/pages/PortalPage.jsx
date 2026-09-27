import { useNavigate, useLocation } from 'react-router-dom';
import usePageMeta from '@/hooks/usePageMeta.js';
import AuthTabs from '@/components/forms/AuthTabs.jsx';

export default function PortalPage() {
  usePageMeta({
    title: 'Client Portal',
    description: 'Sign in or register for the Dr. Chaitishaa client portal.',
    path: '/portal',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/portal/dashboard';

  const handleSuccess = () => {
    navigate(from, { replace: true });
  };

  return (
    <div className="flex-1 w-full max-w-[500px] mx-auto px-6 py-20 flex flex-col justify-center">
      <div className="text-center mb-8">
        <h1 className="font-display text-3xl text-text mb-2">Client Portal</h1>
        <p className="text-muted-text text-sm">
          Access your reports, appointments and secure documents.
        </p>
      </div>

      <div className="bg-bg border border-line rounded-xl shadow-sm p-6 md:p-8">
        <AuthTabs defaultTab="signin" onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
