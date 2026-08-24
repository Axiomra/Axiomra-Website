import { motion } from "framer-motion";

/** Generated wireframes for the NLP service rows. */

const BRAND = "#14D8C4";
const ACCENT = "#788BE3";

/** Deterministic sin-hash, same drawing on every render, no `Math.random()`. */
function jitter(n) {
  return Math.abs(Math.sin(n * 127.1 + 311.7) * 43758.5453) % 1;
}

/** Shared draw-on: strokes trace themselves in as the row scrolls into view. */
const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.9, delay: i * 0.1 },
      opacity: { duration: 0.25, delay: i * 0.1 },
    },
  }),
};

const pop = {
  hidden: { opacity: 0, scale: 0.7 },
  show: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: 0.2 + i * 0.06 },
  }),
};

const grow = {
  hidden: { opacity: 0, scaleX: 0 },
  show: (i = 0) => ({
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.55, delay: 0.15 + i * 0.07 },
  }),
};

/** A pill with a word in it, the shape every one of these motifs is built on. */
function Chip({ x, y, text, index = 0, accent = ACCENT, filled = false }) {
  const w = text.length * 6.4 + 22;
  return (
    <motion.g variants={pop} custom={index} style={{ transformOrigin: `${x + w / 2}px ${y + 11}px` }}>
      <rect
        x={x}
        y={y}
        width={w}
        height={22}
        rx={11}
        fill={accent}
        fillOpacity={filled ? 0.22 : 0.08}
        stroke={accent}
        strokeOpacity={filled ? 0.85 : 0.45}
        strokeWidth={1}
      />
      <text
        x={x + w / 2}
        y={y + 15}
        fontSize={10}
        fontFamily="monospace"
        textAnchor="middle"
        fill={accent}
      >
        {text}
      </text>
    </motion.g>
  );
}

/* Consulting: use cases scored and ordered into a roadmap */

function Roadmap() {
  const rows = [
    { label: "ticket routing", value: 0.92 },
    { label: "doc extraction", value: 0.81 },
    { label: "review analysis", value: 0.64 },
    { label: "auto-drafting", value: 0.43 },
  ];

  return (
    <>
      <motion.path
        variants={draw}
        custom={0}
        d="M30 236 H370"
        fill="none"
        stroke={ACCENT}
        strokeOpacity={0.35}
        strokeWidth={1}
      />
      <motion.path
        variants={draw}
        custom={0}
        d="M30 40 V236"
        fill="none"
        stroke={ACCENT}
        strokeOpacity={0.35}
        strokeWidth={1}
      />

      {rows.map((r, i) => {
        const y = 56 + i * 44;
        const w = r.value * 268;
        return (
          <g key={r.label}>
            <motion.rect
              variants={grow}
              custom={i}
              style={{ transformOrigin: "34px 0px" }}
              x={34}
              y={y}
              width={w}
              height={20}
              rx={4}
              fill={i === 0 ? BRAND : ACCENT}
              fillOpacity={i === 0 ? 0.32 : 0.16}
              stroke={i === 0 ? BRAND : ACCENT}
              strokeOpacity={0.55}
              strokeWidth={1}
            />
            <motion.text
              variants={pop}
              custom={i}
              x={42}
              y={y + 14}
              fontSize={10}
              fontFamily="monospace"
              fill={i === 0 ? BRAND : "#9aa6c4"}
            >
              {r.label}
            </motion.text>
            <motion.text
              variants={pop}
              custom={i + 1}
              x={34 + w + 8}
              y={y + 14}
              fontSize={10}
              fontFamily="monospace"
              fill={ACCENT}
            >
              {r.value.toFixed(2)}
            </motion.text>
          </g>
        );
      })}

      <motion.text
        variants={pop}
        custom={5}
        x={30}
        y={252}
        fontSize={9}
        fontFamily="monospace"
        fill="#7c88a8"
      >
        value × feasibility · build order
      </motion.text>
    </>
  );
}

/* Custom development: a transformer block with its attention heads */

function Transformer() {
  const layers = ["embed", "attention ×12", "feed-forward", "classifier"];

  return (
    <>
      {layers.map((name, i) => {
        const y = 44 + i * 52;
        return (
          <g key={name}>
            <motion.rect
              variants={pop}
              custom={i}
              style={{ transformOrigin: "200px " + (y + 18) + "px" }}
              x={92}
              y={y}
              width={216}
              height={36}
              rx={6}
              fill={i === 1 ? BRAND : ACCENT}
              fillOpacity={i === 1 ? 0.16 : 0.07}
              stroke={i === 1 ? BRAND : ACCENT}
              strokeOpacity={0.5}
              strokeWidth={1}
            />
            <motion.text
              variants={pop}
              custom={i}
              x={200}
              y={y + 22}
              fontSize={11}
              fontFamily="monospace"
              textAnchor="middle"
              fill={i === 1 ? BRAND : "#9aa6c4"}
            >
              {name}
            </motion.text>
            {i < layers.length - 1 && (
              <motion.path
                variants={draw}
                custom={i}
                d={`M200 ${y + 36} V${y + 52}`}
                fill="none"
                stroke={ACCENT}
                strokeOpacity={0.5}
                strokeWidth={1.4}
              />
            )}
          </g>
        );
      })}

      {/* The twelve heads, drawn as ticks either side of the attention layer. */}
      {Array.from({ length: 12 }).map((_, i) => {
        const y = 100 + (i % 6) * 6;
        const left = i < 6;
        return (
          <motion.rect
            key={i}
            variants={pop}
            custom={i * 0.4}
            x={left ? 70 : 314}
            y={y - 4}
            width={14}
            height={3}
            rx={1.5}
            fill={BRAND}
            fillOpacity={0.35 + jitter(i) * 0.5}
          />
        );
      })}
    </>
  );
}

