import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import logoDark from "../assets/1.png";
import logoLight from "../assets/2.png";

const links = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services", dropdown: ["AI Development", "Generative AI", "Agentic AI", "Computer Vision", "NLP"] },
  { label: "Industries", href: "#industries", dropdown: ["Healthcare", "Fashion", "Finance", "Retail", "Education"] },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Company", href: "#process" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoverIdx, setHoverIdx] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Over the dark hero -> light (white) logo + white text.
  // Once scrolled past hero -> white navbar + dark logo, per brief.
  const isDark = !scrolled;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-xl shadow-card" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#home" className="focus-ring">
          <img src={isDark ? logoLight : logoDark} alt="Axiomra" className="h-10 w-auto transition-all duration-500" />
        </a>

        <ul className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {links.map((l, i) => (
            <li
              key={l.label}
              className="relative"
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(null)}
            >
              <a
                href={l.href}
                className={`flex items-center gap-1 transition-colors focus-ring ${
                  isDark ? "text-white/90 hover:text-white" : "text-ink hover:text-periwinkle"
                }`}
              >
                {l.label}
                {l.dropdown && <ChevronDown size={14} />}
              </a>
              <AnimatePresence>
                {l.dropdown && hoverIdx === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-3 w-56 bg-white rounded-xl shadow-card border border-mist py-2 text-ink"
                  >
                    {l.dropdown.map((d) => (
                      <a key={d} href="#services" className="block px-4 py-2.5 text-sm hover:bg-mist-50 hover:text-periwinkle transition-colors">
                        {d}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <a href="#contact" className={`text-sm font-medium px-4 py-2.5 rounded-full border transition-colors focus-ring ${
            isDark ? "border-white/30 text-white hover:bg-white/10" : "border-ink/15 text-ink hover:bg-mist-50"
          }`}>
            Contact us
          </a>
          <a href="#contact" className="text-sm font-medium bg-gradient-to-r from-teal to-periwinkle text-white px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity focus-ring">
            Book a call
          </a>
        </div>

        <button
          className={`lg:hidden focus-ring ${isDark ? "text-white" : "text-ink"}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t border-mist px-6 py-4 flex flex-col gap-4 overflow-hidden"
          >
            {links.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="text-ink font-medium">{l.label}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="bg-gradient-to-r from-teal to-periwinkle text-white text-center py-2.5 rounded-full font-medium">
              Book a call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
