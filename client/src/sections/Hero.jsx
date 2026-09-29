import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
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

/*
 * The entrance fade is a CSS animation ([data-fade] in index.css), not
 * framer-motion: it has to start with the first paint of the prerendered HTML,
 * before any JS runs, or the h1 (the LCP element) waits on the whole bundle.
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

/*
 * Slides live in public/Herosection as 960w webp exports of the source art.
 * TODO: add 1920w variants once real 1920px+ sources exist. The current sources
 * are 1168–1672px wide, and an upscaled 1920 is softer and heavier than the 960.
 * `tone` is the photo's brightness behind the copy (measured on the
 * centre crop): light photos get a white wash and navy copy, dark photos a navy
 * wash and white copy, so the headline stays readable on every frame.
 */
const SLIDES = [
  { id: 1, tone: "light", alt: "Axiomra team reviewing AI analytics dashboards" },
  { id: 2, tone: "dark", alt: "AI engineer discussing a production rollout" },
  { id: 3, tone: "dark", alt: "Engineers building AI models in a modern office" },
  { id: 4, tone: "light", alt: "Team reviewing AI results together on a laptop" },
  { id: 5, tone: "dark", alt: "Team discussing data visualisations on a large display" },
  { id: 6, tone: "light", alt: "Team mapping an ML pipeline on a sticky-note wall" },
];

const INTERVAL_MS = 6000;

const src = (id) => `/Herosection/hero-${id}-960.webp`;

const TONE = {
  dark: {
    wash: "radial-gradient(ellipse 60% 55% at 50% 48%, rgba(10,20,40,0.6), rgba(10,20,40,0.15) 100%)",
    heading: "text-white",
    body: "text-white/80",
    accent: "text-[#14D8C4]",
    faint: "text-white/65",
  },
  light: {
    wash: "radial-gradient(ellipse 60% 55% at 50% 48%, rgba(255,255,255,0.72), rgba(255,255,255,0.1) 100%)",
    heading: "text-[#0A1428]",
    body: "text-[#1E2A44]",
    accent: "text-[#0F766E]",
    faint: "text-[#1E2A44]/70",
  },
};

/** The hero is a full-bleed photo carousel; copy colour follows each photo. */
export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // Slides whose <img> is mounted. All six sit in the viewport (only opacity
  // hides them), so loading="lazy" would not hold any back: mount the active
  // slide, and the next one halfway through its predecessor's turn.
  const [mounted, setMounted] = useState(() => new Set([0]));
  const reduced = useReducedMotion();

  useEffect(() => {
    const next = (index + 1) % SLIDES.length;
    const t = setTimeout(() => setMounted((m) => new Set([...m, index, next])), INTERVAL_MS / 2);
    return () => clearTimeout(t);
  }, [index]);

  useEffect(() => {
    if (paused || reduced) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL_MS);
    return () => clearTimeout(t);
  }, [index, paused, reduced]);

  const tone = SLIDES[index].tone;
  const c = TONE[tone];
  const fade = "transition-colors duration-700";

  return (
    <section
      id="home"
      data-nav-tone={tone}
      aria-roledescription="carousel"
      aria-label="Axiomra highlights"
      className="relative overflow-hidden bg-inverse pb-0"
    >
      <div
        className="relative flex min-h-[640px] items-center pt-36 md:min-h-[760px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            {(i === index || mounted.has(i)) && (
              <img
                // 960w only, no srcset, until real 1920px sources exist (see SLIDES).
                src={src(s.id)}
                alt={s.alt}
                width={960}
                height={540}
                // React 18 only forwards the lowercase attribute.
                // eslint-disable-next-line react/no-unknown-property
                fetchpriority={i === 0 ? "high" : "low"}
                decoding="async"
                className={`h-full w-full object-cover ${
                  i === index && !reduced ? "hero-kenburns" : ""
                }`}
              />
            )}
          </div>
        ))}

        {/* Readability wash: dense behind the copy, thin at the edges so the photo shows. */}
        {Object.entries(TONE).map(([name, t]) => (
          <div
            key={name}
            aria-hidden="true"
            className={`absolute inset-0 transition-opacity duration-1000 ${
              name === tone ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: t.wash }}
          />
        ))}
        {/* Soft floor so the slide melts into the dark client strip below. */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-inverse" />

        <div className="relative z-10 mx-auto max-w-8xl px-4 pb-28 text-center sm:px-6">
          <p data-fade="0" className={`mb-5 text-lg font-medium md:text-xl ${c.faint} ${fade}`}>
            Practical AI. Measurable Business Progress.
          </p>

          <h1
            data-fade="1"
            className={`font-display text-4xl font-semibold leading-[1.08] tracking-tight md:text-7xl ${c.heading} ${fade}`}
          >
            Custom AI Development That{" "}
            <span className={`${c.accent} ${fade}`}>Moves Your Business Forward</span>
          </h1>

          <p
            data-fade="2"
            className={`mx-auto mt-7 max-w-4xl text-lg leading-relaxed md:text-xl ${c.body} ${fade}`}
          >
            Axiomra builds AI solutions around your business goals, data, and workflows. From
            process automation to predictive insights, we help your team work more efficiently, make
            informed decisions, and measure the value of AI in everyday operations.
          </p>

          <div data-fade="3" className="mt-9">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-[#14D8C4] px-9 py-4 text-lg font-semibold text-[#0A1428] shadow-[0_18px_40px_-18px_rgba(20,216,196,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2EE6D3] focus-ring md:text-xl"
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
            className={`mt-8 flex flex-wrap items-center justify-center gap-2.5 text-lg ${c.faint} ${fade}`}
          >
            <span>Reviewed on</span>
            <span className={`text-xl font-semibold ${c.heading} ${fade}`}>Clutch</span>
            <span className="flex text-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            <span>12 reviews</span>
          </div>
        </div>

        {/* Slide indicators: the active one fills over the slide's lifetime. */}
        <div className="absolute inset-x-0 bottom-10 z-10 flex justify-center gap-2.5">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show slide ${i + 1} of ${SLIDES.length}`}
              aria-current={i === index}
              className="group relative h-1.5 w-10 overflow-hidden rounded-full bg-white/30 focus-ring"
            >
              <span
                key={i === index ? `on-${index}` : "off"}
                className={`absolute inset-y-0 left-0 rounded-full bg-[#14D8C4] ${
                  i === index ? (paused || reduced ? "w-full" : "hero-progress") : "w-0"
                }`}
                style={{ animationDuration: `${INTERVAL_MS}ms` }}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 border-t border-inverse-fg/10 bg-inverse py-8">
        <div className="absolute inset-x-0 top-0 h-px bg-accent-vivid/60" />
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
                <Icon size={30} strokeWidth={1.8} className="text-accent-vivid" />
                <span className="text-inverse-fg/85">{name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
