import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Phone, Search } from "lucide-react";
import { COUNTRIES } from "../data/countryCodes";
import { variantOf } from "../lib/fieldStyles";

/**
 * Phone input with a searchable country-code picker.
 *
 * A native <select> is deliberately avoided: it cannot render the flag beside
 * the dial code on every platform and it cannot be searched, which is painful
 * with 100+ entries. The dial code is always rendered as text next to the flag
 * because Windows ships no colour glyphs for regional-indicator pairs.
 *
 * The caller owns both halves of the value (country + national number) so it
 * can submit them however it likes.
 */
export default function PhoneField({
  id,
  name = "phone",
  variant = "light",
  country,
  onCountryChange,
  value,
  onChange,
  onBlur,
  required = false,
  invalid = false,
  describedBy,
  placeholder = "555 123 4567",
}) {
  const v = variantOf(variant);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef(null);
  const searchRef = useRef(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.iso.toLowerCase().includes(q) ||
        c.dial.replace("+", "").startsWith(q.replace("+", ""))
    );
  }, [query]);

  // Closing always clears the search, so the next open starts from the full
  // list. Clearing it in an effect instead would render the stale query for
  // a frame on the way back in.
  const closeMenu = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  // Close on outside click and on Escape; both are expected of a popup.
  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) closeMenu();
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, closeMenu]);

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  const select = (c) => {
    onCountryChange(c);
    closeMenu();
  };

  return (
    <div ref={wrapRef} className="relative">
      <div
        className={`flex items-stretch overflow-hidden rounded-xl border transition-all ${v.shell} ${
          invalid ? "!border-danger" : ""
        }`}
      >
        <button
          type="button"
          onClick={() => (open ? closeMenu() : setOpen(true))}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`Country calling code, currently ${country.name} ${country.dial}`}
          className={`focus-ring flex shrink-0 items-center gap-1.5 px-3.5 transition-colors ${v.text} ${v.trigger}`}
        >
          <span aria-hidden="true" className="text-lg leading-none">
            {country.flag}
          </span>
          <span className="text-base tabular-nums">{country.dial}</span>
          <ChevronDown
            size={15}
            aria-hidden="true"
            className={`${v.muted} transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        <span aria-hidden="true" className={`my-2.5 w-px shrink-0 ${v.divider}`} />

        <div className="relative flex-1">
          <Phone
            size={16}
            aria-hidden="true"
            className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 ${v.accent} opacity-70`}
          />
          <input
            id={id}
            name={name}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            required={required}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            placeholder={placeholder}
            className={`w-full bg-transparent py-3.5 pl-10 pr-4 text-base outline-none ${v.text} ${v.placeholder}`}
          />
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className={`absolute left-0 top-[calc(100%+8px)] z-40 w-full min-w-[17rem] origin-top overflow-hidden rounded-xl border ${v.panel}`}
          >
            <div className="p-2.5">
              <div className="relative">
                <Search
                  size={15}
                  aria-hidden="true"
                  className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${v.muted}`}
                />
                <input
                  ref={searchRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (results[0]) select(results[0]);
                    }
                  }}
                  placeholder="Search country or code"
                  aria-label="Search country or dial code"
                  className={`w-full rounded-lg border py-2 pl-9 pr-3 text-sm outline-none ${v.search}`}
                />
              </div>
            </div>

            <ul role="listbox" aria-label="Country calling code" className="max-h-60 overflow-y-auto pb-2">
              {results.map((c) => {
                const active = c.iso === country.iso;
                return (
                  <li key={c.iso}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => select(c)}
                      className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm transition-colors ${
                        active ? v.optionActive : v.option
                      }`}
                    >
                      <span aria-hidden="true" className="text-base leading-none">
                        {c.flag}
                      </span>
                      <span className="flex-1 truncate">{c.name}</span>
                      <span className={`tabular-nums ${v.muted}`}>{c.dial}</span>
                      {active && <Check size={14} className={v.accent} aria-hidden="true" />}
                    </button>
                  </li>
                );
              })}
              {results.length === 0 && (
                <li className={`px-3.5 py-3 text-sm ${v.muted}`}>No match.</li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
