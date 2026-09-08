import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { services } from "../../data/computerVisionData";

/** The six engagement types, as a picker. */
export default function CvServices() {
  const [active, setActive] = useState(0);
  const item = services.items[active];

  return (
    <section id="computer-vision-services" className="bg-surface-subtle py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-6">
        <SectionHeading
          className="mb-14"
          align="left"
          eyebrow={services.eyebrow}
          title={
            <>
              <span className="text-brand">{services.titleAccent}</span> {services.titleLead}
            </>
          }
          subtitle={services.subtitle}
        />

        <div className="overflow-hidden rounded-xl2 border border-line bg-surface-card shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
            {/* Picker */}
            <div
              role="tablist"
              aria-label="Computer vision service types"
              className="flex flex-col gap-1 border-b border-line p-4 lg:border-b-0 lg:border-r lg:p-6"
            >
              {services.items.map((s, i) => {
                const selected = i === active;
                return (
                  <button
                    key={s.id}
                    role="tab"
                    id={`cv-service-tab-${s.id}`}
                    aria-selected={selected}
                    aria-controls={`cv-service-panel-${s.id}`}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`rounded-lg px-5 py-4 text-left text-base font-medium transition-colors focus-ring md:text-lg ${
                      selected
                        ? "bg-cta-gradient text-inverse"
                        : "text-content-dim hover:bg-surface-inset hover:text-content"
                    }`}
                  >
                    <span className="mr-3 font-mono text-sm opacity-70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </button>
                );
              })}
            </div>

            {/* Detail */}
            <div
              role="tabpanel"
              id={`cv-service-panel-${item.id}`}
              aria-labelledby={`cv-service-tab-${item.id}`}
              className="p-8 md:p-12"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                  /* Copy and photo share the panel so the right-hand half of the
                     card carries the service rather than sitting empty. */
                  className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:gap-10"
                >
                  <div>
                    <span className="font-display text-5xl font-semibold text-brand md:text-6xl">
                      {String(active + 1).padStart(2, "0")}
                    </span>

                    <h3 className="mt-6 font-display text-2xl font-semibold text-content md:text-3xl">
                      {item.title}
                    </h3>

                    <p className="mt-5 max-w-3xl text-base leading-relaxed text-content-dim md:text-lg">
                      {item.body}
                    </p>

                    <ul className="mt-8 grid grid-cols-1 gap-3 border-t border-line pt-7 sm:grid-cols-2">
                      {item.deliverables.map((d) => (
                        <li
                          key={d}
                          className="flex items-start gap-2.5 text-sm text-content-dim md:text-base"
                        >
                          <Check size={16} className="mt-1 shrink-0 text-brand" aria-hidden="true" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <figure className="relative order-first overflow-hidden rounded-xl2 border border-line lg:order-none lg:min-h-[22rem]">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      width={1200}
                      height={900}
                      loading="lazy"
                      decoding="async"
                      className="h-52 w-full object-cover sm:h-64 lg:absolute lg:inset-0 lg:h-full"
                    />
                    {/* Same wash on every frame, so six different stock sources
                        still read as one set. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-inverse/55 via-inverse/5 to-transparent"
                    />
                  </figure>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
