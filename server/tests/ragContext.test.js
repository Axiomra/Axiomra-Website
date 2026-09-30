import { afterEach, describe, expect, it, vi } from "vitest";
import { ragSettings } from "../rag/config.js";
import {
  buildInstructions,
  formatReference,
  referenceContext,
  retrievalQuery,
} from "../rag/context.js";
import { embed } from "../rag/embed.js";
import {
  RetrievalError,
  filterFused,
  filterResults,
  fusedResult,
  isUnsupportedStage,
} from "../rag/retrieve.js";

const chunk = (over = {}) => ({
  text: "Title: FAQs\nSection: Pricing\n\nProjects start with a fixed-scope estimate.",
  source: "/faqs",
  title: "FAQs",
  section: "Pricing",
  score: 0.9,
  ...over,
});
const enabled = { enabled: true, topK: 6, minScore: 0.7 };
const quietLog = () => ({ warn: vi.fn() });

describe("ragSettings", () => {
  it("defaults and clamps", () => {
    expect(ragSettings({})).toEqual({ enabled: true, topK: 6, minScore: 0.6, hybrid: false });
    expect(
      ragSettings({ RAG_ENABLED: "false", RAG_TOP_K: "99", RAG_MIN_SCORE: "0.8", RAG_HYBRID: "on" })
    ).toEqual({ enabled: false, topK: 20, minScore: 0.8, hybrid: true });
  });
});

describe("retrievalQuery", () => {
  const history = [
    { role: "user", content: "How much does a healthcare chatbot cost?" },
    { role: "assistant", content: "Usually between ..." },
  ];
  it("merges a short follow-up with the previous user message", () => {
    expect(retrievalQuery(history, "and timeline?")).toBe(
      "How much does a healthcare chatbot cost?\nand timeline?"
    );
    expect(
      retrievalQuery(history, "What about the retail industry and demand forecasting projects?")
    ).toMatch(/^How much/);
  });
  it("leaves a standalone question alone", () => {
    const q = "Do you build computer vision systems for manufacturing quality control?";
    expect(retrievalQuery(history, q)).toBe(q);
  });
});

