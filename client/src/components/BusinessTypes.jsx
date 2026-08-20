import { useState } from "react";
import { motion } from "framer-motion";
import { Rocket, TrendingUp, Store, Building2, ArrowUpRight } from "lucide-react";
import BusinessTypeModal from "./BusinessTypeModal";

/**
 * The four audiences we sell to, as cards that open a detail dialog.
 *
 * `variant` selects the three.js field the dialog opens with (see
 * BusinessTypeCanvas) — the metaphor is chosen per audience, not shared.
 */
const types = [
  {
    name: "Startups",
    eyebrow: "Pre-seed to Series A",
    icon: Rocket,
    variant: "launch",
    desc: "We help startups validate ideas and build MVPs that scale. Our team guides founders through the entire journey, enabling faster iteration and confident growth from day one.",
    detail:
      "At this stage the expensive mistake is building the wrong thing beautifully. We work backwards from the one assumption your business depends on, put the smallest real system in front of real users, and give you an honest read on whether the model actually holds. What we ship is production code with an evaluation harness attached, not a throwaway prototype — when the answer is yes, you keep building on it instead of starting over.",
    stats: [
      { label: "First working build", value: "4–6 wks" },
      { label: "Team you get", value: "Senior only" },
      { label: "Code ownership", value: "100% yours" },
    ],
    signals: [
      "You have a strong hypothesis and a deadline, but no in-house ML capacity.",
      "Investors are asking for proof the AI part actually works, not a demo video.",
      "You need to ship something real before the next raise, without hiring a team you cannot yet afford.",
      "You are unsure which of three ideas deserves the engineering budget.",
    ],
    deliverables: [
      "A scoped MVP built on your real data, with the success metric agreed up front",
      "An evaluation suite that shows how the system performs before users see it",
      "Cloud infrastructure sized for today, structured to scale without a rewrite",
      "A technical narrative your investors and future CTO can both read",
    ],
    engagement: [
      { title: "Frame", body: "One week to pin down the assumption worth testing and the number that proves it." },
      { title: "Build", body: "Four to six weeks of focused delivery, with a working build in your hands every week." },
      { title: "Decide", body: "A measured result and a straight recommendation — double down, pivot, or stop." },
    ],
    cta: "Validate My Idea",
  },
  {
    name: "Scale-ups",
    eyebrow: "Series A and beyond",
    icon: TrendingUp,
    variant: "growth",
    desc: "Growth creates new opportunities and challenges. As a hands-on AI development partner, we help scale-ups integrate AI and ML to boost efficiency, optimize operations, and expand into new markets.",
    detail:
      "Growth exposes everything the early build got away with: pipelines that break under real volume, models tuned on last year's traffic, manual steps that quietly became someone's full-time job. We come in alongside your team, find the constraint that is actually capping throughput, and rebuild that part properly — with monitoring, retraining, and rollback in place — so the next order of magnitude does not cost you another rewrite.",
    stats: [
      { label: "Typical engagement", value: "3–9 mo" },
      { label: "Delivery model", value: "Embedded" },
      { label: "Handover", value: "Full runbook" },
    ],
    signals: [
      "Volume has grown faster than the system that was built to handle it.",
      "Model accuracy drifts in production and nobody notices until a customer does.",
      "Your engineers spend more time maintaining AI plumbing than shipping product.",
      "New markets need the same system in another language, region, or compliance regime.",
    ],
    deliverables: [
      "Load-tested data pipelines that hold at the volume you are heading toward",
      "MLOps: automated retraining, drift monitoring, versioned rollback",
      "Integration layer so every product surface reads from one definition of the truth",
      "Knowledge transfer to your team, so you are not dependent on us to operate it",
    ],
    engagement: [
      { title: "Audit", body: "Two weeks inside the stack to find the real constraint, not the loudest symptom." },
      { title: "Rebuild", body: "Embedded delivery sprints alongside your engineers, shipping behind flags." },
      { title: "Hand over", body: "Runbooks, dashboards and a trained team that owns the system after we leave." },
    ],
    cta: "Fix My Growth Bottleneck",
  },
  {
    name: "Small & Medium Businesses",
    eyebrow: "Established operators",
    icon: Store,
    variant: "lattice",
    desc: "SMBs often face outdated systems, architectural bottlenecks, and constant pressure to modernize. Our AI and machine learning services deliver solutions that improve competitiveness and fuel sustainable growth.",
    detail:
      "You do not need an AI strategy — you need three specific hours a day back. We start with the workflows your people actually complain about: the re-keying, the chasing, the reports that get rebuilt by hand every Monday. Those get automated first, on top of the systems you already run, so the payback is visible in the first quarter rather than promised for the next fiscal year. Nothing gets ripped out that still works.",
    stats: [
      { label: "First result", value: "30–60 days" },
      { label: "Typical saving", value: "15–25 hrs/wk" },
      { label: "System changes", value: "Additive only" },
    ],
    signals: [
      "The same data gets typed into two or three systems every single day.",
      "Your best people spend their week on work a rule could do.",
      "Software you depend on is a decade old and nobody wants to touch it.",
      "You have been quoted a transformation programme when you wanted a fix.",
    ],
    deliverables: [
      "Document and invoice extraction wired straight into the tools you already use",
      "Workflow automation across CRM, ERP, email and spreadsheets — no migration required",
      "An AI assistant grounded in your own documents, not the open internet",
      "Reporting that builds itself, with the numbers your team already trusts",
    ],
    engagement: [
      { title: "Map", body: "We sit with your team for a week and time the work that actually eats the day." },
      { title: "Automate", body: "The highest-volume flow goes live first, so the saving arrives before the invoice." },
      { title: "Extend", body: "Each following flow reuses the same foundation, so it costs less than the last." },
    ],
    cta: "Show Me What To Automate",
  },
  {
    name: "Enterprises",
    eyebrow: "Multi-team organisations",
    icon: Building2,
    variant: "globe",
    desc: "We partner with enterprises to design and implement enterprise-grade AI-powered solutions. Our comprehensive AI and ML services drive innovation, efficiency, and scalability across departments.",
    detail:
      "Enterprise AI rarely fails on the modelling. It fails on data access, security review, and the fact that four departments each hold a different version of the same number. We design for that reality from the first sprint: role-based access, audit trails, data residency and PII handling are built in rather than bolted on before review, and every model decision stays traceable back to the data that produced it. Then we roll it out one department at a time, with the business case measured at each step.",
    stats: [
      { label: "Programme scale", value: "6–24 mo" },
      { label: "Compliance", value: "SOC 2 · GDPR" },
      { label: "Departments served", value: "12+" },
    ],
    signals: [
      "Critical context is spread across systems that were never designed to talk.",
      "Every AI initiative stalls at security review or procurement.",
      "Pilots succeed in one department and never make it to a second.",
      "You need auditable, explainable decisions — not a model nobody can defend.",
    ],
    deliverables: [
      "A shared semantic layer so every team works from one definition of the truth",
      "Multi-model architecture with governance, audit trails and access control built in",
      "Security, residency and PII handling designed in from the first sprint",
      "A department-by-department rollout with the business case measured at each step",
    ],
    engagement: [
      { title: "Assess", body: "Data, architecture and compliance readiness reviewed before a line of model code." },
      { title: "Prove", body: "One department, one measurable outcome, delivered inside your governance model." },
      { title: "Scale", body: "The proven pattern repeated across departments on shared, governed foundations." },
    ],
    cta: "Plan My AI Programme",
  },
];

