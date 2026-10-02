import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarClock,
  Check,
  CheckCircle2,
  FlaskConical,
  Mail,
  Rocket,
  Sparkles,
  User,
  Wrench,
} from "lucide-react";
import PhoneField from "../components/PhoneField";
import FieldError from "../components/FieldError";
import HoneypotField from "../components/HoneypotField";
import { DEFAULT_COUNTRY } from "../data/countryCodes";
import { submitContact } from "../lib/contactApi";
import { BOOKING_URL } from "../lib/booking";
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

// Sky blue for fills and borders; the deeper shade is used for text so labels
// on the frosted card keep AA contrast.
const BLUE = "#4FA8E0";

const FIELD =
  "w-full rounded-xl border border-line bg-surface py-3.5 pl-11 pr-4 text-base text-content outline-none transition-all placeholder:text-content-faint/70 focus:border-[#4FA8E0] focus:ring-4 focus:ring-[#4FA8E0]/20";

const PRIMARY_BTN =
  "focus-ring inline-flex items-center gap-2 rounded-xl bg-[#4FA8E0] px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-[#3A96D1] disabled:opacity-60";

const BACK_BTN =
  "focus-ring inline-flex items-center gap-2 rounded-xl border border-[#4FA8E0] bg-surface/70 px-6 py-3.5 text-base font-medium text-content transition-colors hover:bg-[#4FA8E0]/10";

const EMPTY_LEAD = { name: "", company: "", email: "", phone: "" };

