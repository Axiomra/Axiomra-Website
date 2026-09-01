import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import contactRoutes from "./routes/contact.js";
import { connectDB } from "./db.js";
import { mailerConfigured } from "./mailer.js";
import { renderStatusPage, statusPayload } from "./status.js";

dotenv.config();

const app = express();

// CLIENT_ORIGIN accepts a comma-separated list so the Vercel production
// domain and any preview/custom domain can share one deployment. An entry may
// contain `*` as a wildcard, which matters for Vercel previews: every preview
// build gets a fresh generated hostname that no fixed list can name ahead of
// time, and a missed one shows up as a CORS failure on the contact form.
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

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

app.use(
  cors({
    origin(origin, callback) {
      // Same-origin and server-to-server calls send no Origin header.
      if (!origin) return callback(null, true);
      const ok =
        allowedOrigins.includes("*") || originPatterns.some((re) => re.test(origin));
      // Returning false rather than an Error omits the CORS headers, which is
      // what the browser needs to see. Throwing would surface as a 500 and
      // make a simple misconfiguration look like a server fault.
      return callback(null, ok);
    },
  })
);
app.use(express.json());

// Vercel terminates TLS at the edge, so the client IP only survives in
// x-forwarded-for. Without this the rate limiter buckets every request
// under the same proxy address.
app.set("trust proxy", 1);
app.use("/api", rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

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
app.use("/api/contact", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB connection failed:", err.message);
    res.status(503).json({ error: "Service temporarily unavailable." });
  }
});
app.use("/api/contact", contactRoutes);

app.use((req, res) => res.status(404).json({ error: "Not found." }));

export default app;
