import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Play, Mail, User, MessageSquare, ShieldCheck, Clock, Crown, UserCheck, Tag, Layers } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import PhoneField from "../components/PhoneField";
import SelectField from "../components/SelectField";
import FieldError from "../components/FieldError";
import SubmissionModal from "../components/SubmissionModal";
import services from "../data/servicesData";
import { DEFAULT_COUNTRY } from "../data/countryCodes";
import { INTRO_VIDEO } from "../lib/media";
import { submitContact } from "../lib/contactApi";
import { useSpamGuard } from "../lib/useSpamGuard";
import HoneypotField from "../components/HoneypotField";
import {
  formatPhone,
  validateContactForm,
  validateEmail,
  validateMessage,
  validateName,
  validatePhone,
  validateSubject,
} from "../lib/validation";

const FIELD_CLASS =
  "w-full rounded-xl border border-line-strong bg-inverse-soft py-3.5 pl-11 pr-4 text-base text-inverse-fg outline-none transition-all placeholder:text-inverse-fg/35 focus:border-gold/70 focus:ring-4 focus:ring-gold/15";

const LABEL_CLASS = "mb-2 block font-mono text-xs uppercase tracking-[0.16em] text-inverse-fg/70";

const FIELDS = ["name", "email", "phone", "subject", "message"];

const SERVICE_OPTIONS = services.map((s) => s.title);

/* Fields fade up one after another so the taller form reads as a sequence
   rather than a wall that appears all at once. */
const reveal = (i) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45, ease: "easeOut", delay: 0.12 + i * 0.07 },
});

const EMPTY_FORM = { name: "", email: "", phone: "", subject: "", service: "", message: "" };

