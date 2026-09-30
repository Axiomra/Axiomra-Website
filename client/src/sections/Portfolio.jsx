import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { Link } from "react-router-dom";

const cases = [
  {
    name: "Konnect",
    tag: "AI-Based Recommendation Engine",
    stats: [
      ["50X", "Match accuracy"],
      ["30%", "Filters automated"],
      ["1M+", "Users connected"],
    ],
  },
  {
    name: "Doozoo",
    tag: "AI Graphic Design Automation",
    stats: [
      ["90%", "Recipe accuracy"],
      ["40X", "Faster customization"],
      ["30s", "Delivery time"],
    ],
  },
  {
    name: "FluentTalk AI",
    tag: "AI Language Tutor",
    stats: [
      ["87%", "Learning automated"],
      ["80%", "Time saved"],
      ["21+", "Languages"],
    ],
  },
  {
    name: "FN-AD",
    tag: "AI Fashion Brand Matching",
    stats: [
      ["47%", "Productivity lift"],
      ["50%", "Lead conversion"],
      ["5.0", "Quality rating"],
    ],
  },
  {
    name: "Pitchmark",
    tag: "AI Marketing Pitch Automation",
    stats: [
      ["10X", "Report generation"],
      ["70%", "Fewer review edits"],
      ["10-15", "Pitches / day"],
    ],
  },
];

export default function Portfolio({ showHeading = true, compact = false }) {
  const ref = useRef(null);
  const scroll = (dir) => ref.current?.scrollBy({ left: dir * 380, behavior: "smooth" });

  return (
    <section
      id="portfolio"
      className={`mx-auto max-w-8xl px-4 sm:px-6 ${compact ? "pb-12 pt-8 md:pb-16" : "py-24"}`}
    >
      {/* The arrows live inside the heading when there is one, and stand on their own when the host page suppresses it. */}
      {showHeading ? (
        <SectionHeading
          className="mb-12"
          eyebrow="Our work in practice"
          title={
            <>
              Business Challenges <span className="text-brand">Solved With AI</span>
            </>
          }
          subtitle="Explore selected projects to see the challenge, the solution we developed, and the outcomes measured after deployment."
        >
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={() => scroll(-1)}
              className="rounded-full border border-line-strong p-3 text-content transition-colors hover:bg-surface-subtle focus-ring"
              aria-label="Previous case studies"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              className="rounded-full border border-line-strong p-3 text-content transition-colors hover:bg-surface-subtle focus-ring"
              aria-label="Next case studies"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </SectionHeading>
      ) : (
        <div className="mb-12 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => scroll(-1)}
            className="rounded-full border border-line-strong p-3 text-content transition-colors hover:bg-surface-subtle focus-ring"
            aria-label="Previous case studies"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            className="rounded-full border border-line-strong p-3 text-content transition-colors hover:bg-surface-subtle focus-ring"
            aria-label="Next case studies"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      <div ref={ref} className="scrollbar-hide flex snap-x gap-6 overflow-x-auto pb-4 pt-2">
        {cases.map((c, i) => (
          <motion.article
            key={c.name}
            initial={{ opacity: 0, y: 36, rotateX: 6 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" }}
            whileHover={{ y: -10 }}
            className="group relative flex min-w-[380px] snap-start flex-col justify-between overflow-hidden rounded-xl2 border border-line bg-surface-card p-8 shadow-card transition-[border-color,box-shadow] duration-300 hover:border-brand/50 hover:shadow-glow"
          >
            {/* Light sweep that crosses the card on hover. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-grad-blue/10 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-full"
            />
            <div className="relative">
              <h3 className="font-display text-2xl font-semibold text-content transition-colors duration-300 group-hover:text-brand">
                {c.name}
              </h3>
              <p className="mb-7 mt-1 text-base text-content-dim">{c.tag}</p>
              <div className="mb-7 grid grid-cols-3 gap-3">
                {c.stats.map(([num, label]) => (
                  <div
                    key={label}
                    className="rounded-lg bg-surface-inset p-4 text-center transition-transform duration-300 group-hover:-translate-y-1"
                  >
                    <p className="font-display text-xl font-semibold text-brand">{num}</p>
                    <p className="mt-1.5 text-xs leading-tight text-content-faint">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <Link
              to="/contact"
              className="relative inline-flex items-center gap-1.5 text-base font-medium text-content transition-colors hover:text-brand focus-ring"
            >
              Read Full Case Study
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
