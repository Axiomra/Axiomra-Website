import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Play, Mail, User, MessageSquare, ShieldCheck, Clock } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { INTRO_VIDEO } from "../lib/media";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const FIELD_CLASS =
  "w-full rounded-xl border border-line bg-surface-card py-3.5 pl-11 pr-4 text-base text-content outline-none transition-all placeholder:text-content-faint focus:border-brand focus:ring-4 focus:ring-brand/15";

/** Click-to-load facade: the YouTube iframe only mounts after a real click,
    so the third-party player never costs us a page-load. */
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

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
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
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden px-4 py-24 sm:px-6">
      {/* Two soft brand glows behind the heading — the section used to open on
          flat white, which made the closing CTA read as an afterthought. */}
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
          subtitle="Share the project details — like scope, mockups, or business challenges. We will carefully check and get back to you."
        />

        <div className="mb-16 flex flex-wrap items-center justify-center gap-3">
          {["Free 60-minute strategy session", "No obligation, no sales script", "NDA signed before you share anything"].map((chip) => (
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
              <p className="text-base text-content-dim">Reply within 24 hours</p>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-line bg-surface-subtle p-4">
              <ShieldCheck size={20} className="shrink-0 text-brand" aria-hidden="true" />
              <p className="text-base text-content-dim">NDA on request</p>
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative overflow-hidden rounded-xl2 border border-line bg-surface-card p-9 shadow-card"
        >
          {/* Brand gradient hairline along the top edge of the card. */}
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-vivid via-brand to-brand-strong" />

          <h3 className="mb-1 font-display text-2xl font-semibold text-content">Tell us about your project</h3>
          <p className="mb-7 text-base text-content-dim">No sales script — an engineer reads every message.</p>

          <div className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-content-dim">First Name</label>
                <div className="relative">
                  <User size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-content-faint" aria-hidden="true" />
                  <input
                    required
                    id="contact-name"
                    name="name"
                    autoComplete="given-name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="E.g. John"
                    className={FIELD_CLASS}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-content-dim">Business Email</label>
                <div className="relative">
                  <Mail size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-content-faint" aria-hidden="true" />
                  <input
                    required
                    type="email"
                    id="contact-email"
                    name="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="E.g. john@doe.com"
                    className={FIELD_CLASS}
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-content-dim">Message</label>
              <div className="relative">
                <MessageSquare size={17} className="pointer-events-none absolute left-4 top-4 text-content-faint" aria-hidden="true" />
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Project description"
                  className={`${FIELD_CLASS} resize-none`}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === "loading"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-vivid to-brand px-7 py-4 text-base font-medium text-inverse-fg transition-shadow hover:shadow-glow disabled:opacity-60 focus-ring"
            >
              {status === "loading" ? "Sending..." : "Send Message"} {status !== "loading" && <ArrowUpRight size={18} />}
            </motion.button>

            <p role="status" aria-live="polite" className="text-sm">
              {status === "success" && (
                <span className="flex items-center gap-1.5 text-accent">
                  <CheckCircle2 size={16} /> Thanks — we&rsquo;ll be in touch within 24 hours.
                </span>
              )}
              {status === "error" && <span className="text-danger">Something went wrong. Please try again.</span>}
            </p>
          </div>
        </motion.form>
        </div>
      </div>
    </section>
  );
}
