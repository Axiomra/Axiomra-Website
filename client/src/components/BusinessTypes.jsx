import { motion } from "framer-motion";
import { Rocket, TrendingUp, Store, Building2 } from "lucide-react";

const types = [
  {
    name: "Startups",
    icon: Rocket,
    desc: "We help startups validate ideas and build MVPs that scale. Our team guides founders through the entire journey, enabling faster iteration and confident growth from day one.",
  },
  {
    name: "Scale-ups",
    icon: TrendingUp,
    desc: "Growth creates new opportunities and challenges. As a hands-on AI development partner, we help scale-ups integrate AI and ML to boost efficiency, optimize operations, and expand into new markets.",
  },
  {
    name: "Small & Medium Businesses",
    icon: Store,
    desc: "SMBs often face outdated systems, architectural bottlenecks, and constant pressure to modernize. Our AI and machine learning services deliver solutions that improve competitiveness and fuel sustainable growth.",
  },
  {
    name: "Enterprises",
    icon: Building2,
    desc: "We partner with enterprises to design and implement enterprise-grade AI-powered solutions. Our comprehensive AI and ML services drive innovation, efficiency, and scalability across departments.",
  },
];

export default function BusinessTypes() {
  return (
    <section className="mx-auto max-w-8xl px-6 py-28 md:py-36">
      <div className="mx-auto mb-16 max-w-4xl text-center md:mb-20">
        <p className="mb-4 font-mono text-sm uppercase tracking-widest text-accent">
          Who benefits from our expertise?
        </p>
        <h2 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
          Explore The <span className="text-brand">Range Of Businesses</span> We Can Work With
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-content-dim md:text-xl md:leading-relaxed">
          We specialize in bespoke, advanced technology solutions that drive innovation and efficiency —
          whether you&rsquo;re developing a new prototype or broadening your market presence.
        </p>
      </div>

      {/* Cards instead of the old divider list: each audience gets equal visual
          weight, and the grid keeps line lengths readable at 110rem wide. */}
      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        {types.map((t, i) => {
          const Icon = t.icon;
          return (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-xl2 border border-line bg-surface-card p-9 transition-colors hover:border-brand/40 md:p-12"
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />
              <div className="relative">
                <span className="mb-7 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  <Icon size={26} aria-hidden="true" />
                </span>
                <h3 className="mb-4 font-display text-2xl font-semibold md:text-3xl">{t.name}</h3>
                <p className="text-base leading-relaxed text-content-dim md:text-lg md:leading-relaxed">
                  {t.desc}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
