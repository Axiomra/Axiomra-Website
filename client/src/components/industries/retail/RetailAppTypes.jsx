import { useState } from "react";
import { Check } from "lucide-react";
import SectionHeading from "../../SectionHeading";
import { Reveal } from "../../motion/Reveal";
import { appTypes } from "../../../data/retailData";

/**
 * Five application types behind one tab strip on a dark band. Only the panel
 * swaps, so the section height stays put and the scroll does not jump when a
 * tab is chosen.
 */
export default function RetailAppTypes() {
  const [active, setActive] = useState(appTypes.items[0].id);
  const current = appTypes.items.find((item) => item.id === active) ?? appTypes.items[0];

  return (
    <section
      data-nav-tone="dark"
      className="on-dark relative overflow-hidden bg-inverse py-24 md:py-32"
    >
      <div aria-hidden="true" className="retail-bloom opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/3 h-[32rem] w-[32rem] rounded-full bg-accent/20 blur-[150px]"
      />

      <div className="relative z-10 mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          onInverse
          eyebrow={appTypes.eyebrow}
          title={
            <>
              {appTypes.titleLead} <span className="text-gradient">{appTypes.titleAccent}</span>
            </>
          }
        />

        <Reveal>
          <div
            role="tablist"
            aria-label="Retail application types"
            className="mt-14 flex flex-wrap justify-center gap-2"
          >
            {appTypes.items.map((item) => {
              const selected = item.id === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`retail-app-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls={`retail-app-panel-${item.id}`}
                  onClick={() => setActive(item.id)}
                  className={`liquid-glass rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300 focus-ring md:text-base ${
                    selected ? "text-inverse-fg" : "text-inverse-fg/60 hover:text-inverse-fg"
                  }`}
                >
                  {selected && (
                    <span
                      aria-hidden="true"
                      className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent-vivid align-middle"
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            key={current.id}
            id={`retail-app-panel-${current.id}`}
            aria-labelledby={`retail-app-tab-${current.id}`}
            className="liquid-glass mt-10 grid grid-cols-1 gap-10 rounded-[2rem] p-8 md:grid-cols-12 md:p-12"
          >
            <div className="md:col-span-5">
              <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-inverse-fg md:text-3xl">
                {current.title}
              </h3>
              <p className="mt-5 text-base leading-relaxed text-inverse-fg/70 md:text-lg">
                {current.body}
              </p>
            </div>

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-7">
              {current.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-base text-inverse-fg/85"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-vivid/20 text-accent-vivid"
                  >
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
