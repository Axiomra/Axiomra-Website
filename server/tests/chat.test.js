import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";
import { ORIGIN, nextIp, startApp } from "./helpers.js";

// Stand-in for the Agents SDK: replays `script` as a text stream, no network.
const sdk = vi.hoisted(() => ({ script: [], fail: false, lastInput: null, agent: null }));

vi.mock("@openai/agents", () => ({
  setTracingDisabled() {},
  user: (content) => ({ role: "user", content }),
  assistant: (content) => ({ role: "assistant", content }),
  Agent: class {
    constructor(config) {
      sdk.agent = config;
    }
  },
  async run(agent, input) {
    sdk.lastInput = input;
    return {
      async *toTextStream() {
        for (const text of sdk.script) yield text;
        if (sdk.fail) throw new Error("boom");
      },
      completed: Promise.resolve(),
      error: null,
    };
  },
}));

let app;
let stop;

beforeAll(async () => {
  ({ app, stop } = await startApp({ OPENAI_API_KEY: "test-key" }));
});
afterAll(() => stop());
beforeEach(() => {
  sdk.script = [];
  sdk.fail = false;
});

const chat = (body) =>
  request(app).post("/api/chat").set("Origin", ORIGIN).set("X-Forwarded-For", nextIp()).send(body);

const events = (text) =>
  text
    .split("\n\n")
    .filter(Boolean)
    .map((chunk) => JSON.parse(chunk.replace(/^data: /, "")));

describe("POST /api/chat", () => {
  it("streams the reply as server-sent events", async () => {
    sdk.script = ["Hello", " there"];
    const res = await chat({ messages: [{ role: "user", content: "Hi" }] });

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/text\/event-stream/);
    expect(events(res.text)).toEqual([
      { type: "text", text: "Hello" },
      { type: "text", text: " there" },
      { type: "done" },
    ]);
    expect(sdk.agent.instructions).toMatch(/Axiomra Assistant/);
    expect(sdk.lastInput).toEqual([{ role: "user", content: "Hi" }]);
  });

  it("reports a failed run as an error event", async () => {
    sdk.script = ["Partial"];
    sdk.fail = true;
    const res = await chat({ messages: [{ role: "user", content: "Hi" }] });
    expect(events(res.text).map((e) => e.type)).toEqual(["text", "error"]);
  });

  it("rejects a conversation that does not end with the visitor", async () => {
    const res = await chat({
      messages: [
        { role: "user", content: "Hi" },
        { role: "assistant", content: "Hello" },
      ],
    });
    expect(res.status).toBe(400);
  });

  it("rejects oversized messages", async () => {
    const res = await chat({ messages: [{ role: "user", content: "x".repeat(2001) }] });
    expect(res.status).toBe(400);
  });

  it("answers 503 when no API key is configured", async () => {
    const key = process.env.OPENAI_API_KEY;
    delete process.env.OPENAI_API_KEY;
    try {
      const res = await chat({ messages: [{ role: "user", content: "Hi" }] });
      expect(res.status).toBe(503);
    } finally {
      process.env.OPENAI_API_KEY = key;
    }
  });
});
