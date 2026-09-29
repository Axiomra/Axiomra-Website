import { afterEach, describe, expect, it, vi } from "vitest";

const BASE = { MONGO_URI: "mongodb://127.0.0.1:1/unused", CLIENT_ORIGIN: "", REDIS_URL: "" };
const saved = { ...process.env };

async function loadEnv(vars) {
  vi.resetModules();
  process.env = { ...saved, ...BASE, ...vars };
  return (await import("../lib/env.js")).env;
}

afterEach(() => {
  process.env = { ...saved };
});

describe("environment validation", () => {
  it("parses a comma-separated origin list and strips trailing slashes", async () => {
    const env = await loadEnv({ ALLOWED_ORIGINS: "https://a.example/, http://localhost:5173" });
    expect(env.allowedOrigins).toEqual(["https://a.example", "http://localhost:5173"]);
  });

  it("falls back to CLIENT_ORIGIN for older deployments", async () => {
    const env = await loadEnv({ ALLOWED_ORIGINS: "", CLIENT_ORIGIN: "https://b.example" });
    expect(env.allowedOrigins).toEqual(["https://b.example"]);
  });

  it.each([
    ["a bare *", { ALLOWED_ORIGINS: "*" }],
    ["a vercel.app wildcard", { ALLOWED_ORIGINS: "https://axiomra-*.vercel.app" }],
    [
      "a team-scoped wildcard",
      { ALLOWED_ORIGINS: "https://axiomra-*-hamzajiis-projects.vercel.app" },
    ],
    ["an origin with a path", { ALLOWED_ORIGINS: "https://a.example/admin" }],
    ["a short JWT_SECRET", { ALLOWED_ORIGINS: "https://a.example", JWT_SECRET: "short" }],
    ["a non-redis REDIS_URL", { ALLOWED_ORIGINS: "https://a.example", REDIS_URL: "http://x" }],
    ["a missing MONGO_URI", { ALLOWED_ORIGINS: "https://a.example", MONGO_URI: "" }],
  ])("refuses to start with %s", async (_label, vars) => {
    await expect(loadEnv(vars)).rejects.toThrow(/Invalid environment configuration/);
  });
});
