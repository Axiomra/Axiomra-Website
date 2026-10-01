import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

/** Sticky intro on the left, self-stacking case cards on the right. */
const TOP_BASE_REM = 7; // clears the fixed navbar
const TOP_STEP_REM = 1.75;

const cases = [
  {
    challenge: "Back-office work eating the week",
    body: "Teams were re-keying the same invoices, forms and tickets across four systems. We mapped the highest-volume flows, built document extraction on top of them and wired the output straight into the ERP, so the handoffs disappeared instead of moving.",
    metric: "72%",
    metricLabel: "less manual handling",
  },
  {
    challenge: "Decisions made on last month's numbers",
    body: "Reporting arrived too late to act on. We consolidated the operational data into one warehouse, added forecasting on top of it and put the outputs in front of the people who actually make the call: same day, not next month.",
    metric: "4x",
    metricLabel: "faster reporting cycle",
  },
  {
    challenge: "A support queue that never cleared",
    body: "Agents spent their day on repeat questions. We built a retrieval assistant grounded in the real product docs and ticket history, with a clean escalation path, so routine questions resolve instantly and humans keep the hard ones.",
    metric: "63%",
    metricLabel: "tickets deflected",
  },
  {
    challenge: "Data locked in systems that never talk",
    body: "Critical context sat in tools that could not see each other. We built the integration layer and a shared semantic model across them, so every downstream product and model reads from one definition instead of five conflicting ones.",
    metric: "1",
    metricLabel: "source of truth, finally",
  },
  {
    challenge: "Models that worked in the demo, not in production",
    body: "Accuracy drifted the moment real traffic hit. We rebuilt the pipeline with monitoring, automated retraining and rollback baked in, then benchmarked every release before it ships, so performance holds after launch, not just during it.",
    metric: "99.9%",
    metricLabel: "production uptime",
  },
];

function CaseCard({ item, index }) {
  const ref = useRef(null);

  // Dims the card as the next one climbs over it, so the stack reads as depth instead of a flat pile of rectangles.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.28", "end 0.1"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.55]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.965]);

  return (
    <div ref={ref} className="sticky" style={{ top: `${TOP_BASE_REM + index * TOP_STEP_REM}rem` }}>
      <motion.article
        style={{ scale }}
        className="group origin-top overflow-hidden rounded-[1.5rem] border border-line bg-surface-card shadow-card transition-colors duration-300 hover:border-brand"
      >
        <motion.div style={{ opacity }} className="p-7 md:p-10">
          <div className="flex items-start justify-between gap-6">
            <h3 className="font-display text-2xl font-semibold leading-snug text-content transition-colors duration-300 group-hover:text-brand md:text-3xl">
              {item.challenge}
            </h3>
            <span
              className="shrink-0 font-display text-4xl font-semibold tabular-nums text-accent md:text-5xl"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <p className="copy-justify mt-5 text-base leading-relaxed text-content-dim md:text-lg">
            {item.body}
          </p>

          <div className="mt-7 flex items-baseline gap-3 border-t border-line pt-5">
            <span className="font-display text-3xl font-semibold text-brand md:text-4xl">
              {item.metric}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-content-faint md:text-sm">
              {item.metricLabel}
            </span>
          </div>
        </motion.div>
      </motion.article>
    </div>
  );
}

export default function ProvenResults() {
  return (
    <section id="proven-results" className="bg-surface-subtle py-24">
      <div className="mx-auto grid max-w-8xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <p className="mb-4 font-mono text-sm uppercase tracking-[0.2em] text-accent md:text-base">
            Proven Results
          </p>
          <h2 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-content md:text-5xl lg:text-[3.5rem]">
            How We Solve <span className="text-brand">Complex Business Challenges</span>
          </h2>
          <p className="copy-justify mt-6 text-lg leading-relaxed text-content-dim md:text-xl">
            Every engagement starts with a bottleneck that is costing real money. These are the five
            we are asked to fix most often, what we actually build for each, and the number the
            client measured afterwards.
          </p>

          <Link
            to="/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-9 inline-flex items-center gap-2.5 rounded-full border border-line px-7 py-4 text-base font-semibold text-content transition-colors hover:border-brand/50 hover:text-brand focus-ring md:text-lg"
          >
            Discuss Your Challenge
            <ArrowUpRight
              size={19}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>

        <div className="space-y-6">
          {cases.map((item, i) => (
            <CaseCard key={item.challenge} item={item} index={i} />
          ))}
          <div aria-hidden="true" className="h-[35vh]" />
        </div>
      </div>
    </section>
  );
}
