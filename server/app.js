// First import on purpose: loads .env and validates it before any other
// module reads process.env.
import { env } from "./lib/env.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import contactRoutes from "./routes/contact.js";
import authRoutes from "./routes/auth.js";
import leadRoutes from "./routes/leads.js";
import leadFieldRoutes from "./routes/leadFields.js";
import chatRoutes from "./routes/chat.js";
import { connectDB } from "./db.js";
import { mailerConfigured } from "./mailer.js";
import { mongoSanitize } from "./lib/sanitize.js";
import {
  apiLimiter,
  chatLimiter,
  contactLimiter,
  forgotPasswordEmailLimiter,
  forgotPasswordIpLimiter,
  loginLimiter,
  resetPasswordLimiter,
} from "./lib/rateLimit.js";
import { renderStatusPage, statusPayload } from "./status.js";

const app = express();

// ALLOWED_ORIGINS (or the older CLIENT_ORIGIN) is a comma-separated list, so
// the production domain and preview/custom domains can share one deployment.
// An entry may contain `*` inside one hostname label, which matters for Vercel
// previews: every preview build gets a fresh generated hostname that no fixed
// list can name ahead of time. A bare `*` is rejected by lib/env.js.
const { allowedOrigins } = env;

// `*` matches within one hostname label only, so `https://*.vercel.app` cannot
// be satisfied by an attacker-controlled `https://evil.com/.vercel.app` style
// host. Everything else is escaped literally.
function originMatcher(pattern) {
  const source = pattern
    .split("*")
    .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("[^./]*");
  return new RegExp(`^${source}$`);
}

const originPatterns = allowedOrigins.map(originMatcher);
const isAllowedOrigin = (origin) => originPatterns.some((re) => re.test(origin));

// The admin session is an httpOnly cookie sent cross-origin, so CORS has to
// echo the exact origin and allow credentials, and only for listed origins.
app.use(
  cors({
    credentials: true,
    origin(origin, callback) {
      // Same-origin and server-to-server calls send no Origin header.
      if (!origin) return callback(null, true);
      const ok = isAllowedOrigin(origin);
      // Returning false rather than an Error omits the CORS headers, which is
      // what the browser needs to see. Throwing would surface as a 500 and
      // make a simple misconfiguration look like a server fault.
      return callback(null, ok);
    },
  })
);

// The API serves JSON plus one self-contained status page. crossOriginResourcePolicy
// is relaxed so the status page's own assets load; the CSP below is scoped to
// what that page actually needs.
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        // The status page inlines its style block and its uptime ticker.
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        frameAncestors: ["'none'"],
        objectSrc: ["'none'"],
      },
    },
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false,
  })
);

// Capped well below the 4000/8000-character field limits the schema enforces,
// so an oversized body is rejected before it is parsed rather than after.
app.use(express.json({ limit: "128kb" }));
app.use(cookieParser());
// Runs after the body is parsed and before any route reads it.
app.use(mongoSanitize);

// Vercel terminates TLS at the edge, so the client IP only survives in
// x-forwarded-for. Without this the rate limiter buckets every request
// under the same proxy address.
app.set("trust proxy", 1);

// CSRF. The client and API live on different registrable domains (vercel.app
// is on the Public Suffix List), so the admin cookie has to be SameSite=None
// and the browser attaches it to cross-site requests too. CORS only stops the
// attacker reading the response; a form POST from another site would still
// run. Browsers always send Origin on cross-site unsafe requests, so refusing
// unlisted origins here closes that. Requests without Origin (curl, server to
// server) carry no ambient cookie and are left alone.
const UNSAFE_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);
app.use("/api", (req, res, next) => {
  const origin = req.get("origin");
  if (UNSAFE_METHODS.has(req.method) && origin && !isAllowedOrigin(origin)) {
    return res.status(403).json({ error: "Origin not allowed." });
  }
  next();
});

// Limits live in lib/rateLimit.js, backed by Redis when REDIS_URL is set.
app.use("/api", apiLimiter);
app.use("/api/auth/login", loginLimiter);
app.use("/api/auth/forgot-password", forgotPasswordIpLimiter, forgotPasswordEmailLimiter);
app.use("/api/auth/reset-password", resetPasswordLimiter);
app.post("/api/contact", contactLimiter);
app.post("/api/chat", chatLimiter);

// Landing page for anyone who opens the API host in a browser: a live status
// dashboard instead of a bare 404. `/status.json` deliberately sits outside
// `/api` so the page's polling is not charged against the API rate limit.
app.get("/", (req, res) => {
  res.type("html").send(renderStatusPage());
});

app.get("/status.json", (req, res) => res.json(statusPayload()));

// `mailer` makes a missing GMAIL/APP_PASSWORD visible without submitting a
// real lead and waiting to see whether an email lands.
app.get("/api/health", (req, res) =>
  res.json({ status: "ok", mailer: mailerConfigured() ? "configured" : "disabled" })
);

// Connect lazily: a cold start should not pay for Mongo on /api/health.
async function withDb(req, res, next) {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB connection failed:", err.message);
    res.status(503).json({ error: "Service temporarily unavailable." });
  }
}

app.use("/api/contact", withDb, contactRoutes);
// No database: the chat is stateless and nothing is stored.
app.use("/api/chat", chatRoutes);
app.use("/api/auth", withDb, authRoutes);
app.use("/api/leads", withDb, leadRoutes);
app.use("/api/lead-fields", withDb, leadFieldRoutes);

app.use((req, res) => res.status(404).json({ error: "Not found." }));

// Final safety net. Anything that reaches here is a bug, and its message may
// name a collection, a driver internal or a file path, none of which belongs
// in a client response. Log the real thing, return a flat one.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack || err.message);
  if (res.headersSent) return;
  res.status(500).json({ error: "Something went wrong." });
});

export default app;
