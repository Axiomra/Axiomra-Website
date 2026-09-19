import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { RESOURCE_IMAGES } from "../lib/media";

const posts = [
  { title: "MVP vs. Full-Scale Custom AI Development", tag: "Strategy" },
  { title: "Custom AI Development Timeline: 2026 Benchmarks", tag: "Process" },
  { title: "Why AI Projects Fail: 10 Root Causes", tag: "Insights" },
];

export default function Resources() {
  return (
    <section className="mx-auto max-w-8xl px-4 py-24 sm:px-6">
      <SectionHeading
        className="mb-14"
        eyebrow="Resources"
        title={
          <>
            Know What&rsquo;s <span className="text-brand">Trending In AI</span>
          </>
        }
        subtitle="Field notes from the projects we ship: benchmarks, budgets, and the mistakes worth skipping."
      />

      {/* No blog route exists yet, so these are cards rather than links, because an
          href="#" only left a bare hash hanging off the current URL. */}
      <div className="grid gap-8 sm:grid-cols-3">
        {posts.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="group overflow-hidden rounded-xl2 border border-line shadow-card transition-[border-color,box-shadow] duration-300 hover:border-brand/50 hover:shadow-glow focus-ring"
          >
            <div className="relative flex aspect-[16/10] items-end overflow-hidden bg-inverse p-5">
              <img
                src={RESOURCE_IMAGES[p.title]}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse via-inverse/50 to-inverse/10" />
              <span className="relative rounded-full border border-accent-vivid/40 bg-accent-vivid/15 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-accent-vivid backdrop-blur-sm">
                {p.tag}
              </span>
            </div>
            <div className="bg-surface-card p-6">
              <h3 className="font-display text-xl leading-snug text-content transition-colors group-hover:text-brand">
                {p.title}
              </h3>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-content-faint transition-colors group-hover:text-brand">
                Read More
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
