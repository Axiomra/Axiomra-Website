/**
 * Field validation shared by the homepage contact section and the /contact page.
 *
 * Both forms post to the same endpoint and must reject the same inputs, so the
 * rules live here once instead of being re-typed per form. Every function
 * returns an empty string when the value is acceptable, or a message written
 * for the visitor (never a developer-facing one).
 *
 * The server re-runs equivalent checks; this layer exists to give immediate
 * feedback, not to be the only gate.
 */

/* A name is letters plus the punctuation that appears inside real names
   (O'Brien, Jean-Luc, Dr. Ana). Digits and symbols are what bot submissions
   and pasted junk actually contain, so they are the thing to reject. */
const NAME_ALLOWED = /^[\p{L}][\p{L}\p{M}'’.\- ]*$/u;
const NAME_LETTER = /\p{L}/gu;

/* Deliberately stricter than the browser's type="email" check, which happily
   accepts "a@b" — a TLD-less address bounces and the lead is lost. */
const EMAIL_RE = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,24}$/;

/** Digits only; the visitor may type spaces, dashes or brackets. */
const digitsOf = (value) => String(value ?? "").replace(/\D/g, "");

/**
 * Drop the national trunk prefix. People type their number the way they dial it
 * at home ("0300 1234567"), but the dial code makes the leading 0 redundant.
 */
const stripTrunk = (digits) => digits.replace(/^0+/, "");

export function validateName(value) {
  const name = String(value ?? "").trim();
  if (!name) return "Please enter your name.";
  if (name.length < 2) return "Name is too short.";
  if (name.length > 60) return "Name must be 60 characters or fewer.";
  if (/\d/.test(name)) return "Name cannot contain numbers.";
  if (!NAME_ALLOWED.test(name)) return "Use letters, spaces, hyphens and apostrophes only.";
  if ((name.match(NAME_LETTER) || []).length < 2) return "Please enter your real name.";
  return "";
}

export function validateEmail(value) {
  const email = String(value ?? "").trim();
  if (!email) return "Please enter your email.";
  if (email.length > 254) return "Email address is too long.";
  if (email.includes("..")) return "Email address cannot contain two dots in a row.";
  if (!EMAIL_RE.test(email)) return "Enter a valid email, e.g. name@company.com.";
  // A domain whose last label is all digits is an IP-style address, not a
  // mailbox anyone at a company actually reads.
  const domain = email.slice(email.lastIndexOf("@") + 1);
  if (/^\d+$/.test(domain.split(".").pop())) return "Enter a valid email, e.g. name@company.com.";
  return "";
}

/**
 * Check the national number against the selected country's numbering plan.
 * `country` is a COUNTRIES entry, so switching the picker re-validates against
 * a different digit count without any extra wiring.
 */
export function validatePhone(value, country, { required = false } = {}) {
  const raw = String(value ?? "").trim();
  if (!raw) return required ? "Please enter your phone number." : "";
  if (/[^\d\s()+.-]/.test(raw)) return "Phone number can only contain digits.";

  const digits = stripTrunk(digitsOf(raw));
  if (!digits) return "Enter the digits of your phone number.";

  const min = country?.min ?? 6;
  const max = country?.max ?? 15;
  const label = country?.name ? `${country.name} (${country.dial})` : "this country";

  if (digits.length < min || digits.length > max) {
    const expected = min === max ? `${min} digits` : `${min}–${max} digits`;
    return `A ${label} number needs ${expected}; you entered ${digits.length}.`;
  }
  return "";
}

export function validateSubject(value) {
  const subject = String(value ?? "").trim();
  if (subject && subject.length > 120) return "Subject must be 120 characters or fewer.";
  return "";
}

export function validateCompany(value) {
  const company = String(value ?? "").trim();
  if (company && company.length > 100) return "Company must be 100 characters or fewer.";
  return "";
}

export function validateMessage(value, { required = false, min = 10 } = {}) {
  const message = String(value ?? "").trim();
  if (!message) return required ? "Please tell us about your project." : "";
  if (message.length < min) return `Please add a little more detail (at least ${min} characters).`;
  if (message.length > 4000) return "Message must be 4000 characters or fewer.";
  return "";
}

/**
 * Validate a whole form at once. `fields` names the inputs the form actually
 * renders, so the homepage (no company field) and the contact page share this
 * without one reporting an error for a field the visitor never saw.
 */
export function validateContactForm(form, country, { fields, requirePhone = false } = {}) {
  const has = (name) => !fields || fields.includes(name);
  const errors = {};

  if (has("name")) errors.name = validateName(form.name);
  if (has("email")) errors.email = validateEmail(form.email);
  if (has("phone")) errors.phone = validatePhone(form.phone, country, { required: requirePhone });
  if (has("company")) errors.company = validateCompany(form.company);
  if (has("subject")) errors.subject = validateSubject(form.subject);
  if (has("message")) errors.message = validateMessage(form.message);

  // Drop the empty strings so callers can test `Object.keys(errors).length`.
  return Object.fromEntries(Object.entries(errors).filter(([, msg]) => msg));
}

/** The one dialable string the team gets, e.g. "+92 3001234567". */
export function formatPhone(value, country) {
  const digits = stripTrunk(digitsOf(value));
  return digits ? `${country.dial} ${digits}` : "";
}
