/**
 * Set the admin recovery key: the second factor on a password reset.
 *
 *   node scripts/set-recovery-key.js --generate
 *   node scripts/set-recovery-key.js                      (paste your own)
 *   node scripts/set-recovery-key.js --email a@b.com --clear
 *
 * The key is 78 characters of mixed case, digits and symbols. Only its hash is
 * written, so this run is the one and only moment the key is readable, so copy it
 * into a password manager before closing the terminal. Losing it means the
 * emailed reset link stops working and the password can only be changed by
 * re-running seed-admin.js from a machine with database access.
 *
 * The key is never taken from argv: argv is visible in `ps` and lands in shell
 * history. Nothing in this file contains a key, which is why it is committable.
 */
import dotenv from "dotenv";
import mongoose from "mongoose";
import readline from "readline";
import { randomInt } from "crypto";
import { connectDB } from "../db.js";
import User, { RECOVERY_KEY_LENGTH, recoveryKeyProblem } from "../models/User.js";

dotenv.config();
dotenv.config({ path: ".env.local", override: true });

const DEFAULT_EMAIL = "michael.axiomra@gmail.com";

const LOWER = "abcdefghijkmnopqrstuvwxyz";
const UPPER = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const DIGIT = "23456789";
// Quotes, backslash, backtick and angle brackets are left out: the key is
// pasted through terminals, JSON bodies and mail clients, and those are the
// characters that get escaped, swallowed or mistaken for markup on the way.
// The validator still accepts them, so a hand-written key may use anything.
const SYMBOL = "!#$%&()*+,-./:;=?@[]^_{|}~";
const ALPHABET = LOWER + UPPER + DIGIT + SYMBOL;

function has(flag) {
  return process.argv.includes(flag);
}

function arg(flag, fallback) {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

/**
 * randomInt, not Math.random: this string is the whole second factor, and
 * Math.random is a predictable PRNG that has no business generating secrets.
 */
function pick(pool) {
  return pool[randomInt(pool.length)];
}

function generateKey() {
  // Seeded with one of each class so the result always satisfies the validator,
  // then shuffled so those four are not pinned to the first four positions.
  const chars = [pick(LOWER), pick(UPPER), pick(DIGIT), pick(SYMBOL)];
  while (chars.length < RECOVERY_KEY_LENGTH) chars.push(pick(ALPHABET));
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}

/** Prompt with the terminal echo switched off, so the key never renders. */
function askHidden(question) {
  return new Promise((resolve, reject) => {
    if (!process.stdin.isTTY) {
      reject(new Error("Run this from an interactive terminal; it prompts for the key."));
      return;
    }

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
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

async function main() {
  const email = String(arg("--email", DEFAULT_EMAIL)).trim().toLowerCase();

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not set. Add it to server/.env first.");
  }

  await connectDB();

  const user = await User.findOne({ email }).select("+recoveryKeyHash +keyAttempts +keyLockedUntil");
  if (!user) throw new Error(`No account found for ${email}. Run seed-admin.js first.`);

  if (has("--clear")) {
    user.recoveryKeyHash = null;
    user.recoveryKeySetAt = null;
    user.keyAttempts = 0;
    user.keyLockedUntil = null;
    await user.save();
    console.log(`\n  Recovery key removed from ${user.email}.`);
    console.log("  Password resets on this account no longer ask for a key.\n");
    return;
  }

  console.log(
    user.recoveryKeyHash
      ? `\n  ${email} already has a recovery key. This REPLACES it. The old one stops working.`
      : `\n  Setting the recovery key for ${email}.`
  );

  let key;
  if (has("--generate")) {
    key = generateKey();
  } else {
    key = await askHidden(`  Recovery key (${RECOVERY_KEY_LENGTH} chars): `);
    const confirm = await askHidden("  Confirm recovery key: ");
    if (confirm !== key) throw new Error("The two keys do not match.");
  }

  const problem = recoveryKeyProblem(key);
  if (problem) throw new Error(problem);

  await user.setRecoveryKey(key);
  await user.save();

  if (has("--generate")) {
    console.log("\n  Your recovery key, shown once and never recoverable:\n");
    console.log(`    ${key}\n`);
    console.log("  Store it in a password manager now, then clear this terminal.");
    console.log("  On Linux/macOS:  history -c && clear\n");
  } else {
    console.log(`\n  Recovery key saved for ${user.email}.\n`);
  }

  console.log("  It is now required on every password reset for this account.");
  console.log("  Set ADMIN_RECOVERY_KEY_REQUIRED=true to also block resets on");
  console.log("  any account that has no key at all.\n");
}

main()
  .catch((err) => {
    console.error(`\n  Failed: ${err.message}\n`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close().catch(() => {});
  });
