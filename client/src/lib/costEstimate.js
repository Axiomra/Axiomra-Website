/**
 * AI project cost model behind the homepage estimator.
 *
 * A project type sets the base budget (in USD thousands) and base duration;
 * complexity, size and timeline each scale it. The multipliers are chosen so
 * every one of the 4 x 3 x 3 x 3 combinations lands on its own range.
 * Directional only: the scoping call replaces it with a real quote.
 */

export const PROJECT_TYPES = [
  {
    id: "new",
    label: "New AI Product",
    hint: "Build from scratch",
    base: [60, 95],
    weeks: 20,
    team: 5,
  },
  {
    id: "poc",
    label: "Proof of Concept",
    hint: "Validate an idea fast",
    base: [11, 21],
    weeks: 6,
    team: 2,
  },
  {
    id: "mvp",
    label: "MVP",
    hint: "Core features, market-ready",
    base: [30, 50],
    weeks: 12,
    team: 4,
  },
  {
    id: "upgrade",
    label: "Upgrade Existing",
    hint: "Add AI to a current product",
    base: [23, 37],
    weeks: 9,
    team: 3,
  },
];

export const COMPLEXITY = [
  {
    id: "simple",
    label: "Simple",
    hint: "Rule-based logic, basic ML, chatbot",
    cost: 0.68,
    time: 0.8,
  },
  {
    id: "moderate",
    label: "Moderate",
    hint: "Custom models, NLP, computer vision",
    cost: 1,
    time: 1,
  },
  {
    id: "advanced",
    label: "Advanced",
    hint: "LLMs, multi-agent systems, real-time AI",
    cost: 1.46,
    time: 1.35,
  },
];

export const SIZE = [
  { id: "small", label: "Small", hint: "Prototype scope, 1-3 features", cost: 0.56, time: 0.7 },
  { id: "medium", label: "Medium", hint: "4-6 features", cost: 1, time: 1 },
  { id: "large", label: "Large", hint: "Full product, 7+ features", cost: 1.78, time: 1.5 },
];

/* Rushing costs more (a larger parallel team) and a relaxed schedule costs a
   little less; duration moves the other way. */
export const TIMELINE = [
  {
    id: "relaxed",
    label: "Relaxed",
    hint: "Flexible deadline, lowest cost",
    cost: 0.88,
    time: 1.4,
    team: 0.8,
  },
  {
    id: "standard",
    label: "Standard",
    hint: "Balanced pace and budget",
    cost: 1,
    time: 1,
    team: 1,
  },
  {
    id: "rush",
    label: "Rush",
    hint: "Fastest delivery, larger team",
    cost: 1.37,
    time: 0.65,
    team: 1.6,
  },
];

const find = (list, id) => list.find((o) => o.id === id) ?? list[0];

/** Whole thousands: coarser rounding makes distinct selections collide. */
const roundK = (k) => Math.round(k);

export function estimate({ type, complexity, size, timeline }) {
  const t = find(PROJECT_TYPES, type);
  const c = find(COMPLEXITY, complexity);
  const s = find(SIZE, size);
  const l = find(TIMELINE, timeline);

  const factor = c.cost * s.cost * l.cost;
  const low = roundK(t.base[0] * factor);
  const high = roundK(t.base[1] * factor);
  const weeks = Math.max(3, Math.round(t.weeks * c.time * s.time * l.time));
  const team = Math.max(2, Math.round(t.team * l.team * (s.id === "large" ? 1.3 : 1)));
  // Hosting, monitoring and model upkeep once live: ~2% of the build per month.
  const monthlyRun = Math.max(0.5, Math.round(((low + high) / 2) * 0.02 * 10) / 10);

  return { low, high, weeks, team, monthlyRun, type: t, complexity: c, size: s, timeline: l };
}

/** "$12k", "$1.2M" */
export const money = (k) => (k >= 1000 ? `$${(k / 1000).toFixed(1)}M` : `$${k}k`);
