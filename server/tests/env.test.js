import { afterEach, describe, expect, it, vi } from "vitest";

const BASE = {
  MONGO_URI: "mongodb://127.0.0.1:1/unused",
  CLIENT_ORIGIN: "",
  REDIS_URL: "",
  RESEND_API_KEY: "",
  OPENAI_API_KEY: "",
  CHAT_DAILY_USD_CAP: "",
};
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

describe("REDIS_URL in production", () => {
  it.each([
    ["NODE_ENV=production", { NODE_ENV: "production" }],
    ["on Vercel", { VERCEL: "1" }],
  ])("refuses to start without REDIS_URL (%s)", async (_label, vars) => {
    await expect(loadEnv({ ALLOWED_ORIGINS: "https://a.example", ...vars })).rejects.toThrow(
      /REDIS_URL is required in production/
    );
  });

  it("starts in production when REDIS_URL is set", async () => {
    const env = await loadEnv({
      ALLOWED_ORIGINS: "https://a.example",
      NODE_ENV: "production",
      REDIS_URL: "rediss://default:x@example.upstash.io:6379",
      RESEND_API_KEY: "re_test",
    });
    expect(env.REDIS_URL).toMatch(/^rediss:/);
  });

  it("allows the in-memory store in local development", async () => {
    const env = await loadEnv({ ALLOWED_ORIGINS: "https://a.example", NODE_ENV: "development" });
    expect(env.REDIS_URL).toBeUndefined();
  });
});

describe("RESEND_API_KEY", () => {
  const PROD = {
    ALLOWED_ORIGINS: "https://a.example",
    REDIS_URL: "rediss://default:x@example.upstash.io:6379",
  };

  it.each([
    ["NODE_ENV=production", { NODE_ENV: "production" }],
    ["on Vercel", { VERCEL: "1" }],
  ])("refuses to start without it (%s)", async (_label, vars) => {
    await expect(loadEnv({ ...PROD, ...vars })).rejects.toThrow(
      /RESEND_API_KEY is required in production/
    );
  });

  it("starts in production when it is set", async () => {
    const env = await loadEnv({ ...PROD, NODE_ENV: "production", RESEND_API_KEY: "re_test" });
    expect(env.RESEND_API_KEY).toBe("re_test");
  });

  it("only warns in local development", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const env = await loadEnv({ ALLOWED_ORIGINS: "https://a.example", NODE_ENV: "development" });
    expect(env.RESEND_API_KEY).toBeUndefined();
    expect(warn).toHaveBeenCalledWith(expect.stringMatching(/RESEND_API_KEY is not set/));
    warn.mockRestore();
  });
});

describe("chat configuration", () => {
  it("requires CHAT_DAILY_USD_CAP when OPENAI_API_KEY is set", async () => {
    await expect(
      loadEnv({
        ALLOWED_ORIGINS: "https://a.example",
        OPENAI_API_KEY: "sk-x",
        CHAT_DAILY_USD_CAP: "",
      })
    ).rejects.toThrow(/CHAT_DAILY_USD_CAP is required/);
  });

  it.each(["0", "-5", "ten"])("refuses CHAT_DAILY_USD_CAP=%s", async (cap) => {
    await expect(
      loadEnv({
        ALLOWED_ORIGINS: "https://a.example",
        OPENAI_API_KEY: "sk-x",
        CHAT_DAILY_USD_CAP: cap,
      })
    ).rejects.toThrow(/positive number/);
  });

  it("parses the cap as a number", async () => {
    const env = await loadEnv({
      ALLOWED_ORIGINS: "https://a.example",
      OPENAI_API_KEY: "sk-x",
      CHAT_DAILY_USD_CAP: "2.5",
    });
    expect(env.CHAT_DAILY_USD_CAP).toBe(2.5);
  });
});
