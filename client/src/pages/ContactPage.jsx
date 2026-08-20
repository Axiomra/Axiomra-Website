import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  CalendarClock,
  CheckCircle2,
  Clock,
  FileSignature,
  Handshake,
  Mail,
  MessageSquare,
  Phone,
  Rocket,
  ShieldCheck,
  Users,
} from "lucide-react";

import NetworkBackground from "../components/NetworkBackground";
import GradientCTA from "../components/GradientCTA";
import SectionHeading from "../components/SectionHeading";
import services from "../data/servicesData";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const WHATSAPP_URL = "https://wa.me/16575203444";
const PHONE = "+1 (657) 520-3444";

/* The category picker is generated from the same array the services page
   renders, so a new service becomes selectable here the moment it is added
   to servicesData — there is no second list to keep in sync. */
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
    note: "We reply fast, no sales scripts",
  },
];

/* How the engagement actually runs after the form is sent. Prospects ask this
   in the first call every time, so answering it on the page removes a round
   trip instead of decorating the layout. */
const OPERATIONS = [
  {
    icon: FileSignature,
    step: "01",
    title: "Scoping & NDA",
    body: "We sign an NDA before you share anything sensitive, then run a 60-minute scoping call to pin down the problem, the data you already hold, and the success metric.",
  },
  {
    icon: Users,
    step: "02",
    title: "Team assembly",
    body: "You get a named squad — an AI engineer, a full-stack developer and a delivery lead — not a rotating bench. The same people stay on the project through launch.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Two-week sprints",
    body: "Working software every fortnight in your own staging environment. Demos are recorded, so stakeholders who miss the call still see the progress.",
  },
  {
    icon: Handshake,
    step: "04",
    title: "Handover & support",
    body: "Source code, infrastructure and documentation transfer to you at launch. Support and model retraining continue on a rolling monthly agreement.",
  },
];

const DESKS = [
  {
    title: "Info Queries",
    body: "Questions about our services, projects or a new idea you want to explore.",
    email: "info@axiomra.co",
  },
  {
    title: "Careers",
    body: "Want to join the team? Send us your portfolio and we will be in touch.",
    email: "career@axiomra.co",
  },
  {
    title: "Sales",
    body: "Ready to start or scale an AI project? Let's talk scope, pricing and timelines.",
    email: "sales@axiomra.co",
  },
];

const TRUST_CHIPS = [
  { icon: ShieldCheck, label: "NDA signed before you share anything" },
  { icon: CalendarClock, label: "Reply within one business day" },
  { icon: Briefcase, label: "No obligation, no sales script" },
];

const FIELD_CLASS =
  "w-full rounded-xl border border-line bg-surface px-4 py-3.5 text-base text-content outline-none transition-all placeholder:text-content-faint/70 focus:border-accent focus:ring-4 focus:ring-accent/15";

const LABEL_CLASS =
  "mb-2 block font-mono text-xs uppercase tracking-[0.16em] text-content-faint";

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setForm({ name: "", email: "", company: "", service: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      className="relative overflow-hidden rounded-[1.75rem] border border-line bg-surface-card p-6 shadow-card sm:p-9"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-accent-vivid via-brand to-accent-vivid"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
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
            placeholder="Jane Cooper"
            className={FIELD_CLASS}
          />
        </div>

        <div>
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
            placeholder="jane@company.com"
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label htmlFor="cp-company" className={LABEL_CLASS}>
            Company
          </label>
          <input
            id="cp-company"
            name="company"
            autoComplete="organization"
            value={form.company}
            onChange={handleChange}
            placeholder="Company name"
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label htmlFor="cp-service" className={LABEL_CLASS}>
            Service category
          </label>
          <select
            id="cp-service"
            name="service"
            value={form.service}
            onChange={handleChange}
            className={FIELD_CLASS}
          >
            <option value="">Select a category</option>
            {SERVICE_OPTIONS.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="cp-message" className={LABEL_CLASS}>
            Tell us about your project
          </label>
          <textarea
            id="cp-message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            placeholder="The problem, the rough idea, the deadline — whatever you have."
            className={`${FIELD_CLASS} resize-none`}
          />
        </div>
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

        <p role="status" aria-live="polite" className="text-sm">
          {status === "success" && (
            <span className="flex items-center gap-1.5 text-success">
              <CheckCircle2 size={16} aria-hidden="true" /> Thanks — we&rsquo;ll reply within one
              business day.
            </span>
          )}
          {status === "error" && (
            <span className="text-danger">Something went wrong. Please try again.</span>
          )}
        </p>
      </div>
    </motion.form>
  );
}

export default function ContactPage() {
  useEffect(() => {
    document.title = "Contact Axiomra — Let's Build Something Remarkable";
  }, []);

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative isolate overflow-hidden bg-inverse px-4 pb-24 pt-32 sm:px-6 md:pt-40">
        {/* The orbit field is the page's one WebGL surface. Everything below
            is plain DOM, so the three.js chunk only ever pays for itself here. */}
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
            Let&rsquo;s Build Something{" "}
            <span className="text-accent-vivid">Remarkable.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-inverse-fg/75 md:text-xl">
            Share the scope, the problem or the rough idea. We&rsquo;ll reply within one business
            day with a clear next step — no sales script, no obligation.
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

      {/* ------------------------------------------------------------ Channels */}
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

      {/* ---------------------------------------------------------------- Form */}
      <section id="contact-form" className="relative overflow-hidden bg-surface-subtle px-4 py-24 sm:px-6">
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
              Launch Your AI Project{" "}
              <span className="text-accent">With A Team That Ships.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-content-dim">
              Tell us the scope, the problem or the rough idea. An engineer reads every submission
              — you get a real technical answer back, not a calendar link and a brochure.
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

      {/* ---------------------------------------------------------- Operations */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-8xl">
          <SectionHeading
            className="mb-14"
            eyebrow="How we operate"
            title={
              <>
                What Happens <span className="text-accent">After You Hit Send</span>
              </>
            }
            subtitle="No black box. Here is the exact sequence every Axiomra engagement runs through, from the first reply to the handover."
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {OPERATIONS.map(({ icon: Icon, step, title, body }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                className="group relative h-full overflow-hidden rounded-xl2 border border-line bg-surface-card p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-card"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-4 font-display text-7xl font-semibold text-content/[0.04]"
                >
                  {step}
                </span>

                <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-vivid/12 text-accent transition-transform duration-300 group-hover:scale-110">
                  <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                </span>

                <h3 className="font-display text-xl font-semibold text-content">{title}</h3>
                <p className="mt-3 text-base leading-relaxed text-content-dim">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- Desks */}
      <section className="bg-surface-subtle px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-8xl">
          <SectionHeading
            className="mb-14"
            eyebrow="Direct lines"
            title={
              <>
                <span className="text-accent">Connect</span> With Us
              </>
            }
            subtitle="Skip the general inbox and write straight to the desk that owns your question."
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
        title="Stop Guessing And Start Growing With Your Trusted AI Development Partner"
        subtitle="Book your complimentary AI Strategic Session, (worth $1000) just for free, and discover how tailored AI solutions can unlock growth."
        buttonText="Get Your Project Done!"
        dark
        three
      />
    </>
  );
}
