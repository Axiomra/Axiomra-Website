import StatusSelect, { StatusChip } from "./StatusSelect";
import { PROGRESS_STAGES } from "../../lib/adminApi";
import { FALLBACK_STAGE_STYLE, STAGE_STYLES } from "./stageStyles";

/**
 * Pipeline stage as a chip you can open.
 *
 * Kept as a button rather than a native <select> so the colour survives — an
 * OS-rendered option list ignores the styling entirely. All the positioning
 * and clipping work lives in StatusSelect, shared with the completion chip.
 */
export function StageChip({ stage, className = "" }) {
  return (
    <StatusChip
      value={stage || "New"}
      styles={STAGE_STYLES}
      fallback={FALLBACK_STAGE_STYLE}
      className={className}
    />
  );
}

export default function ProgressBadge({ value, onChange, disabled = false }) {
  return (
    <StatusSelect
      value={value || "New"}
      options={PROGRESS_STAGES}
      styles={STAGE_STYLES}
      fallback={FALLBACK_STAGE_STYLE}
      onChange={onChange}
      disabled={disabled}
      ariaLabel="Progress"
    />
  );
}
