import { motion } from "framer-motion";

/** Generated wireframes for the capability rows. */

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
    transition: { pathLength: { duration: 0.9, delay: i * 0.12 }, opacity: { duration: 0.25, delay: i * 0.12 } },
  }),
};

const pop = {
  hidden: { opacity: 0, scale: 0.7 },
  show: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: 0.25 + i * 0.05 },
  }),
};

/** A detection box with the four corner brackets a detector paints. */
function Box({ x, y, w, h, label, score, index }) {
  const b = 12;
  const corners = [
    `M${x} ${y + b} V${y} H${x + b}`,
    `M${x + w - b} ${y} H${x + w} V${y + b}`,
    `M${x + w} ${y + h - b} V${y + h} H${x + w - b}`,
    `M${x + b} ${y + h} H${x} V${y + h - b}`,
  ];

  return (
    <g>
      <motion.rect
        variants={draw}
        custom={index}
        x={x}
        y={y}
        width={w}
        height={h}
        fill={BRAND}
        fillOpacity={0.06}
        stroke={BRAND}
        strokeOpacity={0.5}
        strokeWidth={1}
      />
      {corners.map((d) => (
        <motion.path
          key={d}
          variants={draw}
          custom={index}
          d={d}
          fill="none"
          stroke={BRAND}
          strokeWidth={2}
        />
      ))}
      {label && (
        <motion.g variants={pop} custom={index}>
          <rect x={x} y={y - 15} width={label.length * 6.2 + 30} height={14} rx={2} fill={BRAND} />
          <text x={x + 5} y={y - 4.5} fontSize={9} fontFamily="monospace" fill="#06121A">
            {label} {score}
          </text>
        </motion.g>
      )}
    </g>
  );
}

function Boxes() {
  return (
    <>
      <Box x={26} y={62} w={104} h={82} label="person" score="0.97" index={0} />
      <Box x={168} y={104} w={130} h={70} label="vehicle" score="0.94" index={1} />
      <Box x={252} y={44} w={116} h={54} label="signal" score="0.89" index={2} />
      <Box x={62} y={176} w={78} h={48} label="pallet" score="0.91" index={3} />
    </>
  );
}

/** Facial landmark mesh: points on a face oval, wired into a triangulation. */
function Mesh() {
  const cx = 200;
  const cy = 140;
  const points = [];
  for (let ring = 1; ring <= 4; ring++) {
    const count = ring * 6;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + ring * 0.4;
      const rx = ring * 21 * (0.85 + jitter(ring * 31 + i) * 0.3);
      const ry = ring * 26 * (0.85 + jitter(ring * 57 + i) * 0.3);
      points.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]);
    }
  }

  return (
    <>
      <motion.ellipse
        variants={draw}
        custom={0}
        cx={cx}
        cy={cy}
        rx={92}
        ry={116}
        fill={ACCENT}
        fillOpacity={0.05}
        stroke={ACCENT}
        strokeOpacity={0.45}
        strokeWidth={1}
      />
      {points.map(([px, py], i) => {
        const [qx, qy] = points[(i + 3) % points.length];
        return (
          <motion.line
            key={`e${i}`}
            variants={draw}
            custom={0.4 + (i % 8) * 0.03}
            x1={px}
            y1={py}
            x2={qx}
            y2={qy}
            stroke={BRAND}
            strokeOpacity={0.28}
            strokeWidth={0.7}
          />
        );
      })}
      {points.map(([px, py], i) => (
        <motion.circle
          key={`p${i}`}
          variants={pop}
          custom={i * 0.012}
          cx={px}
          cy={py}
          r={1.7}
          fill={BRAND}
        />
      ))}
      <Box x={104} y={22} w={192} h={236} label="face" score="0.98" index={0.2} />
    </>
  );
}

