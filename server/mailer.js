import { Resend } from "resend";

// Resend's HTTP API rather than SMTP: hosts like Render block outbound SMTP
// ports, and an HTTPS call needs no connection pool. With no RESEND_API_KEY we
// degrade to a no-op rather than breaking the submission (lib/env.js makes the
// key mandatory once deployed).
// Read lazily, never at module scope: ESM evaluates this file before app.js
// reaches its dotenv.config() call, so top-level process.env reads would be
// undefined in local development.
const DEFAULT_FROM = "Axiomra <onboarding@resend.dev>";

function apiKey() {
  return process.env.RESEND_API_KEY?.trim() || undefined;
}

function sender() {
  return process.env.MAIL_FROM?.trim() || DEFAULT_FROM;
}

export function mailerConfigured() {
  return Boolean(apiKey());
}

// Reuse the client across warm serverless invocations.
let cached = globalThis.__axiomraMailer;

function getClient() {
  const key = apiKey();
  if (!key) return null;
  if (!cached || cached.key !== key) {
    cached = globalThis.__axiomraMailer = new Resend(key);
  }
  return cached;
}

// The SDK resolves to { data, error } instead of throwing on API errors
// (bad key, unverified domain, rate limit), so turn those into throws for the
// callers' catch blocks.
async function deliver(client, payload) {
  const { error } = await client.emails.send(payload);
  if (error) throw new Error(`${error.name}: ${error.message}`);
}

function escapeHtml(value) {
  return String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c]
  );
}

function row(label, value) {
  if (!value) return "";
  return `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;">${label}</td><td style="padding:6px 0;">${escapeHtml(value)}</td></tr>`;
}

/**
 * Notify the team about a new contact submission.
 * Resolves to true when the mail was accepted by Resend, false otherwise.
 * Never throws; a mail failure must not lose a saved lead.
 */
export async function sendContactNotification(contact) {
  const client = getClient();
  if (!client) return false;

  // There is no sending mailbox to fall back to any more, so without an
  // explicit inbox there is nobody to notify.
  const to = process.env.CONTACT_NOTIFY_TO?.trim();
  if (!to) {
    console.error("Contact notification email skipped: CONTACT_NOTIFY_TO is not set.");
    return false;
  }

  const { name, email, phone, company, subject, service, message, _id } = contact;

  // The visitor's own subject line is the most useful thing to see in the
  // inbox list, so it leads when present.
  const mailSubject = subject
    ? `${subject}: ${name}${company ? ` (${company})` : ""}`
    : `New enquiry from ${name}${company ? ` (${company})` : ""}`;

  try {
    await deliver(client, {
      from: sender(),
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
 * Resolves to true when Resend accepted the message. The caller relies on that:
 * a false return means the token it just minted must be thrown away, because
 * nobody can have received it.
 */
export async function sendPasswordResetEmail({ to, name, link, expiresInMinutes }) {
  const client = getClient();
  if (!client) {
    console.error("Password reset email skipped: mailer is not configured.");
    return false;
  }

  const greeting = name ? `Hi ${escapeHtml(name)},` : "Hi,";

  try {
    await deliver(client, {
      from: sender(),
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
        "You will also need your 78-character admin recovery key to finish the reset. The link on its own will not change the password.",
        "If you did not ask for this, you can ignore this email and your password stays as it is.",
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
            You will also need your 78-character admin recovery key to finish the reset. The link
            on its own will not change the password.
          </p>
          <p style="margin:0;color:#666;font-size:13px;">
            If you did not ask for this, ignore this email and your password stays as it is.
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
