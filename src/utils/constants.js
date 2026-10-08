export const CONSULTATION_TYPES = [
  'numerology',
  'vastu-residential',
  'vastu-commercial',
  'vastu-corporate',
  'vastu-industrial',
  'tarot',
  'sound-healing',
  'corporate-training',
  'counselling',
  'stress-anxiety',
];

// These types require birth date/time/place
export const BIRTH_REQUIRED_TYPES = ['numerology', 'tarot'];

// These types show property notes + file upload
export const PROPERTY_REQUIRED_TYPES = [
  'vastu-residential',
  'vastu-commercial',
  'vastu-corporate',
  'vastu-industrial',
];

// Human-readable labels
export const CONSULTATION_LABELS = {
  numerology: 'Numerology',
  'vastu-residential': 'Residential Vastu',
  'vastu-commercial': 'Commercial Vastu',
  'vastu-corporate': 'Corporate Vastu',
  'vastu-industrial': 'Industrial Vastu',
  tarot: 'Tarot Reading',
  'sound-healing': 'Sound Healing',
  'corporate-training': 'Corporate Training',
  counselling: 'Counselling',
  'stress-anxiety': 'Stress & Anxiety Management',
};

export function labelFor(consultationType) {
  return CONSULTATION_LABELS[consultationType] || consultationType;
}

// External profile URLs
export const GMB_URL = 'https://share.google/8t4r14HEaXmySx6JW';
export const PHONE   = '+919051375635';

// Storage keys
export const STORAGE_KEYS = {
  THEME: 'theme',
  BOOKING_DRAFT: 'bookingDraft:v1',
  CONSENT: 'consent:v1',
  ATTRIBUTION: 'attribution:v1',
  SESSION: 'session:v1',
  LAST_SUBMIT: 'lastSubmit',
};

// Lead submit rate-limit: one submission per 30 seconds
export const SUBMIT_RATE_LIMIT_MS = 30_000;

// Draft expiry: 24 hours
export const DRAFT_EXPIRY_MS = 24 * 60 * 60 * 1000;

// Accepted file types for property upload
export const ACCEPTED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/webp': ['.webp'],
};

export const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB

// Disclaimer text (Section 5.6b)
export const DISCLAIMER_TEXT =
  'Astrology, numerology, Vastu, tarot, sound healing and counselling are traditional and wellness practices. They are not a substitute for professional medical, psychological, legal or financial advice.';
