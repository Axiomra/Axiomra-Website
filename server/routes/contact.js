import { Router } from "express";
import { isValidPhoneNumber } from "libphonenumber-js/min";
import mongoose from "mongoose";
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

  // Arrives as one international string ("+92 300 1234567"), so the dial code
  // it carries decides which numbering plan the rest must fit.
  const tel = String(phone ?? "").trim();
  if (tel && !isValidPhoneNumber(tel)) return "Please provide a valid phone number.";

  if (String(company ?? "").trim().length > 100) return "Company name is too long.";
  if (String(subject ?? "").trim().length > 120) return "Subject is too long.";
  if (String(message ?? "").trim().length > 4000) return "Message is too long.";
  return "";
}

// Spam traps. `hp_q7v` is a field real visitors never see (it is positioned off
// screen and hidden from assistive tech), so any value in it came from a bot
// filling every input. `elapsedMs` is how long the form was open; a person
// cannot fill it in under three seconds.
const HONEYPOT_FIELD = "hp_q7v";
const MIN_FILL_MS = 3000;

function looksAutomated(body) {
  if (String(body[HONEYPOT_FIELD] ?? "").trim()) return "honeypot";
  // Missing timing is let through: a visitor on a page cached from before this
  // field existed must not silently lose their message.
  if (body.elapsedMs === undefined) return "";
  const elapsed = Number(body.elapsedMs);
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) return "too-fast";
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
    const body = req.body || {};

    // Answer a trapped submission exactly like a real one, so the bot has no
    // signal to adapt to, but store nothing and send no email.
    const trapped = looksAutomated(body);
    if (trapped) {
      // Enough to spot a real lead caught by the trap (and reach them), without
      // logging the honeypot value or the message itself.
      const email = typeof body.email === "string" ? body.email.trim().slice(0, 254) : "";
      const hpLength = String(body[HONEYPOT_FIELD] ?? "").length;
      const elapsed = body.elapsedMs === undefined ? "n/a" : `${body.elapsedMs}ms`;
      console.warn(
        `Contact submission dropped (${trapped}): email=${JSON.stringify(email || "none")} ` +
          `hpLength=${hpLength} elapsed=${JSON.stringify(elapsed)}`
      );
      return res
        .status(201)
        .json({ success: true, id: new mongoose.Types.ObjectId(), notified: true });
    }

    const invalid = validate(body);
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
