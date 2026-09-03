import StatusSelect, { StatusChip } from "./StatusSelect";
import { COMPLETION_STATES } from "../../lib/adminApi";
import { COMPLETION_STYLES, FALLBACK_COMPLETION_STYLE } from "./stageStyles";

/**
 * Delivery state: Pending → Ongoing → Completed, or Closed.
 *
 * Same control as the progress chip, different vocabulary and palette, so the
 * two columns never read as duplicates of each other.
 */
export function CompletionChip({ value, className = "" }) {
  return (
    <StatusChip
      value={value || "Pending"}
      styles={COMPLETION_STYLES}
      fallback={FALLBACK_COMPLETION_STYLE}
      className={className}
    />
  );
}

export default function CompletionBadge({ value, onChange, disabled = false }) {
  return (
    <StatusSelect
      value={value || "Pending"}
      options={COMPLETION_STATES}
      styles={COMPLETION_STYLES}
      fallback={FALLBACK_COMPLETION_STYLE}
      onChange={onChange}
      disabled={disabled}
      ariaLabel="Completion"
    />
  );
}
