import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import { startApp } from "./helpers.js";

const SECRET = "t".repeat(40); // Matches startApp's JWT_SECRET.
const ROOT = fileURLToPath(new URL("..", import.meta.url));

let app;
let stop;
let userId;

beforeAll(async () => {
  ({ app, stop } = await startApp());
  const { default: User } = await import("../models/User.js");
  const user = new User({ email: "admin@example.com", name: "JWT", role: "admin" });
  await user.setPassword("correct horse battery staple");
  user.sessionsValidFrom = new Date(Date.now() - 60_000);
  await user.save();
  userId = String(user._id);
});
afterAll(() => stop());

const me = (token) => request(app).get("/api/auth/me").set("Authorization", `Bearer ${token}`);

describe("JWT algorithm pinning", () => {
  it("accepts an HS256 token", async () => {
    const token = jwt.sign({ sub: userId, role: "admin" }, SECRET, { algorithm: "HS256" });
    expect((await me(token)).status).toBe(200);
  });

  it.each(["HS384", "HS512"])("rejects a %s token signed with the same secret", async (alg) => {
    const token = jwt.sign({ sub: userId, role: "admin" }, SECRET, { algorithm: alg });
    expect((await me(token)).status).toBe(401);
  });

  it("rejects an unsigned alg:none token", async () => {
    const token = jwt.sign({ sub: userId, role: "admin" }, null, { algorithm: "none" });
    expect((await me(token)).status).toBe(401);
  });

  // Guard for future call sites: every jwt.verify must pin its algorithms.
  it("has no jwt.verify call without an algorithms option", () => {
    const files = [];
    const walk = (dir) => {
      for (const name of readdirSync(dir)) {
        if (name === "node_modules" || name === "tests" || name.startsWith(".")) continue;
        const path = join(dir, name);
        if (statSync(path).isDirectory()) walk(path);
        else if (name.endsWith(".js")) files.push(path);
      }
    };
    walk(ROOT);

    const offenders = [];
    for (const file of files) {
      const source = readFileSync(file, "utf8");
      for (const match of source.matchAll(/jwt\.verify\(([^;]*?)\)\s*;/gs)) {
        if (!/algorithms\s*:\s*\[/.test(match[1])) offenders.push(relative(ROOT, file));
      }
    }
    expect(files.length).toBeGreaterThan(0);
    expect(offenders).toEqual([]);
  });
});
