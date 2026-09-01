import { Router } from "express";
import { timingSafeEqual } from "crypto";
import Contact from "../models/Contact.js";
import { sendContactNotification } from "../mailer.js";

const router = Router();

// Submissions contain PII (name, email, company, message), so reading them back requires an admin token.
function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_API_TOKEN;
  if (!expected) {
    return res.status(503).json({ error: "Admin access is not configured." });
  }
  const header = req.get("authorization") || "";
  const provided = header.startsWith("Bearer ") ? header.slice(7) : "";
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return res.status(401).json({ error: "Unauthorized." });
  }
  return next();
}

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

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, company, subject, service, message } = req.body;
    const invalid = validate(req.body || {});
    if (invalid) {
      return res.status(400).json({ error: invalid });
    }
    const contact = await Contact.create({
      name,
      email,
      phone,
      company,
      subject,
      service,
      message,
    });
    // Awaited on purpose: a serverless function is frozen the moment the
    // response is sent, so a fire-and-forget send would never reach Gmail.
    // sendContactNotification swallows its own errors, so a mail outage
    // still returns 201 for a lead that is already persisted.
    const notified = await sendContactNotification(contact);
    return res.status(201).json({ success: true, id: contact._id, notified });
  } catch (err) {
    console.error("Contact creation failed:", err.message);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

router.get("/", requireAdmin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(100);
    res.json(contacts);
  } catch (err) {
    console.error("Contact fetch failed:", err.message);
    res.status(500).json({ error: "Failed to fetch contacts." });
  }
});

export default router;
