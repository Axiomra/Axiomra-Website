import { Router } from "express";
import User, {
  hashResetToken,
  recoveryKeyProblem,
  KEY_LOCK_MINUTES,
  MAX_KEY_ATTEMPTS,
  RECOVERY_KEY_LENGTH,
  RESET_TOKEN_TTL_MINUTES,
} from "../models/User.js";
import { issueSession, clearSession, requireAuth } from "../lib/auth.js";
import { sendPasswordResetEmail } from "../mailer.js";
import { cleanString } from "../lib/sanitize.js";
import { env } from "../lib/env.js";

const router = Router();

const EMAIL_RE =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,24}$/;

const MIN_PASSWORD = 10;

/**
 * Refuse a reset on an account that has no recovery key on file.
 *
 * Off by default, because turning it on before a key is set locks the only
 * admin out of their own reset flow. Set it once the key is in the database.
 */
const KEY_REQUIRED_ALWAYS = process.env.ADMIN_RECOVERY_KEY_REQUIRED === "true";

function passwordProblem(value) {
  const pw = String(value ?? "");
  if (pw.length < MIN_PASSWORD) return `Password must be at least ${MIN_PASSWORD} characters.`;
  if (pw.length > 200) return "Password is too long.";
  if (!/[a-z]/.test(pw) || !/[A-Z]/.test(pw) || !/\d/.test(pw)) {
    return "Password needs an uppercase letter, a lowercase letter and a number.";
  }
  return "";
}

/** Shape sent to the client. Never includes a hash, a token or an expiry. */
function publicUser(user) {
  return {
    id: String(user._id),
    email: user.email,
    name: user.name || "",
    role: user.role,
    lastLoginAt: user.lastLoginAt,
  };
}

/* POST /api/auth/login */
router.post("/login", async (req, res) => {
  try {
    // cleanString also collapses a non-string body value (an injected object
    // survives key-stripping as `{}`) down to something Mongo treats as text.
    const email = cleanString(req.body?.email, 254).toLowerCase();
    const password = String(req.body?.password ?? "");

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const user = await User.findOne({ email }).select("+passwordHash");
    // One message and one code for "no such account" and "wrong password":
    // distinguishing them turns the login form into an account enumerator.
    const ok = user ? await user.verifyPassword(password) : false;
    if (!ok) {
      return res.status(401).json({ error: "Incorrect email or password." });
    }

    user.lastLoginAt = new Date();
    await user.save();

    const ttl = issueSession(res, user);
    return res.json({ user: publicUser(user), expiresIn: ttl });
  } catch (err) {
    console.error("Login failed:", err.message);
    return res.status(500).json({ error: "Could not sign you in. Please try again." });
  }
});

/* POST /api/auth/logout */
router.post("/logout", (req, res) => {
  clearSession(res);
  res.json({ success: true });
});

/* GET /api/auth/me: the panel's session probe on load. */
router.get("/me", requireAuth, (req, res) => {
  res.json({ user: publicUser(req.user) });
});

/* POST /api/auth/forgot-password */
router.post("/forgot-password", async (req, res) => {
  const email = cleanString(req.body?.email, 254).toLowerCase();

  // Always the same response, whatever happens below. A different answer for a
  // known address would tell an attacker which emails have admin accounts.
  const generic = {
    success: true,
    message: "If that address has an account, a reset link is on its way.",
  };

  try {
    if (!email || !EMAIL_RE.test(email)) return res.json(generic);

    const user = await User.findOne({ email }).select("+resetTokenHash +resetTokenExpires");
    if (!user) return res.json(generic);

    const rawToken = user.issueResetToken();
    await user.save();

    // Fall back to the first allowed origin (the production domain by convention).
    const base = (env.ADMIN_PANEL_URL || env.allowedOrigins[0] || "").replace(/\/+$/, "");
    const link = `${base}/admin/reset-password?token=${rawToken}&email=${encodeURIComponent(email)}`;

    const sent = await sendPasswordResetEmail({
      to: user.email,
      name: user.name,
      link,
      expiresInMinutes: RESET_TOKEN_TTL_MINUTES,
    });

    // A mail outage must not leave a live token sitting on the account with no
    // way for anyone to have received it.
    if (!sent) {
      user.resetTokenHash = null;
      user.resetTokenExpires = null;
      await user.save();
    }

    return res.json(generic);
  } catch (err) {
    console.error("Password reset request failed:", err.message);
    // Still generic: an error here would otherwise confirm the address exists.
    return res.json(generic);
  }
});

/* POST /api/auth/reset-password
   Two factors, both required: the emailed token proves control of the mailbox,
   the recovery key proves the person is the admin who holds it offline. */
