import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import SectionHeading from "../components/SectionHeading";

const defaultFaqs = [
  { q: "Who does Axiomra serve as an AI development partner?", a: "SMBs, growth-stage companies, and global enterprises (especially in healthcare, finance, and retail), moving from manual workflows to automated, data-driven operations." },
  { q: "What makes Axiomra different from other AI development companies?", a: "We focus on production-grade engineering, not prototypes. A 100% in-house team of 25+ experts ensures every solution is scalable, secure, and delivers measurable ROI within two quarters." },
  { q: "Why should I choose an AI development company for my global project?", a: "You get access to elite engineering talent at a competitive price point, with 300+ successful projects delivered globally." },
  { q: "What industries does your AI development company have experience in?", a: "Extensive experience across healthcare, fashion, sports, education, real estate, and more, 300+ projects delivered or in progress." },
  { q: "Does Axiomra offer post-development support?", a: "Yes: complete post-launch care across AI, software, data, and design, to keep your solution performing as you scale." },
  { q: "How much does it cost to build custom software?", a: "Cost depends on project complexity, chosen tech stack, and ongoing maintenance needs. Book a free session and we'll scope it honestly." },
  { q: "How do I get started with Axiomra?", a: "Book a free strategy session. We'll analyze your business challenges and provide a clear roadmap for automating your processes." },
];

export default function FAQ({
  id = "faq",
  eyebrow = "Your questions answered here",
  title = "Frequently Asked Questions",
  items = defaultFaqs,
}) {
  const [open, setOpen] = useState(0);

  return (
    <section id={id} className="mx-auto max-w-8xl px-4 py-24 sm:px-6">
      <SectionHeading className="mb-14" eyebrow={eyebrow} title={title} />

      <div className="space-y-3">
        {items.map((f, i) => {
          const isOpen = open === i;
          const panelId = `${id}-panel-${i}`;
          const buttonId = `${id}-button-${i}`;
          return (
            <div key={f.q} className="overflow-hidden rounded-xl2 border border-line bg-surface-subtle">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left focus-ring"
              >
                <span className="text-base font-medium text-content md:text-lg">{f.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="ml-4 shrink-0 text-brand"
                  aria-hidden="true"
                >
                  <Plus size={20} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-6 pb-6 text-base leading-relaxed text-content-dim md:text-lg">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
