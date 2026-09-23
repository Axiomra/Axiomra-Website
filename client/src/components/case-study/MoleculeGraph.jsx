import useInView from "../../hooks/useInView";

// Diamond: two on top, the hub, two either side below it, one at the foot.
const NODES = {
  tl: [44, 18],
  tr: [96, 18],
  c: [70, 72],
  ml: [18, 122],
  mr: [122, 122],
  b: [70, 170],
};

const EDGES = [
  ["tl", "tr"],
  ["tl", "c"],
  ["tr", "c"],
  ["c", "ml"],
  ["c", "mr"],
  ["ml", "b"],
  ["mr", "b"],
];

// A closed walk over the edges, so the highlight loops without a jump.
const TOUR = ["c", "tl", "tr", "c", "mr", "b", "ml", "c"];
const tourPath = TOUR.map((k, i) => `${i ? "L" : "M"}${NODES[k][0]} ${NODES[k][1]}`).join("");

const NODE_ORDER = ["c", "tl", "tr", "ml", "mr", "b"];
const EDGE_STEP = 0.08;
const NODE_START = EDGE_STEP * EDGES.length;

/** Six-node graph for the page margin: hub in brand colour, the rest muted. */
export default function MoleculeGraph({ className = "" }) {
  const [ref, inView] = useInView({ rootMargin: "0px" });
  const [cx, cy] = NODES.c;

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      focusable="false"
      width="140"
      height="188"
      viewBox="0 0 140 188"
      data-active={inView || undefined}
      className={`cs-decor pointer-events-none absolute overflow-visible ${className}`}
    >
      <g fill="none" stroke="rgb(var(--content-faint))" strokeOpacity="0.5" strokeWidth="1">
        {EDGES.map(([a, b], i) => (
          <path
            key={`${a}-${b}`}
            d={`M${NODES[a][0]} ${NODES[a][1]}L${NODES[b][0]} ${NODES[b][1]}`}
            pathLength="1"
            className="cs-draw"
            style={{ "--d": `${(i * EDGE_STEP).toFixed(2)}s` }}
          />
        ))}
      </g>

      <path
        d={tourPath}
        pathLength="1"
        fill="none"
        stroke="rgb(var(--brand))"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="cs-mol-travel"
      />

      <circle cx={cx} cy={cy} r="9" fill="none" stroke="rgb(var(--brand))" className="cs-mol-ripple" />

      {NODE_ORDER.map((k, i) => {
        const hub = k === "c";
        return (
          <circle
            key={k}
            cx={NODES[k][0]}
            cy={NODES[k][1]}
            r={hub ? 9 : 6}
            fill={hub ? "rgb(var(--brand))" : "rgb(var(--surface))"}
            stroke={hub ? "none" : "rgb(var(--content-faint))"}
            strokeWidth="1"
            className="cs-mol-node"
            style={{ "--d": `${(NODE_START + i * 0.08).toFixed(2)}s` }}
          />
        );
      })}
    </svg>
  );
}
