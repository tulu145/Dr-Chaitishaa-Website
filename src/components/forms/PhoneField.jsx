/**
 * PhoneField — country code selector + phone number input combo.
 * Designed for React Hook Form via register/Controller.
 *
 * Props:
 *   registerCode      RHF register result for countryCode field
 *   registerPhone     RHF register result for phone field
 *   errorCode         field error for countryCode
 *   errorPhone        field error for phone
 *   defaultCode       string  default country dial code, e.g. '+91'
 */
import { countryCodes } from '@/data/countryCodes.js';
import InlineError from '@/components/feedback/InlineError.jsx';

export default function PhoneField({ registerCode, registerPhone, errorCode, errorPhone }) {

  return (
    <div>
      <label className="block text-sm font-medium text-text mb-1" htmlFor="phone">
        Phone number <span aria-hidden="true" className="text-rose-text">*</span>
      </label>
      <div className="flex gap-2">
        {/* Country code selector */}
        <div className="relative">
          <select
            id="countryCode"
            aria-label="Country dial code"
            autoComplete="tel-country-code"
            className="h-11 appearance-none pl-3 pr-8 rounded-lg border border-line bg-bg text-text text-sm focus-visible:outline-2 focus-visible:outline-accent-text cursor-pointer"
            {...registerCode}
          >
            {countryCodes.map((c) => (
              <option key={c.code + c.dial_code} value={c.dial_code}>
                {c.dial_code} ({c.code})
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-text"
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>

        {/* Phone number input */}
        <div className="flex-1">
          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="Phone number"
            aria-describedby={errorPhone ? 'phone-error' : undefined}
            aria-invalid={!!errorPhone}
            className={`w-full h-11 px-3 rounded-lg border bg-bg text-text text-sm placeholder-muted-text focus-visible:outline-2 focus-visible:outline-accent-text transition-colors ${
              errorPhone ? 'border-rose-text' : 'border-line'
            }`}
            {...registerPhone}
          />
        </div>
      </div>
      <InlineError id="countryCode-error" message={errorCode?.message} />
      <InlineError id="phone-error" message={errorPhone?.message} />
    </div>
  );
}
