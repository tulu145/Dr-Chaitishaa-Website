/**
 * Google Apps Script webhook — Dr. Chaitishaa | Celestial Insights Healing
 * Spec §4.4, §Phase 4
 *
 * Deploy as:
 *   Extensions > Apps Script > Deploy > New deployment
 *   Type: Web app | Execute as: Me | Who has access: Anyone
 *
 * Set the script property APPS_SCRIPT_TOKEN (Project Settings > Script Properties)
 * to a random shared secret, then set VITE_APPS_SCRIPT_TOKEN in the front-end .env.local
 * to the same value.
 *
 * Sheet columns (auto-created on first run):
 *   receivedAt, leadId, name, phone, email, consultationType,
 *   preferredDate, preferredTime, timezone, birthDate, birthTime,
 *   birthPlace, propertyNotes, fileLink, utm_source, utm_medium,
 *   utm_campaign, landingPath, consent, status
 */

// ── Constants ────────────────────────────────────────────────────────────────

var SHEET_NAME   = 'Leads';
var MAX_FILE_BYTES = 2 * 1024 * 1024; // 2 MB
var ALLOWED_MIME = ['application/pdf', 'image/png', 'image/jpeg', 'image/webp'];

var VALID_TYPES = [
  'numerology', 'vastu-residential', 'vastu-commercial', 'vastu-corporate',
  'vastu-industrial', 'tarot', 'sound-healing', 'corporate-training',
  'counselling', 'stress-anxiety'
];

var COLUMNS = [
  'receivedAt', 'leadId', 'name', 'phone', 'email', 'consultationType',
  'preferredDate', 'preferredTime', 'timezone', 'birthDate', 'birthTime',
  'birthPlace', 'propertyNotes', 'fileLink', 'utm_source', 'utm_medium',
  'utm_campaign', 'landingPath', 'consent', 'status'
];

// ── Entry point ──────────────────────────────────────────────────────────────

function doPost(e) {
  // Use LockService to prevent duplicate concurrent rows
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
  } catch (err) {
    return jsonResponse({ ok: false, error: 'server_busy' }, 503);
  }

  try {
    var payload = parsePayload(e);
    if (!payload) {
      return jsonResponse({ ok: false, error: 'invalid_json' }, 400);
    }

    // ── Security checks ──────────────────────────────────────────────────────

    // Shared token check (not a secret — just deters casual spam)
    var expectedToken = PropertiesService.getScriptProperties().getProperty('APPS_SCRIPT_TOKEN');
    if (expectedToken && payload.token !== expectedToken) {
      return jsonResponse({ ok: false, error: 'unauthorized' }, 403);
    }

    // Honeypot
    if (payload.website && payload.website.length > 0) {
      // Silently accept — do not reveal the drop
      return jsonResponse({ ok: true, leadId: payload.leadId || '' });
    }

    // ── Validation ───────────────────────────────────────────────────────────

    if (!isValidEmail(payload.email))          return jsonResponse({ ok: false, error: 'invalid_email' }, 400);
    if (!isValidPhone(payload.phone))          return jsonResponse({ ok: false, error: 'invalid_phone' }, 400);
    if (!isValidName(payload.name))            return jsonResponse({ ok: false, error: 'invalid_name' }, 400);
    if (!isValidType(payload.consultationType)) return jsonResponse({ ok: false, error: 'invalid_type' }, 400);
    if (!isValidLeadId(payload.leadId))        return jsonResponse({ ok: false, error: 'invalid_lead_id' }, 400);
    if (!payload.consent)                      return jsonResponse({ ok: false, error: 'consent_required' }, 400);

    // Duplicate leadId guard
    if (leadIdExists(payload.leadId)) {
      // Idempotent — return success so the client does not retry
      return jsonResponse({ ok: true, leadId: payload.leadId });
    }

    // ── File upload (optional) ───────────────────────────────────────────────
    var fileLink = '';
    if (payload.file && payload.file.base64) {
      fileLink = saveFileToDrive(payload.leadId, payload.file);
    }

    // ── Append row ───────────────────────────────────────────────────────────
    var utm = payload.utm || {};
    var row = [
      new Date().toISOString(),                           // receivedAt
      neutralize(payload.leadId),                        // leadId
      neutralize(payload.name),                          // name
      neutralize(payload.phone),                         // phone
      neutralize(payload.email),                         // email
      neutralize(payload.consultationType),              // consultationType
      neutralize(payload.preferredDate || ''),           // preferredDate
      neutralize(payload.preferredTime || ''),           // preferredTime
      neutralize(payload.timezone || ''),                // timezone
      neutralize(payload.birthDate || ''),               // birthDate
      neutralize(payload.birthTime || ''),               // birthTime
      neutralize(payload.birthPlace || ''),              // birthPlace
      neutralize((payload.propertyNotes || '').slice(0, 1000)), // propertyNotes
      fileLink,                                          // fileLink
      neutralize(utm.utm_source || ''),                  // utm_source
      neutralize(utm.utm_medium || ''),                  // utm_medium
      neutralize(utm.utm_campaign || ''),                // utm_campaign
      neutralize(payload.landingPath || ''),             // landingPath
      payload.consent ? 'true' : 'false',               // consent
      'new'                                              // status
    ];

    getLeadSheet().appendRow(row);

    return jsonResponse({ ok: true, leadId: payload.leadId });

  } catch (err) {
    console.error('doPost error:', err);
    return jsonResponse({ ok: false, error: 'server_error' }, 500);
  } finally {
    lock.releaseLock();
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function parsePayload(e) {
  try {
    var raw = (e.postData && e.postData.contents) ? e.postData.contents : '{}';
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
}

function jsonResponse(data, status) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * Neutralise formula injection: any value starting with = + - @ is prefixed
 * with a single quote so Google Sheets treats it as text. (spec §4.4)
 */
function neutralize(value) {
  if (typeof value !== 'string') return String(value || '');
  if (/^[=+\-@]/.test(value)) return "'" + value;
  return value;
}

function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return /^[^\s@]{1,64}@[^\s@]{1,255}$/.test(email.trim());
}

function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  return /^\+?\d{7,15}$/.test(phone.replace(/[\s\-]/g, ''));
}

