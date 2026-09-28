import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import useMounted from "../lib/useMounted";
import { supportsWebGL } from "../lib/useCanvasGate";

// three.js only ships once a card is actually opened.
const BusinessTypeCanvas = lazy(() => import("./BusinessTypeCanvas"));

/** Static stand-in for the animated header (no WebGL, reduced motion, or a crash). */
function CanvasFallback() {
  return (
    <div
      className="absolute inset-0"
      aria-hidden="true"
      style={{
        backgroundImage:
          "radial-gradient(circle at 30% 40%, rgba(20,216,196,0.35), transparent 55%)," +
          "radial-gradient(circle at 72% 60%, rgba(120,139,227,0.35), transparent 55%)",
      }}
    />
  );
}

/** Detail dialog for one audience card. */
export default function BusinessTypeModal({ item, onClose }) {
  const panelRef = useRef(null);
  const open = Boolean(item);

  const close = useCallback(() => onClose(), [onClose]);

  // Escape closes, Tab stays inside the dialog.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  // Lock the page behind the dialog.
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
    };
  }, [open]);

  // Move focus into the dialog once it mounts.
  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  const mounted = useMounted();
  const [canAnimate] = useState(
    () =>
      typeof window !== "undefined" &&
      supportsWebGL() &&
      !(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false)
  );
  const useCanvas = open && canAnimate;

  // There is no <body> to portal into on the server; it starts closed anyway.
  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={close}
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-inverse/60 p-4 backdrop-blur-xl sm:p-6"
        >
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="business-type-title"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto w-full max-w-4xl overflow-hidden rounded-[1.75rem] border border-line bg-surface-card shadow-glow focus:outline-none"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close details"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-inverse/40 text-white backdrop-blur transition-colors hover:bg-inverse/70 focus-ring"
            >
              <X size={18} />
            </button>

            {/* Animated header. Fixed height so the dialog doesn't reflow when the lazy canvas finishes loading. */}
            <div className="relative h-52 overflow-hidden bg-inverse sm:h-60">
              {useCanvas ? (
                <ErrorBoundary fallback={<CanvasFallback />}>
                  <Suspense fallback={<CanvasFallback />}>
                    <BusinessTypeCanvas variant={item.variant} />
                  </Suspense>
                </ErrorBoundary>
              ) : (
                <CanvasFallback />
              )}

              {/* Gradient scrim so the title stays legible over a moving field. */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-card via-surface-card/20 to-transparent"
                aria-hidden="true"
              />

              <div className="absolute bottom-0 left-0 right-0 px-7 pb-6 sm:px-10">
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-brand">
                  {item.eyebrow}
                </p>
                <h3
                  id="business-type-title"
                  className="font-display text-3xl font-semibold leading-tight text-content sm:text-4xl"
                >
                  {item.name}
                </h3>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto px-7 pb-8 pt-6 sm:px-10 sm:pb-10">
              <p className="text-base leading-relaxed text-content-dim md:text-lg md:leading-relaxed">
                {item.detail}
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {item.stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl2 border border-line bg-surface-subtle px-5 py-4"
                  >
                    <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-content-faint">
                      {s.label}
                    </dt>
                    <dd className="mt-1.5 font-display text-xl font-semibold text-brand sm:text-2xl">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-9 grid gap-8 md:grid-cols-2">
                <section>
                  <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-accent">
                    Signals you&rsquo;re here
                  </h4>
                  <ul className="space-y-3">
                    {item.signals.map((s) => (
                      <li key={s} className="flex gap-3 text-sm leading-relaxed text-content-dim">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                        {s}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-accent">
                    What we build for you
                  </h4>
                  <ul className="space-y-3">
                    {item.deliverables.map((d) => (
                      <li key={d} className="flex gap-3 text-sm leading-relaxed text-content-dim">
                        <Check
                          size={16}
                          className="mt-0.5 shrink-0 text-brand"
                          aria-hidden="true"
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <section className="mt-9 rounded-xl2 border border-line bg-surface-subtle p-6 sm:p-7">
                <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-accent">
                  How the engagement runs
                </h4>
                <ol className="grid gap-5 sm:grid-cols-3">
                  {item.engagement.map((step, i) => (
                    <li key={step.title}>
                      <span className="font-display text-2xl font-semibold text-brand/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-1 font-display text-base font-semibold text-content">
                        {step.title}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-content-dim">{step.body}</p>
                    </li>
                  ))}
                </ol>
              </section>

              <Link
                to="/#contact"
                onClick={close}
                className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-accent-vivid to-brand px-7 py-4 text-base font-semibold text-inverse-fg transition-opacity hover:opacity-90 focus-ring"
              >
                {item.cta}
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
