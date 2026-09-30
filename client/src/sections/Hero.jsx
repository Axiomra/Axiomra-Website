import { companyStats } from "../data/companyStats.js";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Star } from "lucide-react";

/*
 * The entrance fade is a CSS animation ([data-fade] in index.css), not
 * framer-motion: it has to start with the first paint of the prerendered HTML,
 * before any JS runs, or the h1 (the LCP element) waits on the whole bundle.
 */

/*
 * Client marks for the "Trusted by" strip: one small geometric SVG per brand,
 * drawn on a 32px grid in currentColor so the whole strip greys out together
 * and each mark picks up its brand tint on hover.
 */
const clients = [
  {
    name: "Konnect",
    tint: "#2563EB",
    mark: (
      <>
        <circle cx="12" cy="16" r="7" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="20" cy="16" r="7" fill="none" stroke="currentColor" strokeWidth="3" />
      </>
    ),
  },
  {
    name: "Doozoo",
    tint: "#F97316",
    mark: (
      <path
        fillRule="evenodd"
        d="M8 4h16a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Zm8 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"
        fill="currentColor"
      />
    ),
  },
  {
    name: "FormOle",
    tint: "#0EA5E9",
    mark: (
      <>
        <rect x="5" y="6" width="22" height="5" rx="2.5" fill="currentColor" />
        <rect x="5" y="14" width="16" height="5" rx="2.5" fill="currentColor" opacity=".7" />
        <rect x="5" y="22" width="10" height="5" rx="2.5" fill="currentColor" opacity=".45" />
      </>
    ),
  },
  {
    name: "Voltox",
    tint: "#EAB308",
    mark: (
      <>
        <path
          d="M16 3 27.3 9.5v13L16 29 4.7 22.5v-13Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path d="M17.5 8 11 17.5h4.5L14 24l7-9.5h-4.5Z" fill="currentColor" />
      </>
    ),
  },
  {
    name: "FN-AD",
    tint: "#E11D48",
    mark: (
      <>
        <path d="M4 28V4h8a16 16 0 0 1 16 16v8Z" fill="currentColor" opacity=".35" />
        <path d="M4 28V14h4a10 10 0 0 1 10 10v4Z" fill="currentColor" />
      </>
    ),
  },
  {
    name: "FluentTalk",
    tint: "#8B5CF6",
    mark: (
      <>
        <path
          d="M6 5h20a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H14l-6 5v-5H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z"
          fill="currentColor"
        />
        <path
          d="M9 14c2-3 4-3 6 0s4 3 6 0"
          fill="none"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    name: "TuneGPT",
    tint: "#10B981",
    mark: (
      <>
        {[
          [4, 8],
          [10, 18],
          [16, 26],
          [22, 14],
          [28, 8],
        ].map(([x, h]) => (
          <rect
            key={x}
            x={x - 1.75}
            y={16 - h / 2}
            width="3.5"
            height={h}
            rx="1.75"
            fill="currentColor"
          />
        ))}
      </>
    ),
  },
  {
    name: "Navex",
    tint: "#0F766E",
    mark: (
      <>
        <circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M16 6 19.5 16 16 26 12.5 16Z" fill="currentColor" />
        <circle cx="16" cy="16" r="2" fill="#fff" />
      </>
    ),
  },
  {
    name: "Peersuma",
    tint: "#DB2777",
    mark: (
      <>
        <circle cx="11" cy="12" r="7" fill="currentColor" opacity=".45" />
        <circle cx="21" cy="12" r="7" fill="currentColor" opacity=".7" />
        <circle cx="16" cy="21" r="7" fill="currentColor" />
      </>
    ),
  },
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
        className="relative flex min-h-[760px] items-center pt-36 md:min-h-[920px]"
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
              className="group inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-9 py-4 text-lg font-semibold text-white shadow-[0_18px_40px_-18px_rgba(37,99,235,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1D4ED8] focus-ring md:text-xl"
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

        {/* Prev / next: pinned to the sides from md up, paired under the copy on
            phones so they never sit on top of the headline. */}
        {[
          { dir: -1, label: "Previous slide", Icon: ChevronLeft, side: "md:left-6" },
          { dir: 1, label: "Next slide", Icon: ChevronRight, side: "md:right-6" },
        ].map(({ dir, label, Icon, side }) => (
          <button
            key={dir}
            type="button"
            onClick={() => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length)}
            aria-label={label}
            className={`absolute bottom-8 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white backdrop-blur-md transition-colors duration-300 hover:border-white/70 hover:bg-white/25 focus-ring md:bottom-auto md:top-1/2 md:h-12 md:w-12 md:-translate-y-1/2 ${
              dir < 0 ? "left-[calc(50%-3.25rem)]" : "right-[calc(50%-3.25rem)]"
            } ${side}`}
          >
            <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="relative z-10 border-y border-line bg-surface py-10">
        <p className="mb-8 text-center font-mono text-sm uppercase tracking-[0.35em] text-content-faint md:text-base">
          Trusted across {companyStats.projects}+ projects
        </p>
        <div
          className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <div className="flex w-max animate-marquee items-center gap-16 md:gap-20">
            {[...clients, ...clients].map(({ name, tint, mark }, i) => (
              <span
                key={i}
                aria-hidden={i >= clients.length || undefined}
                style={{ "--tint": tint }}
                className="group flex items-center gap-3 whitespace-nowrap text-content-dim opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              >
                <svg
                  viewBox="0 0 32 32"
                  width="34"
                  height="34"
                  aria-hidden="true"
                  className="shrink-0 text-[var(--tint)]"
                >
                  {mark}
                </svg>
                <span className="font-display text-2xl font-semibold tracking-tight text-content">
                  {name}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
