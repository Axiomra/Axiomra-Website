import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

/**
 * Modal confirmation for destructive actions.
 *
 * Focus lands on Cancel, not Confirm — a stray Enter after opening this should
 * not delete a lead. Escape and a backdrop click both cancel.
 */
export default function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  busy = false,
  onConfirm,
  onCancel,
}) {
  const cancelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape" && !busy) onCancel();
    };
    document.addEventListener("keydown", onKeyDown);
    cancelRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, busy, onCancel]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          className="fixed inset-0 z-[70] grid place-items-center bg-[rgb(6_12_26_/_0.62)] p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !busy) onCancel();
          }}
        >
          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md rounded-2xl border border-line bg-surface-card p-6 shadow-[0_40px_90px_-30px_rgba(6,12,26,0.6)]"
          >
            <div className="flex items-start gap-3.5">
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-danger/12 text-danger">
                <AlertTriangle size={18} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h2 id="confirm-title" className="font-display text-lg font-semibold text-content">
                  {title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-content-dim">{body}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2.5">
              <button
                ref={cancelRef}
                type="button"
                onClick={onCancel}
                disabled={busy}
                className="focus-ring rounded-xl border border-line px-4 py-2 text-sm font-medium text-content-dim transition-colors hover:bg-surface-inset disabled:opacity-50"
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={busy}
                className="focus-ring rounded-xl bg-danger px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {busy ? "Deleting…" : confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
