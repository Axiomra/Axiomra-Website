import {
  BadgeCheck,
  Lock,
  Cloud,
  Cpu,
  FileCheck2,
  Globe2,
  Server,
  Database,
  Workflow,
} from "lucide-react";

/**
 * Certifications & compliance strip.
 *
 * Deliberately a marquee rather than a static grid: the list is longer than
 * one row can hold at a readable size, and the continuous drift reads as
 * "there are more of these" without a second row of dead space.
 *
 * Two tracks running in opposite directions so the block has motion but no
 * single dominant direction. Both pause on hover so a badge can actually be
 * read, and the whole thing freezes under prefers-reduced-motion via the
 * global rule in index.css.
 *
 * Icons stand in for real certification artwork, swap each `icon` for an
 * <img> once the licensed badge files are cleared for use.
 */
const certifications = [
  { icon: FileCheck2, name: "SOC 2 Type II", note: "Audited Controls" },
  { icon: Lock, name: "GDPR", note: "Data Compliance" },
  { icon: BadgeCheck, name: "HIPAA", note: "Health Data Ready" },
  { icon: Cloud, name: "AWS Partner", note: "Machine Learning" },
  { icon: Server, name: "Google Cloud", note: "AI Services Partner" },
  { icon: Cpu, name: "NVIDIA Inception", note: "AI Program Member" },
  { icon: Database, name: "Microsoft Azure", note: "Certified AI Engineer" },
  { icon: Workflow, name: "Databricks", note: "Certified Partner" },
  { icon: Globe2, name: "Clutch Verified", note: "Top AI Company" },
];

function Badge({ icon: Icon, name, note }) {
  return (
    <div className="flex w-[19rem] shrink-0 items-center gap-4 rounded-xl2 border border-line bg-surface-card px-6 py-5 shadow-card transition-colors duration-300 hover:border-brand hover:bg-brand/5">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-subtle">
        <Icon size={24} strokeWidth={1.6} className="text-brand" />
      </span>
      <span className="min-w-0">
        <span className="block whitespace-nowrap font-display text-lg font-semibold text-content">
          {name}
        </span>
        <span className="block whitespace-nowrap font-mono text-xs uppercase tracking-[0.12em] text-content-faint">
          {note}
        </span>
      </span>
    </div>
  );
}

/** One marquee lane. */
function Lane({ reverse = false }) {
  return (
    <div
      className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      style={{
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className={`flex w-max items-center gap-6 py-3 group-hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-rev" : "animate-marquee"
        }`}
      >
        {[...certifications, ...certifications].map((c, i) => (
          <Badge key={`${c.name}-${i}`} {...c} />
        ))}
      </div>
    </div>
  );
}

export default function Certifications() {
  return (
    <section
      className="border-y border-line bg-surface-subtle py-16"
      aria-label="Certifications and compliance"
    >
      <p className="mb-8 text-center font-mono text-sm uppercase tracking-[0.2em] text-accent md:text-base">
        Certifications &amp; Compliance
      </p>

      {/* The duplicated list is decoration for screen readers; one plain list below carries the actual content. */}
      <div aria-hidden="true" className="space-y-2">
        <Lane />
        <Lane reverse />
      </div>

      <ul className="sr-only">
        {certifications.map((c) => (
          <li key={c.name}>
            {c.name}: {c.note}
          </li>
        ))}
      </ul>
    </section>
  );
}
