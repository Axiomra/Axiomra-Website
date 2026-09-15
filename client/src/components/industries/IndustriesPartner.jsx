import { Layers, Route, ShieldCheck, Target } from "lucide-react";
import SectionHeading from "../SectionHeading";
import StatCounter from "../StatCounter";
import { Stagger, StaggerItem } from "../motion/Reveal";
import Awards from "../../sections/Awards";
import { partner } from "../../data/industriesData";

/* Icon names live in the data file as strings so the copy stays editable
   without importing lucide there. */
const ICONS = { Layers, Route, ShieldCheck, Target };

export default function IndustriesPartner({ data = partner }) {
  return (
    <>
      <section className="relative overflow-hidden bg-inverse py-24 md:py-32">
        {/* Single soft light source, tinted to the accent rather than pure white. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-1/4 h-[32rem] w-[32rem] rounded-full bg-accent-vivid/10 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="left"
            onInverse
            eyebrow={data.eyebrow}
            title={
              <>
                {data.titleLead} <span className="text-gradient">{data.titleAccent}</span>
              </>
            }
          />

          <Stagger step={0.1} className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {data.cards.map((card, i) => {
              const Icon = ICONS[card.icon] ?? Layers;
              return (
                <StaggerItem
                  as="article"
                  key={card.title}
                  className="rounded-[2rem] border border-inverse-fg/12 bg-inverse-fg/5 p-2"
                >
                  <div className="flex h-full flex-col rounded-[calc(2rem-0.5rem)] bg-inverse-card p-7 md:p-9">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-accent-vivid/40 bg-accent-vivid/15 text-accent-vivid">
                      <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <span className="mt-6 font-mono text-sm text-accent-vivid">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-display text-2xl font-semibold leading-[1.15] tracking-tight text-inverse-fg">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-inverse-fg/70 md:text-lg">
                      {card.body}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>

          {/* gap-px over a line-coloured backdrop draws exact hairlines between
              cells at every breakpoint, without per-cell border exceptions. */}
          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl2 border border-inverse-fg/12 bg-inverse-fg/12 lg:grid-cols-4">
            {data.stats.map((stat) => (
              <div key={stat.label} className="bg-inverse">
                <StatCounter value={stat.value} label={stat.label} onInverse />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Awards />
    </>
  );
}
