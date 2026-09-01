import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Columns3, Eye, EyeOff, RotateCcw } from "lucide-react";
import { LEAD_COLUMNS, DEFAULT_VISIBLE } from "./leadColumns";

/**
 * Show/hide menu for table columns.
 *
 * The last visible column cannot be hidden — an empty table with no way back
 * except clearing localStorage is a trap, not a feature.
 */
export default function ColumnToggle({ columns, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const toggle = (key) => {
    const on = columns.includes(key);
    if (on && columns.length === 1) return;
    onChange(on ? columns.filter((k) => k !== key) : [...columns, key]);
  };

  const hiddenCount = LEAD_COLUMNS.length - columns.length;

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        className="focus-ring inline-flex items-center gap-2 rounded-xl border border-line bg-surface-card px-3 py-2 text-sm font-medium text-content-dim transition-colors hover:bg-surface-inset"
      >
        <Columns3 size={15} aria-hidden="true" />
        <span className="hidden sm:inline">Columns</span>
        {hiddenCount > 0 && (
          <span className="rounded-full bg-accent/15 px-1.5 py-0.5 text-[11px] font-semibold text-accent">
            {hiddenCount} hidden
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute right-0 top-[calc(100%+8px)] z-40 w-60 overflow-hidden rounded-2xl border border-line bg-surface-card p-1.5 shadow-[0_28px_70px_-24px_rgba(10,20,40,0.4)]"
          >
            <p className="px-2.5 py-2 text-[11px] font-semibold uppercase tracking-[0.09em] text-content-faint">
              Visible columns
            </p>

            <ul className="max-h-[min(60vh,380px)] overflow-y-auto">
              {LEAD_COLUMNS.map((col) => {
                const on = columns.includes(col.key);
                const locked = on && columns.length === 1;
                return (
                  <li key={col.key}>
                    <button
                      type="button"
                      onClick={() => toggle(col.key)}
                      disabled={locked}
                      aria-pressed={on}
                      className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors hover:bg-surface-inset disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {on ? (
                        <Eye size={14} className="shrink-0 text-accent" aria-hidden="true" />
                      ) : (
                        <EyeOff size={14} className="shrink-0 text-content-faint" aria-hidden="true" />
                      )}
                      <span className={on ? "text-content" : "text-content-faint"}>{col.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              onClick={() => onChange(DEFAULT_VISIBLE)}
              className="mt-1 flex w-full items-center gap-2 rounded-lg border-t border-line px-2.5 py-2 text-sm text-content-dim transition-colors hover:bg-surface-inset"
            >
              <RotateCcw size={14} aria-hidden="true" />
              Reset to default
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
