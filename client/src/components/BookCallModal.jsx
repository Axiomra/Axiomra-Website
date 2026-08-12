import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";

export default function BookCallModal() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onLeave = (e) => {
      if (e.clientY < 40 && !dismissed) setShow(true);
    };
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", onLeave);
    }, 8000); // don't trigger immediately on load
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [dismissed]);

  const close = () => {
    setShow(false);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-navy/70 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-xl2 shadow-glow max-w-md w-full p-8 text-center"
          >
            <button onClick={close} className="absolute top-4 right-4 text-ink-faint hover:text-ink focus-ring" aria-label="Close">
              <X size={20} />
            </button>
            <h3 className="font-display font-semibold text-2xl mb-3">Book A Free Call With Our AI Specialist</h3>
            <p className="text-ink-dim text-sm mb-6">
              Your desired idea is just a phone call away. Just pitch us your idea, thought,
              design, or project, and we will deliver the best possible solution right to your inbox.
            </p>
            <a href="#contact" onClick={close}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal to-periwinkle text-white font-medium px-6 py-3 rounded-full hover:opacity-90 transition-opacity focus-ring">
              Book My Free Consultation <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
