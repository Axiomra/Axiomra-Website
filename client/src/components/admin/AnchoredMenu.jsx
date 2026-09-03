import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

const GAP = 6;
const EDGE = 8;

/**
 * A popover pinned to a trigger element, rendered into <body>.
 *
 * Every menu in this panel used to be `position: absolute` inside its trigger,
 * and every one of them was clipped by something: the header sets
 * `overflow: hidden` for its backdrop, table cells set it for the fixed layout,
 * and the table itself is an `overflow: auto` scroller. A portal escapes all
 * three; `fixed` coordinates re-measured on scroll keep the menu attached to
 * the trigger anyway.
 *
 * It also flips above the trigger when there is no room below, so a chip in the
 * last visible row still opens a menu you can read.
 */
export default function AnchoredMenu({
  anchorRef,
  open,
  onClose,
  width = 200,
  // "left" lines the menu up with the trigger's left edge, "right" with its right.
  align = "left",
  estimatedHeight = 260,
  className = "",
  children,
}) {
  const [pos, setPos] = useState(null);
  const menuRef = useRef(null);

  const place = useCallback(() => {
    const el = anchorRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const room = window.innerHeight - r.bottom;
    const flip = room < estimatedHeight + 12 && r.top > room;

    const rawLeft = align === "right" ? r.right - width : r.left;
    setPos({
      left: Math.min(Math.max(EDGE, rawLeft), Math.max(EDGE, window.innerWidth - width - EDGE)),
      top: flip ? undefined : r.bottom + GAP,
      bottom: flip ? window.innerHeight - r.top + GAP : undefined,
    });
  }, [anchorRef, align, width, estimatedHeight]);

  useLayoutEffect(() => {
    if (open) place();
  }, [open, place]);

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (e) => {
      if (anchorRef.current?.contains(e.target)) return;
      if (menuRef.current?.contains(e.target)) return;
      onClose();
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    // Capture phase: a scroll inside the table's own scroller never reaches
    // the window otherwise, and the menu would drift off its chip.
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [open, place, onClose, anchorRef]);

  return createPortal(
    <AnimatePresence>
      {open && pos && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.97 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          style={{ position: "fixed", left: pos.left, top: pos.top, bottom: pos.bottom, width }}
          className={`z-[100] overflow-hidden rounded-xl border border-line bg-surface-card shadow-[0_28px_70px_-20px_rgba(6,10,30,0.55)] ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
