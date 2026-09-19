import { useEffect, useMemo, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BadgeDollarSign,
  CalendarCheck,
  Clock,
  Info,
  LineChart,
  Users,
  Wallet,
} from "lucide-react";

/** Interactive savings estimator. */
const WORKING_WEEKS = 52;
/** Annual run cost as a share of the build: hosting, monitoring, retraining. */
const RUN_RATE_SHARE = 0.15;

const AREAS = [
  {
    id: "support",
    label: "Customer Support",
    efficiency: 0.72,
    note: "Handle routine support enquiries, draft responses, and update CRM records.",
    preset: { people: 14, rate: 28, hours: 12, investment: 45 },
  },
  {
    id: "documents",
    label: "Document Processing",
    efficiency: 0.78,
    note: "Invoice, claim and contract extraction with human review on exceptions only.",
    preset: { people: 8, rate: 32, hours: 16, investment: 60 },
  },
  {
    id: "sales",
    label: "Sales & Lead Ops",
    efficiency: 0.6,
    note: "Lead enrichment, scoring, proposal drafts and pipeline hygiene.",
    preset: { people: 10, rate: 40, hours: 9, investment: 50 },
  },
  {
    id: "reporting",
    label: "Reporting & Analytics",
    efficiency: 0.65,
    note: "Recurring dashboards, variance commentary and data reconciliation.",
    preset: { people: 6, rate: 55, hours: 10, investment: 55 },
  },
  {
    id: "backoffice",
    label: "Back-Office RPA",
    efficiency: 0.8,
    note: "Data entry, reconciliation and system-to-system handoffs.",
    preset: { people: 20, rate: 24, hours: 14, investment: 70 },
  },
];

const INPUTS = [
  {
    key: "people",
    icon: Users,
    label: "People Involved in This Workflow",
    hint: "Headcount touching the workflow today",
    min: 1,
    max: 200,
    step: 1,
    format: (v) => String(v),
  },
  {
    key: "rate",
    icon: BadgeDollarSign,
    label: "Total Hourly Employment Cost",
    hint: "Salary, benefits and overhead per hour",
    min: 10,
    max: 150,
    step: 5,
    format: (v) => `$${v}`,
  },
  {
    key: "hours",
    icon: Clock,
    label: "Hours per Person Available for Automation Each Week",
    hint: "Repetitive work a system could take over",
    min: 1,
    max: 30,
    step: 1,
    format: (v) => `${v}h`,
  },
  {
    key: "investment",
    icon: Wallet,
    // Stored in thousands so the slider step stays readable; the model multiplies back up to dollars.
    label: "Est Implementation Cost",
    hint: "One-off build cost for the first production release",
    min: 10,
    max: 250,
    step: 5,
    format: (v) => `$${v}k`,
  },
];

const usd = (n) => `$${Math.round(n).toLocaleString("en-US")}`;

