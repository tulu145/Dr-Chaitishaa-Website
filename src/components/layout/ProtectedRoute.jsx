import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/redux/slices/authSlice.js';

/**
 * ProtectedRoute — redirects to /portal if the user is not authenticated.
 * Passes the intended path in router state so PortalPage can redirect back.
 * Auth state comes from Redux authSlice (loaded from sessionStorage on startup).
 */
export default function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/portal" state={{ from: location }} replace />;
  }

  return children;
}
