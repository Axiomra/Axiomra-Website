import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Eye, EyeOff, KeyRound, Loader2, Lock, ShieldCheck } from "lucide-react";
import AdminBackdrop from "../../components/admin/AdminBackdrop";
import FieldError from "../../components/FieldError";
import { adminAuth } from "../../lib/adminApi";
import Seo from "../../seo/Seo";

const MIN_LENGTH = 10;
const KEY_MIN_LENGTH = 20;

/** Mirrors models/User.js#recoveryKeyProblem, so a bad paste is caught here. */
function keyProblem(key) {
  if (!key) return "Enter your recovery key.";
  if (key.length < KEY_MIN_LENGTH) {
    return `The recovery key is at least ${KEY_MIN_LENGTH} characters; you have entered ${key.length}.`;
  }
  if (/\s/.test(key)) return "The recovery key cannot contain spaces or line breaks.";
  if (!/[a-z]/.test(key) || !/[A-Z]/.test(key) || !/\d/.test(key) || !/[^A-Za-z0-9]/.test(key)) {
    return "That does not look like a recovery key. It mixes letters, numbers and symbols.";
  }
  return "";
}

/** Mirrors the server's rule exactly, so the form never accepts what the API will reject. */
const RULES = [
  { label: `At least ${MIN_LENGTH} characters`, test: (p) => p.length >= MIN_LENGTH },
  { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p) => /[a-z]/.test(p) },
  { label: "One number", test: (p) => /\d/.test(p) },
];

const inputClass =
  "w-full rounded-xl border border-line bg-surface py-3 pl-11 pr-11 text-base text-content outline-none transition-colors placeholder:text-content-faint/70 focus:border-accent focus:ring-4 focus:ring-accent/12";