router.post("/reset-password", async (req, res) => {
  try {
    const token = cleanString(req.body?.token, 128);
    const password = String(req.body?.password ?? "");
    // Not run through cleanString: it trims and collapses, and the key's own
    // validator has to see the string exactly as it was typed.
    const recoveryKey = String(req.body?.recoveryKey ?? "");

    if (!token) return res.status(400).json({ error: "This reset link is invalid." });

    // Password shape is checked before the key so a mistyped password costs a
    // round trip, not one of the five key attempts.
    const problem = passwordProblem(password);
    if (problem) return res.status(400).json({ error: problem });

    const user = await User.findOne({
      resetTokenHash: hashResetToken(token),
      resetTokenExpires: { $gt: new Date() },
    }).select(
      "+passwordHash +resetTokenHash +resetTokenExpires +recoveryKeyHash +keyAttempts +keyLockedUntil"
    );

    if (!user) {
      return res.status(400).json({ error: "This reset link has expired or already been used." });
    }

    const lockedFor = user.keyLockMinutesLeft();
    if (lockedFor > 0) {
      return res.status(429).json({
        error: `Too many incorrect recovery keys. Try again in ${lockedFor} minute${
          lockedFor === 1 ? "" : "s"
        }, starting from a fresh reset email.`,
      });
    }

    if (user.hasRecoveryKey()) {
      // The shape check is not a security control; it just turns an obvious
      // paste error into a clear message instead of a wasted attempt.
      const keyProblem = recoveryKeyProblem(recoveryKey);
      if (keyProblem) return res.status(400).json({ error: keyProblem });

      if (!(await user.verifyRecoveryKey(recoveryKey))) {
        const left = user.registerKeyFailure();
        await user.save();
        return res.status(401).json({
          error: left
            ? `That recovery key is not correct. ${left} attempt${
                left === 1 ? "" : "s"
              } left before this link is cancelled.`
            : `That recovery key is not correct. This link has been cancelled. Wait ${KEY_LOCK_MINUTES} minutes, then request a new one.`,
          attemptsLeft: left,
        });
      }
    } else if (KEY_REQUIRED_ALWAYS) {
      return res.status(403).json({
        error: "This account has no recovery key on file, so it cannot be reset from the web.",
      });
    } else {
      console.warn(
        `Password reset for ${user.email} ran without a recovery key; none is set on the account.`
      );
    }

    // setPassword clears the token and moves sessionsValidFrom, so the link is
    // single-use and every session opened with the old password is dropped.
    // The recovery key itself is left alone: it is a long-lived offline
    // secret, not a one-time code.
    await user.setPassword(password);
    await user.save();

    // Deliberately not signing them straight in: they should prove the new
    // password works before getting a session.
    clearSession(res);
    return res.json({ success: true, message: "Password updated. You can sign in now." });
  } catch (err) {
    console.error("Password reset failed:", err.message);
    return res.status(500).json({ error: "Could not reset the password. Please try again." });
  }
});

/* GET /api/auth/reset-requirements
   Lets the reset form know whether to ask for a key, without leaking anything:
   the answer is the same for a valid token, an expired one and a forged one
   whenever the account in question has a key, which is the intended state. */
router.get("/reset-requirements", async (req, res) => {
  try {
    const token = cleanString(req.query?.token, 128);
    const fallback = {
      recoveryKeyRequired: true,
      recoveryKeyLength: RECOVERY_KEY_LENGTH,
      maxAttempts: MAX_KEY_ATTEMPTS,
    };
    if (!token) return res.json(fallback);

    const user = await User.findOne({
      resetTokenHash: hashResetToken(token),
      resetTokenExpires: { $gt: new Date() },
    }).select("+recoveryKeyHash");

    return res.json({
      ...fallback,
      recoveryKeyRequired: user ? user.hasRecoveryKey() || KEY_REQUIRED_ALWAYS : true,
    });
  } catch (err) {
    console.error("Reset requirements lookup failed:", err.message);
    return res.json({
      recoveryKeyRequired: true,
      recoveryKeyLength: RECOVERY_KEY_LENGTH,
      maxAttempts: MAX_KEY_ATTEMPTS,
    });
  }
});

/* POST /api/auth/change-password: for a signed-in admin. */
router.post("/change-password", requireAuth, async (req, res) => {
  try {
    const current = String(req.body?.currentPassword ?? "");
    const next = String(req.body?.newPassword ?? "");

    const problem = passwordProblem(next);
    if (problem) return res.status(400).json({ error: problem });

    const user = await User.findById(req.user._id).select("+passwordHash");
    if (!user || !(await user.verifyPassword(current))) {
      return res.status(401).json({ error: "Your current password is incorrect." });
    }

    await user.setPassword(next);
    await user.save();

    // sessionsValidFrom just moved past this request's own token, so re-issue
    // rather than logging the person out of the tab they are working in.
    issueSession(res, user);
    return res.json({ success: true });
  } catch (err) {
    console.error("Password change failed:", err.message);
    return res.status(500).json({ error: "Could not change the password." });
  }
});

export default router;
