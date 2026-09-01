import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AlertCircle, Check } from "lucide-react";

/**
 * A table cell you can click into and type in.
 *
 * Behaviour that matters:
 * - Saves on blur and on Enter; Escape reverts. Long fields (message, remarks)
 *   take Enter as a newline and save with Cmd/Ctrl+Enter instead.
 * - Only fires onSave when the value actually changed, so tabbing across a row
 *   does not issue a PATCH per column.
 * - The textarea grows to fit its content — "adjustable text boxes" is the
 *   point; a fixed 1-line box hides most of a message.
 * - `value` is re-synced from props when the row is not being edited, so an
 *   optimistic update that the server rejects visibly snaps back.
 */
export default function EditableCell({
  value,
  onSave,
  multiline = false,
  placeholder = "—",
  type = "text",
  align = "left",
  className = "",
  ariaLabel,
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value ?? "");
  const [state, setState] = useState("idle"); // idle | saving | saved | error
  const inputRef = useRef(null);
  const savedTimer = useRef(null);

  // Re-sync from props during render rather than in an effect: an effect would
  // paint the stale draft first, so a rejected save would flash the bad value
  // back on screen for a frame before reverting.
  const [syncedValue, setSyncedValue] = useState(value);
  if (!editing && value !== syncedValue) {
    setSyncedValue(value);
    setDraft(value ?? "");
  }

  useEffect(() => () => clearTimeout(savedTimer.current), []);

  // Size the textarea to its content before paint, so it never flashes at the
  // wrong height on the way into edit mode.
  useLayoutEffect(() => {
    if (!editing || !multiline || !inputRef.current) return;
    const el = inputRef.current;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 260)}px`;
  }, [editing, draft, multiline]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      // Caret at the end rather than selecting everything: the common edit is
      // an addition to an existing note, not a replacement.
      const len = inputRef.current.value.length;
      inputRef.current.setSelectionRange?.(len, len);
    }
  }, [editing]);

  const commit = async () => {
    setEditing(false);
    const next = draft.trim();
    if (next === (value ?? "").trim()) return;

    setState("saving");
    try {
      await onSave(next);
      setState("saved");
      savedTimer.current = setTimeout(() => setState("idle"), 1400);
    } catch {
      // The parent surfaces the message and reverts the row; the cell only
      // needs to stop claiming it saved.
      setState("error");
      setDraft(value ?? "");
      savedTimer.current = setTimeout(() => setState("idle"), 2600);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setDraft(value ?? "");
      setEditing(false);
      return;
    }
    if (e.key === "Enter" && (!multiline || e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      commit();
    }
  };

  const alignClass = align === "right" ? "text-right" : "text-left";

  if (editing) {
    const shared = {
      ref: inputRef,
      value: draft,
      onChange: (e) => setDraft(e.target.value),
      onBlur: commit,
      onKeyDown,
      "aria-label": ariaLabel,
      className: `w-full rounded-lg border border-accent/60 bg-surface px-2 py-1.5 text-sm text-content shadow-[0_0_0_4px_rgb(var(--accent)/0.12)] outline-none ${alignClass}`,
    };
    return multiline ? (
      <textarea {...shared} rows={2} />
    ) : (
      <input {...shared} type={type} />
    );
  }

  const empty = !value;

  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      aria-label={ariaLabel ? `${ariaLabel}. Click to edit` : "Click to edit"}
      className={`focus-ring group relative block w-full rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-surface-inset ${alignClass} ${
        empty ? "text-content-faint/60" : "text-content"
      } ${className}`}
    >
      <span className={multiline ? "line-clamp-3 whitespace-pre-wrap break-words" : "block truncate"}>
        {empty ? placeholder : value}
      </span>

      {state === "saving" && (
        <span className="absolute right-1 top-1 h-2 w-2 animate-pulse rounded-full bg-accent" />
      )}
      {state === "saved" && (
        <Check size={12} className="absolute right-1 top-1.5 text-success" aria-hidden="true" />
      )}
      {state === "error" && (
        <AlertCircle size={12} className="absolute right-1 top-1.5 text-danger" aria-hidden="true" />
      )}
    </button>
  );
}