export default function AdminResetPasswordPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [recoveryKey, setRecoveryKey] = useState("");
  const [show, setShow] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  // Assume the key is needed until the server says otherwise: rendering the
  // field and removing it is a worse flicker than the reverse.
  const [keyRequired, setKeyRequired] = useState(true);

  useEffect(() => {
    if (!token) return undefined;
    const ac = new AbortController();
    adminAuth
      .resetRequirements(token, ac.signal)
      .then((data) => setKeyRequired(data?.recoveryKeyRequired !== false))
      // A failed probe leaves the field in place; the server is the one that
      // actually enforces this, so guessing wrong here costs nothing.
      .catch(() => {});
    return () => ac.abort();
  }, [token]);

  const checks = useMemo(() => RULES.map((r) => ({ ...r, ok: r.test(password) })), [password]);
  const allMet = checks.every((c) => c.ok);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!allMet) {
      setError("Your password does not meet all the requirements yet.");
      return;
    }
    if (password !== confirm) {
      setError("The two passwords do not match.");
      return;
    }
    if (keyRequired) {
      const problem = keyProblem(recoveryKey);
      if (problem) {
        setError(problem);
        return;
      }
    }

    setBusy(true);
    try {
      await adminAuth.resetPassword(token, password, recoveryKey);
      setDone(true);
      // The server deliberately does not sign them in, so send them to the
      // login form to prove the new password works.
      setTimeout(() => navigate("/admin/login", { replace: true }), 2200);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative grid min-h-[100svh] place-items-center overflow-hidden bg-surface px-4 py-12">
      <Seo title="Set a new password · Axiomra Lead Management" noindex />
      <AdminBackdrop />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="rounded-2xl border border-line bg-surface-card/90 p-6 shadow-[0_30px_80px_-40px_rgba(10,20,40,0.5)] backdrop-blur-xl sm:p-7">
          {!token ? (
            <div className="text-center">
              <h1 className="font-display text-xl font-semibold text-content">
                This link is incomplete
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-content-dim">
                The reset link is missing its token. Request a fresh one and open it directly from
                the email.
              </p>
              <Link
                to="/admin/forgot-password"
                className="focus-ring mt-6 inline-block rounded-lg text-sm font-medium text-accent underline-offset-2 hover:underline"
              >
                Request a new link
              </Link>
            </div>
          ) : done ? (
            <div className="text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-success/12 text-success">
                <ShieldCheck size={22} aria-hidden="true" />
              </span>
              <h1 className="mt-4 font-display text-xl font-semibold text-content">
                Password updated
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-content-dim">
                Every other session has been signed out. Taking you to the sign-in page…
              </p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h1 className="font-display text-xl font-semibold text-content">
                Set a new password
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-content-dim">
                Choose something you do not use anywhere else.
              </p>

              <div className="mt-5">
                <label
                  htmlFor="reset-password"
                  className="mb-1.5 block text-sm font-medium text-content-dim"
                >
                  New password
                </label>
                <div className="relative">
                  <Lock
                    size={17}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-content-faint"
                  />
                  <input
                    id="reset-password"
                    type={show ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    aria-label={show ? "Hide password" : "Show password"}
                    className="focus-ring absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-content-faint transition-colors hover:bg-surface-inset hover:text-content"
                  >
                    {show ? (
                      <EyeOff size={16} aria-hidden="true" />
                    ) : (
                      <Eye size={16} aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                {checks.map((c) => (
                  <li
                    key={c.label}
                    className={`flex items-center gap-1.5 text-xs transition-colors ${
                      c.ok ? "text-success" : "text-content-faint"
                    }`}
                  >
                    <Check
                      size={13}
                      aria-hidden="true"
                      className={c.ok ? "opacity-100" : "opacity-30"}
                    />
                    {c.label}
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                <label
                  htmlFor="reset-confirm"
                  className="mb-1.5 block text-sm font-medium text-content-dim"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <Lock
                    size={17}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-content-faint"
                  />
                  <input
                    id="reset-confirm"
                    type={show ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              {keyRequired && (
                <div className="mt-5 rounded-xl border border-line bg-surface-inset/60 p-4">
                  <label
                    htmlFor="reset-key"
                    className="mb-1.5 flex items-center gap-2 text-sm font-medium text-content"
                  >
                    <KeyRound size={15} aria-hidden="true" className="text-accent" />
                    Admin recovery key
                  </label>
                  <p className="mb-3 text-xs leading-relaxed text-content-dim">
                    The email alone cannot change this password. Paste the recovery key (PASS_KEY)
                    held by the admin.
                  </p>
                  <div className="relative">
                    <textarea
                      id="reset-key"
                      rows={3}
                      spellCheck={false}
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      value={recoveryKey}
                      // Pasting out of a mail client drags in newlines; they are
                      // stripped rather than rejected because the key itself can
                      // never contain one.
                      onChange={(e) => setRecoveryKey(e.target.value.replace(/\s+/g, ""))}
                      className={`w-full resize-none rounded-xl border border-line bg-surface p-3 pr-11 font-mono text-xs leading-relaxed text-content outline-none transition-colors placeholder:text-content-faint/70 focus:border-accent focus:ring-4 focus:ring-accent/12 ${
                        showKey ? "" : "[-webkit-text-security:disc] [text-security:disc]"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey((v) => !v)}
                      aria-label={showKey ? "Hide recovery key" : "Show recovery key"}
                      className="focus-ring absolute right-2.5 top-2.5 rounded-lg p-1.5 text-content-faint transition-colors hover:bg-surface-inset hover:text-content"
                    >
                      {showKey ? (
                        <EyeOff size={16} aria-hidden="true" />
                      ) : (
                        <Eye size={16} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                  <p
                    className={`mt-2 text-xs tabular-nums ${
                      recoveryKey.length >= KEY_MIN_LENGTH ? "text-success" : "text-content-faint"
                    }`}
                  >
                    {recoveryKey.length} characters
                  </p>
                </div>
              )}

              <FieldError id="reset-error" message={error} />

              <button
                type="submit"
                disabled={busy}
                className="focus-ring mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-grad-sky py-3 text-sm font-semibold text-[#0A1428] transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {busy && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
                {busy ? "Updating…" : "Update password"}
              </button>

              <div className="mt-4 text-center">
                <Link
                  to="/admin/login"
                  className="focus-ring inline-flex items-center gap-1.5 rounded text-sm text-content-dim underline-offset-2 transition-colors hover:text-accent hover:underline"
                >
                  <ArrowLeft size={14} aria-hidden="true" />
                  Back to sign in
                </Link>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
