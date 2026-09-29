import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarClock,
  CheckCircle2,
  FlaskConical,
  Mail,
  Rocket,
  Sparkles,
  User,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";
import PhoneField from "../components/PhoneField";
import FieldError from "../components/FieldError";
import HoneypotField from "../components/HoneypotField";
import SubmissionModal from "../components/SubmissionModal";
import { DEFAULT_COUNTRY } from "../data/countryCodes";
import { submitContact } from "../lib/contactApi";
import { useSpamGuard } from "../lib/useSpamGuard";
import { COMPLEXITY, PROJECT_TYPES, SIZE, TIMELINE, estimate, money } from "../lib/costEstimate";
import {
  formatPhone,
  validateCompany,
  validateEmail,
  validateName,
  validatePhone,
} from "../lib/validation";

const TYPE_ICONS = { new: Sparkles, poc: FlaskConical, mvp: Rocket, upgrade: Wrench };

const STEPS = ["Project Type", "Estimation", "Schedule a Call"];

const TEAL = "#14D8C4";

const FIELD =
  "w-full rounded-xl border border-white/10 bg-[#0F2C3A] py-3.5 pl-11 pr-4 text-base text-white outline-none transition-all placeholder:text-white/35 focus:border-[#14D8C4] focus:ring-4 focus:ring-[#14D8C4]/15";

const EMPTY_LEAD = { name: "", company: "", email: "", phone: "" };

