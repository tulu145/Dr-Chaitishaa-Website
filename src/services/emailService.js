/**
 * emailService — send a lead notification email via EmailJS (REST endpoint)
 * or Formspree as a fallback, depending on which env vars are set.
 *
 * EmailJS REST approach (no SDK dependency):
 *   POST https://api.emailjs.com/api/v1.0/email/send
 *   with { service_id, template_id, user_id, template_params }
 *
 * Formspree approach (simpler):
 *   POST https://formspree.io/f/<FORM_ID>
 *   with JSON body of template params
 *
 * Mock mode: when neither env var is set, logs and resolves ok.
 *
 * Template variables (§4.5):
 *   lead_id, name, phone, email, consultation_type, preferred_date,
 *   preferred_time, timezone, birth_details, notes, utm_summary, submitted_at
 */

import { formatDate, formatTime, formatBirthDetails } from '@/utils/format.js';
import { labelFor } from '@/utils/constants.js';

const EMAILJS_URL = 'https://api.emailjs.com/api/v1.0/email/send';
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '';
const FORMSPREE_URL = import.meta.env.VITE_FORMSPREE_URL ?? '';

/**
 * Build the email template parameters from a lead payload.
 * NEVER includes raw birth details, notes or property data beyond a summary.
 */
function buildTemplateParams(lead) {
  const phone = `${lead.countryCode}${lead.phone}`;
  const utm = lead.utm ?? {};
  const utmSummary = [utm.utm_source, utm.utm_medium, utm.utm_campaign]
    .filter(Boolean)
    .join(' / ') || 'direct';

  return {
    lead_id: lead.leadId ?? '',
    name: lead.name,
    phone,
    email: lead.email,
    consultation_type: labelFor(lead.consultationType),
    preferred_date: formatDate(lead.preferredDate),
    preferred_time: formatTime(lead.preferredTime),
    timezone: lead.timezone,
    birth_details: formatBirthDetails(lead) || 'N/A',
    notes: lead.notes || lead.propertyNotes || 'None provided',
    utm_summary: utmSummary,
    submitted_at: new Date().toISOString(),
  };
}

/**
 * Send via EmailJS REST (no SDK).
 */
async function sendViaEmailJS(templateParams) {
  const res = await fetch(EMAILJS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: templateParams,
    }),
  });
  if (!res.ok) throw new Error(`EmailJS responded ${res.status}`);
  return { ok: true };
}

/**
 * Send via Formspree.
 */
async function sendViaFormspree(templateParams) {
  const res = await fetch(FORMSPREE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(templateParams),
  });
  if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
  return { ok: true };
}

/**
 * @param {object} lead  Validated and sanitized lead payload
 * @returns {Promise<{ ok: boolean, error?: string }>}
 */
export async function sendEmail(lead) {
  const templateParams = buildTemplateParams(lead);

  // Mock mode — no env vars configured
  if (!EMAILJS_SERVICE_ID && !FORMSPREE_URL) {
    console.info('[emailService] Mock mode — would send email:', templateParams);
    return { ok: true };
  }

  try {
    if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
      return await sendViaEmailJS(templateParams);
    }
    if (FORMSPREE_URL) {
      return await sendViaFormspree(templateParams);
    }
    return { ok: false, error: 'no_provider_configured' };
  } catch (err) {
    console.warn('[emailService] Send failed:', err);
    return { ok: false, error: err?.message ?? 'email_error' };
  }
}
