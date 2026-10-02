import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import SectionHeading from "../SectionHeading";
import ClientLogoStrip from "../ai-dev/ClientLogoStrip";
import { testimonials } from "../../data/industriesData";

const EASE = [0.16, 1, 0.3, 1];
const AUTO_MS = 7000;

const initials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

/** One quote at a time, with the client logo strip underneath as the proof. */
export default function IndustriesTestimonials({ data = testimonials }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  const items = data.items;
  const current = items[index];

  const go = (step) => {
    setDirection(step);
    setIndex((i) => (i + step + items.length) % items.length);
  };

  // Auto-advance, but never while the reader is on it or has asked for stillness.
  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => go(1), AUTO_MS);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, reduced, index]);

  const slide = reduced
    ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        enter: (d) => ({ opacity: 0, x: d * 40 }),
        center: { opacity: 1, x: 0 },
        exit: (d) => ({ opacity: 0, x: d * -40 }),
      };

  return (
    <>
      <section className="bg-surface py-24 md:py-32">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={data.eyebrow}
            title={
              <>
                {data.titleLead} <span className="text-gradient">{data.titleAccent}</span>
              </>
            }
          />

          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className="relative mx-auto mt-14 max-w-4xl"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface-subtle p-2">
              <div className="relative min-h-[22rem] rounded-[calc(2rem-0.5rem)] bg-surface-card px-6 py-10 md:px-14 md:py-14">
                <Quote
                  aria-hidden="true"
                  size={96}
                  strokeWidth={1}
                  className="pointer-events-none absolute -right-4 -top-4 text-brand/10"
                />

                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  <motion.figure
                    key={current.name}
                    custom={direction}
                    variants={slide}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.45, ease: EASE }}
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${items.length}`}
                    className="relative text-center"
                  >
                    <span
                      aria-hidden="true"
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-grad-sky to-grad-blue font-display text-xl font-semibold text-inverse"
                    >
                      {initials(current.name)}
                    </span>

                    <span
                      className="mt-6 flex justify-center text-gold"
                      role="img"
                      aria-label={`${current.rating} out of 5 stars`}
                    >
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          strokeWidth={0}
                          fill="currentColor"
                          className={i < current.rating ? "" : "opacity-25"}
                        />
                      ))}
                    </span>

                    <blockquote className="mx-auto mt-6 max-w-[60ch] text-lg leading-relaxed text-content-dim md:text-xl">
                      &ldquo;{current.quote}&rdquo;
                    </blockquote>

                    <figcaption className="mt-8">
                      <span className="block text-base font-medium text-content">
                        {current.name}
                      </span>
                      <span className="block text-sm text-content-faint">{current.role}</span>
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-content-dim transition-all duration-300 hover:border-brand hover:text-brand focus-ring"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>

              <div className="flex items-center" role="tablist" aria-label="Choose testimonial">
                {/* 24px touch targets around the small visible dots. */}
                {items.map((t, i) => (
                  <button
                    key={t.name}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Testimonial ${i + 1}: ${t.name}`}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    className="flex h-6 items-center justify-center rounded-full px-2 focus-ring"
                  >
                    <span
                      className={`h-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                        i === index ? "w-8 bg-grad-sky" : "w-2 bg-line-strong"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-content-dim transition-all duration-300 hover:border-brand hover:text-brand focus-ring"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <ClientLogoStrip />
    </>
  );
}
