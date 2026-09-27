import { NavLink } from 'react-router-dom';
import EmptyState from '@/components/ui/EmptyState';
import { FileQuestion } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex-1 max-w-[1200px] w-full mx-auto px-6 py-20 flex flex-col items-center justify-center">
      <EmptyState
        icon={FileQuestion}
        title="404 - Page Not Found"
        description="We couldn't find the page you're looking for. It might have been moved or doesn't exist."
        action={
          <div className="flex gap-4 justify-center flex-wrap mt-4">
            <NavLink to="/" className="text-brand-btn-text bg-brand-btn-bg px-4 py-2 rounded font-medium hover:opacity-90">
              Home
            </NavLink>
            <NavLink to="/services" className="text-text bg-alt-surface border border-line px-4 py-2 rounded font-medium hover:bg-bg">
              Services
            </NavLink>
            <NavLink to="/book" className="text-text bg-alt-surface border border-line px-4 py-2 rounded font-medium hover:bg-bg">
              Book Consultation
            </NavLink>
          </div>
        }
      />
    </div>
  );
}
