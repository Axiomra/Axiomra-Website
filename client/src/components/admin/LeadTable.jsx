import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown, Trash2 } from "lucide-react";
import CompletionBadge from "./CompletionBadge";
import DeadlineCell from "./DeadlineCell";
import EditableCell from "./EditableCell";
import ProgressBadge from "./ProgressBadge";
import Avatar from "./Avatar";
import {
  LEAD_COLUMNS,
  cellPatch,
  cellValue,
  formatDate,
  formatDateTime,
  COLUMN_WIDTH_STORAGE_KEY,
  MIN_COLUMN_WIDTH,
  MAX_COLUMN_WIDTH,
} from "./leadColumns";

const ACTIONS_WIDTH = 52;

/** Column widths survive reloads; a blocked localStorage just means defaults. */
function readWidths() {
  try {
    const stored = JSON.parse(localStorage.getItem(COLUMN_WIDTH_STORAGE_KEY));
    return stored && typeof stored === "object" && !Array.isArray(stored) ? stored : {};
  } catch {
    return {};
  }
}

/**
 * The desktop leads table.
 *
 * Identity fields (name, email, phone, company, requested service) are
 * read-only here on purpose; they only change through the details panel, so
 * a click anywhere in the row opens that panel instead of an inline input.
 * Everything else (subject, message, progress, team, budget, remarks) still
 * edits in place, exactly as before.
 *
 * Columns are user-resizable and the widths persist, so "Remarks" can be
 * dragged wide enough to read in full without truncation.
 *
 * The mobile view is a separate component (LeadCards) rather than this table
 * with `overflow-x`: twelve columns on a phone is a table nobody can read, no
 * matter how far it scrolls sideways.
 */
