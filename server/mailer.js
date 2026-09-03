import nodemailer from "nodemailer";

// Gmail SMTP with an App Password. Both values live in the environment so the
// same code works locally and on Vercel; if either is missing we degrade to a
// no-op rather than breaking the submission.
// Read lazily, never at module scope: ESM evaluates this file before app.js
// reaches its dotenv.config() call, so top-level process.env reads would be
// undefined in local development.
function credentials() {
  return { user: process.env.GMAIL, pass: process.env.APP_PASSWORD };
}

export function mailerConfigured() {
  const { user, pass } = credentials();
  return Boolean(user && pass);
}

// Reuse the transport across warm serverless invocations; building one per
// request would open a new SMTP handshake every time.
let cached = globalThis.__axiomraMailer;

function getTransporter() {
  const { user, pass } = credentials();
  if (!user || !pass) return null;
  if (!cached) {
    cached = globalThis.__axiomraMailer = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
  }
  return cached;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[c]);
}

function row(label, value) {
  if (!value) return "";
  return `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;">${label}</td><td style="padding:6px 0;">${escapeHtml(value)}</td></tr>`;
}

/**
 * Notify the team about a new contact submission.
 * Resolves to true when the mail was accepted by Gmail, false otherwise.
 * Never throws — a mail failure must not lose a saved lead.
 */
export async function sendContactNotification(contact) {
  const transporter = getTransporter();
  if (!transporter) return false;

  const from = process.env.GMAIL;
  // The notification inbox defaults to the sending account itself.
  const to = process.env.CONTACT_NOTIFY_TO || from;

  const { name, email, phone, company, subject, service, message, _id } = contact;

  // The visitor's own subject line is the most useful thing to see in the
  // inbox list, so it leads when present.
  const mailSubject = subject
    ? `${subject} — ${name}${company ? ` (${company})` : ""}`
    : `New enquiry from ${name}${company ? ` (${company})` : ""}`;

  try {
    await transporter.sendMail({
      from: `"Axiomra Website" <${from}>`,
      to,
      // Lets the team hit Reply and answer the lead directly.
      replyTo: email,
      subject: mailSubject,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        company ? `Company: ${company}` : null,
        subject ? `Subject: ${subject}` : null,
        service ? `Service: ${service}` : null,
        "",
        message || "(no message)",
        "",
        `Submission ID: ${_id}`,
      ]
        .filter((line) => line !== null)
        .join("\n"),
      html: `
        <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;color:#111;">
          <h2 style="margin:0 0 16px;font-size:18px;">New contact form submission</h2>
          <table style="border-collapse:collapse;">
            ${row("Name", name)}
            ${row("Email", email)}
            ${row("Phone", phone)}
            ${row("Company", company)}
            ${row("Subject", subject)}
            ${row("Service", service)}
          </table>
          <p style="margin:16px 0 4px;color:#666;">Message</p>
          <div style="white-space:pre-wrap;padding:12px;background:#f6f6f6;border-radius:6px;">${escapeHtml(message) || "<em>(no message)</em>"}</div>
          <p style="margin-top:16px;color:#999;font-size:12px;">Submission ID: ${escapeHtml(_id)}</p>
        </div>
      `,
    });
    return true;
  } catch (err) {
    console.error("Contact notification email failed:", err.message);
    return false;
  }
}

/**
 * Send an admin password-reset link.
 * Resolves to true when Gmail accepted the message. The caller relies on that:
 * a false return means the token it just minted must be thrown away, because
 * nobody can have received it.
 */
export async function sendPasswordResetEmail({ to, name, link, expiresInMinutes }) {
  const transporter = getTransporter();
  if (!transporter) {
    console.error("Password reset email skipped: mailer is not configured.");
    return false;
  }

  const from = process.env.GMAIL;
  const greeting = name ? `Hi ${escapeHtml(name)},` : "Hi,";

  try {
    await transporter.sendMail({
      from: `"Axiomra" <${from}>`,
      to,
      subject: "Reset your Axiomra admin password",
      text: [
        name ? `Hi ${name},` : "Hi,",
        "",
        "Use the link below to set a new password for the Axiomra lead panel.",
        "",
        link,
        "",
        `The link expires in ${expiresInMinutes} minutes and can only be used once.`,
        "You will also need your 78-character admin recovery key to finish the reset — the link on its own will not change the password.",
        "If you did not ask for this, you can ignore this email — your password stays as it is.",
      ].join("\n"),
      html: `
        <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;color:#111;line-height:1.6;">
          <h2 style="margin:0 0 16px;font-size:18px;">Reset your admin password</h2>
          <p style="margin:0 0 16px;">${greeting}</p>
          <p style="margin:0 0 22px;">Use the button below to set a new password for the Axiomra lead panel.</p>
          <p style="margin:0 0 22px;">
            <a href="${escapeHtml(link)}"
               style="display:inline-block;padding:12px 22px;border-radius:10px;background:#14D8C4;color:#0A1428;font-weight:600;text-decoration:none;">
              Set a new password
            </a>
          </p>
          <p style="margin:0 0 8px;color:#666;font-size:13px;">
            The link expires in ${expiresInMinutes} minutes and can only be used once.
          </p>
          <p style="margin:0 0 8px;color:#666;font-size:13px;">
            You will also need your 78-character admin recovery key to finish the reset — the link
            on its own will not change the password.
          </p>
          <p style="margin:0;color:#666;font-size:13px;">
            If you did not ask for this, ignore this email — your password stays as it is.
          </p>
        </div>
      `,
    });
    return true;
  } catch (err) {
    // Never log the link: it is a working credential until it expires.
    console.error("Password reset email failed:", err.message);
    return false;
  }
}
