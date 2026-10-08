/**
 * Contact configuration and WhatsApp utilities
 */

export const CONTACT = {
  whatsapp: '919051375635',
  phone: '+91 9051375635',
  email: 'contact@drchaitishaa.com',
};

/**
 * Generate WhatsApp link with optional message
 * @param {string} message - Optional message to prefill
 * @returns {string} WhatsApp wa.me URL
 */
export const whatsappLink = (message = '') => {
  const baseUrl = `https://wa.me/${CONTACT.whatsapp}`;
  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }
  return baseUrl;
};

/**
 * Common WhatsApp messages
 */
export const WHATSAPP_MESSAGES = {
  booking: "Hello Dr. Chaitishaa, I would like to book a consultation.",
  inquiry: "Hello Dr. Chaitishaa, I have a question about your services.",
  product: "Hello Dr. Chaitishaa, I'm interested in your products.",
};