function AnimatedNumber({ value, prefix = "", suffix = "", decimals = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const from = useRef(0);
  const [display, setDisplay] = useState(0);

  const render = (n) => {
    const body =
      decimals > 0
        ? Math.abs(n).toFixed(decimals)
        : Math.round(Math.abs(n)).toLocaleString("en-US");
    return `${n < 0 ? "-" : ""}${prefix}${body}${suffix}`;
  };

  useEffect(() => {
    if (!inView) return;
    const controls = animate(from.current, value, {
      duration: 0.55,
      ease: "easeOut",
      onUpdate: (v) => {
        from.current = v;
        setDisplay(v);
      },
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{render(display)}</span>
      <span className="sr-only">{render(value)}</span>
    </span>
  );
}

/** One result tile in the 2x2 grid under the headline number. */
function Metric({ icon: Icon, label, children, footnote }) {
  return (
    <div className="rounded-2xl border border-inverse-fg/10 bg-inverse/40 p-5">
      <p className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-inverse-fg/55">
        <Icon size={14} className="text-accent-vivid" aria-hidden="true" />
        {label}
      </p>
      <p className="mt-3 font-display text-2xl font-semibold tabular-nums text-inverse-fg">
        {children}
      </p>
      {footnote && <p className="mt-1.5 text-xs text-inverse-fg/45">{footnote}</p>}
    </div>
  );
}

export default function RoiCalculator() {
  const [areaId, setAreaId] = useState(AREAS[0].id);
  const [values, setValues] = useState(AREAS[0].preset);

  const area = AREAS.find((a) => a.id === areaId);

  const model = useMemo(() => {
    const investment = values.investment * 1000;
    const manualHours = values.people * values.hours * WORKING_WEEKS;
    const recoveredHours = manualHours * area.efficiency;

    const manualCost = manualHours * values.rate;
    const grossSavings = recoveredHours * values.rate;
    const runRate = investment * RUN_RATE_SHARE;
    const netAnnual = grossSavings - runRate;

    const paybackMonths = netAnnual > 0 ? investment / (netAnnual / 12) : null;
    const threeYearNet = netAnnual * 3 - investment;
    const roiMultiple = threeYearNet / investment;

    return {
      investment,
      recoveredHours,
      manualCost,
      grossSavings,
      runRate,
      netAnnual,
      paybackMonths,
      threeYearNet,
      roiMultiple,
      afterCost: manualCost - grossSavings + runRate,
    };
  }, [values, area]);

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: Number(e.target.value) }));

  const selectArea = (next) => {
    setAreaId(next.id);
    setValues(next.preset);
  };

  const afterPct = model.manualCost > 0 ? (model.afterCost / model.manualCost) * 100 : 0;

  return (
    <section id="roi-calculator" className="relative overflow-hidden bg-inverse px-4 py-24 sm:px-6">
      {/* Ambient blooms, matched to the dark CTA bands so the page keeps one visual language for its inverse sections. */}
      <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 animate-float rounded-full bg-accent-vivid/10 blur-3xl" />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 animate-float rounded-full bg-brand/10 blur-3xl"
        style={{ animationDelay: "2.5s" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-8xl"
      >
        <div className="text-center">
          <p className="mb-4 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.2em] text-accent-vivid md:text-base">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-vivid" />
            AI ROI Calculator
          </p>
          <h2 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-inverse-fg md:text-5xl lg:text-6xl">
            Estimate the Annual Value of{" "}
            <span className="text-accent-vivid">Workflow Automation</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-inverse-fg/70 md:text-xl">
            Select a workflow and adjust the inputs to reflect your team. Explore potential savings,
            time recovered, and payback using the assumptions shown below.
          </p>
        </div>

        {/* Workflow selector */}
        <div className="mt-12">
          <p className="mb-4 text-center font-mono text-xs uppercase tracking-[0.18em] text-inverse-fg/45">
            Which workflow would you like to automate?
          </p>
          <div
            role="tablist"
            aria-label="Automation workflow"
            className="flex flex-wrap justify-center gap-2.5"
          >
            {AREAS.map((a) => {
              const active = a.id === areaId;
              return (
                <button
                  key={a.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => selectArea(a)}
                  className={`focus-ring rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 md:text-base ${
                    active
                      ? "border-accent-vivid bg-accent-vivid text-inverse shadow-glow"
                      : "border-inverse-fg/15 bg-inverse-fg/5 text-inverse-fg/70 hover:border-accent-vivid/50 hover:text-inverse-fg"
                  }`}
                >
                  {a.label}
                </button>
              );
            })}
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-inverse-fg/50">
            {area.note}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* Inputs */}
          <div className="rounded-[1.75rem] border border-inverse-fg/10 bg-inverse-soft/70 p-6 backdrop-blur-sm md:p-9">
            <div className="space-y-8">
              {INPUTS.map(({ key, icon: Icon, label, hint, min, max, step, format }) => {
                const pct = ((values[key] - min) / (max - min)) * 100;
                return (
                  <div key={key}>
                    <div className="mb-2.5 flex items-start justify-between gap-4">
                      <label htmlFor={`roi-${key}`} className="flex items-start gap-2.5">
                        <Icon
                          size={18}
                          strokeWidth={1.7}
                          className="mt-0.5 shrink-0 text-accent-vivid"
                          aria-hidden="true"
                        />
                        <span>
                          <span className="block text-base text-inverse-fg/80">{label}</span>
                          <span className="block text-xs text-inverse-fg/40">{hint}</span>
                        </span>
                      </label>
                      <span className="shrink-0 font-display text-xl font-semibold tabular-nums text-inverse-fg">
                        {format(values[key])}
                      </span>
                    </div>

                    <input
                      id={`roi-${key}`}
                      type="range"
                      min={min}
                      max={max}
                      step={step}
                      value={values[key]}
                      onChange={set(key)}
                      className="roi-slider focus-ring w-full"
                      style={{ "--roi-fill": `${pct}%` }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Before / after */}
            <div className="mt-9 border-t border-inverse-fg/10 pt-7">
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-inverse-fg/45">
                Annual cost of this workflow
              </p>

              <div className="space-y-5">
                <div>
                  <div className="mb-2 flex items-baseline justify-between text-sm">
                    <span className="text-inverse-fg/70">Manual today</span>
                    <span className="font-semibold tabular-nums text-inverse-fg">
                      {usd(model.manualCost)}
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-inverse-fg/10">
                    <div className="h-full w-full rounded-full bg-inverse-fg/35" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-baseline justify-between text-sm">
                    <span className="text-inverse-fg/70">With Axiomra automation</span>
                    <span className="font-semibold tabular-nums text-accent-vivid">
                      {usd(model.afterCost)}
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-inverse-fg/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-accent-vivid to-brand"
                      initial={false}
                      animate={{ width: `${Math.max(0, Math.min(100, afterPct))}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-inverse-fg/45">
                    Includes {usd(model.runRate)}/yr to run and retrain the system.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col rounded-[1.75rem] border border-accent-vivid/25 bg-gradient-to-br from-accent-vivid/10 via-inverse-card/60 to-brand/10 p-6 md:p-9">
            <div className="text-center">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-inverse-fg/60 md:text-sm">
                Est Annual Savings After Running Costs
              </p>

              <AnimatedNumber
                value={Math.max(0, model.netAnnual)}
                prefix="$"
                className="mt-4 block font-display text-5xl font-semibold tabular-nums text-accent-vivid md:text-6xl"
              />

              <p className="mt-3 text-base text-inverse-fg/70">
                after the {Math.round(RUN_RATE_SHARE * 100)}% annual run cost, at a{" "}
                {Math.round(area.efficiency * 100)}% automation rate
              </p>
            </div>

            <div className="mt-8 grid gap-3.5 sm:grid-cols-2">
              <Metric icon={Clock} label="Est Hours Recovered" footnote="per year, across the team">
                <AnimatedNumber value={model.recoveredHours} suffix=" h" />
              </Metric>

              <Metric icon={CalendarCheck} label="Est Payback Period" footnote="to earn the build back">
                {model.paybackMonths === null ? (
                  <span className="text-inverse-fg/50">Not in year 1</span>
                ) : model.paybackMonths < 1 ? (
                  <span>Under a month</span>
                ) : (
                  <AnimatedNumber value={model.paybackMonths} decimals={1} suffix=" mo" />
                )}
              </Metric>

              <Metric icon={LineChart} label="Est Three Year Net Value" footnote="net of build and run cost">
                <AnimatedNumber value={model.threeYearNet} prefix="$" />
              </Metric>

              <Metric icon={BadgeDollarSign} label="Est Three Year ROI" footnote="net return over build cost">
                <AnimatedNumber value={model.roiMultiple} decimals={1} suffix="x" />
              </Metric>
            </div>

            <div className="mt-7 flex items-start gap-2.5 rounded-2xl border border-inverse-fg/10 bg-inverse/40 p-4">
              <Info size={16} className="mt-0.5 shrink-0 text-inverse-fg/40" aria-hidden="true" />
              <p className="text-xs leading-relaxed text-inverse-fg/50">
                Model: {values.people} people × {values.hours}h/week × {WORKING_WEEKS} weeks ×{" "}
                {Math.round(area.efficiency * 100)}% automatable = {" "}
                {Math.round(model.recoveredHours).toLocaleString("en-US")} hours at $
                {values.rate}/hour. Build cost {usd(model.investment)}, run cost{" "}
                {Math.round(RUN_RATE_SHARE * 100)}% of build per year. Directional only: we
                replace these with your real numbers in the scoping call.
              </p>
            </div>

            <Link
              to="/contact"
              className="group mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-accent-vivid px-7 py-4 text-base font-semibold text-inverse transition-all hover:shadow-glow focus-ring"
            >
              Get a Tailored Automation Assessment
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            <p className="mt-5 text-center text-xs leading-relaxed text-inverse-fg/50">
              These estimates use the inputs and assumptions shown. Actual results depend on
              implementation scope, adoption, operating costs, and the proportion of work
              successfully automated.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
