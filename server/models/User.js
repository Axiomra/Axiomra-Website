import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { createHash, randomBytes } from "crypto";

const COST = 12;
// Long enough that an interrupted reset needs a new email, short enough that a
// link sitting in a mailbox is not a standing key to the account.
const RESET_TTL_MS = 30 * 60 * 1000;

/* --- Recovery key (PASS_KEY) ---
   A long, high-entropy secret held only by the admin, offline. It is required
   for every password change: the emailed reset, the signed-in change and the
   seed script. Knowing the password alone, or controlling the mailbox alone,
   changes nothing. */
export const RECOVERY_KEY_MIN_LENGTH = 20;
export const RECOVERY_KEY_MAX_LENGTH = 200;
// A wrong key is either a typo or a guess. Five is generous for the first and
// useless for the second, given the key's entropy.
export const MAX_KEY_ATTEMPTS = 5;
const KEY_LOCK_MS = 15 * 60 * 1000;

/**
 * The panel has exactly one admin. Tests point this at their own fixture
 * address; everywhere else it is the fixed account below.
 */
export function adminEmail() {
  return String(process.env.ADMIN_EMAIL || "michael.axiomra@gmail.com")
    .trim()
    .toLowerCase();
}

/**
 * Admin accounts for the lead panel. There is no public sign-up: accounts are
 * created by scripts/seed-admin.js, run by hand.
 *
 * The plaintext password exists only inside createAdmin/verifyPassword; it is
 * never assigned to a document field, so it cannot reach the database, a log
 * line, or a serialised error.
 */
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    name: { type: String, trim: true, default: "", maxlength: 60 },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["admin"], default: "admin" },

    // Only the SHA-256 of the reset token is stored. A database leak therefore
    // yields no usable reset link, the same reason the password is hashed.
    resetTokenHash: { type: String, default: null, select: false },
    resetTokenExpires: { type: Date, default: null, select: false },

    // Same reasoning as the password: only a hash is stored, so a database
    // dump hands an attacker a reset link they still cannot use.
    recoveryKeyHash: { type: String, default: null, select: false },
    recoveryKeySetAt: { type: Date, default: null },

    // Per-account, not per-token: burning the link on too many wrong keys
    // would otherwise just mean requesting a fresh one and guessing again.
    keyAttempts: { type: Number, default: 0, select: false },
    keyLockedUntil: { type: Date, default: null, select: false },

    // Every JWT issued before this instant is rejected. Set on password change
    // so a reset actually kicks out sessions opened with the old password.
    sessionsValidFrom: { type: Date, default: () => new Date() },
    lastLoginAt: { type: Date, default: null },
  },
  { timestamps: true }
);

/**
 * Single-admin rule, enforced at the model so no script or route can get
 * around it: the only account that may exist is adminEmail(), and only once.
 */
userSchema.pre("save", async function enforceSingleAdmin() {
  if (!this.isNew && !this.isModified("email")) return;
  if (this.email !== adminEmail()) {
    throw new Error(`Only ${adminEmail()} may be an admin.`);
  }
  if (this.isNew && (await this.constructor.exists({}))) {
    throw new Error("An admin account already exists. There can only be one.");
  }
});

/** Strip anything sensitive if a document is ever serialised by accident. */
userSchema.set("toJSON", {
  transform(_doc, ret) {
    delete ret.passwordHash;
    delete ret.resetTokenHash;
    delete ret.resetTokenExpires;
    delete ret.recoveryKeyHash;
    delete ret.keyAttempts;
    delete ret.keyLockedUntil;
    return ret;
  },
});

userSchema.methods.verifyPassword = function verifyPassword(plain) {
  if (!this.passwordHash) return false;
  return bcrypt.compare(String(plain), this.passwordHash);
};

/**
 * Replace the password and invalidate every existing session and reset token.
 * Caller is responsible for saving.
 */
userSchema.methods.setPassword = async function setPassword(plain) {
  this.passwordHash = await bcrypt.hash(String(plain), COST);
  this.resetTokenHash = null;
  this.resetTokenExpires = null;
  this.sessionsValidFrom = new Date();
  // A completed reset is proof the key was right, so the counter starts clean.
  this.keyAttempts = 0;
  this.keyLockedUntil = null;
};