/* Speech-to-text: a waveform resolving into transcript lines */

function Waveform() {
  const bars = Array.from({ length: 46 });

  return (
    <>
      {bars.map((_, i) => {
        const h = 8 + jitter(i * 3) * 74;
        const x = 30 + i * 7.6;
        return (
          <motion.rect
            key={i}
            variants={pop}
            custom={i * 0.25}
            x={x}
            y={92 - h / 2}
            width={3.4}
            height={h}
            rx={1.7}
            fill={i < 24 ? BRAND : ACCENT}
            fillOpacity={0.35 + jitter(i * 11) * 0.5}
          />
        );
      })}

      <motion.path
        variants={draw}
        custom={2}
        d="M30 148 H370"
        fill="none"
        stroke={ACCENT}
        strokeOpacity={0.3}
        strokeWidth={1}
      />

      {[
        { t: "00:04", s: "the invoice was late again" },
        { t: "00:09", s: "so we escalated the ticket" },
        { t: "00:14", s: "can you confirm the credit" },
      ].map((line, i) => (
        <g key={line.t}>
          <motion.text
            variants={pop}
            custom={i + 2}
            x={30}
            y={176 + i * 28}
            fontSize={10}
            fontFamily="monospace"
            fill={BRAND}
            fillOpacity={0.8}
          >
            {line.t}
          </motion.text>
          <motion.text
            variants={pop}
            custom={i + 2.4}
            x={80}
            y={176 + i * 28}
            fontSize={11}
            fontFamily="monospace"
            fill="#9aa6c4"
          >
            {line.s}
          </motion.text>
        </g>
      ))}
    </>
  );
}

/* Data acquisition: raw documents landing in a labelled corpus */

function Corpus() {
  return (
    <>
      {/* Three source documents on the left. */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <motion.rect
            variants={pop}
            custom={i}
            x={26 + i * 10}
            y={70 + i * 34}
            width={72}
            height={54}
            rx={4}
            fill={ACCENT}
            fillOpacity={0.07}
            stroke={ACCENT}
            strokeOpacity={0.45}
            strokeWidth={1}
          />
          {[0, 1, 2].map((l) => (
            <motion.rect
              key={l}
              variants={grow}
              custom={i + l * 0.3}
              style={{ transformOrigin: `${34 + i * 10}px 0px` }}
              x={34 + i * 10}
              y={80 + i * 34 + l * 12}
              width={l === 2 ? 30 : 54}
              height={4}
              rx={2}
              fill={ACCENT}
              fillOpacity={0.4}
            />
          ))}
        </g>
      ))}

      <motion.path
        variants={draw}
        custom={2}
        d="M118 128 C 152 128, 152 128, 186 128"
        fill="none"
        stroke={BRAND}
        strokeOpacity={0.6}
        strokeWidth={1.4}
      />
      <motion.text
        variants={pop}
        custom={3}
        x={126}
        y={120}
        fontSize={9}
        fontFamily="monospace"
        fill={BRAND}
        fillOpacity={0.75}
      >
        clean · label
      </motion.text>

      {/* The labelled corpus grid on the right. */}
      {Array.from({ length: 24 }).map((_, i) => {
        const r = Math.floor(i / 6);
        const c = i % 6;
        const n = jitter(i * 17);
        return (
          <motion.rect
            key={i}
            variants={pop}
            custom={3 + i * 0.15}
            x={196 + c * 30}
            y={62 + r * 30}
            width={26}
            height={26}
            rx={3}
            fill={n > 0.62 ? BRAND : ACCENT}
            fillOpacity={0.14 + n * 0.4}
            stroke={n > 0.62 ? BRAND : ACCENT}
            strokeOpacity={0.35}
            strokeWidth={0.8}
          />
        );
      })}

      <motion.text
        variants={pop}
        custom={8}
        x={196}
        y={214}
        fontSize={9}
        fontFamily="monospace"
        fill="#7c88a8"
      >
        annotated corpus · QA sampled
      </motion.text>
    </>
  );
}

/* Semantic analytics: an attention matrix over one sentence */

