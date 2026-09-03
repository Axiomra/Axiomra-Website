import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import FieldError from "../FieldError";
import { CUSTOM_FIELD_TYPES } from "./leadColumns";

/**
 * Adds a column to the leads table.
 *
 * The column is created on the server, not in this browser: the value one
 * person types into "Contract value" is only useful if it is a column the rest
 * of the team can see too.
 */

const inputClass =
  "w-full rounded-xl border border-line bg-surface px-3 py-2.5 text-sm text-content outline-none transition-colors placeholder:text-content-faint/70 focus:border-accent focus:ring-4 focus:ring-accent/12";
const labelClass = "mb-1.5 block text-sm font-medium text-content-dim";

/** Mounted only while open, so every open starts from a blank form. */
function ColumnForm({ onClose, onCreate }) {
  const [label, setLabel] = useState("");
  const [type, setType] = useState("text");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const firstFieldRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => firstFieldRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" && !busy) onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [busy, onClose]);

  const submit = async (e) => {
    e.preventDefault();
    const name = label.trim();
    if (!name) {
      setError("Give the column a name.");
      return;
    }

    setError("");
    setBusy(true);
    try {
      await onCreate({ label: name, type });
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const active = CUSTOM_FIELD_TYPES.find((t) => t.value === type);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16 }}
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-[rgb(6_12_26_/_0.62)] p-4 backdrop-blur-sm sm:p-8"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !busy) onClose();
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-column-title"
        initial={{ opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="my-auto w-full max-w-md rounded-2xl border border-line bg-surface-card shadow-[0_40px_100px_-30px_rgba(6,12,26,0.6)]"
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
          <h2 id="new-column-title" className="font-display text-lg font-semibold text-content">
            New column
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            aria-label="Close"
            className="focus-ring -mr-2 rounded-lg p-2 text-content-faint transition-colors hover:bg-surface-inset hover:text-content"
          >
            <X size={17} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={submit} noValidate className="px-6 py-5">
          <div>
            <label htmlFor="nc-label" className={labelClass}>
              Column name
            </label>
            <input
              ref={firstFieldRef}
              id="nc-label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              maxLength={40}
              placeholder="e.g. Contract value"
              aria-invalid={Boolean(error)}
              className={inputClass}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="nc-type" className={labelClass}>
              Type
            </label>
            <select
              id="nc-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={inputClass}
            >
              {CUSTOM_FIELD_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-[12px] text-content-faint">{active?.hint}</p>
          </div>

          <p className="mt-4 rounded-xl border border-line bg-surface-inset/60 px-3 py-2.5 text-[12px] leading-relaxed text-content-dim">
            The column is added for everyone on the team, and appears at the end of the table.
          </p>

          <FieldError id="nc-error" message={error} />

          <div className="mt-6 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={busy}
              className="focus-ring rounded-xl border border-line px-4 py-2.5 text-sm font-medium text-content-dim transition-colors hover:bg-surface-inset disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy}
              className="focus-ring rounded-xl bg-cta-gradient px-5 py-2.5 text-sm font-semibold text-[#0A1428] transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {busy ? "Adding…" : "Add column"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default function NewColumnDialog({ open, onClose, onCreate }) {
  return (
    <AnimatePresence>{open && <ColumnForm onClose={onClose} onCreate={onCreate} />}</AnimatePresence>
  );
}
