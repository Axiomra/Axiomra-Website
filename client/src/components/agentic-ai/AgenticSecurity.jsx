import { motion } from "framer-motion";
import { KeyRound, Lock, UserCheck, LifeBuoy, ShieldAlert, Scale } from "lucide-react";
import { security } from "../../data/agenticAiData";

const ICONS = [KeyRound, Lock, UserCheck, LifeBuoy, ShieldAlert, Scale];

/** The governance band, on dark and without a WebGL field. */
export default function AgenticSecurity() {
  return (
    <section
      id="agentic-ai-security"
      data-nav-tone="dark"
      className="relative overflow-hidden bg-inverse py-20 md:py-28"
    >
      {/* Faint grid, not particles, a plan, not a swarm. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,139,227,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(120,139,227,0.5) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(70% 60% at 50% 40%, black, transparent)",
          WebkitMaskImage: "radial-gradient(70% 60% at 50% 40%, black, transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-8xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="mb-4 font-mono text-sm uppercase tracking-[0.2em] text-accent-vivid md:text-base">
            {security.eyebrow}
          </p>
          <h2 className="font-display text-3xl font-semibold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl">
            <span className="text-gradient">{security.titleAccent}</span> {security.titleLead}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/70 md:text-xl">
            {security.subtitle}
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl2 border border-white/12 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {security.items.map((item, i) => {
            const Icon = ICONS[i] ?? ShieldAlert;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
                className="group bg-inverse p-8 transition-colors hover:bg-inverse-card md:p-10"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl2 border border-white/15 bg-white/[0.05] text-accent-vivid transition-colors group-hover:border-brand/50">
                  <Icon size={21} aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold text-white md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-white/65 md:text-lg">
                  {item.body}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
