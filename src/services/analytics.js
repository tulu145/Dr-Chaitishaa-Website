/**
 * analytics.js — thin wrapper over window.dataLayer (Google Tag Manager).
 *
 * Rules (spec §4.8):
 *  - Events are pushed ONLY when cookieConsent === 'accepted' in Redux.
 *  - GTM script loads only after consent (injected by CookieBanner).
 *  - NEVER send name, phone, email, birth data or property notes.
 *  - Safe no-op when consent is not given or dataLayer is absent.
 *
 * Usage:
 *   import { track } from '@/services/analytics.js';
 *   track('booking_open', { consultation_type: 'numerology' });
 */

import { store } from '@/redux/store.js';
import { selectCookieConsent } from '@/redux/slices/uiSlice.js';

/** Push one event to GTM dataLayer, guarded by consent. */
export function track(name, params = {}) {
  const consent = selectCookieConsent(store.getState());
  if (consent !== 'accepted') return;

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...params });
  } catch {
    // dataLayer push should never throw, but be safe
  }
}

/**
 * Load the GTM script tag into <head> after the user accepts cookies.
 * Called once by CookieBanner on accept.
 * @param {string} gtmId  e.g. 'GTM-XXXXXXX'
 */
export function loadGtm(gtmId) {
  if (!gtmId) return;
  if (document.querySelector(`script[data-gtm="${gtmId}"]`)) return; // already loaded

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  s.setAttribute('data-gtm', gtmId);
  document.head.appendChild(s);
}

// ---------------------------------------------------------------------------
// Named event helpers — keeps call sites clean and prevents typos
// ---------------------------------------------------------------------------

export const Analytics = {
  pageView: (path, title) =>
    track('page_view', { page_path: path, page_title: title }),

  ctaClick: (label, location) =>
    track('cta_click', { cta_label: label, cta_location: location }),

  bookingOpen: (type) =>
    track('booking_open', { consultation_type: type ?? 'unknown' }),

  bookingStep: (step, type) =>
    track('booking_step', { step_number: step, consultation_type: type ?? '' }),

  leadSubmitStart: (type) =>
    track('lead_submit_start', { consultation_type: type }),

  leadSubmitSuccess: (type, channels) =>
    track('lead_submit_success', { consultation_type: type, ...channels }),

  leadSubmitError: (type, reason) =>
    track('lead_submit_error', { consultation_type: type, error_reason: reason }),

  whatsappClick: (source) =>
    track('whatsapp_click', { click_source: source }),

  callClick: () =>
    track('call_click'),

  searchOpen: () =>
    track('search_open'),

  searchSelect: (resultId, resultType) =>
    track('search_select', { result_id: resultId, result_type: resultType }),

  themeToggle: (mode) =>
    track('theme_toggle', { new_mode: mode }),

  cookieConsent: (decision) =>
    track('cookie_consent', { decision }),
};