export default function LeadTable({
  leads,
  columns,
  // The built-in columns plus whatever the team has added. Defaulted so a
  // caller that has not loaded the custom ones yet still renders.
  allColumns = LEAD_COLUMNS,
  sort,
  dir,
  onSort,
  selectedId,
  onSelect,
  onPatch,
  onDelete,
}) {
  const visible = allColumns.filter((c) => columns.includes(c.key));

  const [widths, setWidths] = useState(readWidths);
  useEffect(() => {
    try {
      localStorage.setItem(COLUMN_WIDTH_STORAGE_KEY, JSON.stringify(widths));
    } catch {
      // Preference just will not survive a reload; the table still works.
    }
  }, [widths]);

  const widthFor = (col) => widths[col.key] ?? col.width;

  const dragRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      const drag = dragRef.current;
      if (!drag) return;
      const delta = e.clientX - drag.startX;
      const next = Math.min(MAX_COLUMN_WIDTH, Math.max(MIN_COLUMN_WIDTH, drag.startWidth + delta));
      setWidths((w) => ({ ...w, [drag.key]: next }));
    };
    const onUp = () => {
      dragRef.current = null;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

  const startResize = (e, col) => {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current = { key: col.key, startX: e.clientX, startWidth: widthFor(col) };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  return (
    // Frosted panel: scrolls in both directions inside itself so the header row
    // stays stuck to the top while the page around it stays put.
    // It sits on the same gutter as the header and the stats bar above it, because a
    // panel pinned to the viewport edge reads as a rendering fault rather than
    // as extra width, and the columns scroll horizontally anyway.
    <div className="mx-4 max-h-[72svh] overflow-auto rounded-xl border border-line/70 bg-surface-card/50 shadow-[0_30px_70px_-50px_rgba(10,20,40,0.6)] backdrop-blur-2xl sm:mx-6 lg:mx-8">
      <table className="w-full border-collapse text-left" style={{ tableLayout: "fixed" }}>
        <thead>
          <tr className="border-b border-line">
            {visible.map((col) => {
              const active = sort === col.key;
              return (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={active ? (dir === "asc" ? "ascending" : "descending") : "none"}
                  style={{ width: widthFor(col) }}
                  className="sticky top-0 z-10 whitespace-nowrap border-b border-line bg-surface-card/80 px-3 py-3 backdrop-blur-xl relative"
                >
                  <div className="flex items-center justify-between gap-2">
                    {col.sortable ? (
                      <button
                        type="button"
                        onClick={() => onSort(col.key)}
                        className="focus-ring inline-flex min-w-0 items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.09em] text-content-faint transition-colors hover:text-content"
                      >
                        <span className="truncate">{col.label}</span>
                        {active ? (
                          dir === "asc" ? (
                            <ArrowUp size={12} className="shrink-0 text-accent" aria-hidden="true" />
                          ) : (
                            <ArrowDown size={12} className="shrink-0 text-accent" aria-hidden="true" />
                          )
                        ) : (
                          <ChevronsUpDown size={12} className="shrink-0 opacity-40" aria-hidden="true" />
                        )}
                      </button>
                    ) : (
                      <span className="truncate text-[11px] font-semibold uppercase tracking-[0.09em] text-content-faint">
                        {col.label}
                      </span>
                    )}
                  </div>

                  {/* Drag handle: widens/narrows this column, persisted per browser. */}
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-label={`Resize ${col.label} column`}
                    onMouseDown={(e) => startResize(e, col)}
                    onDoubleClick={() => setWidths((w) => ({ ...w, [col.key]: col.width }))}
                    className="group absolute right-0 top-0 z-20 h-full w-2 cursor-col-resize touch-none select-none"
                  >
                    <span className="mx-auto block h-full w-px bg-line transition-colors group-hover:bg-accent group-active:bg-accent" />
                  </button>
                </th>
              );
            })}
            <th
              scope="col"
              style={{ width: ACTIONS_WIDTH }}
              className="sticky top-0 z-10 border-b border-line bg-surface-card/80 px-3 py-3 backdrop-blur-xl"
            >
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead, idx) => {
            const isSelected = lead._id === selectedId;
            const zebra = idx % 2 === 1 ? "bg-surface-inset/50" : "bg-transparent";
            return (
              <tr
                key={lead._id}
                onClick={() => onSelect(lead)}
                className={`group relative cursor-pointer border-b border-line/70 align-top transition-colors last:border-0 ${
                  isSelected ? "bg-accent/[0.07]" : `${zebra} hover:bg-surface-inset/70`
                }`}
              >
                {visible.map((col) => (
                  <td
                    key={col.key}
                    style={{ width: widthFor(col) }}
                    className={`overflow-hidden px-1.5 py-1.5 ${isSelected ? "" : col.tint}`}
                  >
                    {col.kind === "stage" ? (
                      <div className="px-1 py-0.5" onClick={(e) => e.stopPropagation()}>
                        <ProgressBadge
                          value={lead.progress}
                          onChange={(stage) => onPatch(lead._id, { progress: stage })}
                        />
                      </div>
                    ) : col.kind === "completion" ? (
                      <div className="px-1 py-0.5" onClick={(e) => e.stopPropagation()}>
                        <CompletionBadge
                          value={lead.completion}
                          onChange={(state) => onPatch(lead._id, { completion: state })}
                        />
                      </div>
                    ) : col.kind === "deadline" ? (
                      <div onClick={(e) => e.stopPropagation()}>
                        <DeadlineCell
                          value={lead.deadline}
                          done={lead.completion === "Completed" || lead.completion === "Closed"}
                          onSave={(v) => onPatch(lead._id, { deadline: v })}
                        />
                      </div>
                    ) : col.kind === "date" ? (
                      <span
                        className="block px-2 py-1.5 text-sm text-content-faint"
                        title={formatDateTime(lead[col.key])}
                      >
                        {formatDate(lead[col.key])}
                      </span>
                    ) : col.locked ? (
                      col.key === "name" ? (
                        <div className="flex items-center gap-2 px-1 py-1">
                          <Avatar name={lead.name} email={lead.email} size="sm" />
                          <span className="min-w-0 flex-1 truncate text-sm font-medium text-content">
                            {lead.name || <span className="text-content-faint/60">-</span>}
                          </span>
                        </div>
                      ) : (
                        <span
                          className="block truncate px-2 py-1.5 text-sm text-content"
                          title={lead[col.key] || ""}
                        >
                          {lead[col.key] || <span className="text-content-faint/60">-</span>}
                        </span>
                      )
                    ) : (
                      <div onClick={(e) => e.stopPropagation()}>
                        <EditableCell
                          value={cellValue(lead, col)}
                          type={col.type}
                          multiline={col.multiline}
                          formatting={col.formatting}
                          clamp={false}
                          ariaLabel={`${col.label} for ${lead.name || lead.email}`}
                          onSave={(v) => onPatch(lead._id, cellPatch(col, v))}
                        />
                      </div>
                    )}
                  </td>
                ))}

                <td className="px-2 py-2 align-middle">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(lead);
                    }}
                    aria-label={`Delete lead from ${lead.name || lead.email}`}
                    // Hidden until the row is hovered or the button itself is
                    // focused, so a delete icon is never the first thing the
                    // eye lands on in a table of live leads.
                    className="focus-ring rounded-lg p-2 text-content-faint opacity-0 transition-all hover:bg-danger/10 hover:text-danger focus-visible:opacity-100 group-hover:opacity-100"
                  >
                    <Trash2 size={15} aria-hidden="true" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
