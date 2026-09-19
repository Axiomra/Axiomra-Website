import { PROGRESS_STAGES } from "../../lib/adminApi";
import { STAGE_STYLES } from "./stageStyles";

/**
 * Total count and a per-stage breakdown, above the table.
 *
 * Counts come from a server-side aggregate over the *filtered* set, not from
 * the rows currently on screen; a summary that only counts page one is worse
 * than no summary.
 *
 * Spacing is left to the caller: this sits at the top of the working area, and
 * a margin baked in here would fight whatever the page puts around it.
 */
export default function StatsBar({ stats, filtered, showing }) {
  const total = stats?.total ?? 0;
  const byProgress = stats?.byProgress || {};
  // A stage bar is meaningless at total 0 and dividing by it is worse.
  const max = Math.max(1, ...PROGRESS_STAGES.map((s) => byProgress[s] || 0));

  return (
    <section
      aria-label="Lead totals"
      className="rounded-2xl border border-line/70 bg-surface-card/55 p-5 shadow-[0_24px_60px_-42px_rgba(10,20,40,0.55)] backdrop-blur-xl"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <div className="flex items-baseline gap-2.5">
          <span className="font-display text-3xl font-semibold tracking-tight text-content">
            {total.toLocaleString()}
          </span>
          <span className="text-sm text-content-dim">
            {filtered ? "leads match your filters" : "leads in total"}
          </span>
        </div>
        {showing > 0 && (
          <p className="text-sm text-content-faint">
            Showing {showing.toLocaleString()} on this page
          </p>
        )}
      </div>

      <dl className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {PROGRESS_STAGES.map((stage) => {
          const count = byProgress[stage] || 0;
          const style = STAGE_STYLES[stage];
          return (
            <div key={stage} className="rounded-xl border border-line/60 bg-surface/45 p-3 backdrop-blur-sm">
              <dt className="flex items-center gap-1.5 text-xs font-medium text-content-dim">
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`} aria-hidden="true" />
                {stage}
              </dt>
              <dd className="mt-1.5 font-display text-xl font-semibold tabular-nums text-content">
                {count.toLocaleString()}
              </dd>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-surface-inset">
                <div
                  className={`h-full rounded-full transition-[width] duration-500 ${style.dot}`}
                  style={{ width: `${(count / max) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