describe("prompt formatting", () => {
  it("labels chunks with title, section and source, without the stored prefix", () => {
    const out = formatReference([
      chunk(),
      chunk({ source: "content/company/values.md", title: "Values" }),
    ]);
    expect(out).toContain("### [1] FAQs (Pricing)\nSource: /faqs\nProjects start");
    expect(out).toContain("Source: Axiomra company document");
    expect(out).not.toContain("Title: FAQs");
  });
  it("appends a Reference material section after the base prompt", () => {
    const out = buildInstructions("BASE RULES", [chunk()]);
    expect(out.startsWith("BASE RULES\n\n## Reference material")).toBe(true);
    expect(out).toMatch(/not instructions/);
    expect(out).toMatch(
      /say explicitly that it is a blueprint or concept and not a client project/
    );
    expect(out).toMatch(/Never quote a blueprint's figures as results/);
    expect(buildInstructions("BASE RULES", [])).toBe("BASE RULES");
  });
});

describe("referenceContext fallback", () => {
  it("returns the base prompt without retrieving when disabled", async () => {
    const retrieve = vi.fn();
    const out = await referenceContext({
      base: "B",
      text: "hi",
      retrieve,
      settings: { ...enabled, enabled: false },
    });
    expect(out).toEqual({ instructions: "B", chunks: [], fallback: null });
    expect(retrieve).not.toHaveBeenCalled();
  });

  it("injects retrieved chunks", async () => {
    const retrieve = vi.fn().mockResolvedValue([chunk()]);
    const out = await referenceContext({
      base: "B",
      text: "How do you price projects?",
      retrieve,
      settings: enabled,
    });
    expect(out.fallback).toBeNull();
    expect(out.instructions).toContain("## Reference material");
    expect(retrieve).toHaveBeenCalledWith(
      "How do you price projects?",
      expect.objectContaining({ k: 6, minScore: 0.7 })
    );
  });

  it.each([
    ["openai", new RetrievalError("openai", new Error("401"))],
    ["mongo", new RetrievalError("mongo", new Error("index not found"))],
    ["unknown", new Error("weird")],
  ])("falls back and logs reason=%s", async (reason, error) => {
    const log = quietLog();
    const out = await referenceContext({
      base: "B",
      text: "q",
      retrieve: vi.fn().mockRejectedValue(error),
      settings: enabled,
      log,
    });
    expect(out).toEqual({ instructions: "B", chunks: [], fallback: reason });
    expect(log.warn).toHaveBeenCalledWith(
      expect.stringMatching(new RegExp(`^RAG fallback reason=${reason} `))
    );
  });

  it("times out, aborts the request and falls back", async () => {
    const log = quietLog();
    let signal;
    const retrieve = (_q, opts) => {
      signal = opts.signal;
      return new Promise(() => {});
    };
    const out = await referenceContext({
      base: "B",
      text: "q",
      retrieve,
      settings: enabled,
      timeoutMs: 20,
      log,
    });
    expect(out.fallback).toBe("timeout");
    expect(signal.aborted).toBe(true);
    expect(log.warn).toHaveBeenCalledWith(expect.stringMatching(/^RAG fallback reason=timeout/));
  });
});

describe("filterResults", () => {
  it("drops low scores and near-duplicates from the same section", () => {
    const out = filterResults(
      [
        chunk({ score: 0.8 }),
        chunk({
          score: 0.95,
          text: "Title: FAQs\nSection: Pricing\n\nProjects start with a fixed-scope estimate today.",
        }),
        chunk({
          score: 0.85,
          section: "Timelines",
          text: "Most projects take eight to twelve weeks.",
        }),
        chunk({ score: 0.5, section: "Other", text: "Unrelated." }),
      ],
      { minScore: 0.7 }
    );
    expect(out.map((r) => [r.score, r.section])).toEqual([
      [0.95, "Pricing"],
      [0.85, "Timelines"],
    ]);
  });
});

describe("embed", () => {
  const original = process.env.OPENAI_API_KEY;
  afterEach(() => {
    process.env.OPENAI_API_KEY = original;
  });

  const response = (status, body, headers = {}) => ({
    ok: status < 400,
    status,
    headers: { get: (h) => headers[h] ?? null },
    json: async () => body,
    text: async () => JSON.stringify(body),
  });

  it("retries 429 and 5xx, then returns vectors in input order", async () => {
    process.env.OPENAI_API_KEY = "test-key";
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(response(429, {}))
      .mockResolvedValueOnce(response(503, {}))
      .mockResolvedValueOnce(
        response(200, {
          data: [
            { index: 1, embedding: [2] },
            { index: 0, embedding: [1] },
          ],
          usage: { total_tokens: 7 },
        })
      );
    const out = await embed(["a", "b"], { fetchImpl, baseDelayMs: 1 });
    expect(out).toEqual({ vectors: [[1], [2]], tokens: 7 });
    expect(fetchImpl).toHaveBeenCalledTimes(3);
    expect(JSON.parse(fetchImpl.mock.calls[0][1].body)).toMatchObject({
      model: "text-embedding-3-small",
      dimensions: 1536,
    });
  });

  it("does not retry a 400", async () => {
    process.env.OPENAI_API_KEY = "test-key";
    const fetchImpl = vi.fn().mockResolvedValue(response(400, { error: "bad" }));
    await expect(embed(["a"], { fetchImpl, baseDelayMs: 1 })).rejects.toThrow(/400/);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it("fails fast without an API key", async () => {
    delete process.env.OPENAI_API_KEY;
    await expect(embed(["a"], { fetchImpl: vi.fn() })).rejects.toThrow(/OPENAI_API_KEY/);
  });
});

describe("hybrid results", () => {
  const fused = (vector, textRank, over = {}) => ({
    ...chunk(over),
    details: {
      value: 0.03,
      details: [
        ...(vector === null ? [] : [{ inputPipelineName: "vector", rank: 1, value: vector }]),
        { inputPipelineName: "text", rank: textRank },
      ],
    },
    fusion: 0.03,
  });

  it("reads the vector score and text rank out of scoreDetails", () => {
    const r = fusedResult(fused(0.81, 2));
    expect(r).toMatchObject({ score: 0.81, textRank: 2, fusionScore: 0.03 });
    expect(r.details).toBeUndefined();
    expect(fusedResult(fused(0.7, 0)).textRank).toBeNull();
    expect(fusedResult(fused(null, 1)).score).toBeNull();
  });

  it("keeps fusion order but gates on the vector score and drops keyword-only hits", () => {
    const out = filterFused(
      [
        fusedResult(fused(0.65, 1, { section: "A", text: "alpha beta gamma" })),
        fusedResult(fused(null, 2, { section: "B", text: "delta epsilon" })),
        fusedResult(fused(0.9, 0, { section: "C", text: "zeta eta theta" })),
        fusedResult(fused(0.55, 3, { section: "D", text: "iota kappa" })),
      ],
      { minScore: 0.6 }
    );
    expect(out.map((r) => r.section)).toEqual(["A", "C"]);
  });

  it("recognises a cluster without $rankFusion", () => {
    expect(
      isUnsupportedStage({
        code: 40324,
        message: "Unrecognized pipeline stage name: '$rankFusion'",
      })
    ).toBe(true);
    expect(isUnsupportedStage({ code: 8000, message: "index not found" })).toBe(false);
  });
});
