import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { PROGRESS_STAGES } from "../../lib/adminApi";
import { validateEmail, validateName } from "../../lib/validation";
import FieldError from "../FieldError";

/**
 * Manual lead entry, for leads that arrive by phone or at an event rather than
 * through the website form.
 *
 * Reuses the site's own validateName/validateEmail so a lead typed in here is
 * held to exactly the same standard as one that came through /contact.
 */

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  company: "",
  subject: "",
  service: "",
  message: "",
  progress: "New",
  teamAssigned: "",
  budget: "",
  remarks: "",
};

const inputClass =
  "w-full rounded-xl border border-line bg-surface px-3 py-2.5 text-sm text-content outline-none transition-colors placeholder:text-content-faint/70 focus:border-accent focus:ring-4 focus:ring-accent/12";
const labelClass = "mb-1.5 block text-sm font-medium text-content-dim";

/**
 * Mounted only while the dialog is open, so every open starts from a blank
 * form. Resetting the fields in an effect instead would render the previous
 * entry for a frame on the way in.
 */
function LeadForm({ onClose, onCreate, services }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [busy, setBusy] = useState(false);
  const firstFieldRef = useRef(null);

  useEffect(() => {
    // A tick for the entry animation to mount the field before focusing it.
    const t = setTimeout(() => firstFieldRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" && !busy) onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [busy, onClose]);

  const set = (name) => (e) => setForm((f) => ({ ...f, [name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const next = {};
    const nameError = validateName(form.name);
    const emailError = validateEmail(form.email);
    if (nameError) next.name = nameError;
    if (emailError) next.email = emailError;
    setErrors(next);
    if (Object.keys(next).length) return;

    setBusy(true);
    try {
      await onCreate(form);
      onClose();
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16 }}
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-[rgb(6_12_26_/_0.62)] p-4 backdrop-blur-sm sm:p-8"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !busy) onClose();
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-lead-title"
        initial={{ opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="my-auto w-full max-w-2xl rounded-2xl border border-line bg-surface-card shadow-[0_40px_100px_-30px_rgba(6,12,26,0.6)]"
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
          <h2 id="new-lead-title" className="font-display text-lg font-semibold text-content">
            Add a lead
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            aria-label="Close"
            className="focus-ring -mr-2 rounded-lg p-2 text-content-faint transition-colors hover:bg-surface-inset hover:text-content"
          >
            <X size={17} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={submit} noValidate className="px-6 py-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="nl-name" className={labelClass}>
                Name <span className="text-danger">*</span>
              </label>
              <input
                ref={firstFieldRef}
                id="nl-name"
                value={form.name}
                onChange={set("name")}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "nl-name-error" : undefined}
                className={inputClass}
              />
              <FieldError id="nl-name-error" message={errors.name} />
            </div>

            <div>
              <label htmlFor="nl-email" className={labelClass}>
                Email <span className="text-danger">*</span>
              </label>
              <input
                id="nl-email"
                type="email"
                value={form.email}
                onChange={set("email")}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "nl-email-error" : undefined}
                className={inputClass}
              />
              <FieldError id="nl-email-error" message={errors.email} />
            </div>

            <div>
              <label htmlFor="nl-phone" className={labelClass}>
                Phone
              </label>
              <input id="nl-phone" value={form.phone} onChange={set("phone")} className={inputClass} />
            </div>

            <div>
              <label htmlFor="nl-company" className={labelClass}>
                Company
              </label>
              <input
                id="nl-company"
                value={form.company}
                onChange={set("company")}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="nl-service" className={labelClass}>
                Requested service
              </label>
              <input
                id="nl-service"
                list="new-lead-services"
                value={form.service}
                onChange={set("service")}
                className={inputClass}
              />
              <datalist id="new-lead-services">
                {services.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </div>

            <div>
              <label htmlFor="nl-progress" className={labelClass}>
                Progress
              </label>
              <select
                id="nl-progress"
                value={form.progress}
                onChange={set("progress")}
                className={inputClass}
              >
                {PROGRESS_STAGES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="nl-team" className={labelClass}>
                Team assigned
              </label>
              <input
                id="nl-team"
                value={form.teamAssigned}
                onChange={set("teamAssigned")}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="nl-budget" className={labelClass}>
                Budget
              </label>
              <input
                id="nl-budget"
                value={form.budget}
                onChange={set("budget")}
                placeholder="e.g. 50k, TBC"
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="nl-subject" className={labelClass}>
                Subject
              </label>
              <input
                id="nl-subject"
                value={form.subject}
                onChange={set("subject")}
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="nl-message" className={labelClass}>
                Message
              </label>
              <textarea
                id="nl-message"
                rows={3}
                value={form.message}
                onChange={set("message")}
                className={`${inputClass} resize-y`}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="nl-remarks" className={labelClass}>
                Internal remarks
              </label>
              <textarea
                id="nl-remarks"
                rows={2}
                value={form.remarks}
                onChange={set("remarks")}
                className={`${inputClass} resize-y`}
              />
            </div>
          </div>

          <FieldError id="nl-submit-error" message={submitError} />

          <div className="mt-6 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={busy}
              className="focus-ring rounded-xl border border-line px-4 py-2.5 text-sm font-medium text-content-dim transition-colors hover:bg-surface-inset disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy}
              className="focus-ring rounded-xl bg-cta-gradient px-5 py-2.5 text-sm font-semibold text-[#0A1428] transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {busy ? "Saving…" : "Add lead"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default function NewLeadDialog({ open, onClose, onCreate, services }) {
  return (
    <AnimatePresence>
      {open && <LeadForm onClose={onClose} onCreate={onCreate} services={services} />}
    </AnimatePresence>
  );
}
