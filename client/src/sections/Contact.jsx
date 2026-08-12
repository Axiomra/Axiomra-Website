import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Play } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
    <section id="contact" className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
      <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <h2 className="font-display font-semibold text-3xl md:text-4xl leading-tight">
          Partner With Expert AI Service Providers To Launch Your Project
        </h2>
        <p className="mt-4 text-ink-dim">
          Share the project details — like scope, mockups, or business challenges. We will carefully check and get back to you.
        </p>
        <div className="mt-8 aspect-video rounded-xl2 bg-navy relative flex items-center justify-center overflow-hidden">
          <motion.div whileHover={{ scale: 1.1 }} className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center cursor-pointer">
            <Play size={24} className="text-navy ml-1" fill="currentColor" />
          </motion.div>
        </div>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white border border-mist rounded-xl2 shadow-card p-8 space-y-4"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-ink-dim block mb-1.5">First Name</label>
            <input required name="name" value={form.name} onChange={handleChange} placeholder="E.g. John"
              className="w-full border border-mist rounded-lg px-4 py-3 text-sm focus:border-periwinkle outline-none transition-colors" />
          </div>
          <div>
            <label className="text-xs font-medium text-ink-dim block mb-1.5">Business Email</label>
            <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="E.g. john@doe.com"
              className="w-full border border-mist rounded-lg px-4 py-3 text-sm focus:border-periwinkle outline-none transition-colors" />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-ink-dim block mb-1.5">Message</label>
          <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Project description"
            className="w-full border border-mist rounded-lg px-4 py-3 text-sm focus:border-periwinkle outline-none transition-colors resize-none" />
        </div>
        <motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={status === "loading"}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-teal to-periwinkle disabled:opacity-60 text-white font-medium px-6 py-3 rounded-full transition-opacity focus-ring">
          {status === "loading" ? "Sending..." : "Send Message"} {status !== "loading" && <ArrowUpRight size={16} />}
        </motion.button>
        {status === "success" && <p className="text-teal-dark text-sm flex items-center gap-1.5"><CheckCircle2 size={15} /> Thanks — we'll be in touch within 24 hours.</p>}
        {status === "error" && <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>}
      </motion.form>
    </section>
  );
}
