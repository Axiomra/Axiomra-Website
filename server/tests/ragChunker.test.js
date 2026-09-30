import { describe, expect, it } from "vitest";
import { chunkDocument, estimateTokens } from "../rag/chunker.js";
import { buildChunks, chunkId, planChanges } from "../rag/ingestPlan.js";

const sentence = (i) => `Sentence number ${i} explains one more detail about the delivery process.`;
const longText = (n) => Array.from({ length: n }, (_, i) => sentence(i)).join(" ");

describe("chunkDocument", () => {
  it("prefixes every chunk with its title and section", () => {
    const chunks = chunkDocument({
      source: "/faqs",
      title: "FAQs",
      section: "",
      text: "# Pricing\nWe price projects by scope, team size and timeline, with a written estimate up front.",
    });
    expect(chunks).toHaveLength(1);
    expect(chunks[0].text).toMatch(/^Title: FAQs\nSection: Pricing\n\nWe price projects/);
    expect(chunks[0].chunkIndex).toBe(0);
  });

  it("keeps chunks near the token limit and overlaps neighbours", () => {
    const chunks = chunkDocument(
      { source: "/about", title: "About", section: "", text: `# Story\n${longText(120)}` },
      { maxTokens: 100, overlapTokens: 20 }
    );
    expect(chunks.length).toBeGreaterThan(3);
    for (const c of chunks) expect(estimateTokens(c.body)).toBeLessThanOrEqual(110);
    // The start of each chunk repeats the tail of the previous one.
    for (let i = 1; i < chunks.length; i += 1) {
      const head = chunks[i].body.split(" ").slice(0, 3).join(" ");
      expect(chunks[i - 1].body).toContain(head);
    }
    expect(chunks.map((c) => c.chunkIndex)).toEqual(chunks.map((_, i) => i));
  });

  it("never packs two top-level headings into one chunk", () => {
    const text =
      "# Healthcare\nWe build triage assistants for clinics and hospitals.\n\n# Retail\nWe build demand forecasting for retailers and brands.";
    const chunks = chunkDocument(
      { source: "/industries", title: "Industries", section: "", text },
      { minBodyChars: 10 }
    );
    expect(chunks.map((c) => c.section)).toEqual(["Healthcare", "Retail"]);
  });

  it("packs small sibling sections under a shared heading", () => {
    const text =
      "# FAQs\n## How long?\nMost projects take eight to twelve weeks.\n## How much?\nMost projects cost between twenty and eighty thousand.";
    const chunks = chunkDocument(
      { source: "/faqs", title: "FAQs", section: "", text },
      { minBodyChars: 10 }
    );
    expect(chunks).toHaveLength(1);
    expect(chunks[0].section).toBe("FAQs");
    expect(chunks[0].body).toMatch(/How long\?[\s\S]*How much\?/);
  });

  it("drops chunks that are only a heading", () => {
    const chunks = chunkDocument({
      source: "/x",
      title: "X",
      section: "",
      text: "# Empty\nShort.",
    });
    expect(chunks).toEqual([]);
  });
});

describe("ingest plan", () => {
  const doc = (text) => ({
    sourceType: "data",
    source: "/about",
    title: "About",
    section: "",
    text,
  });

  it("gives identical content the same id and numbers chunks per source", () => {
    const a = buildChunks([doc(`# A\n${longText(80)}`)]);
    const b = buildChunks([doc(`# A\n${longText(80)}`)]);
    expect(a.map((c) => c._id)).toEqual(b.map((c) => c._id));
    expect(a[0]._id).toBe(chunkId("/about", 0, a[0].text));
    expect(a[0].sourceType).toBe("data");
  });

  it("classifies created, updated, skipped and deleted chunks", () => {
    const chunks = [
      { _id: "same", source: "/a", chunkIndex: 0 },
      { _id: "new-text", source: "/a", chunkIndex: 1 },
      { _id: "brand-new", source: "/b", chunkIndex: 0 },
    ];
    const existing = [
      { _id: "same", source: "/a", chunkIndex: 0 },
      { _id: "old-text", source: "/a", chunkIndex: 1 },
      { _id: "gone", source: "/removed", chunkIndex: 0 },
    ];
    const plan = planChanges(chunks, existing);
    expect(plan.skipped.map((c) => c._id)).toEqual(["same"]);
    expect(plan.updated.map((c) => c._id)).toEqual(["new-text"]);
    expect(plan.created.map((c) => c._id)).toEqual(["brand-new"]);
    expect(plan.deleted).toBe(1);
    expect(plan.remove.sort()).toEqual(["gone", "old-text"]);
  });
});
