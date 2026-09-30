import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";
import { ORIGIN, nextIp, startApp } from "./helpers.js";

// Stand-in for the Agents SDK: records the agent it ran, no network.
const sdk = vi.hoisted(() => ({ ran: null }));
const rag = vi.hoisted(() => ({ retrieve: null }));

vi.mock("@openai/agents", () => ({
  setTracingDisabled() {},
  user: (content) => ({ role: "user", content }),
  assistant: (content) => ({ role: "assistant", content }),
  Agent: class {
    constructor(config) {
      this.config = config;
    }
  },
  async run(agent) {
    sdk.ran = agent.config;
    return {
      async *toTextStream() {
        yield "Answer";
      },
      completed: Promise.resolve(),
      error: null,
    };
  },
}));

// Retrieval talks to OpenAI and Atlas; replace it outright.
vi.mock("../rag/retrieve.js", () => ({
  retrieve: (...args) => rag.retrieve(...args),
  retrievalMode: () => "vector",
}));

let app;
let stop;

beforeAll(async () => {
  ({ app, stop } = await startApp({
    OPENAI_API_KEY: "test-key",
    CHAT_DAILY_USD_CAP: "5",
    RAG_ENABLED: "true",
  }));
});
afterAll(() => stop());
beforeEach(() => {
  sdk.ran = null;
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

const chat = (content) =>
  request(app)
    .post("/api/chat")
    .set("Origin", ORIGIN)
    .set("X-Forwarded-For", nextIp())
    .send({ messages: [{ role: "user", content }] });

const types = (text) =>
  text
    .split("\n\n")
    .filter(Boolean)
    .map((c) => JSON.parse(c.replace(/^data: /, "")).type);

describe("POST /api/chat with retrieval", () => {
  it("adds retrieved chunks to the instructions", async () => {
    rag.retrieve = vi.fn().mockResolvedValue([
      {
        text: "Title: FAQs\nSection: Pricing\n\nEvery project gets a fixed-scope estimate.",
        source: "/faqs",
        title: "FAQs",
        section: "Pricing",
        score: 0.9,
      },
    ]);
    const res = await chat("How do you price an AI project for a hospital?");
    expect(types(res.text)).toEqual(["text", "done"]);
    expect(sdk.ran.instructions).toMatch(/Axiomra Assistant/);
    expect(sdk.ran.instructions).toContain("## Reference material");
    expect(sdk.ran.instructions).toContain("Every project gets a fixed-scope estimate.");
  });

  it("still answers on the static prompt when retrieval fails", async () => {
    rag.retrieve = vi
      .fn()
      .mockRejectedValue(Object.assign(new Error("Atlas down"), { stage: "mongo" }));
    const res = await chat("How do you price an AI project for a hospital?");
    expect(res.status).toBe(200);
    expect(types(res.text)).toEqual(["text", "done"]);
    expect(sdk.ran.instructions).toMatch(/Axiomra Assistant/);
    expect(sdk.ran.instructions).not.toContain("## Reference material");
    expect(console.warn).toHaveBeenCalledWith(expect.stringMatching(/^RAG fallback reason=mongo/));
  });
});

describe("GET /api/rag/debug", () => {
  it("returns retrieved chunks outside production", async () => {
    rag.retrieve = vi.fn().mockResolvedValue([]);
    const res = await request(app).get("/api/rag/debug").query({ q: "pricing" });
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ query: "pricing", chunks: [] });
  });
});
