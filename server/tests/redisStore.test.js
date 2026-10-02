import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { vi } from "vitest";
import request from "supertest";
import { ORIGIN, nextIp, startApp } from "./helpers.js";
import { fake } from "./fakeRedis.js";

vi.mock("ioredis", async () => ({ Redis: (await import("./fakeRedis.js")).FakeRedis }));
vi.mock("rate-limit-redis", async () => ({
  RedisStore: (await import("./fakeRedis.js")).FakeRedisStore,
}));

let app;
let stop;

// Boots the way a Vercel deployment does: production mode, shared Redis.
beforeAll(async () => {
  delete globalThis.__axiomraRedis;
  ({ app, stop } = await startApp({
    NODE_ENV: "production",
    REDIS_URL: "redis://fake:6379",
    RESEND_API_KEY: "re_test",
  }));
});
afterAll(() => stop());
beforeEach(() => fake.reset());

const login = (ip) =>
  request(app)
    .post("/api/auth/login")
    .set("Origin", ORIGIN)
    .set("X-Forwarded-For", ip)
    .send({ email: "nobody@example.com", password: "wrongpassword" });

describe("login limiter in production", () => {
  it("counts failed sign-ins in the shared Redis store", async () => {
    const ip = nextIp();
    const codes = [];
    for (let i = 0; i < 6; i += 1) codes.push((await login(ip)).status);
    expect(codes).toEqual([401, 401, 401, 401, 401, 429]);
    const loginKeys = [...fake.data.keys()].filter((k) => k.startsWith("rl:login:"));
    expect(loginKeys).toHaveLength(1);
    expect(fake.data.get(loginKeys[0])).toBe(6);
  });

  it("refuses sign-in rather than going unlimited when Redis is down", async () => {
    fake.failing = true;
    const res = await login(nextIp());
    expect(res.status).toBe(503);
  });
});
