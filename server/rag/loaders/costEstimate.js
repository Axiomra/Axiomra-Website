/**
 * The homepage cost estimator (client/src/lib/costEstimate.js) as prose.
 * Its numbers live in arrays and multipliers the string walker would drop,
 * so the module is imported and run instead; it has no imports of its own.
 */
import path from "node:path";
import { pathToFileURL } from "node:url";
import { CLIENT_SRC } from "./routes.js";

export const COST_ESTIMATE_FILE = path.join(CLIENT_SRC, "lib/costEstimate.js");

const pct = (f) => {
  const d = Math.round((f - 1) * 100);
  return d === 0 ? "no change" : `${d > 0 ? "+" : ""}${d}%`;
};

export function costEstimateText(m) {
  const { PROJECT_TYPES, COMPLEXITY, SIZE, TIMELINE, estimate, money } = m;
  const lines = [
    "The homepage has an AI project cost estimator. Its figures are directional only; an exact, fixed-price quote comes after a scoping call.",
    "",
    "## Project types (moderate complexity, medium size, standard timeline)",
  ];
  for (const t of PROJECT_TYPES) {
    const e = estimate({
      type: t.id,
      complexity: "moderate",
      size: "medium",
      timeline: "standard",
    });
    const all = [];
    for (const c of COMPLEXITY)
      for (const s of SIZE)
        for (const l of TIMELINE)
          all.push(estimate({ type: t.id, complexity: c.id, size: s.id, timeline: l.id }));
    const lo = Math.min(...all.map((x) => x.low));
    const hi = Math.max(...all.map((x) => x.high));
    const wLo = Math.min(...all.map((x) => x.weeks));
    const wHi = Math.max(...all.map((x) => x.weeks));
    lines.push(
      `- ${t.label} (${t.hint}): typically ${money(e.low)}–${money(e.high)}, about ${e.weeks} weeks, team of ${e.team}, ` +
        `running cost about ${money(e.monthlyRun)} per month once live. Across all options: ${money(lo)}–${money(hi)}, ${wLo}–${wHi} weeks.`
    );
  }
  const factors = (title, list) => {
    lines.push("", `## ${title}`);
    for (const o of list) {
      lines.push(
        `- ${o.label} (${o.hint}): cost ${pct(o.cost)}, duration ${pct(o.time)}${o.team ? `, team size ${pct(o.team)}` : ""}.`
      );
    }
  };
  factors("Complexity", COMPLEXITY);
  factors("Project size", SIZE);
  factors("Timeline", TIMELINE);
  lines.push(
    "",
    "## Running costs",
    "Hosting, monitoring and model upkeep once live are estimated at about 2% of the build cost per month."
  );
  return lines.join("\n");
}

export async function costEstimateDocuments(file = COST_ESTIMATE_FILE) {
  const m = await import(pathToFileURL(file).href);
  return [
    {
      source: "/",
      title: "AI project cost estimator",
      section: "Pricing",
      text: costEstimateText(m),
    },
  ];
}
