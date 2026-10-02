import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  CalendarClock,
  Clock,
  Mail,
  MessageSquare,
  Phone,
  ShieldCheck,
  Tag,
  Layers,
} from "lucide-react";

import NetworkBackground from "../components/NetworkBackground";
import GradientCTA from "../components/GradientCTA";
import SectionHeading from "../components/SectionHeading";
import PhoneField from "../components/PhoneField";
import SelectField from "../components/SelectField";
import FieldError from "../components/FieldError";
import SubmissionModal from "../components/SubmissionModal";
import services from "../data/servicesData";
import { DEFAULT_COUNTRY } from "../data/countryCodes";
import { submitContact } from "../lib/contactApi";
import { useSpamGuard } from "../lib/useSpamGuard";
import HoneypotField from "../components/HoneypotField";
import {
  formatPhone,
  validateCompany,
  validateContactForm,
  validateEmail,
  validateMessage,
  validateName,
  validatePhone,
  validateSubject,
} from "../lib/validation";
import RoiCalculator from "../sections/RoiCalculator";
import Seo from "../seo/Seo";
import { contactPageSchema } from "../seo/schema";

const WHATSAPP_URL = "https://wa.me/16575203444";
const PHONE = "+1 (657) 520-3444";

const SERVICE_OPTIONS = services.map((s) => s.title);

const CHANNELS = [
  {
    icon: Mail,
    label: "Email us",
    value: "info@axiomra.co",
    note: "For project inquiries and proposals",
    href: "mailto:info@axiomra.co",
  },
  {
    icon: Phone,
    label: "Call us",
    value: PHONE,
    note: "Same number on WhatsApp",
    href: "tel:+16575203444",
  },
  {
    icon: MessageSquare,
    label: "WhatsApp",
    value: "Chat on WhatsApp",
    note: "Quick questions & support",
    href: WHATSAPP_URL,
  },
  {
    icon: Clock,
    label: "Response time",
    value: "Within 1 business day",
    note: "We aim to reply promptly",
  },
];

/* Representative engagements, shown under "From Strategy to Implementation". */
const PROJECT_EXAMPLES = [
  {
    title: "AI Assistant for E-Commerce",
    price: "$28K",
    duration: "8-week production implementation",
    body: "RAG-powered shopping assistant, product catalog integration, semantic search and deployment.",
  },
  {
    title: "Predictive Analytics Platform",
    price: "$55K",
    duration: "12-week implementation",
    body: "Data pipelines, custom ML forecasting, BI dashboards and automated reporting.",
  },
  {
    title: "Computer Vision Quality Inspection",
    price: "$90K",
    duration: "16-week implementation",
    body: "Real-time defect detection, model training, edge deployment and production-line integration.",
  },
  {
    title: "Intelligent Document Processing",
    price: "$140K",
    duration: "20-week enterprise implementation",
    body: "OCR, LLM extraction, validation workflows, compliance rules and enterprise integrations.",
  },
];

const DESKS = [
  {
    title: "General Enquiries",
    body: "Ask about our services or share an idea you would like to explore.",
    email: "info@axiomra.co",
  },
  {
    title: "Careers",
    body: "Interested in working with us? Send your CV and relevant portfolio for consideration.",
    email: "career@axiomra.co",
  },
  {
    title: "Project Enquiries",
    body: "Discuss your requirements, budget, and timeline with our team.",
    email: "sales@axiomra.co",
  },
];

const TRUST_CHIPS = [
  { icon: ShieldCheck, label: "NDA Available Before Sharing Sensitive Information" },
  { icon: CalendarClock, label: "We Aim to Reply Within One Business Day" },
  { icon: Briefcase, label: "Free Initial Consultation" },
];

const FIELD_CLASS =
  "w-full rounded-xl border border-line bg-surface px-4 py-3.5 text-base text-content outline-none transition-all placeholder:text-content-faint/70 focus:border-accent focus:ring-4 focus:ring-accent/15";

const LABEL_CLASS = "mb-2 block font-mono text-xs uppercase tracking-[0.16em] text-content-faint";

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  company: "",
  subject: "",
  service: "",
  message: "",
};

/* Staggered reveal so the field grid arrives in reading order. */
const reveal = (i) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45, ease: "easeOut", delay: 0.15 + i * 0.06 },
});

const FIELDS = ["name", "email", "phone", "company", "subject", "message"];

/* One validator per field so blur can check just the field that was left. */
const VALIDATORS = {
  name: (form) => validateName(form.name),
  email: (form) => validateEmail(form.email),
  phone: (form, country) => validatePhone(form.phone, country),
  company: (form) => validateCompany(form.company),
  subject: (form) => validateSubject(form.subject),
  message: (form) => validateMessage(form.message),
};