/** A selectable tile; `wide` is the big icon card used on step one. */
function Option({ active, onClick, label, hint, icon: Icon, wide = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`focus-ring group relative flex w-full flex-col rounded-2xl border text-left transition-all duration-300 ${
        wide ? "items-center p-6 text-center" : "p-4"
      } ${
        active
          ? "border-[#14D8C4] bg-[#14D8C4]/10 shadow-[0_0_0_1px_#14D8C4,0_18px_40px_-20px_rgba(20,216,196,0.7)]"
          : "border-white/10 bg-white/[0.03] hover:border-[#14D8C4]/50 hover:bg-white/[0.06]"
      }`}
    >
      {active && (
        <CheckCircle2
          size={18}
          className="absolute right-3 top-3 text-[#14D8C4]"
          aria-hidden="true"
        />
      )}
      {Icon && (
        <span
          className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-colors ${
            active ? "bg-[#14D8C4] text-[#0A1428]" : "bg-white/5 text-[#14D8C4]"
          }`}
        >
          <Icon size={26} strokeWidth={1.7} aria-hidden="true" />
        </span>
      )}
      <span className={`font-display font-semibold text-white ${wide ? "text-lg" : "text-base"}`}>
        {label}
      </span>
      <span className="mt-1 text-sm leading-snug text-white/55">{hint}</span>
    </button>
  );
}

function Group({ title, options, value, onChange }) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#8FEFE5]">
        {title}
      </legend>
      <div className="grid gap-3 sm:grid-cols-3">
        {options.map((o) => (
          <Option
            key={o.id}
            active={value === o.id}
            onClick={() => onChange(o.id)}
            label={o.label}
            hint={o.hint}
          />
        ))}
      </div>
    </fieldset>
  );
}

/** The live budget panel shown beside step two and above step three. */
function Estimate({ result }) {
  const stats = [
    { icon: CalendarClock, label: "Est. duration", value: `${result.weeks} weeks` },
    { icon: Users, label: "Team size", value: `${result.team} specialists` },
    { icon: Wallet, label: "Run cost / month", value: `~${money(result.monthlyRun)}` },
  ];
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#14D8C4] p-6 text-[#0A1428] md:p-8">
      <p className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-[#0A1428]/70">
        Your estimated budget range
      </p>
      <AnimatePresence mode="wait">
        <motion.p
          key={`${result.low}-${result.high}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="mt-2 text-center font-display text-5xl font-bold tabular-nums md:text-6xl"
          aria-live="polite"
        >
          {money(result.low)} – {money(result.high)}
        </motion.p>
      </AnimatePresence>
      <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs font-semibold">
        {[
          result.type.label,
          `Complexity: ${result.complexity.label}`,
          `Size: ${result.size.label}`,
          `Timeline: ${result.timeline.label}`,
        ].map((chip) => (
          <span key={chip} className="rounded-full bg-[#0A1428]/10 px-3 py-1">
            {chip}
          </span>
        ))}
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-xl bg-[#0A1428] px-4 py-3 text-center">
            <p className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-[0.14em] text-white/55">
              <Icon size={13} className="text-[#14D8C4]" aria-hidden="true" />
              {label}
            </p>
            <p className="mt-1 font-display text-lg font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const VALIDATORS = {
  name: (f) => validateName(f.name),
  company: (f) =>
    f.company.trim() ? validateCompany(f.company) : "Please enter your company name.",
  email: (f) => validateEmail(f.email),
  phone: (f, country) => validatePhone(f.phone, country, { required: true }),
};

export default function RoiCalculator() {
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState({
    type: "new",
    complexity: "moderate",
    size: "medium",
    timeline: "standard",
  });
  const [lead, setLead] = useState(EMPTY_LEAD);
  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(null);
  const formRef = useRef(null);
  const { honeypotRef, signals, restart } = useSpamGuard();

  const result = estimate(sel);
  const pick = (key) => (id) => setSel((s) => ({ ...s, [key]: id }));

  const onChange = (e) => {
    const { name, value } = e.target;
    setLead((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const msg = VALIDATORS[name]({ ...lead, [name]: value }, country);
      const copy = { ...prev };
      if (msg) copy[name] = msg;
      else delete copy[name];
      return copy;
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = Object.fromEntries(
      Object.entries(VALIDATORS)
        .map(([k, fn]) => [k, fn(lead, country)])
        .filter(([, m]) => m)
    );
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(VALIDATORS).find((k) => found[k]);
      formRef.current?.querySelector(`[name="${first}"]`)?.focus();
      return;
    }

    const range = `${money(result.low)} – ${money(result.high)}`;
    const payload = {
      name: lead.name,
      email: lead.email,
      company: lead.company,
      phone: formatPhone(lead.phone, country),
      subject: `AI cost estimate: ${result.type.label} (${range})`,
      service: result.type.label,
      message: [
        "Submitted from the homepage AI cost calculator.",
        `Project type: ${result.type.label}`,
        `AI complexity: ${result.complexity.label}`,
        `Project size: ${result.size.label}`,
        `Timeline: ${result.timeline.label}`,
        `Estimated budget: ${range}`,
        `Estimated duration: ${result.weeks} weeks, team of ${result.team}`,
      ].join("\n"),
    };

    setStatus("loading");
    setError("");
    try {
      await submitContact({ ...payload, ...signals() });
      setSent(payload);
      setStatus("success");
      setLead(EMPTY_LEAD);
      setCountry(DEFAULT_COUNTRY);
      restart();
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  };

  const describe = (f) => (errors[f] ? `est-${f}-error` : undefined);
  const cls = (f) => `${FIELD} ${errors[f] ? "!border-danger" : ""}`;

  const panel = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
    transition: { duration: 0.3, ease: "easeOut" },
  };

  return (
    <section
      id="roi-calculator"
      className="relative overflow-hidden bg-[#0A1428] px-4 py-24 sm:px-6"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(${TEAL} 1px, transparent 1px)`,
          backgroundSize: "26px 26px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#14D8C4]/40 bg-[#14D8C4]/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-[#14D8C4]">
            AI Cost Calculator
          </p>
          <h2 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
            Estimate The Cost Of <span className="text-[#14D8C4]">Your AI Project</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl">
            Pick what you want to build, tune complexity, size and timeline, and see a budget range
            instantly. Then book a free 30-minute scoping call to turn it into a fixed quote.
          </p>
        </div>

        <div className="mt-12 rounded-[1.75rem] border border-white/10 bg-[#0F1E33] p-5 shadow-[0_40px_90px_-40px_rgba(20,216,196,0.4)] md:p-10">
          {/* Stepper */}
          <ol className="mb-10 grid grid-cols-3 gap-3">
            {STEPS.map((label, i) => (
              <li key={label}>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-[#14D8C4]"
                    initial={false}
                    animate={{ width: i <= step ? "100%" : "0%" }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  />
                </div>
                <p
                  className={`mt-2 text-xs font-semibold uppercase tracking-[0.14em] md:text-sm ${
                    i <= step ? "text-[#14D8C4]" : "text-white/40"
                  }`}
                  aria-current={i === step ? "step" : undefined}
                >
                  <span className="mr-1.5 opacity-70">0{i + 1}</span>
                  {label}
                </p>
              </li>
            ))}
          </ol>

          <AnimatePresence mode="wait" initial={false}>
            {step === 0 && (
              <motion.div key="s0" {...panel}>
                <h3 className="mb-6 text-center font-display text-2xl font-semibold text-white md:text-3xl">
                  What would you like to do?
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {PROJECT_TYPES.map((t) => (
                    <Option
                      key={t.id}
                      wide
                      icon={TYPE_ICONS[t.id]}
                      active={sel.type === t.id}
                      onClick={() => pick("type")(t.id)}
                      label={t.label}
                      hint={t.hint}
                    />
                  ))}
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="focus-ring inline-flex items-center gap-2 rounded-full bg-accent-vivid px-7 py-3.5 text-base font-semibold text-on-accent transition-all hover:bg-accent-vivid-hover hover:shadow-glow"
                  >
                    Next step <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="s1" {...panel}>
                <h3 className="mb-6 font-display text-2xl font-semibold text-white md:text-3xl">
                  Configure your project
                </h3>
                <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                  <div className="space-y-7">
                    <Group
                      title="AI complexity"
                      options={COMPLEXITY}
                      value={sel.complexity}
                      onChange={pick("complexity")}
                    />
                    <Group
                      title="Project size"
                      options={SIZE}
                      value={sel.size}
                      onChange={pick("size")}
                    />
                    <Group
                      title="Timeline"
                      options={TIMELINE}
                      value={sel.timeline}
                      onChange={pick("timeline")}
                    />
                  </div>
                  <div className="lg:sticky lg:top-28 lg:self-start">
                    <Estimate result={result} />
                    <p className="mt-4 text-xs leading-relaxed text-white/45">
                      Directional range based on similar Axiomra projects. Final pricing is fixed
                      after a scoping call.
                    </p>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-base font-medium text-white transition-colors hover:border-[#14D8C4]"
                  >
                    <ArrowLeft size={18} /> Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="focus-ring inline-flex items-center gap-2 rounded-full bg-accent-vivid px-7 py-3.5 text-base font-semibold text-on-accent transition-all hover:bg-accent-vivid-hover hover:shadow-glow"
                  >
                    Schedule a free 30-min scoping call <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" {...panel}>
                <div className="grid gap-8 lg:grid-cols-2">
                  <div>
                    <Estimate result={result} />
                  </div>
                  <form ref={formRef} noValidate onSubmit={onSubmit} className="relative">
                    <HoneypotField inputRef={honeypotRef} />
                    <h3 className="mb-6 font-display text-2xl font-semibold text-white md:text-3xl">
                      Great! There&rsquo;s only{" "}
                      <span className="text-[#14D8C4]">one step left</span>.
                    </h3>
                    <div className="space-y-4">
                      {[
                        { name: "name", icon: User, placeholder: "Full name*", auto: "name" },
                        {
                          name: "company",
                          icon: Building2,
                          placeholder: "Company name*",
                          auto: "organization",
                        },
                        {
                          name: "email",
                          icon: Mail,
                          placeholder: "Business email*",
                          auto: "email",
                          type: "email",
                        },
                      ].map(({ name, icon: Icon, placeholder, auto, type = "text" }) => (
                        <div key={name}>
                          <div className="relative">
                            <Icon
                              size={17}
                              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#14D8C4]/80"
                              aria-hidden="true"
                            />
                            <input
                              name={name}
                              type={type}
                              autoComplete={auto}
                              value={lead[name]}
                              onChange={onChange}
                              aria-label={placeholder.replace("*", "")}
                              aria-invalid={errors[name] ? true : undefined}
                              aria-describedby={describe(name)}
                              placeholder={placeholder}
                              className={cls(name)}
                            />
                          </div>
                          <FieldError id={`est-${name}-error`} message={errors[name]} />
                        </div>
                      ))}
                      <div>
                        <PhoneField
                          id="est-phone"
                          variant="dark"
                          country={country}
                          onCountryChange={setCountry}
                          value={lead.phone}
                          onChange={onChange}
                          invalid={Boolean(errors.phone)}
                          describedBy={describe("phone")}
                        />
                        <FieldError id="est-phone-error" message={errors.phone} />
                      </div>
                    </div>

                    <p role="status" aria-live="polite" className="mt-3 min-h-[1.25rem] text-sm">
                      {status === "error" && <span className="text-danger">{error}</span>}
                    </p>

                    <div className="mt-3 flex flex-wrap justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-base font-medium text-white transition-colors hover:border-[#14D8C4]"
                      >
                        <ArrowLeft size={18} /> Back
                      </button>
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="focus-ring inline-flex items-center gap-2 rounded-full bg-accent-vivid px-7 py-3.5 text-base font-semibold text-on-accent transition-all hover:bg-accent-vivid-hover hover:shadow-glow disabled:opacity-60"
                      >
                        {status === "loading" ? "Booking..." : "Book my call"}
                        {status !== "loading" && <ArrowRight size={18} />}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <SubmissionModal
        open={status === "success" && Boolean(sent)}
        submission={sent}
        onClose={() => {
          setStatus("idle");
          setSent(null);
          setStep(0);
        }}
      />
    </section>
  );
}
