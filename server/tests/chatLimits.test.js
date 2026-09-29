import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";
import { ORIGIN, nextIp, startApp } from "./helpers.js";
import { fake } from "./fakeRedis.js";

// Chat limits as deployed: production mode, shared Redis (faked), no network.
const sdk = vi.hoisted(() => ({ runs: 0 }));

vi.mock("ioredis", async () => ({ Redis: (await import("./fakeRedis.js")).FakeRedis }));
vi.mock("rate-limit-redis", async () => ({
  RedisStore: (await import("./fakeRedis.js")).FakeRedisStore,
}));
vi.mock("@openai/agents", () => ({
  setTracingDisabled() {},
  user: (content) => ({ role: "user", content }),
  assistant: (content) => ({ role: "assistant", content }),
  Agent: class {},
  async run() {
    sdk.runs += 1;
    return {
      async *toTextStream() {
        yield "Hello";
      },
      completed: Promise.resolve(),
      error: null,
      state: { usage: { inputTokens: 1000, outputTokens: 500 } },
    };
  },
}));

let app;
let stop;

beforeAll(async () => {
  delete globalThis.__axiomraRedis;
  ({ app, stop } = await startApp({
    NODE_ENV: "production",
    REDIS_URL: "redis://fake:6379",
    OPENAI_API_KEY: "test-key",
  }));
});
afterAll(() => stop());
beforeEach(() => {
  fake.reset();
  sdk.runs = 0;
});

const chat = (ip = nextIp()) =>
  request(app)
    .post("/api/chat")
    .set("Origin", ORIGIN)
    .set("X-Forwarded-For", ip)
    .send({ messages: [{ role: "user", content: "Hi" }] });

describe("chat rate limiter", () => {
  it("counts chat turns in the shared store", async () => {
    const res = await chat();
    expect(res.status).toBe(200);
    expect([...fake.data.keys()].some((k) => k.startsWith("rl:chat:"))).toBe(true);
  });

  it("fails closed with 503 when the store errors, without calling the model", async () => {
    fake.failing = true;
    const res = await chat();
    expect(res.status).toBe(503);
    expect(res.body.error).toMatch(/temporarily unavailable/i);
    expect(sdk.runs).toBe(0);
  });
});