function Attention() {
  const tokens = ["invoice", "was", "late", "again"];
  const cell = 34;
  const originX = 138;
  const originY = 74;

  return (
    <>
      {tokens.map((t, r) =>
        tokens.map((_, c) => {
          const base = r === c ? 0.85 : 0.16 + jitter(r * 7 + c * 13) * 0.42;
          const w = c === 2 ? Math.min(1, base + 0.3) : base;
          return (
            <motion.rect
              key={`${r}-${c}`}
              variants={pop}
              custom={(r * tokens.length + c) * 0.28}
              x={originX + c * cell}
              y={originY + r * cell}
              width={cell - 4}
              height={cell - 4}
              rx={3}
              fill={w > 0.6 ? BRAND : ACCENT}
              fillOpacity={0.1 + w * 0.6}
            />
          );
        })
      )}

      {/* Row labels (query) and column labels (key). */}
      {tokens.map((t, i) => (
        <motion.text
          key={`row-${t}`}
          variants={pop}
          custom={i}
          x={originX - 10}
          y={originY + i * cell + 20}
          fontSize={10}
          fontFamily="monospace"
          textAnchor="end"
          fill="#9aa6c4"
        >
          {t}
        </motion.text>
      ))}
      {tokens.map((t, i) => (
        <motion.text
          key={`col-${t}`}
          variants={pop}
          custom={i}
          x={originX + i * cell + (cell - 4) / 2}
          y={originY - 12}
          fontSize={10}
          fontFamily="monospace"
          textAnchor="middle"
          fill="#9aa6c4"
        >
          {t}
        </motion.text>
      ))}

      <Chip x={138} y={220} text="sentiment: negative" index={6} accent={BRAND} filled />
    </>
  );
}

/* Integration: the deployed pipeline, under monitoring */

function Pipeline() {
  const nodes = [
    { x: 34, label: "CRM" },
    { x: 122, label: "API" },
    { x: 210, label: "model" },
    { x: 298, label: "ERP" },
  ];

  return (
    <>
      {nodes.map((n, i) => (
        <g key={n.label}>
          <motion.rect
            variants={pop}
            custom={i}
            style={{ transformOrigin: `${n.x + 34}px 96px` }}
            x={n.x}
            y={74}
            width={68}
            height={44}
            rx={6}
            fill={i === 2 ? BRAND : ACCENT}
            fillOpacity={i === 2 ? 0.18 : 0.07}
            stroke={i === 2 ? BRAND : ACCENT}
            strokeOpacity={0.55}
            strokeWidth={1}
          />
          <motion.text
            variants={pop}
            custom={i}
            x={n.x + 34}
            y={101}
            fontSize={11}
            fontFamily="monospace"
            textAnchor="middle"
            fill={i === 2 ? BRAND : "#9aa6c4"}
          >
            {n.label}
          </motion.text>
          {i < nodes.length - 1 && (
            <motion.path
              variants={draw}
              custom={i}
              d={`M${n.x + 68} 96 H${n.x + 88}`}
              fill="none"
              stroke={ACCENT}
              strokeOpacity={0.6}
              strokeWidth={1.4}
            />
          )}
        </g>
      ))}

      {/* Accuracy trace under the pipeline, with the retrain band marked. */}
      <motion.path
        variants={draw}
        custom={2}
        d="M34 210 H366"
        fill="none"
        stroke={ACCENT}
        strokeOpacity={0.3}
        strokeWidth={1}
      />
      <motion.path
        variants={draw}
        custom={3}
        d="M34 176 C 96 172, 130 190, 176 196 S 250 206, 288 178 S 344 168, 366 170"
        fill="none"
        stroke={BRAND}
        strokeOpacity={0.85}
        strokeWidth={1.8}
      />
      <motion.path
        variants={draw}
        custom={3}
        d="M34 186 H366"
        fill="none"
        stroke={ACCENT}
        strokeOpacity={0.45}
        strokeWidth={1}
        strokeDasharray="4 5"
      />
      <motion.text
        variants={pop}
        custom={5}
        x={34}
        y={232}
        fontSize={9}
        fontFamily="monospace"
        fill="#7c88a8"
      >
        live accuracy vs. agreed floor · retrain on breach
      </motion.text>
      <motion.circle variants={pop} custom={6} cx={252} cy={202} r={4} fill={BRAND} />
    </>
  );
}

const VARIANTS = {
  roadmap: Roadmap,
  transformer: Transformer,
  waveform: Waveform,
  corpus: Corpus,
  attention: Attention,
  pipeline: Pipeline,
};

export default function NlpMotif({ variant = "transformer", className = "" }) {
  const Shape = VARIANTS[variant] ?? Transformer;

  return (
    <motion.svg
      viewBox="0 0 400 280"
      role="presentation"
      aria-hidden="true"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className={`h-full w-full ${className}`}
    >
      <defs>
        <pattern id={`nlp-grid-${variant}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M20 0 H0 V20"
            fill="none"
            stroke={ACCENT}
            strokeOpacity="0.18"
            strokeWidth="0.6"
          />
        </pattern>
      </defs>
      <rect width="400" height="280" fill={`url(#nlp-grid-${variant})`} />
      <Shape />
    </motion.svg>
  );
}
