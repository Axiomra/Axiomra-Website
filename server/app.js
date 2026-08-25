import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import contactRoutes from "./routes/contact.js";
import { connectDB } from "./db.js";

dotenv.config();

const app = express();

// CLIENT_ORIGIN accepts a comma-separated list so the Vercel production
// domain and any preview/custom domain can share one deployment.
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Same-origin and server-to-server calls send no Origin header.
      if (!origin) return callback(null, true);
      const ok = allowedOrigins.includes("*") || allowedOrigins.includes(origin);
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

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

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
