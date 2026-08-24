import { motion } from "framer-motion";
import { Star, ArrowUpRight, Quote } from "lucide-react";
import SectionHeading from "../components/SectionHeading";

import img1 from "../assets/founder-1.webp";
import img2 from "../assets/founder-2.webp";
import img3 from "../assets/founder-3.webp";

const items = [
  { name: "Randel Griff", role: "CEO & Founder, Doozoo", stars: 4.5, img: img1, quote: "Their advanced understanding and experience in AI and Machine Learning technology and understanding current trends and capabilities. All deliveries were on time and accurate." },
  { name: "Suleman Niazi", role: "CEO & Founder, Konnect", stars: 5, img: img2, quote: "We've been impressed with the team. Working with them does not feel like we're dealing with a business; it feels like we're dealing with a group of people who want us to be successful." },
  { name: "David Milward", role: "Chairman of Metadataworks", stars: 5, img: img3, quote: "Very knowledgeable, and the team did what they promised, no bullshit, just good solid working through the requirements and suggesting good solutions." },
];

export default function FoundersSay() {
  return (
    <section className="mx-auto max-w-8xl px-4 py-24 sm:px-6">
      <SectionHeading
        className="mb-16"
        title={
          <>
            <span className="text-brand">What Founders Say</span> About Our AI Development Company
          </>
        }
        subtitle="We specialize in breaking down complex problems and building AI systems that hold up in production. These stories highlight how we've reinvented business operations for our global partners."
      >
        <a
          href="#portfolio"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-base font-medium text-content transition-colors hover:bg-surface-subtle focus-ring"
        >
          Get these results <ArrowUpRight size={17} />
        </a>
      </SectionHeading>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: i * 0.12, ease: "easeOut" }}
            whileHover={{ y: -10 }}
            className="group relative flex flex-col overflow-hidden rounded-xl2 border border-line bg-surface-card p-9 shadow-card transition-[box-shadow,border-color] duration-300 hover:border-brand/50 hover:shadow-glow"
          >
            {/* Gradient wash that only appears on hover. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ backgroundImage: "radial-gradient(circle at 15% 0%, rgba(20,216,196,0.14), transparent 60%)" }}
            />
            <Quote
              aria-hidden="true"
              size={64}
              strokeWidth={1}
              className="pointer-events-none absolute -right-2 -top-2 text-brand/10 transition-transform duration-500 group-hover:scale-110 group-hover:text-brand/20"
            />

            <div className="relative mb-6 flex items-center gap-5">
              <img
                src={t.img}
                alt={t.name}
                width={128}
                height={128}
                className="h-16 w-16 rounded-full object-cover ring-2 ring-brand/30 transition-transform duration-500 group-hover:scale-105 group-hover:ring-brand"
                loading="lazy"
              />
              <div className="flex text-gold" role="img" aria-label={`${t.stars} out of 5 stars`}>
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={18} strokeWidth={0} fill="currentColor" opacity={idx < Math.floor(t.stars) ? 1 : 0.25} />
                ))}
              </div>
            </div>

            <blockquote className="relative mb-8 flex-1 text-lg leading-relaxed text-content-dim">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <figcaption className="relative">
              <p className="font-display text-lg font-medium text-content">{t.name}</p>
              <p className="text-sm text-content-faint">{t.role}</p>
            </figcaption>

            {/* Brand rule that wipes in from the left on hover. */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-accent-vivid to-brand transition-transform duration-500 group-hover:scale-x-100"
            />
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
