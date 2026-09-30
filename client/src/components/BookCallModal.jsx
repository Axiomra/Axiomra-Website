import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { BOOKING_URL } from "../lib/booking";

const SHOWN_KEY = "axiomra:book-call-shown";
const DWELL_MS = 45000;
const SCROLL_DEPTH = 0.6;

function alreadyShown() {
  try {
    return sessionStorage.getItem(SHOWN_KEY) === "1";
  } catch {
    return false;
  }
}

function markShown() {
  try {
    sessionStorage.setItem(SHOWN_KEY, "1");
  } catch {
    // Private mode or blocked storage: the in-memory `dismissed` flag still applies.
  }
}

/**
 * Exit-intent prompt, at most once per session. With a mouse it fires when the
 * pointer leaves via the top edge. Touch screens have no such signal, so there
 * it fires on 60% scroll depth, 45s dwell, or the first press of Back.
 */
export default function BookCallModal() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const close = useCallback(() => {
    setShow(false);
    setDismissed(true);
  }, []);

  useEffect(() => {
    if (dismissed || alreadyShown()) return;
    const cleanups = [];
    const on = (target, type, fn, opts) => {
      target.addEventListener(type, fn, opts);
      cleanups.push(() => target.removeEventListener(type, fn, opts));
    };
    const touch = window.matchMedia("(hover: none)").matches;
    const trigger = () => {
      // The touch triggers fire without intent to leave; interrupting someone
      // halfway through the contact form would cost the lead.
      if (alreadyShown() || (touch && window.location.pathname === "/contact")) return;
      markShown();
      setShow(true);
    };

    if (!touch) {
      const onLeave = (e) => {
        if (e.clientY < 40) trigger();
      };
      // Delay arming so a fast mouse move right after load doesn't trigger it.
      const timer = setTimeout(() => on(document, "mouseleave", onLeave), 8000);
      cleanups.push(() => clearTimeout(timer));
    } else {
      const timer = setTimeout(trigger, DWELL_MS);
      cleanups.push(() => clearTimeout(timer));

      on(
        window,
        "scroll",
        () => {
          const el = document.documentElement;
          if ((window.scrollY + window.innerHeight) / el.scrollHeight >= SCROLL_DEPTH) trigger();
        },
        { passive: true }
      );

      // Back-button trap: an extra entry on top of the current one, so the first
      // Back lands here instead of leaving. Chrome skips entries pushed without a
      // user gesture, so it is added on the first tap.
      on(
        window,
        "pointerup",
        () => {
          if (history.state?.bookCallTrap) return;
          history.pushState({ ...history.state, bookCallTrap: true }, "");
        },
        { once: true }
      );
      on(window, "popstate", (e) => {
        // Arriving on the trap entry itself (Back from a later page) is not an exit.
        if (!e.state?.bookCallTrap) trigger();
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [dismissed]);

  // A modal that can only be closed with a mouse traps keyboard users.
  useEffect(() => {
    if (!show) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [show, close]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-inverse/70 p-6 backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="book-call-title"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-xl2 border border-line bg-surface-card p-8 text-center shadow-glow"
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 text-content-faint transition-colors hover:text-content focus-ring"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <h3
              id="book-call-title"
              className="mb-3 font-display text-2xl font-semibold text-content"
            >
              Book A Free Call With Our AI Specialist
            </h3>
            <p className="mb-6 text-sm text-content-dim">
              Your desired idea is just a phone call away. Just pitch us your idea, thought, design,
              or project, and we will deliver the best possible solution right to your inbox.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="inline-flex items-center gap-2 rounded-full bg-accent-vivid px-6 py-3 font-semibold text-[#0A1428] transition-opacity hover:opacity-90 focus-ring"
            >
              Book My Free Consultation <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
