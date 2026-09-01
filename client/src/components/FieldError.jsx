import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

/**
 * Inline validation message under a form field.
 *
 * Rendered with an id so the input can point at it via aria-describedby: a
 * screen reader then reads the reason along with the field, instead of the
 * visitor only learning something is wrong from a red border they cannot see.
 */
export default function FieldError({ id, message }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          key={message}
          id={id}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="mt-1.5 flex items-start gap-1.5 text-sm text-danger"
        >
          <AlertCircle size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
