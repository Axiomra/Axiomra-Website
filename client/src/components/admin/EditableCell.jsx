import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AlertCircle, Bold, Check, Italic, List, ListOrdered, Underline } from "lucide-react";
import RichTextView, { applyFormat } from "./richText";

const FORMAT_BUTTONS = [
  { kind: "bold", icon: Bold, label: "Bold" },
  { kind: "italic", icon: Italic, label: "Italic" },
  { kind: "underline", icon: Underline, label: "Underline" },
  { kind: "bullet", icon: List, label: "Bulleted list" },
  { kind: "number", icon: ListOrdered, label: "Numbered list" },
];

/**
 * A table cell you can click into and type in.
 *
 * Behaviour that matters:
 * - Saves on blur and on Enter; Escape reverts. Long fields (message, remarks)
 *   take Enter as a newline and save with Cmd/Ctrl+Enter instead.
 * - Only fires onSave when the value actually changed, so tabbing across a row
 *   does not issue a PATCH per column.
 * - The textarea grows to fit its content, since "adjustable text boxes" is the
 *   point; a fixed 1-line box hides most of a message.
 * - `value` is re-synced from props when the row is not being edited, so an
 *   optimistic update that the server rejects visibly snaps back.
 */
export default function EditableCell({
  value,
  onSave,
  multiline = false,
  placeholder = "-",
  type = "text",
  align = "left",
  className = "",
  ariaLabel,
  // Long remarks/messages need to read in full once a column is widened;
  // only compact contexts (mobile cards) want the 3-line preview.
  clamp = true,
  // Adds a bold/italic/underline/list toolbar and renders the saved value with
  // those markers applied. Only meaningful alongside `multiline`.
  formatting = false,
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value ?? "");
  const [state, setState] = useState("idle"); // idle | saving | saved | error
  const inputRef = useRef(null);
  const savedTimer = useRef(null);
  // Where the caret should land after a toolbar button rewrote the draft.
  const pendingSelection = useRef(null);

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

  // Restore the selection a toolbar button asked for, once the new draft has
  // actually been painted into the textarea.
  useLayoutEffect(() => {
    const target = pendingSelection.current;
    if (!target || !inputRef.current) return;
    pendingSelection.current = null;
    inputRef.current.focus();
    inputRef.current.setSelectionRange(target.start, target.end);
  }, [draft]);

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

  const format = (kind) => {
    const el = inputRef.current;
    if (!el) return;
    const next = applyFormat(draft, el.selectionStart, el.selectionEnd, kind);
    pendingSelection.current = { start: next.start, end: next.end };
    setDraft(next.text);
  };

  const alignClass = align === "right" ? "text-right" : "text-left";
  const showToolbar = formatting && multiline;

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

    if (!multiline) return <input {...shared} type={type} />;

    return (
      <div className="rounded-lg">
        {showToolbar && (
          <div className="mb-1 flex flex-wrap items-center gap-0.5 rounded-lg border border-line bg-surface-inset p-0.5">
            {FORMAT_BUTTONS.map(({ kind, icon: Icon, label }) => (
              <button
                key={kind}
                type="button"
                title={label}
                aria-label={label}
                // Without this the textarea blurs, which commits and closes
                // the editor before the click ever lands.
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => format(kind)}
                className="focus-ring rounded-md p-1.5 text-content-dim transition-colors hover:bg-surface-card hover:text-content"
              >
                <Icon size={13} aria-hidden="true" />
              </button>
            ))}
          </div>
        )}
        <textarea {...shared} rows={3} />
      </div>
    );
  }

  const empty = !value;
  const displayClass = `focus-ring group relative block w-full cursor-text rounded-lg px-2 py-1.5 text-left text-sm transition-colors hover:bg-surface-inset ${alignClass} ${
    empty ? "text-content-faint/60" : "text-content"
  } ${className}`;

  const markers = (
    <>
      {state === "saving" && (
        <span className="absolute right-1 top-1 h-2 w-2 animate-pulse rounded-full bg-accent" />
      )}
      {state === "saved" && (
        <Check size={12} className="absolute right-1 top-1.5 text-success" aria-hidden="true" />
      )}
      {state === "error" && (
        <AlertCircle size={12} className="absolute right-1 top-1.5 text-danger" aria-hidden="true" />
      )}
    </>
  );

  // A formatted value contains block-level nodes (bullet rows), which a
  // <button> may not legally hold, so that variant is a div with the button
  // role and keyboard handling wired up by hand.
  if (formatting && !empty) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => setEditing(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setEditing(true);
          }
        }}
        aria-label={ariaLabel ? `${ariaLabel}. Click to edit` : "Click to edit"}
        className={displayClass}
      >
        <RichTextView text={value} clamp={clamp} />
        {markers}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      aria-label={ariaLabel ? `${ariaLabel}. Click to edit` : "Click to edit"}
      className={displayClass}
    >
      <span
        className={
          multiline
            ? `whitespace-pre-wrap break-words ${clamp ? "line-clamp-3" : ""}`
            : "block truncate"
        }
      >
        {empty ? placeholder : value}
      </span>

      {markers}
    </button>
  );
}
