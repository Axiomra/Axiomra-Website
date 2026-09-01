import { useEffect, useState } from "react";
import { Building2, CalendarClock, Mail, Phone, Tag, UserRound, X } from "lucide-react";
import Avatar from "./Avatar";
import { StageChip } from "./ProgressBadge";
import { leadsApi } from "../../lib/adminApi";
import { formatDate, formatDateTime } from "./leadColumns";

/**
 * Client details panel: the selected lead, plus every earlier enquiry from the
 * same email address or company.
 *
 * The history is the reason this panel exists. Someone who has written in four
 * times is a different conversation from a first-time enquiry, and the table
 * alone never shows that.
 */

function Field({ icon: Icon, label, value, href }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2.5 py-2">
      <Icon size={15} className="mt-0.5 shrink-0 text-content-faint" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-content-faint">
          {label}
        </p>
        {href ? (
          <a
            href={href}
            className="focus-ring block break-words text-sm text-accent underline-offset-2 hover:underline"
          >
            {value}
          </a>
        ) : (
          <p className="break-words text-sm text-content">{value}</p>
        )}
      </div>
    </div>
  );
}

export default function LeadSidebar({ lead, onClose, onSelect }) {
  // The fetched list is stored with the id it belongs to, so "still loading"
  // is derived rather than tracked. A separate loading flag would have to be
  // flipped before the request starts, which means setting state inside the
  // effect body and re-rendering twice per selection.
  const [fetched, setFetched] = useState({ id: null, items: [] });
  const leadId = lead?._id || null;
  const loadingRelated = Boolean(leadId) && fetched.id !== leadId;
  const related = fetched.id === leadId ? fetched.items : [];

  useEffect(() => {
    if (!leadId) return undefined;
    const controller = new AbortController();
    leadsApi
      .related(leadId, controller.signal)
      .then((data) => setFetched({ id: leadId, items: data.items || [] }))
      .catch((err) => {
        if (err?.name === "AbortError") return;
        setFetched({ id: leadId, items: [] });
      });
    return () => controller.abort();
  }, [leadId]);

  if (!lead) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-6 py-16 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-surface-inset text-content-faint">
          <UserRound size={20} aria-hidden="true" />
        </span>
        <p className="mt-4 text-sm font-medium text-content">No lead selected</p>
        <p className="mt-1 text-sm leading-relaxed text-content-dim">
          Pick a row to see the full enquiry and anything else this person or company has sent.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start gap-3 border-b border-line p-5">
        <Avatar name={lead.name} email={lead.email} size="lg" />
        <div className="min-w-0 flex-1 pt-1">
          <h2 className="truncate font-display text-lg font-semibold text-content">
            {lead.name || "Unnamed lead"}
          </h2>
          {lead.company && <p className="truncate text-sm text-content-dim">{lead.company}</p>}
          <div className="mt-2">
            <StageChip stage={lead.progress} />
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details panel"
          className="focus-ring -mr-1 -mt-1 rounded-lg p-1.5 text-content-faint transition-colors hover:bg-surface-inset hover:text-content xl:hidden"
        >
          <X size={17} aria-hidden="true" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-6">
        <div className="divide-y divide-line/70">
          <Field icon={Mail} label="Email" value={lead.email} href={`mailto:${lead.email}`} />
          <Field
            icon={Phone}
            label="Phone"
            value={lead.phone}
            href={lead.phone ? `tel:${lead.phone.replace(/\s/g, "")}` : null}
          />
          <Field icon={Building2} label="Company" value={lead.company} />
          <Field icon={Tag} label="Requested service" value={lead.service} />
          <Field icon={CalendarClock} label="Received" value={formatDateTime(lead.createdAt)} />
        </div>

        {lead.subject && (
          <div className="mt-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-content-faint">
              Subject
            </p>
            <p className="mt-1 text-sm text-content">{lead.subject}</p>
          </div>
        )}

        {lead.message && (
          <div className="mt-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-content-faint">
              Message
            </p>
            <p className="mt-1.5 whitespace-pre-wrap break-words rounded-xl bg-surface-inset p-3 text-sm leading-relaxed text-content-dim">
              {lead.message}
            </p>
          </div>
        )}

        {lead.remarks && (
          <div className="mt-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-content-faint">
              Internal remarks
            </p>
            <p className="mt-1.5 whitespace-pre-wrap break-words rounded-xl border border-gold/25 bg-gold/[0.07] p-3 text-sm leading-relaxed text-content-dim">
              {lead.remarks}
            </p>
          </div>
        )}

        <div className="mt-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-content-faint">
            Previous enquiries
          </p>

          {loadingRelated ? (
            <p className="mt-2 text-sm text-content-faint">Looking…</p>
          ) : related.length === 0 ? (
            <p className="mt-2 text-sm text-content-faint">
              First time this person or company has written in.
            </p>
          ) : (
            <ul className="mt-2 space-y-1.5">
              {related.map((r) => (
                <li key={r._id}>
                  <button
                    type="button"
                    onClick={() => onSelect(r._id)}
                    className="focus-ring w-full rounded-xl border border-line p-2.5 text-left transition-colors hover:border-accent/40 hover:bg-surface-inset"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-medium text-content">
                        {r.subject || r.service || "Enquiry"}
                      </span>
                      <span className="shrink-0 text-xs text-content-faint">
                        {formatDate(r.createdAt)}
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <StageChip stage={r.progress} />
                      {r.budget && <span className="text-xs text-content-faint">{r.budget}</span>}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
