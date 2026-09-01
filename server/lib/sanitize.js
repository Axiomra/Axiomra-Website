/**
 * Request hardening applied before any handler reads req.body / req.query.
 *
 * Two separate problems:
 *
 * 1. NoSQL injection. `{"email": {"$ne": null}}` posted to the login route is
 *    a valid JSON body that Mongo will happily treat as an operator. Keys
 *    starting with `$`, and keys containing `.` (dotted-path writes), are
 *    stripped everywhere.
 *
 * 2. Stored XSS. React escapes text nodes, so a `<script>` in a lead's remarks
 *    is inert in the panel — but the same field is also rendered into a
 *    notification email as HTML, and may be exported to CSV and opened in a
 *    spreadsheet. Tags are stripped on write rather than trusting every
 *    downstream consumer to escape.
 */

const MAX_DEPTH = 8;

function cleanKeys(value, depth = 0) {
  if (depth > MAX_DEPTH || value === null || typeof value !== "object") return value;

  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i += 1) cleanKeys(value[i], depth + 1);
    return value;
  }

  for (const key of Object.keys(value)) {
    if (key.startsWith("$") || key.includes(".")) {
      delete value[key];
      continue;
    }
    cleanKeys(value[key], depth + 1);
  }
  return value;
}

/** Express middleware. Mutates in place rather than reassigning req.query. */
export function mongoSanitize(req, _res, next) {
  if (req.body) cleanKeys(req.body);
  if (req.params) cleanKeys(req.params);
  if (req.query) cleanKeys(req.query);
  next();
}

const TAG_RE = /<\/?[a-z][^>]*>/gi;
// Bare control characters break CSV and log output and never appear in a real
// name, message or note. Newlines and tabs are kept: a message field needs them.
const CONTROL_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/**
 * Normalise one user-supplied string: strip tags and control characters, then
 * cap the length.
 * Returns "" for null/undefined so a cleared field stores an empty string
 * rather than dropping out of the document.
 */
export function cleanString(value, max = 4000) {
  if (value === null || value === undefined) return "";
  return String(value).replace(TAG_RE, "").replace(CONTROL_RE, "").trim().slice(0, max);
}

/**
 * Escape a value for a CSV cell. The leading-quote guard is the important
 * part: a cell beginning with = + - @ is executed as a formula by Excel and
 * Sheets, which turns a lead's "name" into code running on a colleague's
 * machine.
 */
export function csvCell(value) {
  let s = value === null || value === undefined ? "" : String(value);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}
