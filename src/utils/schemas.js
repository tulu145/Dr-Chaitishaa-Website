import { z } from 'zod';
import { CONSULTATION_TYPES, BIRTH_REQUIRED_TYPES } from './constants.js';

const todayISO = () => new Date().toISOString().split('T')[0];

// Strip control characters and trim
// eslint-disable-next-line no-control-regex
const clean = (s) => s.replace(/[\x00-\x1F\x7F]/g, '').trim();

// Sanitize phone: strip spaces, dashes, parens, leading zeros after country code
const sanitizePhone = (s, countryCode = '+91') => {
  const stripped = s.replace(/[\s\-()]/g, '');
  
  // For +91, strip leading zeros at the start
  if (countryCode === '+91' && stripped.startsWith('0')) {
    return stripped.replace(/^0+/, '');
  }
  return stripped;
};

// Validate phone based on country code
const validatePhone = (phone, countryCode = '+91') => {
  const sanitized = sanitizePhone(phone, countryCode);
  
  // +91 (India): must start with [6-9] and be exactly 10 digits
  if (countryCode === '+91') {
    return /^[6-9]\d{9}$/.test(sanitized);
  }
  
  // Generic: 6-14 digits
  return /^\d{6,14}$/.test(sanitized);
};

export const consultationSchema = z
  .object({
    consultationType: z.enum(CONSULTATION_TYPES, {
      error: 'Please select a consultation type',
    }),
    name: z
      .string()
      .transform(clean)
      .pipe(z.string().min(2, 'Name must be at least 2 characters').max(120, 'Name too long')),
    countryCode: z
      .string()
      .default('+91')
      .pipe(z.string().regex(/^\+\d{1,4}$/, 'Invalid country code')),
    phone: z
      .string()
      .transform((s) => sanitizePhone(s))
      .pipe(z.string().min(1, 'Phone is required')),
    email: z.string().email('Enter a valid email address').max(254),
    preferredDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format')
      .refine((d) => d >= todayISO(), 'Choose today or a later date'),
    preferredTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Invalid time format'),
    timezone: z.string().max(64).default(
      () => Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata'
    ),
    // Conditional: birth details (numerology, tarot)
    birthDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid birth date')
      .refine((d) => d < todayISO(), 'Birth date must be in the past')
      .optional()
      .or(z.literal('')),
    birthTime: z.string().optional().or(z.literal('')),
    birthPlace: z.string().max(120).optional().or(z.literal('')),
    // Conditional: property notes (vastu-*)
    propertyNotes: z.string().max(1000, 'Property notes too long').optional().or(z.literal('')),
    // General notes
    notes: z.string().max(1000, 'Notes too long').optional().or(z.literal('')),
    // Honeypot — must stay empty
    website: z.string().max(0, 'Unexpected value'),
    // Consent — must be explicitly checked
    consent: z.literal(true, { error: 'Please accept to continue' }),
  })
  .superRefine((data, ctx) => {
    // Validate phone with country code awareness
    if (!validatePhone(data.phone, data.countryCode)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['phone'],
        message: data.countryCode === '+91'
          ? 'Phone number must be 10 digits starting with 6-9'
          : 'Enter a valid phone number',
      });
    }

    if (BIRTH_REQUIRED_TYPES.includes(data.consultationType)) {
      if (!data.birthDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['birthDate'],
          message: 'Birth date is required for this consultation type',
        });
      }
    }
  });

// Simplified schema still used on the legacy BookingPage (kept for compatibility)
export const bookingSchema = z.object({
  serviceId: z.string().min(1, 'Please select a service'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time slot'),
  name: z
    .string()
    .transform(clean)
    .pipe(z.string().min(2, 'Name must be at least 2 characters').max(120)),
  email: z.string().email('Please enter a valid email address').max(254),
  countryCode: z
    .string()
    .default('+91')
    .pipe(z.string().regex(/^\+\d{1,4}$/, 'Invalid country code')),
  phone: z
    .string()
    .transform((s) => sanitizePhone(s))
    .pipe(z.string().min(1, 'Phone is required')),
  notes: z.string().max(1000, 'Notes too long').optional().or(z.literal('')),
});
