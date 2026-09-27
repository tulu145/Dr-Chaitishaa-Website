import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

export default function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(() => typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div role="status" className="sticky top-0 z-50 bg-rose-text text-white px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium">
      <WifiOff className="w-4 h-4" />
      <span>You are currently offline. Some features may be unavailable.</span>
    </div>
  );
}
