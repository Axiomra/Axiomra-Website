/**
 * Create or repair the admin account for the lead panel. Run by hand:
 *
 *   node scripts/seed-admin.js
 *   node scripts/seed-admin.js --name "Michael"
 *
 * There is exactly one admin (models/User.js#adminEmail); this script cannot
 * create a second one. Resetting the existing account's password asks for the
 * recovery key (PASS_KEY) first, the same as every other password change.
 *
 * The password is read from a hidden stdin prompt, hashed with bcrypt, and
 * only the hash is written. It is never taken from argv (visible in `ps` and
 * in shell history), never from an env var, and never logged. Nothing in this
 * file contains a password, which is why it is safe to commit.
 *
 * Re-running against an existing account resets that account's password and
 * signs out every open session.
 */
import dotenv from "dotenv";
import mongoose from "mongoose";
import readline from "readline";
import { connectDB } from "../db.js";
import User, { adminEmail } from "../models/User.js";

dotenv.config();
dotenv.config({ path: ".env.local", override: true });

const MIN_PASSWORD = 10;

function arg(flag, fallback) {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

/** Prompt with the terminal echo switched off, so the password never renders. */
function askHidden(question) {
  return new Promise((resolve, reject) => {
    if (!process.stdin.isTTY) {
      reject(new Error("Run this from an interactive terminal; it prompts for a password."));
      return;
    }

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    // Swallow every echoed character rather than printing it or a placeholder:
    // a shoulder-surfer should not even learn the password's length. The
    // prompt itself is written before muting, so the question still shows.
    rl.stdoutMuted = false;
    rl._writeToOutput = function _writeToOutput(str) {
      if (!rl.stdoutMuted) rl.output.write(str);
    };

    rl.question(question, (answer) => {
      rl.stdoutMuted = false;
      rl.output.write("\n");
      rl.close();
      resolve(answer);
    });
    rl.stdoutMuted = true;
  });
}

function passwordProblem(pw) {
  if (pw.length < MIN_PASSWORD) return `Password must be at least ${MIN_PASSWORD} characters.`;
  if (pw.length > 200) return "Password is too long.";
  if (!/[a-z]/.test(pw) || !/[A-Z]/.test(pw) || !/\d/.test(pw)) {
    return "Password needs an uppercase letter, a lowercase letter and a number.";
  }
  return "";
}

async function main() {
  const email = adminEmail();
  if (process.argv.includes("--email")) {
    throw new Error(`There is only one admin (${email}); --email is not supported.`);
  }
  const name = arg("--name", "Michael");

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not set. Add it to server/.env before seeding.");
  }
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    console.warn(
      "\n  Warning: JWT_SECRET is missing or under 32 characters. Sign-in will refuse to work until it is set.\n" +
        "  Generate one with:  node -e \"console.log(require('crypto').randomBytes(48).toString('base64url'))\"\n"
    );
  }

  await connectDB();

  const existing = await User.findOne({ email }).select(
    "+recoveryKeyHash +keyAttempts +keyLockedUntil"
  );
  if (!existing && (await User.exists({}))) {
    throw new Error("Another admin account exists. Remove it first; there can only be one.");
  }
  console.log(
    existing
      ? `\n  Account ${email} already exists. This will RESET its password and sign out all sessions.`
      : `\n  Creating admin account for ${email}.`
  );

  if (existing) {
    if (!existing.hasRecoveryKey()) {
      throw new Error("No recovery key on file. Run scripts/set-recovery-key.js first.");
    }
    if (existing.keyLockMinutesLeft() > 0) {
      throw new Error(
        `Too many wrong keys. Try again in ${existing.keyLockMinutesLeft()} minutes.`
      );
    }
    const key = await askHidden("  Recovery key (PASS_KEY): ");
    if (!(await existing.verifyRecoveryKey(key))) {
      existing.registerKeyFailure();
      await existing.save();
      throw new Error("That recovery key is not correct. The password was not changed.");
    }
  }

  const password = await askHidden("  New password: ");
  const problem = passwordProblem(password);
  if (problem) throw new Error(problem);

  const confirm = await askHidden("  Confirm password: ");
  if (confirm !== password) throw new Error("The two passwords do not match.");

  const user = existing || new User({ email, name, role: "admin" });
  if (!existing) user.name = name;
  await user.setPassword(password);
  await user.save();

  console.log(`\n  ${existing ? "Password reset" : "Admin created"}: ${user.email}`);
  console.log("  Sign in at /admin/login\n");
}

main()
  .catch((err) => {
    console.error(`\n  Failed: ${err.message}\n`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close().catch(() => {});
  });
