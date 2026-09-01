import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { createHash, randomBytes } from "crypto";

const COST = 12;
// Long enough that an interrupted reset needs a new email, short enough that a
// link sitting in a mailbox is not a standing key to the account.
const RESET_TTL_MS = 30 * 60 * 1000;

/**
 * Admin accounts for the lead panel. There is no public sign-up: accounts are
 * created by scripts/seed-admin.js, run by hand.
 *
 * The plaintext password exists only inside createAdmin/verifyPassword — it is
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

    // Every JWT issued before this instant is rejected. Set on password change
    // so a reset actually kicks out sessions opened with the old password.
    sessionsValidFrom: { type: Date, default: () => new Date() },
    lastLoginAt: { type: Date, default: null },
  },
  { timestamps: true }
);

/** Strip anything sensitive if a document is ever serialised by accident. */
userSchema.set("toJSON", {
  transform(_doc, ret) {
    delete ret.passwordHash;
    delete ret.resetTokenHash;
    delete ret.resetTokenExpires;
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
export const BCRYPT_COST = COST;

export default mongoose.models.User || mongoose.model("User", userSchema);