/** A selectable tile; `wide` is the big icon card used on step one. */
function Option({ active, onClick, label, hint, icon: Icon, wide = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`focus-ring group relative flex w-full flex-col rounded-xl border-2 text-left transition-all duration-300 ${
        wide ? "items-center p-6 text-center" : "p-4"
      } ${
        active
          ? "border-[#4FA8E0] bg-[#4FA8E0]/10"
          : "border-[#4FA8E0]/30 bg-surface/70 hover:-translate-y-0.5 hover:border-[#4FA8E0]/70"
      }`}
    >
      {active && (
        <CheckCircle2
          size={18}
          className="absolute right-3 top-3 text-[#4FA8E0]"
          aria-hidden="true"
        />
      )}
      {Icon && (
        <span
          className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-colors ${
            active ? "bg-[#4FA8E0] text-white" : "bg-[#4FA8E0]/15 text-[#1F78B4]"
          }`}
        >
          <Icon size={26} strokeWidth={1.7} aria-hidden="true" />
        </span>
      )}
      <span className={`font-display font-semibold text-content ${wide ? "text-lg" : "text-base"}`}>
        {label}
      </span>
      <span className="mt-1 text-sm leading-snug text-content-dim">{hint}</span>
    </button>
  );
}

function Group({ title, options, value, onChange }) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-[#1F78B4] dark:text-[#7CC2EE]">
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

/** The live budget panel shown on step two and beside the step three form. */
function Estimate({ result }) {
  return (
    <div className="rounded-xl border-2 border-[#4FA8E0]/40 bg-[#4FA8E0]/10 p-6 md:p-8">
      <p className="text-center text-sm text-content-dim">Your Estimated Budget Range</p>
      <AnimatePresence mode="wait">
        <motion.p
          key={`${result.low}-${result.high}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="mt-3 text-center font-display text-5xl font-bold tabular-nums text-[#1F78B4] dark:text-[#7CC2EE] md:text-6xl"
          aria-live="polite"
        >
          {money(result.low)} – {money(result.high)}
        </motion.p>
      </AnimatePresence>
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

export default function RoiCalculator({ solid = false }) {
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
  const formRef = useRef(null);
  const { honeypotRef, signals, restart } = useSpamGuard();

  const result = estimate(sel);
  const pick = (key) => (id) => setSel((s) => ({ ...s, [key]: id }));
  const done = status === "success";

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

    // Goes through the same /api/contact intake as the contact form, so the
    // booking lands in the admin Leads panel and triggers the email alert.
    const range = `${money(result.low)} – ${money(result.high)}`;
    const payload = {
      name: lead.name,
      email: lead.email,
      company: lead.company,
      phone: formatPhone(lead.phone, country),
      subject: `Scoping call request: ${result.type.label} (${range})`,
      service: result.type.label,
      message: [
        "Book my call request from the homepage AI cost calculator.",
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
      setStatus("success");
      setLead(EMPTY_LEAD);
      setCountry(DEFAULT_COUNTRY);
      restart();
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  };

  const startOver = () => {
    setStatus("idle");
    setErrors({});
    setStep(0);
  };

  const describe = (f) => (errors[f] ? `est-${f}-error` : undefined);
  const cls = (f) => `${FIELD} ${errors[f] ? "!border-danger" : ""}`;

  const panel = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
    transition: { duration: 0.3, ease: "easeOut" },
  };

  // The bar fills one third per finished step and completes once the call is booked.
  const progress = done ? 100 : (step / STEPS.length) * 100;

  // overflow-clip, not hidden: the light pools overhang the edges, and a hidden
  // box can still be scrolled sideways when a field inside it takes focus.
  return (
    <section
      id="roi-calculator"
      className={`${solid ? "bg-[#E8F1FD] dark:bg-[#12244A]" : "calc-glass"} relative overflow-clip px-4 py-24 sm:px-6`}
    >
      {/* Soft purple light pools behind the frosted card give the glass
          something to blur, which is what reads as "glossy". The solid
          variant drops them for one flat background colour. */}
      {!solid && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <span className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#B79CFF]/40 blur-3xl" />
          <span className="absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-[#9FB7FF]/35 blur-3xl" />
          <span className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#D6B8FF]/40 blur-3xl" />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/40 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-[#5B3FB8] backdrop-blur-md dark:border-white/15 dark:bg-white/5 dark:text-[#C9B6FF]">
            AI Cost Calculator
          </p>
          <h2 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-content md:text-5xl lg:text-6xl">
            Estimate The Cost Of{" "}
            <span className="text-[#1F78B4] dark:text-[#7CC2EE]">Your AI Project</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-content-dim md:text-xl">
            Pick what you want to build, tune complexity, size and timeline, and see a budget range
            instantly. Then book a free 30-minute scoping call to turn it into a fixed quote.
          </p>
        </div>

        <div className="relative mt-12 overflow-clip rounded-2xl border border-white/70 bg-white/55 p-5 shadow-[0_1px_2px_rgba(16,24,40,0.05),0_6px_16px_-8px_rgba(16,24,40,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_1px_2px_rgba(0,0,0,0.3)] md:p-10">
          {/* Glossy sheen across the top of the glass. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/60 to-transparent dark:from-white/[0.06]"
          />

          <div className="relative">
            {/* Stepper: one continuous bar with the step names underneath. */}
            <div className="mb-10">
              <div className="h-2 overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: BLUE }}
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                />
              </div>
              <ol className="mt-3 grid grid-cols-3 text-sm">
                {STEPS.map((label, i) => (
                  <li
                    key={label}
                    aria-current={i === step ? "step" : undefined}
                    className={`${i === 0 ? "text-left" : i === 1 ? "text-center" : "text-right"} ${
                      i === step
                        ? "font-semibold text-[#1F78B4] dark:text-[#7CC2EE]"
                        : "text-content-faint"
                    }`}
                  >
                    {label}
                  </li>
                ))}
              </ol>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {step === 0 && (
                <motion.div key="s0" {...panel}>
                  <h3 className="mb-6 font-display text-2xl font-semibold text-content">
                    What Would You Like to Do?
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
                    <button type="button" onClick={() => setStep(1)} className={PRIMARY_BTN}>
                      Next step <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="s1" {...panel}>
                  <h3 className="mb-6 font-display text-2xl font-semibold text-content">
                    Configure Your Project
                  </h3>
                  <div className="space-y-7">
                    <Group
                      title="AI Complexity"
                      options={COMPLEXITY}
                      value={sel.complexity}
                      onChange={pick("complexity")}
                    />
                    <Group
                      title="Project Size"
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
                    <div>
                      <Estimate result={result} />
                      <p className="mt-3 text-xs leading-relaxed text-content-faint">
                        Directional range based on similar Axiomra projects. Final pricing is fixed
                        after a scoping call.
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-wrap justify-end gap-3">
                    <button type="button" onClick={() => setStep(0)} className={BACK_BTN}>
                      <ArrowLeft size={18} /> Back
                    </button>
                    <button type="button" onClick={() => setStep(2)} className={PRIMARY_BTN}>
                      Schedule a Free 30-min Scoping Call <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && !done && (
                <motion.div key="s2" {...panel}>
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div>
                      <Estimate result={result} />
                    </div>
                    <form ref={formRef} noValidate onSubmit={onSubmit} className="relative">
                      <HoneypotField inputRef={honeypotRef} />
                      <h3 className="mb-6 font-display text-2xl font-semibold text-content">
                        Great! There&rsquo;s only{" "}
                        <span className="text-[#1F78B4] dark:text-[#7CC2EE]">one step left</span>.
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
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#4FA8E0]"
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
                        <div className="calc-field-blue">
                          <PhoneField
                            id="est-phone"
                            variant="light"
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
                        <button type="button" onClick={() => setStep(1)} className={BACK_BTN}>
                          <ArrowLeft size={18} /> Back
                        </button>
                        <button
                          type="submit"
                          disabled={status === "loading"}
                          className={PRIMARY_BTN}
                        >
                          {status === "loading" ? "Booking..." : "Book my call"}
                          {status !== "loading" && <ArrowRight size={18} />}
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}

              {step === 2 && done && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex flex-col items-center py-6 text-center"
                  role="status"
                >
                  <span className="flex h-32 w-32 items-center justify-center rounded-full bg-[#4FA8E0]/20">
                    <motion.span
                      initial={{ scale: 0.6 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className="flex h-[6.5rem] w-[6.5rem] items-center justify-center rounded-full bg-[#4FA8E0] text-white"
                    >
                      <Check size={54} strokeWidth={2.5} aria-hidden="true" />
                    </motion.span>
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-content">
                    Thanks for Your Message!
                  </h3>
                  <p className="mt-4 max-w-2xl text-base text-content-dim">
                    Our team will contact you soon to discuss the cost and initial plan for your AI
                    solution development.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={PRIMARY_BTN}
                    >
                      Pick a time now <CalendarClock size={18} />
                    </a>
                    <button type="button" onClick={startOver} className={BACK_BTN}>
                      Start a new estimate
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
