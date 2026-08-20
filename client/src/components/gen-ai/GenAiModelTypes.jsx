import { motion } from "framer-motion";
import { Type, Image, Mic, Video, Code2, Layers } from "lucide-react";
import GenAiCanvas from "./GenAiCanvas";
import { modelTypes } from "../../data/generativeAiData";

/* Icons are chosen here, not in the data file: the data describes what we
   build, and swapping an icon set should not mean editing marketing copy. */
const ICONS = {
  text: Type,
  image: Image,
  audio: Mic,
  video: Video,
  code: Code2,
  multimodal: Layers,
};

/**
 * The six families of generative system, on the page's second dark band.
 *
 * Dark on purpose: this is the midpoint of a long page, and the token-stream
 * field behind it — prompts converging on a model core — is the one place where
 * a WebGL backdrop is describing the actual subject rather than decorating it.
 */
export default function GenAiModelTypes() {
  return (
    <section id="generative-ai-models" className="relative overflow-hidden bg-inverse py-20 md:py-28">
      <GenAiCanvas variant="tokens" className="opacity-70" />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-inverse via-inverse/55 to-inverse"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-8xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="mb-4 font-mono text-sm uppercase tracking-[0.2em] text-accent-vivid md:text-base">
            {modelTypes.eyebrow}
          </p>
          <h2 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
            <span className="text-gradient">{modelTypes.titleAccent}</span> {modelTypes.titleLead}
          </h2>
          <p className="mx-auto mt-6 max-w-4xl text-lg leading-relaxed text-white/70 md:text-xl">
            {modelTypes.subtitle}
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modelTypes.items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Layers;
            return (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="group relative overflow-hidden rounded-xl2 border border-white/12 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors hover:border-accent-vivid/40 md:p-8"
              >
                {/* Hover bloom, clipped by the card — cheaper and steadier than
                    animating a shadow, and it never shifts layout. */}
                <span
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent-vivid/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />

                <div className="relative flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl2 bg-cta-gradient text-inverse">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span
                    className="font-display text-3xl font-semibold tabular-nums text-white/20"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="relative mt-6 font-display text-xl font-semibold text-white md:text-2xl">
                  {item.name}
                </h3>
                <p className="relative mt-4 text-base leading-relaxed text-white/65 md:text-lg">
                  {item.body}
                </p>

                <ul className="relative mt-6 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-xs text-white/70 md:text-sm"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
