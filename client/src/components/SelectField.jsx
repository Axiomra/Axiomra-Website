import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { variantOf } from "../lib/fieldStyles";

/**
 * Listbox styled to match the rest of the form.
 *
 * A native <select> renders its popup with OS colours, which looks wrong on the
 * always-dark intake card; this keeps the option list inside the design system
 * on both surfaces. Falls back gracefully: the trigger is a real button and the
 * selected value is mirrored into a hidden input so the form still submits it.
 */
export default function SelectField({
  id,
  name,
  variant = "light",
  value,
  onChange,
  options,
  placeholder = "Select an option",
  icon: Icon,
  required = false,
}) {
  const v = variantOf(variant);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const select = (option) => {
    onChange({ target: { name, value: option } });
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className="relative">
      {/* Keeps the value in the DOM for autofill and for non-JS form tooling. */}
      <input type="hidden" name={name} value={value} required={required} />

      <button
        id={id}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`focus-ring flex w-full items-center gap-2.5 rounded-xl border py-3.5 pl-4 pr-3.5 text-left text-base transition-all ${v.shell} ${v.text} ${
          open ? "ring-4" : ""
        }`}
      >
        {Icon && <Icon size={17} className={`shrink-0 ${v.accent} opacity-80`} aria-hidden="true" />}
        <span className={`flex-1 truncate ${value ? "" : v.muted}`}>{value || placeholder}</span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`shrink-0 ${v.muted} transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={placeholder}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className={`absolute left-0 top-[calc(100%+8px)] z-40 max-h-64 w-full origin-top overflow-y-auto rounded-xl border py-2 ${v.panel}`}
          >
            {options.map((option) => {
              const active = option === value;
              return (
                <li key={option}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => select(option)}
                    className={`flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm transition-colors ${
                      active ? v.optionActive : v.option
                    }`}
                  >
                    <span className="flex-1 truncate">{option}</span>
                    {active && <Check size={14} className={v.accent} aria-hidden="true" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
