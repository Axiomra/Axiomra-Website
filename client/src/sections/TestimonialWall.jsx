import { companyStats } from "../data/companyStats.js";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SectionHeading from "../components/SectionHeading";

const wall = [
  {
    name: "Richard Dixon",
    role: "Founder, Lucky Egg",
    quote:
      "They communicated with me and we developed trust over the years. Project management is great: willingness to take any problem and get through it is impressive.",
  },
  {
    name: "Marisa Poster",
    role: "Founder, PerfectTed",
    quote:
      "Commendable work! Collaborated and communicated in a highly professional manner and delivered exactly what was asked in the desired time frame.",
  },
  {
    name: "Abigail Reid",
    role: "Founder, Merwave",
    quote:
      "Impressed with their dedication, exceeding expectations on scope. Prioritized quality, delivered on time, and communicated professionally throughout.",
  },
  {
    name: "Adam Golder",
    role: "Founder, K9 Jets",
    quote:
      "Extremely impressed with the AI and automation expertise in automating our tagging system. Efficient communication made the experience exceptional.",
  },
];

const initials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

export default function TestimonialWall({ showHeading = true }) {
  return (
    <section className="mx-auto max-w-8xl px-4 py-24 sm:px-6">
      {/* The rating badge survives even when the host page drops the heading, it is proof, not decoration. */}
      {showHeading ? (
        <SectionHeading
          className="mb-16"
          eyebrow="Simply the best AI development partner"
          titleClassName="lg:whitespace-nowrap lg:text-[2.75vw]"
          title={
            <>
              We Went From <span className="text-brand">Operational Chaos To A Growth Machine</span>{" "}
              In Weeks
            </>
          }
        >
          <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-line-strong bg-surface-subtle px-6 py-3">
            <span className="flex text-gold" role="img" aria-label="4.8 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} strokeWidth={0} fill="currentColor" />
              ))}
            </span>
            <span className="font-display text-xl font-semibold text-content">4.9/5</span>
            <span className="h-5 w-px bg-line-strong" aria-hidden="true" />
            <span className="text-base text-content-dim">
              across {companyStats.projects}+ projects
            </span>
          </div>
        </SectionHeading>
      ) : (
        <div className="mb-16 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-line-strong bg-surface-subtle px-6 py-3">
            <span className="flex text-gold" role="img" aria-label="4.8 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} strokeWidth={0} fill="currentColor" />
              ))}
            </span>
            <span className="font-display text-xl font-semibold text-content">4.9/5</span>
            <span className="h-5 w-px bg-line-strong" aria-hidden="true" />
            <span className="text-base text-content-dim">
              across {companyStats.projects}+ projects
            </span>
          </div>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        {wall.map((t, i) => {
          // Every third card inverts, to break up the grid rhythm.
          const inverted = i % 3 === 2;
          return (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className={`group relative overflow-hidden rounded-xl2 border p-9 shadow-card transition-[border-color,box-shadow] duration-300 hover:shadow-[0_24px_50px_-20px_rgba(37,99,235,0.45)] ${
                inverted
                  ? "border-inverse bg-inverse hover:border-[#3B82F6]/70"
                  : "border-line bg-surface-subtle hover:border-[#3B82F6]/50"
              }`}
            >
              <Quote
                aria-hidden="true"
                size={80}
                strokeWidth={1}
                className={`pointer-events-none absolute -right-3 -top-3 transition-transform duration-500 group-hover:scale-110 ${
                  inverted ? "text-[#60A5FA]/20" : "text-[#2563EB]/15"
                }`}
              />

              <div
                className="relative mb-5 flex text-gold"
                role="img"
                aria-label="5 out of 5 stars"
              >
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={18} strokeWidth={0} fill="currentColor" />
                ))}
              </div>

              <blockquote
                className={`relative mb-8 text-lg leading-relaxed ${inverted ? "text-inverse-fg/85" : "text-content-dim"}`}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="relative flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2563EB] font-display text-base font-semibold text-white"
                >
                  {initials(t.name)}
                </span>
                <span>
                  <span
                    className={`block text-base font-medium ${inverted ? "text-inverse-fg" : "text-content"}`}
                  >
                    {t.name}
                  </span>
                  <span
                    className={`block text-sm ${inverted ? "text-inverse-fg/60" : "text-content-faint"}`}
                  >
                    {t.role}
                  </span>
                </span>
              </figcaption>

              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#2563EB] transition-transform duration-500 group-hover:scale-x-100"
              />
            </motion.figure>
          );
        })}
      </div>
    </section>
  );
}