/**
 * Why the key is folded through SHA-256 before bcrypt: bcrypt silently ignores
 * everything past the 72nd byte of its input. A key longer than that would have
 * its tail count for nothing. The digest is 44 characters, so
 * every character of the key reaches the hash.
 */
function digestKey(raw) {
  return createHash("sha256").update(String(raw), "utf8").digest("base64");
}

/** Explains why a candidate key is unacceptable, or "" if it is fine. */
export function recoveryKeyProblem(value) {
  const key = String(value ?? "");
  if (!key) return "The recovery key is required.";
  if (key.length < RECOVERY_KEY_MIN_LENGTH) {
    return `The recovery key must be at least ${RECOVERY_KEY_MIN_LENGTH} characters.`;
  }
  if (key.length > RECOVERY_KEY_MAX_LENGTH) return "The recovery key is too long.";
  // Whitespace is rejected rather than trimmed: a key pasted out of an email
  // client often carries a stray newline, and silently "fixing" it would make
  // two different strings both count as the key.
  if (/\s/.test(key)) return "The recovery key cannot contain spaces or line breaks.";
  if (!/[a-z]/.test(key)) return "The recovery key needs a lowercase letter.";
  if (!/[A-Z]/.test(key)) return "The recovery key needs an uppercase letter.";
  if (!/\d/.test(key)) return "The recovery key needs a number.";
  if (!/[^A-Za-z0-9]/.test(key)) return "The recovery key needs a special character.";
  return "";
}

/** Caller is responsible for saving. */
userSchema.methods.setRecoveryKey = async function setRecoveryKey(raw) {
  const problem = recoveryKeyProblem(raw);
  if (problem) throw new Error(problem);
  this.recoveryKeyHash = await bcrypt.hash(digestKey(raw), COST);
  this.recoveryKeySetAt = new Date();
  this.keyAttempts = 0;
  this.keyLockedUntil = null;
};

userSchema.methods.hasRecoveryKey = function hasRecoveryKey() {
  return Boolean(this.recoveryKeyHash);
};

userSchema.methods.verifyRecoveryKey = function verifyRecoveryKey(raw) {
  if (!this.recoveryKeyHash) return false;
  return bcrypt.compare(digestKey(raw), this.recoveryKeyHash);
};

/** Minutes left on a key lockout, or 0 when the account is not locked. */
userSchema.methods.keyLockMinutesLeft = function keyLockMinutesLeft() {
  if (!this.keyLockedUntil) return 0;
  const ms = this.keyLockedUntil.getTime() - Date.now();
  return ms > 0 ? Math.ceil(ms / 60000) : 0;
};

/**
 * Record a wrong key. Returns how many tries are left; at zero the account is
 * locked out of resets for a cooldown. Caller is responsible for saving.
 */
userSchema.methods.registerKeyFailure = function registerKeyFailure() {
  this.keyAttempts = (this.keyAttempts || 0) + 1;
  const left = Math.max(0, MAX_KEY_ATTEMPTS - this.keyAttempts);
  if (left === 0) {
    this.keyLockedUntil = new Date(Date.now() + KEY_LOCK_MS);
    this.keyAttempts = 0;
    // The link dies with the lockout, so a guessing run cannot simply resume
    // against the same token once the cooldown expires.
    this.resetTokenHash = null;
    this.resetTokenExpires = null;
  }
  return left;
};

/**
 * Mint a reset token. Returns the raw token for the email; only its hash is
 * persisted, so this is the one and only moment it is readable.
 */
userSchema.methods.issueResetToken = function issueResetToken() {
  const raw = randomBytes(32).toString("hex");
  this.resetTokenHash = createHash("sha256").update(raw).digest("hex");
  this.resetTokenExpires = new Date(Date.now() + RESET_TTL_MS);
  return raw;
};

export function hashResetToken(raw) {
  return createHash("sha256").update(String(raw)).digest("hex");
}

export const RESET_TOKEN_TTL_MINUTES = RESET_TTL_MS / 60000;
export const KEY_LOCK_MINUTES = KEY_LOCK_MS / 60000;
export const BCRYPT_COST = COST;

export default mongoose.models.User || mongoose.model("User", userSchema);
