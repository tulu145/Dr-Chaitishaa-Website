import { labelFor } from '@/utils/constants.js';
import { formatDate, formatTime } from '@/utils/format.js';

const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER ?? '919051375635';
export const WA_COMMUNITY_URL =
  import.meta.env.VITE_WHATSAPP_COMMUNITY_URL ??
  'https://chat.whatsapp.com/IBYTLSaMOYaKli4goU5sFe';

/**
 * Build a WhatsApp deep-link URL for a submitted lead.
 * Plain text only — no emojis. Encoded URL kept under ~1,800 characters.
 *
 * @param {object} lead  Validated and sanitized lead payload
 * @returns {string}     https://wa.me/... URL
 */
export function buildWhatsAppUrl(lead) {
  const phone = `${lead.countryCode}${lead.phone}`;

  const lines = [
    'Hello Dr. Chaitishaa, I would like to book a consultation.',
    '',
    `Name: ${lead.name}`,
    `Service: ${labelFor(lead.consultationType)}`,
    `Preferred: ${formatDate(lead.preferredDate)} at ${formatTime(lead.preferredTime)} (${lead.timezone})`,
    `Phone: ${phone}`,
    `Email: ${lead.email}`,
    lead.birthDate
      ? `Birth: ${formatDate(lead.birthDate)}${lead.birthTime ? ' ' + formatTime(lead.birthTime) : ''}${lead.birthPlace ? ', ' + lead.birthPlace : ''}`
      : null,
    lead.propertyNotes
      ? `Property notes: ${lead.propertyNotes.slice(0, 300)}`
      : null,
    `Reference: ${(lead.leadId ?? '').slice(0, 8)}`,
  ]
    .filter(Boolean)
    .join('\n');

  // Number must be digits only with country code, no plus sign
  const number = WA_NUMBER.replace(/\D/g, '');
  return `https://wa.me/${number}?text=${encodeURIComponent(lines)}`;
}

/**
 * Open a WhatsApp URL in a new tab.
 * Returns true if the window opened (not blocked), false if blocked.
 * @param {string} url
 * @returns {boolean}
 */
export function openWhatsApp(url) {
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  return win !== null;
}
