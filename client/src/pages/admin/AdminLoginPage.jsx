import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import AdminBackdrop from "../../components/admin/AdminBackdrop";
import FieldError from "../../components/FieldError";
import useAdminAuth from "../../admin/useAdminAuth";
import Seo from "../../seo/Seo";

const inputClass =
  "w-full rounded-xl border border-line bg-surface py-3 pl-11 pr-3 text-base text-content outline-none transition-colors placeholder:text-content-faint/70 focus:border-accent focus:ring-4 focus:ring-accent/12";

export default function AdminLoginPage() {
  const { user, signIn } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // Already signed in, so skip the form rather than making them sign in twice.
  // The return path comes from history state, never the URL: react-router 6
  // has an open-redirect advisory we have deferred on that basis. Read
  // SECURITY-DEFERRED.md before making it URL-driven (?next= etc.).
  if (user) return <Navigate to={location.state?.from || "/admin"} replace />;

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }

    setBusy(true);
    try {
      await signIn(email.trim(), password);
      navigate(location.state?.from || "/admin", { replace: true });
    } catch (err) {
      setError(err.message);
      // Clear only the password: making them retype the email as well is a
      // punishment for a typo they probably did not make there.
      setPassword("");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative grid min-h-[100svh] place-items-center overflow-hidden bg-surface px-4 py-12">
      <Seo title="Sign in · Axiomra Lead Management" noindex />
      <AdminBackdrop />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="mb-7 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
            Axiomra
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-content">
            Lead Management
          </h1>
          <p className="mt-2 text-sm text-content-dim">Sign in to view and manage enquiries.</p>
        </div>

        <form
          onSubmit={submit}
          noValidate
          className="rounded-2xl border border-line bg-surface-card/90 p-6 shadow-[0_30px_80px_-40px_rgba(10,20,40,0.5)] backdrop-blur-xl sm:p-7"
        >
          <div>
            <label
              htmlFor="admin-email"
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
                id="admin-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="you@axiomra.com"
              />
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="admin-password"
              className="mb-1.5 block text-sm font-medium text-content-dim"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                size={17}
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-content-faint"
              />
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputClass} !pr-11`}
                placeholder="••••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="focus-ring absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-content-faint transition-colors hover:bg-surface-inset hover:text-content"
              >
                {showPassword ? (
                  <EyeOff size={16} aria-hidden="true" />
                ) : (
                  <Eye size={16} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <FieldError id="admin-login-error" message={error} />

          <button
            type="submit"
            disabled={busy}
            className="focus-ring mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-grad-sky py-3 text-sm font-semibold text-[#0A1428] transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {busy && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
            {busy ? "Signing in…" : "Sign in"}
          </button>

          <div className="mt-4 text-center">
            <Link
              to="/admin/forgot-password"
              className="focus-ring rounded text-sm text-content-dim underline-offset-2 transition-colors hover:text-accent hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
        </form>

        <p className="mt-5 text-center text-xs text-content-faint">
          Authorised staff only. Sign-in attempts are rate limited.
        </p>
      </motion.div>
    </div>
  );
}
