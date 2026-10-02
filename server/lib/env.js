/**
 * Startup environment validation. app.js imports this before anything else,
 * so a misconfigured deploy fails on its first request with a message
 * that names every broken variable, instead of misbehaving later (an open CORS
 * policy, a reset link pointing nowhere).
 *
 * JWT_SECRET is deliberately optional here. Without it only admin sign-in is
 * unavailable (lib/auth.js answers 503); requiring it would take the public
 * contact form down with it.
 */
// Loaded here rather than in app.js: ES imports run before the importing
// module's body, so this file would otherwise see an empty process.env.
import "dotenv/config";
import { z } from "zod";

const optional = z
  .string()
  .trim()
  .transform((v) => v || undefined)
  .optional();

const url = (name) =>
  optional.refine((v) => v === undefined || URL.canParse(v), `${name} must be an absolute URL`);

// An origin is scheme://host[:port] with no path, and no wildcards at all:
// app.js matches exactly, and any `*.vercel.app` pattern could be satisfied by
// a project in someone else's Vercel account (see the note in app.js).
const ORIGIN_RE = /^https?:\/\/[a-z0-9]([a-z0-9.-]*[a-z0-9])?(:\d{1,5})?$/i;

const originList = z
  .string()
  .transform((raw) =>
    raw
      .split(",")
      .map((o) => o.trim().replace(/\/+$/, ""))
      .filter(Boolean)
  )
  .superRefine((list, ctx) => {
    if (list.length === 0)
      ctx.addIssue({ code: "custom", message: "must list at least one origin" });
    for (const origin of list) {
      if (!ORIGIN_RE.test(origin)) {
        ctx.addIssue({
          code: "custom",
          message: `"${origin}" is not an exact origin (expected e.g. https://axiomra.co; wildcards are not allowed)`,
        });
      }
    }
  });

// Vercel sets NODE_ENV=production for preview and production deployments alike.
const isDeployed = (e) => e.NODE_ENV === "production" || Boolean(e.VERCEL);

const baseSchema = z.object({
  MONGO_URI: z.string().trim().min(1, "MONGO_URI is required"),
  // ALLOWED_ORIGINS is the new name; CLIENT_ORIGIN is still read so existing
  // deployments keep working without an env change.
  ALLOWED_ORIGINS: optional,
  CLIENT_ORIGIN: optional,
  JWT_SECRET: optional.refine(
    (v) => v === undefined || v.length >= 32,
    "JWT_SECRET must be at least 32 characters when set"
  ),
  ADMIN_PANEL_URL: url("ADMIN_PANEL_URL"),
  RESEND_API_KEY: optional,
  MAIL_FROM: optional,
  CONTACT_NOTIFY_TO: optional,
  REDIS_URL: optional.refine(
    (v) => v === undefined || /^rediss?:\/\//.test(v),
    "REDIS_URL must start with redis:// or rediss://"
  ),
  OPENAI_API_KEY: optional,
  // Hard ceiling on the chat assistant's model spend per UTC day, in USD.
  CHAT_DAILY_USD_CAP: optional
    .transform((v) => (v === undefined ? undefined : Number(v)))
    .refine(
      (v) => v === undefined || (Number.isFinite(v) && v > 0),
      "CHAT_DAILY_USD_CAP must be a positive number of US dollars"
    ),
  NODE_ENV: optional,
  VERCEL: optional,
});

// Deployed, the rate limiters (login brute-force above all) must count in one
// shared store. Per-instance memory on serverless resets on every cold start
// and splits across concurrent instances, so there is no silent fallback.
const schema = baseSchema.superRefine((e, ctx) => {
  if (isDeployed(e) && !e.REDIS_URL) {
    ctx.addIssue({
      code: "custom",
      path: ["REDIS_URL"],
      message: "REDIS_URL is required in production (rate limits need a shared store)",
    });
  }
  // Deployed, a silent no-op mailer loses lead notifications and makes password
  // reset impossible, so a missing key fails startup instead.
  if (isDeployed(e) && !e.RESEND_API_KEY) {
    ctx.addIssue({
      code: "custom",
      path: ["RESEND_API_KEY"],
      message: "RESEND_API_KEY is required in production (lead and password-reset email)",
    });
  }
  // A paid model with no spend ceiling is not a configuration to start with.
  if (e.OPENAI_API_KEY && e.CHAT_DAILY_USD_CAP === undefined) {
    ctx.addIssue({
      code: "custom",
      path: ["CHAT_DAILY_USD_CAP"],
      message: "CHAT_DAILY_USD_CAP is required when OPENAI_API_KEY is set",
    });
  }
});

function load() {
  const parsed = schema.safeParse(process.env);
  const issues = parsed.success
    ? []
    : parsed.error.issues.map((i) => `${i.path.join(".") || "env"}: ${i.message}`);

  const rawOrigins =
    process.env.ALLOWED_ORIGINS?.trim() ||
    process.env.CLIENT_ORIGIN?.trim() ||
    "http://localhost:5173";
  const origins = originList.safeParse(rawOrigins);
  if (!origins.success) {
    for (const i of origins.error.issues) issues.push(`ALLOWED_ORIGINS: ${i.message}`);
  }

  if (issues.length) {
    throw new Error(`Invalid environment configuration:\n  - ${issues.join("\n  - ")}`);
  }
  if (!parsed.data.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not set: contact and password-reset email are disabled.");
  }
  return { ...parsed.data, allowedOrigins: origins.data };
}

export const env = load();
