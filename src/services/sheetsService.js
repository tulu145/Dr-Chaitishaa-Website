/**
 * sheetsService — POST a lead payload to the Google Apps Script webhook.
 *
 * Spec §4.4: sends JSON as Content-Type text/plain;charset=utf-8 (required
 * because Apps Script doPost() does not handle application/json CORS preflight
 * on the free tier without additional configuration).
 *
 * Mock mode: when VITE_APPS_SCRIPT_URL is empty, logs the payload and
 * resolves { ok: true } so the UI works before deployment.
 */

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL ?? '';
const APPS_SCRIPT_TOKEN = import.meta.env.VITE_APPS_SCRIPT_TOKEN ?? '';

/**
 * @param {object} payload  Full lead payload (see §4.4 schema)
 * @returns {Promise<{ ok: boolean, leadId?: string, error?: string }>}
 */
export async function sendToSheet(payload) {
  if (!APPS_SCRIPT_URL) {
    console.info('[sheetsService] Mock mode — would POST:', payload);
    return { ok: true, leadId: payload.leadId };
  }

  try {
    const body = JSON.stringify({ ...payload, token: APPS_SCRIPT_TOKEN });

    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      // Apps Script free tier requires text/plain to avoid CORS preflight
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body,
    });

    // Apps Script may return 302 redirect; fetch follows automatically.
    // Response may not be readable due to CORS on redirected URL — treat
    // non-ok HTTP as a failure but missing body as a sent-unverified success.
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.warn('[sheetsService] Non-OK response:', res.status, text);
      return { ok: false, error: 'server_error' };
    }

    try {
      const json = await res.json();
      return json;
    } catch {
      // CORS blocks reading the redirected response body — treat as sent
      return { ok: true, leadId: payload.leadId };
    }
  } catch (err) {
    console.warn('[sheetsService] Network error:', err);
    return { ok: false, error: 'network_error' };
  }
}
