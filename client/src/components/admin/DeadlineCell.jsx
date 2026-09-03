import { useEffect, useRef, useState } from "react";
import { CalendarDays } from "lucide-react";
import { formatDate, toDateInputValue } from "./leadColumns";

/**
 * The deadline as a date you can click and change.
 *
 * A native <input type="date"> rather than a custom picker: the OS one is
 * keyboard- and locale-correct for free, and this is a field people set once
 * and rarely revisit.
 *
 * An overdue date is coloured, but only while the work is still open —
 * flagging a finished job as late is noise, not a warning.
 */
export default function DeadlineCell({ value, done = false, onSave }) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  if (editing) {
    return (
      <input
        ref={inputRef}
        type="date"
        aria-label="Deadline"
        defaultValue={toDateInputValue(value)}
        onBlur={(e) => {
          setEditing(false);
          const next = e.target.value;
          if (next !== toDateInputValue(value)) onSave(next);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") setEditing(false);
          if (e.key === "Enter") e.currentTarget.blur();
        }}
        className="w-full rounded-lg border border-accent/60 bg-surface px-2 py-1.5 text-sm text-content shadow-[0_0_0_4px_rgb(var(--accent)/0.12)] outline-none"
      />
    );
  }

  const date = value ? new Date(value) : null;
  const valid = date && !Number.isNaN(date.valueOf());
  // Compared against the start of today, so a deadline of "today" is not
  // already late at 09:00.
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const overdue = valid && !done && date < today;

  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      aria-label={`Deadline${valid ? `: ${formatDate(value)}` : " not set"}. Click to edit`}
      className={`focus-ring flex w-full items-center gap-1.5 rounded-lg px-2 py-1.5 text-left text-sm transition-colors hover:bg-surface-inset ${
        overdue ? "font-medium text-danger" : valid ? "text-content" : "text-content-faint/60"
      }`}
    >
      <CalendarDays size={13} aria-hidden="true" className="shrink-0 opacity-60" />
      <span className="truncate">{valid ? formatDate(value) : "Set date"}</span>
    </button>
  );
}
