import { ArrowDown, ArrowUp, ChevronsUpDown, Trash2 } from "lucide-react";
import EditableCell from "./EditableCell";
import ProgressBadge from "./ProgressBadge";
import Avatar from "./Avatar";
import { LEAD_COLUMNS, formatDate, formatDateTime } from "./leadColumns";

/**
 * The desktop leads table. Every cell except "Received" edits in place.
 *
 * The mobile view is a separate component (LeadCards) rather than this table
 * with `overflow-x`: twelve columns on a phone is a table nobody can read, no
 * matter how far it scrolls sideways.
 */
export default function LeadTable({
  leads,
  columns,
  sort,
  dir,
  onSort,
  selectedId,
  onSelect,
  onPatch,
  onDelete,
}) {
  const visible = LEAD_COLUMNS.filter((c) => columns.includes(c.key));

  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-surface-card">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-line">
            {visible.map((col) => {
              const active = sort === col.key;
              return (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={active ? (dir === "asc" ? "ascending" : "descending") : "none"}
                  className={`sticky top-0 z-10 whitespace-nowrap border-b border-line bg-surface-card/95 px-3 py-3 backdrop-blur ${col.width}`}
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => onSort(col.key)}
                      className="focus-ring inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.09em] text-content-faint transition-colors hover:text-content"
                    >
                      {col.label}
                      {active ? (
                        dir === "asc" ? (
                          <ArrowUp size={12} className="text-accent" aria-hidden="true" />
                        ) : (
                          <ArrowDown size={12} className="text-accent" aria-hidden="true" />
                        )
                      ) : (
                        <ChevronsUpDown size={12} className="opacity-40" aria-hidden="true" />
                      )}
                    </button>
                  ) : (
                    <span className="text-[11px] font-semibold uppercase tracking-[0.09em] text-content-faint">
                      {col.label}
                    </span>
                  )}
                </th>
              );
            })}
            <th scope="col" className="sticky top-0 z-10 border-b border-line bg-surface-card/95 px-3 py-3 backdrop-blur">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => {
            const isSelected = lead._id === selectedId;
            return (
              <tr
                key={lead._id}
                onClick={() => onSelect(lead)}
                className={`group border-b border-line/70 align-top transition-colors last:border-0 ${
                  isSelected ? "bg-accent/[0.055]" : "hover:bg-surface-inset/60"
                }`}
              >
                {visible.map((col) => (
                  <td key={col.key} className={`px-1.5 py-1.5 ${isSelected ? "" : col.tint}`}>
                    {col.kind === "stage" ? (
                      <div className="px-1 py-0.5">
                        <ProgressBadge
                          value={lead.progress}
                          onChange={(stage) => onPatch(lead._id, { progress: stage })}
                        />
                      </div>
                    ) : col.kind === "date" ? (
                      <span
                        className="block px-2 py-1.5 text-sm text-content-faint"
                        title={formatDateTime(lead[col.key])}
                      >
                        {formatDate(lead[col.key])}
                      </span>
                    ) : col.key === "name" ? (
                      <div className="flex items-center gap-2">
                        <Avatar name={lead.name} email={lead.email} size="sm" />
                        <div className="min-w-0 flex-1">
                          <EditableCell
                            value={lead.name}
                            ariaLabel={`Name for ${lead.name || lead.email}`}
                            onSave={(v) => onPatch(lead._id, { name: v })}
                          />
                        </div>
                      </div>
                    ) : (
                      <EditableCell
                        value={lead[col.key]}
                        type={col.type}
                        multiline={col.multiline}
                        ariaLabel={`${col.label} for ${lead.name || lead.email}`}
                        onSave={(v) => onPatch(lead._id, { [col.key]: v })}
                      />
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
