import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Trash2 } from "lucide-react";
import EditableCell from "./EditableCell";
import ProgressBadge from "./ProgressBadge";
import Avatar from "./Avatar";
import { LEAD_COLUMNS, formatDate } from "./leadColumns";

/**
 * The mobile view of the leads list.
 *
 * A stacked card per lead, not the desktop table in a horizontal scroller.
 * Sideways scrolling hides the columns that matter and makes inline editing
 * near-impossible on a touch screen; a card puts the identity and the stage up
 * front and folds the rest away until asked for.
 *
 * Respects the same column-visibility choice as the table, so hiding a column
 * on desktop hides it here too.
 */
export default function LeadCards({ leads, columns, selectedId, onSelect, onPatch, onDelete }) {
  const [expanded, setExpanded] = useState(() => new Set());

  const toggle = (id) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  // Name, email and progress are in the always-visible header, so the fold
  // holds everything else the user has chosen to keep.
  const foldedColumns = LEAD_COLUMNS.filter(
    (c) => columns.includes(c.key) && !["name", "email", "progress"].includes(c.key)
  );

  return (
    <ul className="space-y-3">
      {leads.map((lead) => {
        const open = expanded.has(lead._id);
        const isSelected = lead._id === selectedId;

        return (
          <li
            key={lead._id}
            className={`overflow-hidden rounded-2xl border bg-surface-card transition-colors ${
              isSelected ? "border-accent/50 bg-accent/[0.04]" : "border-line"
            }`}
          >
            <div className="flex items-start gap-3 p-3.5">
              <button
                type="button"
                onClick={() => onSelect(lead)}
                aria-label={`Open details for ${lead.name || lead.email}`}
                className="focus-ring rounded-full"
              >
                <Avatar name={lead.name} email={lead.email} size="md" />
              </button>

              <div className="min-w-0 flex-1">
                <EditableCell
                  value={lead.name}
                  ariaLabel="Name"
                  className="!px-1 font-medium"
                  onSave={(v) => onPatch(lead._id, { name: v })}
                />
                <EditableCell
                  value={lead.email}
                  type="email"
                  ariaLabel="Email"
                  className="!px-1 !text-[13px] !text-content-dim"
                  onSave={(v) => onPatch(lead._id, { email: v })}
                />
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <ProgressBadge
                    value={lead.progress}
                    onChange={(stage) => onPatch(lead._id, { progress: stage })}
                  />
                  <span className="text-xs text-content-faint">{formatDate(lead.createdAt)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggle(lead._id)}
                aria-expanded={open}
                aria-label={open ? "Hide details" : "Show details"}
                className="focus-ring -mr-1 shrink-0 rounded-lg p-2 text-content-faint transition-colors hover:bg-surface-inset"
              >
                <ChevronDown
                  size={17}
                  aria-hidden="true"
                  className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden border-t border-line"
                >
                  <dl className="divide-y divide-line/70">
                    {foldedColumns.map((col) => (
                      <div key={col.key} className={`px-3.5 py-2.5 ${col.tint}`}>
                        <dt className="mb-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-content-faint">
                          {col.label}
                        </dt>
                        <dd>
                          {col.kind === "date" ? (
                            <span className="block px-2 text-sm text-content-dim">
                              {formatDate(lead[col.key])}
                            </span>
                          ) : (
                            <EditableCell
                              value={lead[col.key]}
                              multiline={col.multiline}
                              ariaLabel={col.label}
                              onSave={(v) => onPatch(lead._id, { [col.key]: v })}
                            />
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="flex justify-end border-t border-line px-3.5 py-2.5">
                    <button
                      type="button"
                      onClick={() => onDelete(lead)}
                      className="focus-ring inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-danger transition-colors hover:bg-danger/10"
                    >
                      <Trash2 size={14} aria-hidden="true" />
                      Delete lead
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
