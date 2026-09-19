import { Building2, CalendarClock, Mail, Phone, Tag, UserRound, X } from "lucide-react";
import Avatar from "./Avatar";
import CompletionBadge from "./CompletionBadge";
import DeadlineCell from "./DeadlineCell";
import EditableCell from "./EditableCell";
import { StageChip } from "./ProgressBadge";
import RichTextView from "./richText";
import { formatDateTime } from "./leadColumns";

/**
 * Client details panel for the selected lead.
 *
 * This is the only place identity fields (name, email, phone, company,
 * requested service) can be changed; the table shows them read-only so a
 * stray click never edits a lead's contact details by accident.
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

function EditableField({ icon: Icon, label, value, onSave, type = "text" }) {
  return (
    <div className="flex items-start gap-2.5 py-1.5">
      <Icon size={15} className="mt-2.5 shrink-0 text-content-faint" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="px-2 pt-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-content-faint">
          {label}
        </p>
        <EditableCell value={value} type={type} ariaLabel={label} onSave={onSave} />
      </div>
    </div>
  );
}

export default function LeadSidebar({ lead, onClose, onPatch }) {
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
        <div className="min-w-0 flex-1 pt-0.5">
          <EditableCell
            value={lead.name}
            ariaLabel="Name"
            placeholder="Unnamed lead"
            className="!px-2 !py-0.5 font-display !text-lg !font-semibold"
            onSave={(v) => onPatch(lead._id, { name: v })}
          />
          <div className="mt-1.5">
            <StageChip stage={lead.progress} />
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details panel"
          className="focus-ring -mr-1 -mt-1 rounded-lg p-1.5 text-content-faint transition-colors hover:bg-surface-inset hover:text-content"
        >
          <X size={17} aria-hidden="true" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-6">
        <div className="divide-y divide-line/70">
          <EditableField
            icon={Mail}
            label="Email"
            type="email"
            value={lead.email}
            onSave={(v) => onPatch(lead._id, { email: v })}
          />
          <EditableField
            icon={Phone}
            label="Phone"
            value={lead.phone}
            onSave={(v) => onPatch(lead._id, { phone: v })}
          />
          <EditableField
            icon={Building2}
            label="Company"
            value={lead.company}
            onSave={(v) => onPatch(lead._id, { company: v })}
          />
          <EditableField
            icon={Tag}
            label="Requested service"
            value={lead.service}
            onSave={(v) => onPatch(lead._id, { service: v })}
          />
          <Field icon={CalendarClock} label="Received" value={formatDateTime(lead.createdAt)} />
        </div>

        {/* Delivery tracking, side by side because they are read together. */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-line bg-surface-inset/60 p-2.5">
            <p className="mb-1 px-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-content-faint">
              Deadline
            </p>
            <DeadlineCell
              value={lead.deadline}
              done={lead.completion === "Completed" || lead.completion === "Closed"}
              onSave={(v) => onPatch(lead._id, { deadline: v })}
            />
          </div>
          <div className="rounded-xl border border-line bg-surface-inset/60 p-2.5">
            <p className="mb-1.5 px-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-content-faint">
              Complete
            </p>
            <CompletionBadge
              value={lead.completion}
              onChange={(state) => onPatch(lead._id, { completion: state })}
            />
          </div>
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
            <div className="mt-1.5 rounded-xl border border-gold/25 bg-gold/[0.07] p-3 text-sm leading-relaxed text-content-dim">
              <RichTextView text={lead.remarks} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
