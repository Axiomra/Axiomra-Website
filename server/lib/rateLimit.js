/**
 * Rate limiters backed by a shared store.
 *
 * On Vercel every function instance has its own memory, so an in-memory
 * counter resets on each cold start and is split across concurrent instances;
 * a login limit of 5 becomes 5 per instance. With REDIS_URL set (Upstash or any
 * Redis) all instances count against the same keys. lib/env.js refuses to start
 * a deployed instance without REDIS_URL, so the in-memory store below is only
 * ever used in local development and tests.
 */
import { rateLimit, ipKeyGenerator } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import { Redis } from "ioredis";
import { env } from "./env.js";

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;

// One connection per function instance, reused across warm invocations (same
// pattern as the Mongo connection in db.js).
function redisClient() {
  if (!env.REDIS_URL) return null;
  if (!globalThis.__axiomraRedis) {
    const client = new Redis(env.REDIS_URL, {
      // Fail fast: a request should not hang for a limiter.
      connectTimeout: 2000,
      maxRetriesPerRequest: 1,
    });
    // Without a listener ioredis reports every reconnect attempt as an
    // unhandled error event.
    client.on("error", (err) => console.error("Redis (rate limit):", err.message));
    globalThis.__axiomraRedis = client;
  }
  return globalThis.__axiomraRedis;
}

export const redis = redisClient();

// Each limiter needs its own store instance and key prefix.
function store(name) {
  if (!redis) return undefined; // express-rate-limit's MemoryStore
  return new RedisStore({
    prefix: `rl:${name}:`,
    sendCommand: (command, ...args) => redis.call(command, ...args),
  });
}

const byIp = (req) => ipKeyGenerator(req.ip);

const STORE_DOWN = { error: "Service temporarily unavailable. Please try again shortly." };

function limiter(name, { windowMs, limit, message, failOpen, ...rest }) {
  const middleware = rateLimit({
    windowMs,
    limit,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    keyGenerator: byIp,
    store: store(name),
    message: { error: message },
    // Store outage: the general API and contact form stay up, while
    // credential endpoints and the paid chat refuse rather than go unlimited.
    passOnStoreError: failOpen,
    ...rest,
  });
  if (failOpen) return middleware;

  // Fail closed with an explicit 503. express-rate-limit hands a store error
  // to next(err), which would otherwise surface as a generic 500.
  return (req, res, next) =>
    middleware(req, res, (err) => {
      if (!err) return next();
      console.error(`Rate limit store unavailable (${name}):`, err.message);
      return res.status(503).json(STORE_DOWN);
    });
}

export const apiLimiter = limiter("api", {
  windowMs: 15 * MINUTE,
  limit: 100,
  message: "Too many requests. Please try again later.",
  failOpen: true,
});

// Successful sign-ins are not counted, so a working admin never locks
// themselves out by reloading the panel.
export const loginLimiter = limiter("login", {
  windowMs: 15 * MINUTE,
  limit: 5,
  skipSuccessfulRequests: true,
  message: "Too many attempts. Please wait 15 minutes and try again.",
  failOpen: false,
});

export const resetPasswordLimiter = limiter("reset", {
  windowMs: 15 * MINUTE,
  limit: 8,
  skipSuccessfulRequests: true,
  message: "Too many attempts. Please wait 15 minutes and try again.",
  failOpen: false,
});

// forgot-password answers 200 whether or not the address exists (so it cannot
// be used to enumerate accounts), which means every request "succeeds": it
// must never use skipSuccessfulRequests. Two buckets: per IP, and per target
// address so one inbox cannot be flooded from many IPs.
const FORGOT_MESSAGE = "Too many reset requests. Please try again in an hour.";

export const forgotPasswordIpLimiter = limiter("forgot-ip", {
  windowMs: HOUR,
  limit: 10,
  message: FORGOT_MESSAGE,
  failOpen: false,
});

export const forgotPasswordEmailLimiter = limiter("forgot-email", {
  windowMs: HOUR,
  limit: 3,
  message: FORGOT_MESSAGE,
  failOpen: false,
  keyGenerator: (req) =>
    String(req.body?.email ?? "")
      .trim()
      .toLowerCase()
      .slice(0, 254),
  // No address means the route rejects the request anyway; the IP bucket
  // still counts it.
  skip: (req) => !String(req.body?.email ?? "").trim(),
});

export const contactLimiter = limiter("contact", {
  windowMs: HOUR,
  limit: 5,
  message: "Too many messages from this network. Please try again later or email us directly.",
  failOpen: true,
});

// Every chat turn is a paid model call, so it gets its own, tighter bucket on
// top of the general API limit, and fails closed: an unmetered chat during a
// store outage is an open tap on the OpenAI bill.
export const chatLimiter = limiter("chat", {
  windowMs: 15 * MINUTE,
  limit: 30,
  message: "You're sending messages quickly. Please wait a few minutes and try again.",
  failOpen: false,
});
