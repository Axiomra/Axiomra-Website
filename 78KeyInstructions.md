# Admin Recovery Key (78 characters)

The second factor on an admin password reset.

A reset link proves someone controls the admin mailbox. That is not enough to
change the password. They also have to enter a 78-character recovery key that
exists only offline, held by the main admin. Mailbox compromise alone no longer
takes the panel.

---

## 1. What the key is

| | |
|---|---|
| Length | Exactly **78** characters |
| Must contain | one lowercase, one uppercase, one digit, one special character |
| Not allowed | spaces, tabs, line breaks, non-ASCII characters |
| Stored as | bcrypt hash of the key's SHA-256 digest — **never** plaintext |
| Rotates | No. It survives password resets; you replace it deliberately. |
| Scope | Per account (`User.recoveryKeyHash`) |

### Why it is hashed and not stored as text

Storing the key in plaintext would defeat the whole feature: one database dump
and the attacker holds both factors. Only a hash is written, so a leaked
database still yields nothing usable.

**Consequence: you cannot paste the key into MongoDB Atlas by hand.** It has to
go in through the script below, which does the hashing.

### Why SHA-256 before bcrypt

bcrypt silently ignores everything past the 72nd byte of its input. Hashing a
78-character key directly would make the last six characters count for nothing.
The key is folded through SHA-256 first (44 characters of base64), so every
character reaches the hash. See `digestKey()` in `server/models/User.js`.

---

## 2. Setting the key

Run from the `server/` directory, on an interactive terminal, with `MONGO_URI`
set in `server/.env`.

```bash
cd server

# Generate a compliant key and store its hash. Prints the key ONCE.
node scripts/set-recovery-key.js --generate

# Or type/paste your own key (hidden prompt, asked twice).
node scripts/set-recovery-key.js

# A different account:
node scripts/set-recovery-key.js --email someone@axiomra.com --generate

# Remove the key — resets on this account stop asking for one.
node scripts/set-recovery-key.js --email someone@axiomra.com --clear
```

Defaults to `michael.axiomra@gmail.com`. Re-running **replaces** the existing
key; the old one stops working immediately.

### Right after generating

1. Copy the key into a password manager (1Password, Bitwarden, KeePass).
2. Keep one offline backup — printed, in a safe. Not in email, not in Slack,
   not in the repo.
3. Clear the terminal so it is not in scrollback or history:
   ```bash
   history -c && clear
   ```

The key is never printed again and cannot be recovered from the database.

---

## 3. Making it mandatory everywhere

In `server/.env`:

```env
ADMIN_RECOVERY_KEY_REQUIRED=true
```

With this on, an account that has **no** key on file cannot be reset from the
web at all (HTTP 403). Without it, such an account resets the old way and the
server logs a warning.

> **Turn this on only after the key is set.** Enabling it first locks the only
> admin out of their own reset flow.

---

## 4. The rules the server enforces

`POST /api/auth/reset-password` — see `server/routes/auth.js`.

1. **Token first.** Missing, expired or already-used token → rejected before
   anything else is read.
2. **Password shape before key.** A mistyped password costs a round trip, not
   one of the five key attempts.
3. **Key required when the account has one.** No key, wrong key, wrong length →
   no password change.
4. **Five attempts.** Each wrong key increments a counter and reports how many
   tries are left.
5. **On the fifth failure** the account is locked out of resets for **15
   minutes** and the reset link is cancelled. A new email is needed afterwards.
6. **The counter lives on the account, not the token.** Otherwise an attacker
   requests a fresh link and resumes guessing from five.
7. **A successful reset clears the counter** and leaves the key untouched.
8. **Sessions die.** `setPassword` moves `sessionsValidFrom`, so every session
   opened with the old password is signed out, and the link is single-use.
9. **No auto sign-in.** The admin proves the new password on the login form.

`GET /api/auth/reset-requirements?token=…` tells the form whether to show the
key field. It answers "required" for an unknown or expired token too, so it
cannot be used to probe which accounts have a key.

---

## 5. What the admin sees

1. `/admin/forgot-password` → enters the email.
2. Email arrives with the link and a line stating the key will also be needed.
3. `/admin/reset-password?token=…` shows: new password, confirm password, and
   the **Admin recovery key** box (masked, with a live `n / 78` counter; an
   eye toggle reveals it, whitespace is stripped from pastes).
4. Wrong key → `That recovery key is not correct. 4 attempts left before this
   link is cancelled.`
5. Correct key → password updated, every session signed out, redirect to login.

---

## 6. Break-glass — the key is lost

There is no web path back. This is the deliberate cost of the feature.

The only recovery is database access:

```bash
cd server
node scripts/seed-admin.js --email michael.axiomra@gmail.com
# resets the password and signs out every session

node scripts/set-recovery-key.js --generate
# issue a fresh key
```

Whoever can run these two commands can take the account. Keep `MONGO_URI` and
server shell access as tightly held as the key itself.

---

## 7. Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| "must be exactly 78 characters" | Truncated paste, or a trailing character | Re-copy from the password manager; the counter under the box shows the real length |
| "cannot contain spaces or line breaks" | Key was wrapped across lines in an email | Paste again — the form strips whitespace, the script does not |
| "Too many incorrect recovery keys" | Five failures | Wait 15 minutes, then request a **new** reset email |
| "This account has no recovery key on file" | `ADMIN_RECOVERY_KEY_REQUIRED=true` with no key set | Run `set-recovery-key.js`, or unset the flag |
| Key field never appears | `/reset-requirements` was blocked by CORS | Check `CLIENT_ORIGIN`; the field defaults to visible, so this is cosmetic — the server still enforces the key |
| Reset works without asking for a key | No key is set on that account | Run `set-recovery-key.js` |

---

## 8. Files

| File | Role |
|---|---|
| `server/models/User.js` | Fields, `recoveryKeyProblem()`, `setRecoveryKey()`, `verifyRecoveryKey()`, lockout helpers |
| `server/routes/auth.js` | The reset gate and `/reset-requirements` |
| `server/scripts/set-recovery-key.js` | Generate / set / clear the key |
| `server/scripts/seed-admin.js` | Break-glass password reset |
| `server/mailer.js` | Reset email mentions the key |
| `client/src/pages/admin/AdminResetPasswordPage.jsx` | The key field |
| `client/src/lib/adminApi.js` | `resetPassword(token, password, recoveryKey)` |

---

## 9. Operating rules

- One key, one holder. Sharing it across the team turns it back into a password.
- Never send it over email, chat or a ticket. Password manager or paper only.
- Replace it if it is ever typed into the wrong window, pasted into a chat, or
  shown on a shared screen: `set-recovery-key.js --generate`.
- Do not commit it. Nothing in this repo contains a key, and nothing should.