function IntroVideo() {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-xl2 border border-line bg-inverse shadow-card">
        <iframe
          src={INTRO_VIDEO.embed}
          title={INTRO_VIDEO.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${INTRO_VIDEO.title}`}
      className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl2 border border-line bg-inverse shadow-card focus-ring"
    >
      <img
        src={INTRO_VIDEO.poster}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-inverse via-inverse/40 to-transparent" />
      <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-inverse-fg/95 shadow-glow transition-transform duration-300 group-hover:scale-110">
        <Play size={28} className="ml-1 text-inverse" fill="currentColor" />
      </span>
      <span className="absolute inset-x-0 bottom-0 p-5 text-left text-base font-medium text-inverse-fg">
        {INTRO_VIDEO.title}
      </span>
    </button>
  );
}

/* One validator per field so blur can check just the field that was left. */
const VALIDATORS = {
  name: (form) => validateName(form.name),
  email: (form) => validateEmail(form.email),
  phone: (form, country) => validatePhone(form.phone, country),
  subject: (form) => validateSubject(form.subject),
  message: (form) => validateMessage(form.message),
};

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(null);
  const formRef = useRef(null);
  const { honeypotRef, signals, restart } = useSpamGuard();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Only re-check a field that is already flagged: validating as someone
    // types their first character would call every half-typed email invalid.
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = VALIDATORS[name]?.({ ...form, [name]: value }, country) || "";
      const copy = { ...prev };
      if (next) copy[name] = next;
      else delete copy[name];
      return copy;
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const message = VALIDATORS[name]?.(form, country) || "";
    setErrors((prev) => {
      const copy = { ...prev };
      if (message) copy[name] = message;
      else delete copy[name];
      return copy;
    });
  };

  // Switching country changes the expected digit count, so an already-typed
  // number has to be re-checked against the new plan.
  const handleCountryChange = (next) => {
    setCountry(next);
    setErrors((prev) => {
      const message = validatePhone(form.phone, next);
      const copy = { ...prev };
      if (message) copy.phone = message;
      else delete copy.phone;
      return copy;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const found = validateContactForm(form, country, { fields: FIELDS });
    if (Object.keys(found).length) {
      setErrors(found);
      setStatus("idle");
      setError("");
      const first = FIELDS.find((f) => found[f]);
      formRef.current?.querySelector(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("loading");
    setError("");
    // The dial code lives outside the text input, so it is joined back on just
    // before submit; the team needs one dialable string, not two halves.
    const payload = { ...form, phone: formatPhone(form.phone, country) };
    try {
      await submitContact({ ...payload, ...signals() });
      setStatus("success");
      // Snapshot first: the confirmation replays the payload, and the reset
      // below would otherwise empty it out.
      setSent(payload);
      setForm(EMPTY_FORM);
      setCountry(DEFAULT_COUNTRY);
      setErrors({});
      restart();
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  };

  const describe = (field) => (errors[field] ? `contact-${field}-error` : undefined);
  const fieldClass = (field) => `${FIELD_CLASS} ${errors[field] ? "!border-danger" : ""}`;

  return (
    <section id="contact" className="relative overflow-hidden px-4 py-24 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(600px 320px at 25% 0%, rgba(20,216,196,0.16), transparent 70%), radial-gradient(600px 320px at 75% 10%, rgba(120,139,227,0.18), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-8xl">
        <SectionHeading
          className="mb-10"
          eyebrow="Let's talk"
          titleClassName="lg:whitespace-nowrap lg:text-[2.9vw]"
          title={
            <>
              Partner With <span className="text-brand">Expert AI Service Providers</span> To Launch Your Project
            </>
          }
          subtitle="Share the project details: like scope, mockups, or business challenges. We will carefully check and get back to you."
        />

        <div className="mb-16 flex flex-wrap items-center justify-center gap-3">
          {["NDA Available Before Sharing Sensitive Information", "We Aim to Reply Within One Business Day", "Free Initial Consultation"].map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface-card px-5 py-2.5 text-base text-content-dim shadow-card transition-colors duration-300 hover:border-brand hover:text-content"
            >
              <CheckCircle2 size={17} className="text-brand" aria-hidden="true" />
              {chip}
            </span>
          ))}
        </div>

        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <IntroVideo />
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-line bg-surface-subtle p-4">
              <Clock size={20} className="shrink-0 text-brand" aria-hidden="true" />
              <p className="text-base text-content-dim">Reply within one business day</p>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-line bg-surface-subtle p-4">
              <ShieldCheck size={20} className="shrink-0 text-brand" aria-hidden="true" />
              <p className="text-base text-content-dim">NDA on request</p>
            </div>
          </div>
        </motion.div>

        <motion.form
          ref={formRef}
          noValidate
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-xl2 border border-inverse-card bg-inverse-card p-9 shadow-card"
        >
          {/* Decoration lives in its own clipped layer: the form itself must not
              clip, or the country / category dropdowns get cut off at the edge. */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl2">
            {/* Gold-to-brand hairline seals the card as the section's centerpiece. */}
            <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-gold via-[#f7cf7e] to-brand" />
            {/* Warm gold + cool brand glows keep the dark card from going flat. */}
            <span
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(520px 260px at 12% 0%, rgba(224,150,16,0.10), transparent 60%), radial-gradient(420px 300px at 100% 100%, rgba(20,216,196,0.10), transparent 60%)",
              }}
            />
            {/* Faint crown watermark, bottom-right, premium without shouting. */}
            <Crown
              size={150}
              strokeWidth={0.5}
              className="absolute -bottom-8 -right-8 rotate-[-12deg] text-inverse-fg/5"
            />
          </span>
          <HoneypotField inputRef={honeypotRef} />

          <div className="relative">
            <div className="mb-8 flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-gold">
                  <Crown size={13} aria-hidden="true" /> VIP Priority Intake
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold text-inverse-fg">Tell us about your project</h3>
              </div>
              <span className="pt-2 font-mono text-xs uppercase tracking-[0.2em] text-inverse-fg/45">Concierge Desk</span>
            </div>

            <div className="space-y-5">
              <motion.div {...reveal(0)} className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className={LABEL_CLASS}>First Name</label>
                  <div className="relative">
                    <User size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold/70" aria-hidden="true" />
                    <input
                      required
                      id="contact-name"
                      name="name"
                      autoComplete="given-name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={errors.name ? true : undefined}
                      aria-describedby={describe("name")}
                      placeholder="E.g. John"
                      className={fieldClass("name")}
                    />
                  </div>
                  <FieldError id="contact-name-error" message={errors.name} />
                </div>
                <div>
                  <label htmlFor="contact-email" className={LABEL_CLASS}>Business Email</label>
                  <div className="relative">
                    <Mail size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold/70" aria-hidden="true" />
                    <input
                      required
                      type="email"
                      id="contact-email"
                      name="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={errors.email ? true : undefined}
                      aria-describedby={describe("email")}
                      placeholder="E.g. john@doe.com"
                      className={fieldClass("email")}
                    />
                  </div>
                  <FieldError id="contact-email-error" message={errors.email} />
                </div>
              </motion.div>

              <motion.div {...reveal(1)} className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-phone" className={LABEL_CLASS}>Phone Number</label>
                  <PhoneField
                    id="contact-phone"
                    variant="dark"
                    country={country}
                    onCountryChange={handleCountryChange}
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={Boolean(errors.phone)}
                    describedBy={describe("phone")}
                  />
                  <FieldError id="contact-phone-error" message={errors.phone} />
                </div>
                <div>
                  <label htmlFor="contact-subject" className={LABEL_CLASS}>Subject</label>
                  <div className="relative">
                    <Tag size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold/70" aria-hidden="true" />
                    <input
                      id="contact-subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength={120}
                      aria-invalid={errors.subject ? true : undefined}
                      aria-describedby={describe("subject")}
                      placeholder="E.g. AI chatbot for support"
                      className={fieldClass("subject")}
                    />
                  </div>
                  <FieldError id="contact-subject-error" message={errors.subject} />
                </div>
              </motion.div>

              <motion.div {...reveal(2)}>
                <label htmlFor="contact-service" className={LABEL_CLASS}>Service Category</label>
                <SelectField
                  id="contact-service"
                  name="service"
                  variant="dark"
                  icon={Layers}
                  value={form.service}
                  onChange={handleChange}
                  options={SERVICE_OPTIONS}
                  placeholder="Select a category"
                />
              </motion.div>

              <motion.div {...reveal(3)}>
                <label htmlFor="contact-message" className={LABEL_CLASS}>Message</label>
                <div className="relative">
                  <MessageSquare size={17} className="pointer-events-none absolute left-4 top-4 text-gold/70" aria-hidden="true" />
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={5}
                    maxLength={4000}
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={describe("message")}
                    placeholder="Project description"
                    className={`${fieldClass("message")} resize-none`}
                  />
                </div>
                <FieldError id="contact-message-error" message={errors.message} />
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === "loading"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e0a52e] via-gold to-[#f7cf7e] px-7 py-4 text-base font-semibold text-[#10182b] transition-all hover:shadow-[0_0_55px_-12px_rgba(224,150,16,0.65)] focus-ring disabled:opacity-60"
              >
                {status === "loading" ? "Sending..." : "Request VIP Consultation"} {status !== "loading" && <ArrowUpRight size={18} />}
              </motion.button>

              {/* Success is confirmed in the modal below; this line is left for
                  failures and for the screen-reader announcement. */}
              <p role="status" aria-live="polite" className="text-sm">
                {status === "success" && <span className="sr-only">Message sent.</span>}
                {status === "error" && <span className="text-danger">{error}</span>}
                {Object.keys(errors).length > 0 && (
                  <span className="text-danger">Please fix the highlighted fields above.</span>
                )}
              </p>

              <div className="grid gap-3 border-t border-line-strong/50 pt-6 sm:grid-cols-3">
                <div className="flex items-center gap-2.5">
                  <Clock size={17} className="shrink-0 text-gold" aria-hidden="true" />
                  <p className="text-sm text-inverse-fg/75">Reply in one business day</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={17} className="shrink-0 text-gold" aria-hidden="true" />
                  <p className="text-sm text-inverse-fg/75">NDA on request</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <UserCheck size={17} className="shrink-0 text-gold" aria-hidden="true" />
                  <p className="text-sm text-inverse-fg/75">Engineer-led review</p>
                </div>
              </div>
            </div>
          </div>
        </motion.form>
        </div>
      </div>

      <SubmissionModal
        open={status === "success" && Boolean(sent)}
        submission={sent}
        onClose={() => {
          setStatus("idle");
          setSent(null);
        }}
      />
    </section>
  );
}
