import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Clock, Mail, X } from "lucide-react";

/**
 * Post-submit confirmation: replays what was actually sent.
 *
 * A one-line "Thanks, we'll be in touch" gives the visitor no way to tell a
 * successful send from a typo'd email address. Showing the stored record back
 * makes the send verifiable — if the email is wrong, they see it here and can
 * resubmit while the intent is still fresh.
 *
 * `submission` is a frozen snapshot taken before the form resets; passing the
 * live form state would blank the modal out the moment the fields clear.
 */

const ROW_ORDER = [
  ["name", "Name"],
  ["email", "Email"],
  ["phone", "Phone"],
  ["company", "Company"],
  ["subject", "Subject"],
  ["service", "Service"],
];

export default function SubmissionModal({ open, submission, onClose }) {
  const closeRef = useRef(null);

  // Escape must close it, and focus has to land inside or a keyboard user is
  // left tabbing through the page behind the overlay.
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const focusTimer = setTimeout(() => closeRef.current?.focus(), 60);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  const data = submission || {};
  const rows = ROW_ORDER.filter(([key]) => String(data[key] || "").trim());
  const message = String(data.message || "").trim();

  // Portalled to <body>: both callers sit inside an animated form, and a
  // transformed ancestor turns position:fixed into position:absolute, which
  // would anchor the overlay to the form instead of the viewport.
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-inverse/70 p-4 backdrop-blur-sm sm:p-6"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="submission-title"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto w-full max-w-lg overflow-hidden rounded-xl2 border border-line bg-surface-card shadow-glow"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent-vivid via-brand to-accent-vivid"
            />

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close confirmation"
              className="focus-ring absolute right-4 top-4 rounded-lg p-1 text-content-faint transition-colors hover:text-content"
            >
              <X size={20} />
            </button>

            <div className="px-6 pb-6 pt-9 sm:px-8 sm:pb-8">
              <div className="flex flex-col items-center text-center">
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }}
                  className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-success/12 text-success"
                >
                  <CheckCircle2 size={34} strokeWidth={1.8} aria-hidden="true" />
                </motion.span>

                <h3
                  id="submission-title"
                  className="font-display text-2xl font-semibold text-content sm:text-3xl"
                >
                  Message sent
                </h3>
                <p className="mt-3 max-w-sm text-base leading-relaxed text-content-dim">
                  Thanks{data.name ? `, ${String(data.name).trim().split(/\s+/)[0]}` : ""}. Your
                  message reached our team and an engineer will reply within one business day.
                </p>
              </div>

              <div className="mt-7 rounded-xl border border-line bg-surface-subtle p-5">
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-content-faint">
                  What we received
                </p>

                <dl className="space-y-3">
                  {rows.map(([key, label]) => (
                    <div key={key} className="grid grid-cols-[6.5rem_1fr] gap-3 text-sm">
                      <dt className="text-content-faint">{label}</dt>
                      <dd className="break-words font-medium text-content">{data[key]}</dd>
                    </div>
                  ))}

                  {message && (
                    <div className="border-t border-line pt-3 text-sm">
                      <dt className="mb-1.5 text-content-faint">Message</dt>
                      {/* Long briefs are common; cap the height rather than let
                          the dialog grow past the viewport. */}
                      <dd className="max-h-32 overflow-y-auto whitespace-pre-wrap break-words leading-relaxed text-content">
                        {message}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-content-faint">
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={15} className="text-accent" aria-hidden="true" /> Reply within 24
                  hours
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Mail size={15} className="text-accent" aria-hidden="true" /> info@axiomra.co
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="focus-ring mt-6 w-full rounded-full bg-inverse px-7 py-3.5 text-base font-semibold text-inverse-fg transition-all hover:shadow-glow"
              >
                Done
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