function isValidName(name) {
  if (!name || typeof name !== 'string') return false;
  var n = name.trim();
  return n.length >= 2 && n.length <= 120;
}

function isValidType(type) {
  return VALID_TYPES.indexOf(type) !== -1;
}

function isValidLeadId(id) {
  if (!id || typeof id !== 'string') return false;
  // UUID v4 format
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(id);
}

function leadIdExists(leadId) {
  var sheet = getLeadSheet();
  var data = sheet.getDataRange().getValues();
  // leadId is column index 1 (0-based), skip header row (index 0)
  for (var i = 1; i < data.length; i++) {
    if (data[i][1] === leadId) return true;
  }
  return false;
}

/**
 * Get (or create) the leads sheet with the correct column headers.
 */
function getLeadSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(COLUMNS);
    sheet.setFrozenRows(1);
    // Format header row
    sheet.getRange(1, 1, 1, COLUMNS.length)
         .setFontWeight('bold')
         .setBackground('#2A081C')
         .setFontColor('#FDFBF7');
  }
  return sheet;
}

/**
 * Save a base64-encoded file to Google Drive and return the view URL.
 * Returns empty string on any error so the row is still written.
 */
function saveFileToDrive(leadId, fileObj) {
  try {
    // Validate MIME type
    if (ALLOWED_MIME.indexOf(fileObj.mimeType) === -1) return '';

    // Decode and check size
    var decoded = Utilities.base64Decode(fileObj.base64);
    if (decoded.length > MAX_FILE_BYTES) return '';

    var blob = Utilities.newBlob(decoded, fileObj.mimeType, fileObj.name || 'upload');
    var folder = getDriveFolder();
    var file = folder.createFile(blob);
    file.setName(leadId + '_' + (fileObj.name || 'upload'));
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return file.getUrl();
  } catch (err) {
    console.warn('saveFileToDrive failed:', err);
    return '';
  }
}

/**
 * Get (or create) a Drive folder named "Leads – Dr. Chaitishaa"
 * in the root of My Drive.
 */
function getDriveFolder() {
  var folderName = 'Leads – Dr. Chaitishaa';
  var folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(folderName);
}
