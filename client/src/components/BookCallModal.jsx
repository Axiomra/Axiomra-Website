import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

/** Exit-intent prompt: fires once, when the pointer leaves via the top edge. */
export default function BookCallModal() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const close = useCallback(() => {
    setShow(false);
    setDismissed(true);
  }, []);

  useEffect(() => {
    if (dismissed) return;
    const onLeave = (e) => {
      if (e.clientY < 40) setShow(true);
    };
    // Delay arming so a fast mouse move right after load doesn't trigger it.
    const timer = setTimeout(() => document.addEventListener("mouseleave", onLeave), 8000);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onLeave);
    };
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
            <h3 id="book-call-title" className="mb-3 font-display text-2xl font-semibold text-content">
              Book A Free Call With Our AI Specialist
            </h3>
            <p className="mb-6 text-sm text-content-dim">
              Your desired idea is just a phone call away. Just pitch us your idea, thought,
              design, or project, and we will deliver the best possible solution right to your inbox.
            </p>
            <Link
              to="/contact"
              onClick={close}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-vivid to-brand px-6 py-3 font-medium text-inverse-fg transition-opacity hover:opacity-90 focus-ring"
            >
              Book My Free Consultation <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
