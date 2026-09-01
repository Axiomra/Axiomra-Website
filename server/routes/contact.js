import { Router } from "express";
import Lead from "../models/Lead.js";
import { sendContactNotification } from "../mailer.js";
import { cleanString } from "../lib/sanitize.js";

const router = Router();

/* The browser runs the same rules for instant feedback, but anything can POST
   here directly, so the checks are repeated rather than trusted. Kept
   deliberately close to client/src/lib/validation.js. */
const NAME_ALLOWED = /^[\p{L}][\p{L}\p{M}'’.\- ]*$/u;
const EMAIL_RE =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,24}$/;

function validate({ name, email, phone, company, subject, message }) {
  const trimmed = String(name ?? "").trim();
  if (!trimmed) return "Name and email are required.";
  if (trimmed.length < 2 || trimmed.length > 60) return "Please provide a valid name.";
  if (/\d/.test(trimmed) || !NAME_ALLOWED.test(trimmed)) return "Please provide a valid name.";

  const mail = String(email ?? "").trim();
  if (!mail) return "Name and email are required.";
  if (mail.length > 254 || mail.includes("..") || !EMAIL_RE.test(mail)) {
    return "Please provide a valid email.";
  }

  // Arrives as one dialable string ("+92 3001234567"); the exact per-country
  // digit count is enforced in the browser, so only the outer bounds matter.
  const digits = String(phone ?? "").replace(/\D/g, "");
  if (digits && (digits.length < 7 || digits.length > 17)) {
    return "Please provide a valid phone number.";
  }

  if (String(company ?? "").trim().length > 100) return "Company name is too long.";
  if (String(subject ?? "").trim().length > 120) return "Subject is too long.";
  if (String(message ?? "").trim().length > 4000) return "Message is too long.";
  return "";
}

/**
 * Public intake. Writes into the same collection the admin lead panel reads,
 * so a submission shows up there with progress "New" and no extra wiring.
 *
 * Reading submissions back lives at GET /api/leads, behind JWT admin auth.
 */
router.post("/", async (req, res) => {
  try {
    const invalid = validate(req.body || {});
    if (invalid) {
      return res.status(400).json({ error: invalid });
    }

    // Strip tags and control characters before storing: these fields are later
    // rendered into a notification email as HTML and exported to CSV.
    const lead = await Lead.create({
      name: cleanString(req.body.name, 60),
      email: cleanString(req.body.email, 254).toLowerCase(),
      phone: cleanString(req.body.phone, 32),
      company: cleanString(req.body.company, 100),
      subject: cleanString(req.body.subject, 120),
      service: cleanString(req.body.service, 120),
      message: cleanString(req.body.message, 4000),
    });

    // Awaited on purpose: a serverless function is frozen the moment the
    // response is sent, so a fire-and-forget send would never reach Gmail.
    // sendContactNotification swallows its own errors, so a mail outage
    // still returns 201 for a lead that is already persisted.
    const notified = await sendContactNotification(lead);
    return res.status(201).json({ success: true, id: lead._id, notified });
  } catch (err) {
    console.error("Contact creation failed:", err.message);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

export default router;
