import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Mail, MailCheck } from "lucide-react";
import AdminBackdrop from "../../components/admin/AdminBackdrop";
import FieldError from "../../components/FieldError";
import { adminAuth } from "../../lib/adminApi";
import { validateEmail } from "../../lib/validation";

/**
 * Step one of the reset flow.
 *
 * The confirmation is deliberately the same whether or not the address has an
 * account — the server answers identically, and a page that said "no such
 * account" would hand an attacker a list of which staff emails are admins.
 */
export default function AdminForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = "Reset password · Axiomra Lead Management";
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const invalid = validateEmail(email);
    if (invalid) {
      setError(invalid);
      return;
    }

    setError("");
    setBusy(true);
    try {
      await adminAuth.forgotPassword(email.trim());
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative grid min-h-[100svh] place-items-center overflow-hidden bg-surface px-4 py-12">
      <AdminBackdrop />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="rounded-2xl border border-line bg-surface-card/90 p-6 shadow-[0_30px_80px_-40px_rgba(10,20,40,0.5)] backdrop-blur-xl sm:p-7">
          {sent ? (
            <div className="text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent/12 text-accent">
                <MailCheck size={22} aria-hidden="true" />
              </span>
              <h1 className="mt-4 font-display text-xl font-semibold text-content">Check your inbox</h1>
              <p className="mt-2 text-sm leading-relaxed text-content-dim">
                If that address has an account, a reset link is on its way. It expires in 30 minutes
                and can only be used once.
              </p>
              <Link
                to="/admin/login"
                className="focus-ring mt-6 inline-flex items-center gap-1.5 rounded-lg text-sm font-medium text-accent underline-offset-2 hover:underline"
              >
                <ArrowLeft size={15} aria-hidden="true" />
                Back to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h1 className="font-display text-xl font-semibold text-content">Reset your password</h1>
              <p className="mt-2 text-sm leading-relaxed text-content-dim">
                Enter the email on your admin account and we will send you a link to set a new
                password.
              </p>

              <div className="mt-5">
                <label
                  htmlFor="forgot-email"
                  className="mb-1.5 block text-sm font-medium text-content-dim"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={17}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-content-faint"
                  />
                  <input
                    id="forgot-email"
                    type="email"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={Boolean(error)}
                    className="w-full rounded-xl border border-line bg-surface py-3 pl-11 pr-3 text-base text-content outline-none transition-colors placeholder:text-content-faint/70 focus:border-accent focus:ring-4 focus:ring-accent/12"
                    placeholder="you@axiomra.com"
                  />
                </div>
                <FieldError id="forgot-error" message={error} />
              </div>

              <button
                type="submit"
                disabled={busy}
                className="focus-ring mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-cta-gradient py-3 text-sm font-semibold text-[#0A1428] transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {busy && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
                {busy ? "Sending…" : "Send reset link"}
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
