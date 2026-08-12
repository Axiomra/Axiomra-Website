import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  { q: "Who does Axiomra serve as an AI development partner?", a: "SMBs, growth-stage companies, and global enterprises — especially in healthcare, finance, and retail — moving from manual workflows to automated, data-driven operations." },
  { q: "What makes Axiomra different from other AI development companies?", a: "We focus on production-grade engineering, not prototypes. A 100% in-house team of 25+ experts ensures every solution is scalable, secure, and delivers measurable ROI within two quarters." },
  { q: "Why should I choose an AI development company for my global project?", a: "You get access to elite engineering talent at a competitive price point, with 300+ successful projects delivered globally." },
  { q: "What industries does your AI development company have experience in?", a: "Extensive experience across healthcare, fashion, sports, education, real estate, and more — 300+ projects delivered or in progress." },
  { q: "Does Axiomra offer post-development support?", a: "Yes — complete post-launch care across AI, software, data, and design, to keep your solution performing as you scale." },
  { q: "How much does it cost to build custom software?", a: "Cost depends on project complexity, chosen tech stack, and ongoing maintenance needs. Book a free session and we'll scope it honestly." },
  { q: "How do I get started with Axiomra?", a: "Book a free strategy session. We'll analyze your business challenges and provide a clear roadmap for automating your processes." },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="max-w-3xl mx-auto px-6 py-24">
      <p className="text-xs font-mono uppercase tracking-widest text-teal-dark mb-3 text-center">Your questions answered here</p>
      <h2 className="font-display font-semibold text-3xl md:text-4xl text-center mb-12">Frequently Asked Questions</h2>

      <div className="space-y-3">
        {faqs.map((f, i) => (
          <div key={f.q} className="border border-mist rounded-xl2 bg-mist-50 overflow-hidden">
            <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between px-6 py-5 text-left focus-ring">
              <span className="font-medium text-sm md:text-base">{f.q}</span>
              <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.25 }} className="text-periwinkle shrink-0 ml-4">
                <Plus size={20} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                  <p className="px-6 pb-5 text-sm text-ink-dim leading-relaxed">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