/** Pose keypoints and limbs for two figures at different scales. */
function Skeleton() {
  // head, neck, shoulders, elbows, hands, hips, knees, feet
  const rig = [
    [0, -62],
    [0, -40],
    [-24, -34],
    [24, -34],
    [-38, -6],
    [38, -6],
    [-32, 22],
    [44, 20],
    [-16, 16],
    [16, 16],
    [-20, 56],
    [22, 56],
    [-24, 94],
    [26, 94],
  ];
  const bones = [
    [0, 1], [1, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7],
    [1, 8], [1, 9], [8, 9], [8, 10], [9, 11], [10, 12], [11, 13],
  ];

  const figures = [
    { ox: 118, oy: 150, s: 1, i: 0 },
    { ox: 288, oy: 158, s: 0.72, i: 1 },
  ];

  return (
    <>
      {figures.map(({ ox, oy, s, i }) => (
        <g key={i}>
          {bones.map(([a, b], k) => (
            <motion.line
              key={k}
              variants={draw}
              custom={i * 0.3 + k * 0.03}
              x1={ox + rig[a][0] * s}
              y1={oy + rig[a][1] * s}
              x2={ox + rig[b][0] * s}
              y2={oy + rig[b][1] * s}
              stroke={k < 7 ? BRAND : ACCENT}
              strokeOpacity={0.8}
              strokeWidth={2}
              strokeLinecap="round"
            />
          ))}
          {rig.map(([px, py], k) => (
            <motion.circle
              key={k}
              variants={pop}
              custom={i * 0.3 + k * 0.03}
              cx={ox + px * s}
              cy={oy + py * s}
              r={3.4 * s}
              fill="#fff"
              stroke={BRAND}
              strokeWidth={1.6}
            />
          ))}
        </g>
      ))}
    </>
  );
}

/** Pixel-level masks: overlapping regions, each a different class. */
function Segments() {
  const regions = [
    { d: "M18 196 C 70 168, 132 182, 186 160 S 300 142, 382 158 L382 262 L18 262 Z", fill: ACCENT, o: 0.32 },
    { d: "M204 62 C 246 40, 300 48, 318 84 S 322 146, 274 160 S 200 140, 204 62 Z", fill: BRAND, o: 0.34 },
    { d: "M30 84 L112 62 L142 118 L96 168 L26 148 Z", fill: "#F0B429", o: 0.28 },
    { d: "M150 178 C 176 160, 214 166, 222 190 S 200 224, 168 218 S 138 196, 150 178 Z", fill: "#EC6B7A", o: 0.3 },
  ];

  return (
    <>
      {regions.map((r, i) => (
        <motion.path
          key={r.d}
          variants={{
            hidden: { opacity: 0, scale: 0.92 },
            show: { opacity: 1, scale: 1, transition: { duration: 0.55, delay: i * 0.12 } },
          }}
          style={{ transformOrigin: "200px 150px" }}
          d={r.d}
          fill={r.fill}
          fillOpacity={r.o}
          stroke={r.fill}
          strokeOpacity={0.85}
          strokeWidth={1.2}
        />
      ))}
    </>
  );
}

/** A shot timeline with detected events and a playhead. */
function Timeline() {
  const frames = Array.from({ length: 9 }, (_, i) => i);
  const events = [
    { at: 1, label: "entry" },
    { at: 4, label: "queue" },
    { at: 7, label: "exit" },
  ];

  return (
    <>
      {frames.map((i) => (
        <motion.rect
          key={i}
          variants={pop}
          custom={i * 0.05}
          x={24 + i * 39}
          y={72}
          width={33}
          height={54}
          rx={2}
          fill={ACCENT}
          fillOpacity={0.12 + jitter(i) * 0.2}
          stroke={ACCENT}
          strokeOpacity={0.4}
          strokeWidth={1}
        />
      ))}

      <motion.line
        variants={draw}
        custom={0.4}
        x1={24}
        y1={158}
        x2={375}
        y2={158}
        stroke={ACCENT}
        strokeOpacity={0.5}
        strokeWidth={1.5}
      />

      {events.map((e, i) => (
        <g key={e.label}>
          <motion.line
            variants={draw}
            custom={0.6 + i * 0.12}
            x1={40 + e.at * 39}
            y1={132}
            x2={40 + e.at * 39}
            y2={186}
            stroke={BRAND}
            strokeWidth={2}
          />
          <motion.circle
            variants={pop}
            custom={0.7 + i * 0.12}
            cx={40 + e.at * 39}
            cy={158}
            r={5}
            fill={BRAND}
          />
          <motion.text
            variants={pop}
            custom={0.8 + i * 0.12}
            x={40 + e.at * 39}
            y={204}
            fontSize={10}
            fontFamily="monospace"
            fill={BRAND}
            textAnchor="middle"
          >
            {e.label}
          </motion.text>
        </g>
      ))}

      {/* Playhead sweeps once the strip has drawn itself in. */}
      <motion.rect
        initial={{ x: 24, opacity: 0 }}
        whileInView={{ x: [24, 375, 24], opacity: [0, 1, 1, 0] }}
        viewport={{ once: true }}
        transition={{ duration: 4.5, delay: 1, ease: "easeInOut" }}
        y={64}
        width={2}
        height={70}
        fill="#fff"
      />
    </>
  );
}

