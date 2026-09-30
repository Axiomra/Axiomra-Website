import { describe, expect, it } from "vitest";
import { COMPLEXITY, PROJECT_TYPES, SIZE, TIMELINE, estimate } from "./costEstimate";
import { companyStats } from "../data/companyStats";

const all = () =>
  PROJECT_TYPES.flatMap((t) =>
    COMPLEXITY.flatMap((c) =>
      SIZE.flatMap((s) =>
        TIMELINE.map((l) => ({ type: t.id, complexity: c.id, size: s.id, timeline: l.id }))
      )
    )
  );

describe("estimate", () => {
  it("gives every combination its own budget range", () => {
    const ranges = all().map((sel) => {
      const e = estimate(sel);
      return `${e.low}-${e.high}`;
    });
    expect(new Set(ranges).size).toBe(ranges.length);
  });

  it("keeps low under high and scales with each input", () => {
    for (const sel of all()) {
      const e = estimate(sel);
      expect(e.low).toBeLessThan(e.high);
    }
    const base = { type: "mvp", complexity: "moderate", size: "medium", timeline: "standard" };
    const b = estimate(base);
    expect(estimate({ ...base, complexity: "advanced" }).low).toBeGreaterThan(b.low);
    expect(estimate({ ...base, size: "large" }).low).toBeGreaterThan(b.low);
    expect(estimate({ ...base, timeline: "rush" }).low).toBeGreaterThan(b.low);
    expect(estimate({ ...base, timeline: "rush" }).weeks).toBeLessThan(b.weeks);
    expect(estimate({ ...base, type: "poc" }).high).toBeLessThan(b.low);
  });

  it("prices a standard PoC at the published range", () => {
    const e = estimate({
      type: "poc",
      complexity: "moderate",
      size: "medium",
      timeline: "standard",
    });
    expect([e.low, e.high]).toEqual([companyStats.pocRange.min, companyStats.pocRange.max]);
    expect([e.low, e.high]).toEqual([11, 21]);
  });
});
