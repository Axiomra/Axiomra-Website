import { useRef, useState } from "react";
import { Columns3, Eye, EyeOff, Plus, RotateCcw, Trash2 } from "lucide-react";
import AnchoredMenu from "./AnchoredMenu";
import { LEAD_COLUMNS, DEFAULT_VISIBLE } from "./leadColumns";

/**
 * Show/hide menu for table columns, and the entry point for adding new ones.
 *
 * The last visible column cannot be hidden — an empty table with no way back
 * except clearing localStorage is a trap, not a feature.
 *
 * Custom columns are listed under their own heading with a delete button:
 * hiding one is a per-browser preference, deleting one removes the column and
 * its values for the whole team, so the two must not look like the same action.
 *
 * Portalled: the page header sets `overflow: hidden` for its animated
 * backdrop, which used to cut this menu off a few rows in.
 */
export default function ColumnToggle({
  columns,
  onChange,
  allColumns = LEAD_COLUMNS,
  onNewColumn,
  onDeleteColumn,
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);

  const toggle = (key) => {
    const on = columns.includes(key);
    if (on && columns.length === 1) return;
    onChange(on ? columns.filter((k) => k !== key) : [...columns, key]);
  };

  const custom = allColumns.filter((c) => c.customKey);
  const hiddenCount = allColumns.length - columns.length;

  const row = (col) => {
    const on = columns.includes(col.key);
    const lastOne = on && columns.length === 1;
    return (
      <li key={col.key} className="group/row flex items-center gap-1">
        <button
          type="button"
          onClick={() => toggle(col.key)}
          disabled={lastOne}
          aria-pressed={on}
          className="flex min-w-0 flex-1 items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors hover:bg-surface-inset disabled:cursor-not-allowed disabled:opacity-50"
        >
          {on ? (
            <Eye size={14} className="shrink-0 text-accent" aria-hidden="true" />
          ) : (
            <EyeOff size={14} className="shrink-0 text-content-faint" aria-hidden="true" />
          )}
          <span className={`truncate ${on ? "text-content" : "text-content-faint"}`}>
            {col.label}
          </span>
        </button>

        {col.customKey && onDeleteColumn && (
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onDeleteColumn(col);
            }}
            aria-label={`Delete the ${col.label} column`}
            className="focus-ring mr-1 shrink-0 rounded-md p-1.5 text-content-faint opacity-0 transition-all hover:bg-danger/10 hover:text-danger focus-visible:opacity-100 group-hover/row:opacity-100"
          >
            <Trash2 size={13} aria-hidden="true" />
          </button>
        )}
      </li>
    );
  };

  return (
    <>
      <button
        ref={triggerRef}
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

      <AnchoredMenu
        anchorRef={triggerRef}
        open={open}
        onClose={() => setOpen(false)}
        width={260}
        align="right"
        estimatedHeight={460}
        className="p-1.5"
      >
        <div className="max-h-[min(58vh,400px)] overflow-y-auto">
          <p className="px-2.5 py-2 text-[11px] font-semibold uppercase tracking-[0.09em] text-content-faint">
            Visible columns
          </p>
          <ul>{allColumns.filter((c) => !c.customKey).map(row)}</ul>

          {custom.length > 0 && (
            <>
              <p className="mt-1 border-t border-line px-2.5 pb-1 pt-2.5 text-[11px] font-semibold uppercase tracking-[0.09em] text-content-faint">
                Your columns
              </p>
              <ul>{custom.map(row)}</ul>
            </>
          )}
        </div>

        {onNewColumn && (
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onNewColumn();
            }}
            className="mt-1 flex w-full items-center gap-2 rounded-lg border-t border-line px-2.5 py-2 text-sm font-medium text-accent transition-colors hover:bg-surface-inset"
          >
            <Plus size={14} aria-hidden="true" />
            New column
          </button>
        )}

        <button
          type="button"
          onClick={() => onChange(DEFAULT_VISIBLE)}
          className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-content-dim transition-colors hover:bg-surface-inset"
        >
          <RotateCcw size={14} aria-hidden="true" />
          Reset to default
        </button>
      </AnchoredMenu>
    </>
  );
}