/** A scanned page with text regions boxed and one line lifted out. */
function TextRegions() {
  const lines = [
    { y: 56, w: 150 },
    { y: 76, w: 196 },
    { y: 96, w: 172 },
    { y: 130, w: 204 },
    { y: 150, w: 138 },
    { y: 184, w: 188 },
    { y: 204, w: 96 },
  ];

  return (
    <>
      <motion.rect
        variants={draw}
        custom={0}
        x={22}
        y={30}
        width={232}
        height={206}
        rx={4}
        fill={ACCENT}
        fillOpacity={0.06}
        stroke={ACCENT}
        strokeOpacity={0.45}
        strokeWidth={1}
      />
      {lines.map((l, i) => (
        <motion.rect
          key={l.y}
          variants={pop}
          custom={i * 0.06}
          x={38}
          y={l.y}
          width={l.w}
          height={9}
          rx={1.5}
          fill={i === 3 ? BRAND : ACCENT}
          fillOpacity={i === 3 ? 0.85 : 0.4}
        />
      ))}
      {/* The extracted line, promoted out of the page as machine-readable text. */}
      <motion.g
        variants={{
          hidden: { opacity: 0, x: -14 },
          show: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.7 } },
        }}
      >
        <path d="M258 134 H286" stroke={BRAND} strokeWidth={1.5} />
        <path d="M280 129 L286 134 L280 139" fill="none" stroke={BRAND} strokeWidth={1.5} />
        <rect x={292} y={116} width={90} height={36} rx={4} fill={BRAND} fillOpacity={0.14} stroke={BRAND} strokeWidth={1} />
        <text x={301} y={132} fontSize={10} fontFamily="monospace" fill={BRAND}>
          INV-40218
        </text>
        <text x={301} y={145} fontSize={9} fontFamily="monospace" fill={ACCENT}>
          conf 0.993
        </text>
      </motion.g>
    </>
  );
}

/** A latent grid resolving from noise into structure. */
function Noise() {
  const cols = 14;
  const rows = 9;
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push({ r, c, n: jitter(r * 37 + c * 11) });
    }
  }
  // Cells inside this ellipse resolve to brand colour, the "generated" subject emerging from the noise field.
  const inShape = ({ r, c }) => {
    const dx = (c - (cols - 1) / 2) / (cols / 2.6);
    const dy = (r - (rows - 1) / 2) / (rows / 2.4);
    return dx * dx + dy * dy < 1;
  };

  return (
    <>
      {cells.map((cell) => {
        const solid = inShape(cell);
        return (
          <motion.rect
            key={`${cell.r}-${cell.c}`}
            initial={{ opacity: cell.n * 0.9 }}
            whileInView={{ opacity: solid ? 0.28 + cell.n * 0.55 : cell.n * 0.14 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.2 + cell.n * 0.6 }}
            x={26 + cell.c * 25}
            y={44 + cell.r * 21}
            width={22}
            height={18}
            rx={2}
            fill={solid ? BRAND : ACCENT}
          />
        );
      })}
    </>
  );
}

const VARIANTS = {
  boxes: Boxes,
  mesh: Mesh,
  skeleton: Skeleton,
  segments: Segments,
  timeline: Timeline,
  text: TextRegions,
  noise: Noise,
};

/**
 * `showGrid` off is for the hybrid rows, where the wireframe sits over a photo
 * and the blueprint grid would fight the image underneath.
 */
export default function CvMotif({ variant = "boxes", className = "", showGrid = true }) {
  const Shape = VARIANTS[variant] ?? Boxes;

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
        <pattern id={`cv-grid-${variant}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0 H0 V20" fill="none" stroke={ACCENT} strokeOpacity="0.18" strokeWidth="0.6" />
        </pattern>
      </defs>
      {showGrid && <rect width="400" height="280" fill={`url(#cv-grid-${variant})`} />}
      <Shape />
    </motion.svg>
  );
}
