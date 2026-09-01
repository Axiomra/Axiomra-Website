import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { PROGRESS_STAGES } from "../../lib/adminApi";
import { FALLBACK_STAGE_STYLE, STAGE_STYLES } from "./stageStyles";

export function StageChip({ stage, className = "" }) {
  const s = STAGE_STYLES[stage] || FALLBACK_STAGE_STYLE;
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${s.chip} ${className}`}
    >
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${s.dot}`} />
      {stage || "New"}
    </span>
  );
}

/**
 * The chip as a listbox. Kept as a button rather than a native <select> so the
 * colour survives — an OS-rendered option list ignores the styling entirely.
 */
export default function ProgressBadge({ value, onChange, disabled = false }) {
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

  if (disabled) return <StageChip stage={value} />;

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Progress: ${value || "New"}. Change stage`}
        className="focus-ring group inline-flex items-center gap-1 rounded-full transition-transform hover:scale-[1.02] active:scale-[0.99]"
      >
        <StageChip stage={value} />
        <ChevronDown
          size={13}
          aria-hidden="true"
          className={`-ml-0.5 shrink-0 text-content-faint transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute left-0 top-[calc(100%+6px)] z-30 w-48 overflow-hidden rounded-xl border border-line bg-surface-card p-1 shadow-[0_24px_60px_-20px_rgba(10,20,40,0.35)]"
          >
            {PROGRESS_STAGES.map((stage) => (
              <li key={stage}>
                <button
                  type="button"
                  role="option"
                  aria-selected={stage === value}
                  onClick={() => {
                    setOpen(false);
                    if (stage !== value) onChange(stage);
                  }}
                  className="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-surface-inset"
                >
                  <StageChip stage={stage} />
                  {stage === value && (
                    <Check size={14} className="shrink-0 text-accent" aria-hidden="true" />
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