export default function BusinessTypes() {
  const [active, setActive] = useState(null);

  return (
    <section className="mx-auto max-w-8xl px-6 py-28 md:py-36">
      <div className="mx-auto mb-16 max-w-4xl text-center md:mb-20">
        <p className="mb-4 font-mono text-sm uppercase tracking-widest text-accent">
          Who benefits from our expertise?
        </p>
        <h2 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
          Explore The <span className="text-brand">Range Of Businesses</span> We Can Work With
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-content-dim md:text-xl md:leading-relaxed">
          We specialize in bespoke, advanced technology solutions that drive innovation and efficiency —
          whether you&rsquo;re developing a new prototype or broadening your market presence.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        {types.map((t, i) => {
          const Icon = t.icon;
          return (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {/* A real <button>: the whole card is the control, so it has to be
                  keyboard-reachable and announce itself as one. `text-left`
                  undoes the centring a button applies by default. */}
              <button
                type="button"
                onClick={() => setActive(t)}
                aria-haspopup="dialog"
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-xl2 border border-line bg-surface-card p-9 text-left transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-glow focus-ring md:p-12"
              >
                {/* Brand wash that lights up on hover, behind the content. */}
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />

                <div className="relative flex flex-1 flex-col">
                  <div className="mb-7 flex items-start justify-between gap-4">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-inverse-fg">
                      <Icon size={26} aria-hidden="true" />
                    </span>
                    <span
                      className="font-display text-4xl font-semibold tabular-nums text-content-faint/30 transition-colors duration-300 group-hover:text-brand/40"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-accent">
                    {t.eyebrow}
                  </p>
                  <h3 className="mb-4 font-display text-2xl font-semibold md:text-3xl">{t.name}</h3>
                  <p className="text-base leading-relaxed text-content-dim md:text-lg md:leading-relaxed">
                    {t.desc}
                  </p>

                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                    View the full breakdown
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      <BusinessTypeModal item={active} onClose={() => setActive(null)} />
    </section>
  );
}
