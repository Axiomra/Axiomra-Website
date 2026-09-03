import { useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import AnchoredMenu from "./AnchoredMenu";

const MENU_WIDTH = 196;

/**
 * A coloured chip that opens a list of the other values it could hold.
 *
 * Kept as a button rather than a native <select> so the colour survives — an
 * OS-rendered option list ignores the styling entirely. The menu goes through
 * AnchoredMenu because table cells and the table's scroller would otherwise
 * clip it to the height of one row.
 */
export function StatusChip({ value, styles, fallback, className = "" }) {
  const s = styles[value] || fallback;
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${s.chip} ${className}`}
    >
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${s.dot}`} />
      {value || "—"}
    </span>
  );
}

export default function StatusSelect({
  value,
  options,
  styles,
  fallback,
  onChange,
  disabled = false,
  ariaLabel,
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);

  if (disabled) return <StatusChip value={value} styles={styles} fallback={fallback} />;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${ariaLabel}: ${value || "not set"}. Change`}
        className="focus-ring inline-flex items-center gap-1 rounded-full transition-transform hover:scale-[1.02] active:scale-[0.99]"
      >
        <StatusChip value={value} styles={styles} fallback={fallback} />
        <ChevronDown
          size={13}
          aria-hidden="true"
          className={`-ml-0.5 shrink-0 text-content-faint transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnchoredMenu
        anchorRef={triggerRef}
        open={open}
        onClose={() => setOpen(false)}
        width={MENU_WIDTH}
        estimatedHeight={options.length * 34 + 10}
        className="p-1"
      >
        <ul role="listbox" aria-label={ariaLabel}>
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                role="option"
                aria-selected={option === value}
                onClick={() => {
                  setOpen(false);
                  if (option !== value) onChange(option);
                }}
                className="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-surface-inset"
              >
                <StatusChip value={option} styles={styles} fallback={fallback} />
                {option === value && (
                  <Check size={14} className="shrink-0 text-accent" aria-hidden="true" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </AnchoredMenu>
    </>
  );
}
