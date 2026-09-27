import { useEffect, useRef } from 'react';
import { setStorage, getStorage, removeStorage } from '@/utils/storage.js';
import { STORAGE_KEYS, DRAFT_EXPIRY_MS } from '@/utils/constants.js';

/**
 * Debounced autosave of booking draft form values to localStorage.
 *
 * @param {object} values   React Hook Form watch() output
 * @param {number} step     Current wizard step
 * @param {number} [delay]  Debounce delay in ms (default 500)
 */
export function useDraftAutosave(values, step, delay = 500) {
  const timerRef = useRef(null);

  useEffect(() => {
    // Never persist consent — user must re-tick on every session
    // eslint-disable-next-line no-unused-vars
    const { consent: _consent, website: _honeypot, ...safeValues } = values;

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const now = new Date().toISOString();
      const expiresAt = new Date(Date.now() + DRAFT_EXPIRY_MS).toISOString();
      setStorage(STORAGE_KEYS.BOOKING_DRAFT, { values: safeValues, step, savedAt: now, expiresAt });
    }, delay);

    return () => clearTimeout(timerRef.current);
  }, [values, step, delay]);
}

/**
 * Load a saved draft from localStorage.
 * Returns null if no draft, or if the draft has expired.
 * Removes the expired entry automatically.
 *
 * @returns {{ values: object, step: number, savedAt: string } | null}
 */
export function loadDraft() {
  const draft = getStorage(STORAGE_KEYS.BOOKING_DRAFT);
  if (!draft) return null;

  if (draft.expiresAt && new Date(draft.expiresAt) < new Date()) {
    removeStorage(STORAGE_KEYS.BOOKING_DRAFT);
    return null;
  }

  return draft;
}

/**
 * Discard the saved draft from localStorage.
 */
export function discardDraft() {
  removeStorage(STORAGE_KEYS.BOOKING_DRAFT);
}