function ContactForm() {
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
    // Only re-check a field that is already flagged: validating from the first
    // keystroke would call every half-typed email invalid.
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
    // Dial code is held outside the text input; rejoin it so the team gets one
    // dialable string.
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

  const describe = (field) => (errors[field] ? `cp-${field}-error` : undefined);
  const fieldClass = (field) => `${FIELD_CLASS} ${errors[field] ? "!border-danger" : ""}`;

  return (
    <motion.form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      className="relative rounded-[1.75rem] border border-line bg-surface-card p-6 shadow-card sm:p-9"
    >
      {/* Clipped decoration layer; the form itself must not clip or the country
          and category dropdowns get cut off at the card edge. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.75rem]"
      >
        <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-grad-sky via-grad-blue to-grad-sky" />
      </span>
      <HoneypotField inputRef={honeypotRef} />

      <div className="grid gap-5 sm:grid-cols-2">
        <motion.div {...reveal(0)}>
          <label htmlFor="cp-name" className={LABEL_CLASS}>
            Your name
          </label>
          <input
            required
            id="cp-name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describe("name")}
            placeholder="Jane Cooper"
            className={fieldClass("name")}
          />
          <FieldError id="cp-name-error" message={errors.name} />
        </motion.div>

        <motion.div {...reveal(1)}>
          <label htmlFor="cp-email" className={LABEL_CLASS}>
            Work email
          </label>
          <input
            required
            type="email"
            id="cp-email"
            name="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describe("email")}
            placeholder="jane@company.com"
            className={fieldClass("email")}
          />
          <FieldError id="cp-email-error" message={errors.email} />
        </motion.div>

        <motion.div {...reveal(2)}>
          <label htmlFor="cp-phone" className={LABEL_CLASS}>
            Phone number
          </label>
          <PhoneField
            id="cp-phone"
            variant="light"
            country={country}
            onCountryChange={handleCountryChange}
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            invalid={Boolean(errors.phone)}
            describedBy={describe("phone")}
          />
          <FieldError id="cp-phone-error" message={errors.phone} />
        </motion.div>

        <motion.div {...reveal(3)}>
          <label htmlFor="cp-company" className={LABEL_CLASS}>
            Company
          </label>
          <input
            id="cp-company"
            name="company"
            autoComplete="organization"
            value={form.company}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={100}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={describe("company")}
            placeholder="Company name"
            className={fieldClass("company")}
          />
          <FieldError id="cp-company-error" message={errors.company} />
        </motion.div>

        <motion.div {...reveal(4)}>
          <label htmlFor="cp-subject" className={LABEL_CLASS}>
            Subject
          </label>
          <div className="relative">
            <Tag
              size={17}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-accent opacity-80"
            />
            <input
              id="cp-subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={120}
              aria-invalid={errors.subject ? true : undefined}
              aria-describedby={describe("subject")}
              placeholder="AI chatbot for support"
              className={`${fieldClass("subject")} pl-11`}
            />
          </div>
          <FieldError id="cp-subject-error" message={errors.subject} />
        </motion.div>

        <motion.div {...reveal(5)}>
          <label htmlFor="cp-service" className={LABEL_CLASS}>
            Service category
          </label>
          <SelectField
            id="cp-service"
            name="service"
            variant="light"
            icon={Layers}
            value={form.service}
            onChange={handleChange}
            options={SERVICE_OPTIONS}
            placeholder="Select a category"
          />
        </motion.div>

        <motion.div {...reveal(6)} className="sm:col-span-2">
          <label htmlFor="cp-message" className={LABEL_CLASS}>
            Tell us about your project
          </label>
          <textarea
            id="cp-message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={4000}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describe("message")}
            placeholder="The problem, the rough idea, the deadline, whatever you have."
            className={`${fieldClass("message")} resize-none`}
          />
          <FieldError id="cp-message-error" message={errors.message} />
        </motion.div>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center gap-2 rounded-full bg-inverse px-8 py-4 text-base font-semibold text-inverse-fg transition-all hover:shadow-glow focus-ring disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : "Send message"}
          {status !== "loading" && <ArrowUpRight size={18} />}
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
      </div>

      <SubmissionModal
        open={status === "success" && Boolean(sent)}
        submission={sent}
        onClose={() => {
          setStatus("idle");
          setSent(null);
        }}
      />
    </motion.form>
  );
}

const META_DESCRIPTION =
  "Tell us about your goals, challenge, or initial idea. Our team will review your enquiry and help identify the next step.";

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact Axiomra: Let's Discuss Your Next AI Project"
        description={META_DESCRIPTION}
        breadcrumbs={[{ name: "Contact" }]}
        jsonLd={contactPageSchema({
          name: "Contact Axiomra",
          description: META_DESCRIPTION,
          path: "/contact",
        })}
      />
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-inverse px-4 pb-24 pt-32 sm:px-6 md:pt-40">
        {/* The orbit field is the page's one WebGL surface. */}
        <NetworkBackground variant="orbit" className="opacity-90" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-inverse/85 via-inverse/55 to-inverse"
        />

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 mx-auto max-w-5xl text-center"
        >
          <p className="mb-5 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.22em] text-accent-vivid md:text-base">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-vivid" />
            Get in touch
          </p>

          <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-inverse-fg md:text-6xl lg:text-7xl">
            Let&rsquo;s Discuss Your <span className="text-accent-vivid">Next AI Project</span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-inverse-fg/75 md:text-xl">
            Tell us about your goals, challenge, or initial idea. Our team will review your enquiry
            and help identify the next step.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {TRUST_CHIPS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-inverse-fg/15 bg-inverse-fg/5 px-5 py-2.5 text-sm text-inverse-fg/80 backdrop-blur-sm md:text-base"
              >
                <Icon size={16} className="text-accent-vivid" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Channels */}
      <section className="relative px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-8xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map(({ icon: Icon, label, value, note, href }, i) => {
            const inner = (
              <>
                <span className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-vivid/12 text-accent">
                  <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-content-faint">
                  {label}
                </p>
                <p className="mt-2 text-base font-semibold text-content">{value}</p>
                <p className="mt-2 text-sm text-content-faint">{note}</p>
              </>
            );

            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.07 }}
              >
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className="focus-ring block h-full rounded-xl2 border border-line bg-surface-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-card"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="h-full rounded-xl2 border border-line bg-surface-card p-6">
                    {inner}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Form */}
      <section
        id="contact-form"
        className="relative overflow-hidden bg-surface-subtle px-4 py-24 sm:px-6"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-10 h-96 w-96 animate-float rounded-full bg-accent-vivid/10 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-8xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="mb-4 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.2em] text-accent md:text-base">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Let&rsquo;s talk
            </p>
            <h2 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-content md:text-5xl">
              Launch Your AI Project <span className="text-accent">With A Team That Ships.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-content-dim">
              Tell us the scope, the problem or the rough idea. An engineer reads every submission.
              You get a real technical answer back, not a calendar link and a brochure.
            </p>

            <div className="mt-9 space-y-4">
              <a
                href="mailto:info@axiomra.co"
                className="focus-ring flex items-center gap-3 rounded-xl text-base text-content-dim transition-colors hover:text-accent"
              >
                <Mail size={18} className="text-accent" aria-hidden="true" />
                info@axiomra.co
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="focus-ring flex items-center gap-3 rounded-xl text-base text-content-dim transition-colors hover:text-accent"
              >
                <MessageSquare size={18} className="text-accent" aria-hidden="true" />
                Chat on WhatsApp
              </a>
              <a
                href="tel:+16575203444"
                className="focus-ring flex items-center gap-3 rounded-xl text-base text-content-dim transition-colors hover:text-accent"
              >
                <Phone size={18} className="text-accent" aria-hidden="true" />
                {PHONE}
              </a>
            </div>
          </motion.div>

          <ContactForm />
        </div>
      </section>

      <RoiCalculator />

      {/* Operations */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-8xl">
          <SectionHeading
            className="mb-14"
            eyebrow="How we operate"
            title={
              <>
                From Strategy to <span className="text-accent">Implementation</span>
              </>
            }
            subtitle="We turn complex business requirements into scalable, production-ready solutions with a clear path from discovery to deployment."
          />

          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
            {PROJECT_EXAMPLES.map(({ title, price, duration, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                className="glossy-card h-full rounded-xl2 border border-line/60 p-6 sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-lg font-semibold text-content sm:text-xl">
                    {title}
                  </h3>
                  <span className="shrink-0 font-display text-lg font-semibold text-accent sm:text-xl">
                    {price}
                  </span>
                </div>
                <p className="mt-2 flex items-center gap-2 text-sm text-content-dim">
                  <Clock size={16} aria-hidden="true" />
                  {duration}
                </p>
                <p className="mt-4 text-base leading-relaxed text-content-dim">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Desks */}
      <section className="bg-surface-subtle px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-8xl">
          <SectionHeading
            className="mb-14"
            eyebrow="Direct lines"
            title={
              <>
                <span className="text-accent">Contact</span> the Right Team
              </>
            }
            subtitle="Choose the contact below that best matches your enquiry."
          />

          <div className="grid gap-5 md:grid-cols-3">
            {DESKS.map(({ title, body, email }, i) => (
              <motion.a
                key={title}
                href={`mailto:${email}`}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                className="focus-ring group flex h-full flex-col rounded-xl2 border border-line bg-surface-card p-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-card"
              >
                <h3 className="font-display text-2xl font-semibold text-content">{title}</h3>
                <p className="mt-4 flex-1 text-base leading-relaxed text-content-dim">{body}</p>
                <span className="mt-6 inline-flex items-center justify-center gap-1.5 text-base font-medium text-accent">
                  {email}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <GradientCTA
        title="Find the Right AI Opportunity for Your Business"
        subtitle="Book a free AI strategy session to discuss your goals, assess relevant use cases, and identify a practical next step."
        buttonText="Book Your Free AI Strategy Session"
        dark
        three
      />
    </>
  );
}
