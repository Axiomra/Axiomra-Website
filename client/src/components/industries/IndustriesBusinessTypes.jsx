import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "../SectionHeading";
import { Stagger, StaggerItem } from "../motion/Reveal";
import { businessTypes } from "../../data/industriesData";

/** Four rows, hairline separators, nothing else. Deliberately quiet after the tech strip. */
export default function IndustriesBusinessTypes({ data = businessTypes }) {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          eyebrow={data.eyebrow}
          title={
            <>
              {data.titleLead}{" "}
              <span className="text-gradient">{data.titleAccent}</span>
            </>
          }
        />

        <Stagger as="ul" step={0.1} className="mt-14 border-t border-line">
          {data.rows.map((row, i) => (
            <StaggerItem
              as="li"
              key={row.label}
              className="group grid grid-cols-1 gap-3 border-b border-line py-8 transition-colors duration-300 hover:border-brand/40 md:grid-cols-12 md:items-baseline md:gap-8 md:py-10"
            >
              <span className="font-mono text-sm text-accent md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-content transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 md:col-span-3 md:text-3xl">
                {row.label}
              </h3>
              <p className="max-w-[60ch] text-base leading-relaxed text-content-dim md:col-span-7 md:text-lg">
                {row.body}
              </p>
              <Link
                to="/contact"
                aria-label={`Talk to us about ${row.label}`}
                className="hidden h-10 w-10 items-center justify-center justify-self-end rounded-full border border-line text-content-faint transition-all duration-300 group-hover:border-brand group-hover:text-brand focus-ring md:col-span-1 md:flex"
              >
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
