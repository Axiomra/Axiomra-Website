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

  const { name, email, company, service, message, _id } = contact;

  try {
    await transporter.sendMail({
      from: `"Axiomra Website" <${from}>`,
      to,
      // Lets the team hit Reply and answer the lead directly.
      replyTo: email,
      subject: `New enquiry from ${name}${company ? ` (${company})` : ""}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
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
            ${row("Company", company)}
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
