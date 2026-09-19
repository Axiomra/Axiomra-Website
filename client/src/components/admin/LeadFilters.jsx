import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { PROGRESS_STAGES } from "../../lib/adminApi";
import { StageChip } from "./ProgressBadge";

/**
 * Search box plus the advanced filter drawer.
 *
 * The search input is always visible because it is what gets used; the rest
 * (team, service, dates, budget) folds away behind the filter toggle so the
 * default view is a table and not a control panel.
 */

const inputClass =
  "w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm text-content outline-none transition-colors placeholder:text-content-faint/70 focus:border-accent focus:ring-4 focus:ring-accent/12";

const labelClass =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-content-faint";

export default function LeadFilters({ filters, onChange, open, services, activeCount }) {
  const set = (patch) => onChange({ ...filters, ...patch, page: 1 });

  const toggleStage = (stage) => {
    const current = filters.progress || [];
    set({
      progress: current.includes(stage)
        ? current.filter((s) => s !== stage)
        : [...current, stage],
    });
  };

  const clearAll = () =>
    set({
      search: "",
      progress: [],
      team: "",
      service: "",
      from: "",
      to: "",
      minBudget: "",
      maxBudget: "",
    });

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-content-faint"
        />
        <input
          type="search"
          value={filters.search || ""}
          onChange={(e) => set({ search: e.target.value })}
          placeholder="Search name, email, company, subject, message, remarks…"
          aria-label="Search leads"
          className={`${inputClass} !py-2.5 !pl-10 !pr-10`}
        />
        {filters.search && (
          <button
            type="button"
            onClick={() => set({ search: "" })}
            aria-label="Clear search"
            className="focus-ring absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1 text-content-faint transition-colors hover:bg-surface-inset hover:text-content"
          >
            <X size={15} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Stage chips sit outside the drawer: filtering by pipeline stage is the
          one filter used constantly, and burying it behind a toggle costs a
          click every time. */}
      <div className="flex flex-wrap items-center gap-1.5">
        {PROGRESS_STAGES.map((stage) => {
          const active = (filters.progress || []).includes(stage);
          return (
            <button
              key={stage}
              type="button"
              onClick={() => toggleStage(stage)}
              aria-pressed={active}
              className={`focus-ring rounded-full transition-all ${
                active
                  ? "scale-[1.02] opacity-100 ring-2 ring-accent/45 ring-offset-2 ring-offset-surface"
                  : "opacity-55 hover:opacity-90"
              }`}
            >
              <StageChip stage={stage} />
            </button>
          );
        })}

        {activeCount > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="focus-ring ml-1 inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-1 text-xs font-medium text-content-dim transition-colors hover:bg-surface-inset"
          >
            <X size={12} aria-hidden="true" />
            Clear {activeCount} filter{activeCount === 1 ? "" : "s"}
          </button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-3.5 rounded-2xl border border-line bg-surface-card p-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label htmlFor="filter-team" className={labelClass}>
                  Team assigned
                </label>
                <input
                  id="filter-team"
                  type="text"
                  value={filters.team || ""}
                  onChange={(e) => set({ team: e.target.value })}
                  placeholder="Any team"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="filter-service" className={labelClass}>
                  Requested service
                </label>
                <input
                  id="filter-service"
                  type="text"
                  list="admin-service-options"
                  value={filters.service || ""}
                  onChange={(e) => set({ service: e.target.value })}
                  placeholder="Any service"
                  className={inputClass}
                />
                {/* A datalist rather than a select: the stored value is free
                    text from an older form version as often as it is one of
                    today's options. */}
                <datalist id="admin-service-options">
                  {services.map((s) => (
                    <option key={s} value={s} />
                  ))}
                </datalist>
              </div>

              <div>
                <span className={labelClass}>Received between</span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="date"
                    value={filters.from || ""}
                    onChange={(e) => set({ from: e.target.value })}
                    aria-label="Received from"
                    className={inputClass}
                  />
                  <span className="text-content-faint" aria-hidden="true">
                    -
                  </span>
                  <input
                    type="date"
                    value={filters.to || ""}
                    onChange={(e) => set({ to: e.target.value })}
                    aria-label="Received until"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <span className={labelClass}>Budget range</span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="0"
                    value={filters.minBudget || ""}
                    onChange={(e) => set({ minBudget: e.target.value })}
                    placeholder="Min"
                    aria-label="Minimum budget"
                    className={inputClass}
                  />
                  <span className="text-content-faint" aria-hidden="true">
                    -
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={filters.maxBudget || ""}
                    onChange={(e) => set({ maxBudget: e.target.value })}
                    placeholder="Max"
                    aria-label="Maximum budget"
                    className={inputClass}
                  />
                </div>
                {/* Budget is stored as free text ("50k", "TBC"), so the server
                    can only apply this to the rows it has already paged in.
                    Saying so beats a count that quietly disagrees with the
                    total underneath it. */}
                <p className="mt-1.5 text-[11px] leading-snug text-content-faint">
                  Applied to the current page only, since budgets are free text.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
