import {
  ArrowUpRight,
  Star,
  Link,
  Rabbit,
  ClipboardList,
  Zap,
  Megaphone,
  MessageCircle,
  Music,
  Compass,
  Users,
} from "lucide-react";
import NetworkBackground from "../components/NetworkBackground";

/*
 * The entrance fade is a CSS animation ([data-fade] in index.css), not
 * framer-motion: it has to start with the first paint of the prerendered HTML,
 * before any JS runs, or the h1 (the LCP element) waits on the whole bundle.
 * Same motion as the framer variant it replaced: opacity 0 -> 1 and
 * translateY 26px -> 0 over 0.7s, easeOut, staggered 0.12s by data-fade.
 */

const clients = [
  { name: "Konnect", Icon: Link },
  { name: "Doozoo", Icon: Rabbit },
  { name: "FormOle", Icon: ClipboardList },
  { name: "Voltox", Icon: Zap },
  { name: "FN-AD", Icon: Megaphone },
  { name: "FluentTalk", Icon: MessageCircle },
  { name: "TuneGPT", Icon: Music },
  { name: "Navex", Icon: Compass },
  { name: "Peersuma", Icon: Users },
];

/** The hero is a brand surface, deliberately dark in both themes. */
export default function Hero() {
  return (
    <section
      id="home"
      data-nav-tone="dark"
      className="relative overflow-hidden bg-inverse pb-0 pt-36"
    >
      <NetworkBackground className="opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-inverse/40 to-inverse" />

      <div className="relative z-10 mx-auto max-w-8xl px-4 pb-24 text-center sm:px-6">
        <p data-fade="0" className="mb-5 text-lg font-medium text-inverse-fg/75 md:text-xl">
          Practical AI. Measurable Business Progress.
        </p>

        <h1
          data-fade="1"
          className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-inverse-fg md:text-7xl"
        >
          Custom AI Development That{" "}
          <span className="text-gradient">Moves Your Business Forward</span>
        </h1>

        <p
          data-fade="2"
          className="mx-auto mt-7 max-w-4xl text-lg leading-relaxed text-inverse-fg/75 md:text-xl"
        >
          Axiomra builds AI solutions around your business goals, data, and workflows. From process
          automation to predictive insights, we help your team work more efficiently, make informed
          decisions, and measure the value of AI in everyday operations.
        </p>

        <div data-fade="3" className="mt-9">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-inverse-fg px-9 py-4 text-lg font-semibold text-inverse transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow focus-ring md:text-xl"
          >
            Book Your Free AI Strategy Session
            <ArrowUpRight
              size={22}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        <div
          data-fade="4"
          className="mt-8 flex flex-wrap items-center justify-center gap-2.5 text-lg text-inverse-fg/75"
        >
          <span>Reviewed on</span>
          <span className="text-xl font-semibold text-inverse-fg">Clutch</span>
          <span className="flex text-gold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
            ))}
          </span>
          <span className="text-inverse-fg/60">12 reviews</span>
        </div>
      </div>

      <div className="relative z-10 border-t border-inverse-fg/10 bg-inverse/60 py-8 backdrop-blur-sm">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-vivid/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
        <p className="mb-6 text-center font-mono text-sm uppercase tracking-[0.35em] text-inverse-fg/70 md:text-base">
          Trusted by 300+ teams
        </p>
        <div
          className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <div className="flex w-max animate-marquee items-center gap-20">
            {[...clients, ...clients].map(({ name, Icon }, i) => (
              <span
                key={i}
                className="flex items-center gap-4 whitespace-nowrap font-mono text-2xl uppercase tracking-[0.2em]"
              >
                <Icon
                  size={30}
                  strokeWidth={1.8}
                  className={i % 2 ? "text-brand" : "text-accent-vivid"}
                />
                <span className="text-inverse-fg/85">{name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
