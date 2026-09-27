import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { setStorage, getStorage } from '@/utils/storage.js';
import { STORAGE_KEYS } from '@/utils/constants.js';

const ALLOWED_KEYS = ['utm_source', 'utm_medium', 'utm_campaign'];
const MAX_PARAM_LEN = 100;
const CONTROL_RE = /[\x00-\x1F\x7F]/g; // eslint-disable-line no-control-regex

/**
 * Reads UTM parameters from the URL on first load and stores them in
 * sessionStorage ('attribution:v1'). A new UTM in the URL replaces the
 * stored value. Must be used inside <BrowserRouter>.
 *
 * Stored shape:
 *   { utm_source, utm_medium, utm_campaign, landingPath, capturedAt }
 */
export default function useUtmCapture() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const hasUtm = ALLOWED_KEYS.some((k) => params.has(k));

    if (hasUtm) {
      const attribution = {};
      for (const key of ALLOWED_KEYS) {
        const raw = params.get(key) ?? '';
        // Strip control chars, trim, cap length
        attribution[key] = raw.replace(CONTROL_RE, '').trim().slice(0, MAX_PARAM_LEN);
      }
      attribution.landingPath = location.pathname + location.search;
      attribution.capturedAt = new Date().toISOString();
      setStorage(STORAGE_KEYS.ATTRIBUTION, attribution, 'session');
    }
    // If no UTM in URL, keep any previously stored attribution (don't overwrite)
  }, [location.search, location.pathname]);
}

/**
 * Returns the currently stored UTM attribution object, or null.
 * @returns {{ utm_source: string, utm_medium: string, utm_campaign: string,
 *             landingPath: string, capturedAt: string } | null}
 */
export function getAttribution() {
  return getStorage(STORAGE_KEYS.ATTRIBUTION, 'session');
}
