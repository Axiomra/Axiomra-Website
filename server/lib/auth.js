import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Session handling for the admin panel.
 *
 * The JWT is delivered as an httpOnly cookie, never as a body field the client
 * could store. localStorage is readable by any script that gets injected into
 * the page; an httpOnly cookie is not, so a stored-XSS bug in a lead's remarks
 * field cannot walk away with an admin session.
 *
 * The cost of that choice is cross-site cookies: the panel and the API sit on
 * different origins in production, so the cookie needs SameSite=None; Secure,
 * and CORS has to echo the exact origin with credentials enabled. Both are
 * handled in app.js.
 */

const COOKIE_NAME = "axiomra_admin";
const TOKEN_TTL_SECONDS = 8 * 60 * 60; // One working day, then re-auth.

function secret() {
  const value = process.env.JWT_SECRET;
  // Failing loudly beats falling back to a default: a hardcoded fallback
  // secret would let anyone who has read this file mint a valid admin token.
  if (!value || value.length < 32) {
    throw new Error("JWT_SECRET is missing or shorter than 32 characters.");
  }
  return value;
}

export function authConfigured() {
  const value = process.env.JWT_SECRET;
  return Boolean(value && value.length >= 32);
}

/** True in any deployed environment, where cookies must be Secure. */
function isDeployed() {
  return process.env.NODE_ENV === "production" || Boolean(process.env.VERCEL);
}

function cookieOptions() {
  const deployed = isDeployed();
  return {
    httpOnly: true,
    // SameSite=None requires Secure, and Secure cookies are dropped over plain
    // http, so local development uses Lax, which works because the dev client
    // and dev API are both on localhost.
    sameSite: deployed ? "none" : "lax",
    secure: deployed,
    path: "/",
    maxAge: TOKEN_TTL_SECONDS * 1000,
  };
}

export function issueSession(res, user) {
  const token = jwt.sign(
    { sub: String(user._id), role: user.role },
    secret(),
    { expiresIn: TOKEN_TTL_SECONDS }
  );
  res.cookie(COOKIE_NAME, token, cookieOptions());
  return TOKEN_TTL_SECONDS;
}

export function clearSession(res) {
  res.clearCookie(COOKIE_NAME, { ...cookieOptions(), maxAge: undefined });
}

/**
 * Read the token from the cookie, falling back to a bearer header.
 *
 * The header path exists for scripts and curl, not for the browser app; the
 * panel never receives the token in a readable form, so it cannot send one.
 */
function readToken(req) {
  const fromCookie = req.cookies?.[COOKIE_NAME];
  if (fromCookie) return fromCookie;
  const header = req.get("authorization") || "";
  return header.startsWith("Bearer ") ? header.slice(7) : "";
}

/**
 * Gate for every admin route. Verifies signature and expiry, then reloads the
 * user. A token alone is not enough, because the account may have been
 * deleted or had its password reset since the token was minted.
 */
export async function requireAuth(req, res, next) {
  if (!authConfigured()) {
    return res.status(503).json({ error: "Admin authentication is not configured." });
  }

  const token = readToken(req);
  if (!token) return res.status(401).json({ error: "Not signed in." });

  let payload;
  try {
    payload = jwt.verify(token, secret());
  } catch {
    // Signature failures and expiry are the same answer to the client: the
    // distinction only helps someone probing for a forgery that nearly worked.
    clearSession(res);
    return res.status(401).json({ error: "Session expired. Please sign in again." });
  }

  try {
    const user = await User.findById(payload.sub);
    if (!user) {
      clearSession(res);
      return res.status(401).json({ error: "Session expired. Please sign in again." });
    }

    // A password change moves sessionsValidFrom forward, retiring every token
    // issued before it. iat is in seconds, so compare at second resolution.
    const issuedAt = (payload.iat || 0) * 1000;
    if (user.sessionsValidFrom && issuedAt < user.sessionsValidFrom.getTime() - 1000) {
      clearSession(res);
      return res.status(401).json({ error: "Session expired. Please sign in again." });
    }

    req.user = user;
    return next();
  } catch (err) {
    console.error("Auth lookup failed:", err.message);
    return res.status(503).json({ error: "Service temporarily unavailable." });
  }
}

export const SESSION_COOKIE = COOKIE_NAME;
