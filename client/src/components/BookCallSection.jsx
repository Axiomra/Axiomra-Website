import { ArrowUpRight } from "lucide-react";

import SectionHeading from "./SectionHeading";
import { BOOKING_EMBED_URL, BOOKING_URL } from "../lib/booking";

/**
 * Inline Google Calendar booking page. Google owns the whole flow (slots,
 * confirmation email, calendar invite), so there is no form or API here.
 */
export default function BookCallSection() {
  return (
    <section id="book-a-call" className="relative overflow-hidden px-4 py-24 sm:px-6">
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Book a call"
          title={
            <>
              Book A Free <span className="text-accent">30-Min Call</span>
            </>
          }
          subtitle="Pick a time that works for you."
        />

        <div className="mt-12 overflow-hidden rounded-xl2 border border-line bg-surface-card shadow-card">
          <iframe
            src={BOOKING_EMBED_URL}
            title="Book a call"
            loading="lazy"
            className="block h-[600px] w-full border-0 md:h-[750px]"
          />
        </div>

        <p className="mt-5 text-center text-sm text-content-dim">
          Calendar not loading?{" "}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex items-center gap-1 rounded font-medium text-accent hover:underline"
          >
            Open it in a new tab <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </p>
      </div>
    </section>
  );
}
