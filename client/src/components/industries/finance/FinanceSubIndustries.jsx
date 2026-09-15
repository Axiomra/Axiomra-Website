import { useReducedMotion } from "framer-motion";
import SectionHeading from "../../SectionHeading";
import { Reveal } from "../../motion/Reveal";
import { subIndustries } from "../../../data/financeData";

/**
 * The sub-industry rail. Cards run as a continuous marquee and open their
 * detail copy on hover or keyboard focus; the track pauses for both, so a card
 * can actually be read once it is open.
 *
 * The list is rendered twice so the -50% loop lands on an identical frame, and
 * the duplicate half is hidden from assistive tech. Under
 * prefers-reduced-motion the whole thing degrades to a plain scrollable rail
 * with the details always visible.
 */
export default function FinanceSubIndustries() {
  const reduced = useReducedMotion();
  const items = subIndustries.items;
  const track = reduced ? items : [...items, ...items];

  return (
    <section
      data-nav-tone="dark"
      className="relative overflow-hidden border-y border-inverse-fg/10 bg-inverse py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/3 h-[34rem] w-[34rem] rounded-full bg-brand/20 blur-[150px]"
      />

      <div className="relative z-10 mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          onInverse
          eyebrow={subIndustries.eyebrow}
          title={
            <>
              <span className="text-gradient">{subIndustries.titleLead}</span> {subIndustries.titleAccent}
            </>
          }
          subtitle={subIndustries.body}
        />
      </div>

      {/* Full-bleed on purpose: the track has to be wider than the viewport for
          the loop to read as continuous. */}
      <Reveal>
        <div className={`relative z-10 mt-14 ${reduced ? "scrollbar-hide overflow-x-auto" : "overflow-hidden"}`}>
          {!reduced && (
            <>
              <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-inverse to-transparent sm:w-28" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-inverse to-transparent sm:w-28" />
            </>
          )}

          <ul
            aria-label="Finance sub-industries we serve"
            // The default 30s marquee is tuned for short pills; this track is
            // far wider, so it needs its own slower duration.
            style={reduced ? undefined : { animationDuration: "70s" }}
            className={`flex w-max gap-5 px-4 pb-4 sm:px-6 lg:px-8 ${
              reduced
                ? ""
                : "animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
            }`}
          >
            {track.map((item, i) => {
              const isClone = i >= items.length;
              return (
                <li
                  key={`${item.label}-${i}`}
                  aria-hidden={isClone ? "true" : undefined}
                  className="w-[76vw] shrink-0 sm:w-[20rem] lg:w-[22rem]"
                >
                  <article
                    tabIndex={isClone ? -1 : 0}
                    className="clip-ledger group relative block h-full overflow-hidden bg-inverse-card outline-none ring-accent-vivid/60 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 focus-visible:ring-2"
                  >
                    <img
                      src={item.image}
                      alt={item.alt}
                      width={900}
                      height={1200}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.06]"
                    />

                    {/* Two scrims: the base keeps the label legible at rest, the
                        second deepens on hover so the detail copy has ground. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-inverse via-inverse/35 to-transparent"
                    />
                    {/* The open state frosts the photo instead of covering it,
                        so the card still reads as the industry it belongs to
                        once the detail copy is showing. */}
                    <span
                      aria-hidden="true"
                      className={`lg lg-dark lg-strong pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                        reduced ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                      }`}
                    />

                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-inverse-fg">
                        {item.label}
                      </h3>

                      <div
                        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                          reduced
                            ? "max-h-72 opacity-100"
                            : "max-h-0 opacity-0 group-hover:max-h-72 group-hover:opacity-100 group-focus-visible:max-h-72 group-focus-visible:opacity-100"
                        }`}
                      >
                        <p className="mt-3 text-sm leading-relaxed text-inverse-fg/75">{item.body}</p>
                        <ul className="mt-4 space-y-1.5">
                          {item.points.map((point) => (
                            <li
                              key={point}
                              className="flex items-start gap-2 text-sm text-inverse-fg/85"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-vivid"
                              />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
