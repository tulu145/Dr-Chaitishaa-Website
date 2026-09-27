import { CONSULTATION_LABELS } from './constants.js';

/**
 * Format a date string (YYYY-MM-DD) to a human-readable date.
 * @param {string} isoDate
 * @param {object} [options] - Intl.DateTimeFormat options
 */
export function formatDate(isoDate, options = { day: 'numeric', month: 'long', year: 'numeric' }) {
  if (!isoDate) return '';
  try {
    return new Intl.DateTimeFormat('en-IN', options).format(new Date(isoDate + 'T00:00:00'));
  } catch {
    return isoDate;
  }
}

/**
 * Format a 24h time string (HH:MM) to 12h display.
 * @param {string} time24 e.g. "14:30"
 */
export function formatTime(time24) {
  if (!time24) return '';
  const [h, m] = time24.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')} ${period}`;
}

/**
 * Format a number with Indian digit grouping (e.g. 96576519 -> "9,65,76,519").
 * @param {number} n
 */
export function formatIndianNumber(n) {
  return new Intl.NumberFormat('en-IN').format(n);
}

/**
 * Format file size in human-readable units.
 * @param {number} bytes
 */
export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Returns the human-readable label for a consultation type ID.
 * @param {string} type
 */
export function formatConsultationType(type) {
  return CONSULTATION_LABELS[type] || type;
}

/**
 * Truncate a string to `max` characters, appending an ellipsis if needed.
 * @param {string} str
 * @param {number} max
 */
export function truncate(str, max = 120) {
  if (!str) return '';
  return str.length > max ? str.slice(0, max).trimEnd() + '\u2026' : str;
}

/**
 * Build a birth detail summary string from optional fields.
 * @param {{ birthDate?: string, birthTime?: string, birthPlace?: string }} lead
 */
export function formatBirthDetails(lead) {
  const parts = [
    lead.birthDate ? formatDate(lead.birthDate) : null,
    lead.birthTime ? formatTime(lead.birthTime) : null,
    lead.birthPlace || null,
  ].filter(Boolean);
  return parts.join(', ') || '';
}

/**
 * Build the full phone string from country code + number.
 * @param {string} countryCode e.g. "+91"
 * @param {string} phone e.g. "9051375635"
 */
export function formatPhone(countryCode, phone) {
  return `${countryCode}${phone}`;
}
