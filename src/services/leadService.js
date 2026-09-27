/**
 * leadService — orchestrates the deferred-commit lead pipeline (spec §A.3).
 *
 * Flow:
 *   1. validate + sanitize (done upstream in BookingWizard)
 *   2. status = awaitingUndo   → 5 s undo window (managed in Redux / UI)
 *   3. Undo pressed            → cancel, nothing sent
 *   4. Timer ends              → commitLead() fires
 *        - Promise.allSettled([sendToSheet, sendEmail])
 *        - Records channelResults
 *        - Builds WhatsApp URL, attempts automatic open
 *   5. Both failed             → return error so UI shows retry + contacts
 *
 * commitLead() is called by the RTK Query submitLead mutation (leads.js).
 */

import { sendToSheet } from './sheetsService.js';
import { sendEmail } from './emailService.js';
import { buildWhatsAppUrl } from './whatsapp.js';
import { sanitize } from '@/utils/sanitize.js';
import { getStorage } from '@/utils/storage.js';
import { STORAGE_KEYS, SUBMIT_RATE_LIMIT_MS } from '@/utils/constants.js';

/**
 * Sanitize all free-text fields in the payload before they leave the browser.
 * @param {object} raw
 * @returns {object}
 */
function sanitizePayload(raw) {
  return {
    ...raw,
    name: sanitize(raw.name ?? ''),
    birthPlace: sanitize(raw.birthPlace ?? ''),
    propertyNotes: sanitize(raw.propertyNotes ?? ''),
    notes: sanitize(raw.notes ?? ''),
  };
}

/**
 * Client-side rate limiter — one submission per SUBMIT_RATE_LIMIT_MS.
 * Stores the epoch timestamp of the last successful commit in sessionStorage.
 * @returns {{ allowed: boolean, waitMs: number }}
 */
function checkRateLimit() {
  try {
    const last = getStorage(STORAGE_KEYS.LAST_SUBMIT, 'session');
    if (last) {
      const elapsed = Date.now() - last;
      if (elapsed < SUBMIT_RATE_LIMIT_MS) {
        return { allowed: false, waitMs: SUBMIT_RATE_LIMIT_MS - elapsed };
      }
    }
  } catch {
    // Storage blocked — allow the request
  }
  return { allowed: true, waitMs: 0 };
}

/**
 * Record the time of a successful commit for rate-limiting purposes.
 */
function recordSubmit() {
  try {
    sessionStorage.setItem(STORAGE_KEYS.LAST_SUBMIT, JSON.stringify(Date.now()));
  } catch {
    // Storage blocked — silently ignore
  }
}

/**
 * Build the full payload for the Apps Script webhook (spec §4.4).
 * @param {object} formValues  Validated wizard values
 * @param {string} leadId
 * @param {object|null} fileMetadata  { name, size, mimeType, base64? }
 * @param {object|null} attribution   UTM object from sessionStorage
 * @returns {object}
 */
export function buildLeadPayload(formValues, leadId, fileMetadata, attribution) {
  const phone = `${formValues.countryCode}${formValues.phone}`;
  const safe = sanitizePayload(formValues);

  return {
    leadId,
    name: safe.name,
    phone,
    countryCode: formValues.countryCode,
    email: safe.email,
    consultationType: formValues.consultationType,
    preferredDate: formValues.preferredDate,
    preferredTime: formValues.preferredTime,
    timezone: formValues.timezone,
    birthDate: formValues.birthDate || undefined,
    birthTime: formValues.birthTime || undefined,
    birthPlace: safe.birthPlace || undefined,
    propertyNotes: safe.propertyNotes || undefined,
    notes: safe.notes || undefined,
    file: fileMetadata ?? undefined,
    utm: attribution ?? { utm_source: '', utm_medium: '', utm_campaign: '' },
    landingPath: attribution?.landingPath ?? window.location.pathname,
    consent: true,
    website: '', // honeypot — always empty at commit time
  };
}

/**
 * Execute the commit: fire Sheet + Email in parallel, return structured result.
 * Called by the RTK Query submitLead mutation after the undo window closes.
 *
 * @param {object} payload  from buildLeadPayload()
 * @returns {Promise<{
 *   leadId: string,
 *   sent: { sheet: string, email: string },
 *   whatsAppUrl: string
 * }>}
 */
export async function commitLead(payload) {
  // Honeypot check — silently drop if filled
  if (payload.website) {
    console.info('[leadService] Honeypot triggered — dropping submission');
    // Return a fake success to not reveal the drop to a bot
    return {
      leadId: payload.leadId,
      sent: { sheet: 'skipped', email: 'skipped' },
      whatsAppUrl: buildWhatsAppUrl(payload),
    };
  }

  // Client rate limit
  const { allowed, waitMs } = checkRateLimit();
  if (!allowed) {
    throw new Error(`Please wait ${Math.ceil(waitMs / 1000)} seconds before submitting again.`);
  }

  // Fire both channels in parallel; neither blocks the other
  const [sheetResult, emailResult] = await Promise.allSettled([
    sendToSheet(payload),
    sendEmail(payload),
  ]);

  const sheetStatus =
    sheetResult.status === 'fulfilled' && sheetResult.value?.ok ? 'ok' : 'failed';
  const emailStatus =
    emailResult.status === 'fulfilled' && emailResult.value?.ok ? 'ok' : 'failed';

  // Record rate-limit timestamp only if at least one channel succeeded
  if (sheetStatus === 'ok' || emailStatus === 'ok') {
    recordSubmit();
  }

  const whatsAppUrl = buildWhatsAppUrl(payload);

  return {
    leadId: payload.leadId,
    sent: { sheet: sheetStatus, email: emailStatus },
    whatsAppUrl,
  };
}
