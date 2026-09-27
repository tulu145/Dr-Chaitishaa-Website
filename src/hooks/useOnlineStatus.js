import { useState, useEffect } from 'react';

/**
 * Returns `true` when the browser reports it is online.
 * Subscribes to the `online` and `offline` window events.
 * Defaults to `navigator.onLine` on first render (true in SSR-less Vite).
 */
export default function useOnlineStatus() {
  const [online, setOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return online;
}
