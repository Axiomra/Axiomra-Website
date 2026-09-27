import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { ORIGIN, nextIp, startApp } from "./helpers.js";

let app;
let stop;

beforeAll(async () => {
  ({ app, stop } = await startApp());
});
afterAll(() => stop());

describe("CORS", () => {
  it("allows a listed origin", async () => {
    const res = await request(app).get("/api/health").set("Origin", ORIGIN);
    expect(res.headers["access-control-allow-origin"]).toBe(ORIGIN);
    expect(res.headers["access-control-allow-credentials"]).toBe("true");
  });

  it("allows a team-scoped preview that matches the wildcard", async () => {
    const origin = "https://axiomra-abc123-hamzajiis-projects.vercel.app";
    const res = await request(app).get("/api/health").set("Origin", origin);
    expect(res.headers["access-control-allow-origin"]).toBe(origin);
  });

  it.each([
    "https://evil.com",
    "https://axiomra-x.vercel.app",
    "https://a.b-hamzajiis-projects.vercel.app.evil.com",
    "https://axiomra-a.b-hamzajiis-projects.vercel.app",
  ])("does not allow %s", async (origin) => {
    const res = await request(app).get("/api/health").set("Origin", origin);
    expect(res.headers["access-control-allow-origin"]).toBeUndefined();
  });
});

describe("CSRF origin check", () => {
  it("refuses an unsafe request from an unlisted origin", async () => {
    const res = await request(app)
      .post("/api/contact")
      .set("Origin", "https://evil.com")
      .set("X-Forwarded-For", nextIp())
      .send({ name: "A", email: "a@example.com", message: "hi" });
    expect(res.status).toBe(403);
  });

  it("refuses Origin: null (sandboxed iframes, file://)", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .set("Origin", "null")
      .set("X-Forwarded-For", nextIp())
      .send({ email: "a@example.com", password: "x" });
    expect(res.status).toBe(403);
  });

  it("leaves requests without an Origin header alone", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .set("X-Forwarded-For", nextIp())
      .send({ email: "nobody@example.com", password: "wrongpassword" });
    expect(res.status).toBe(401);
  });
});

describe("security basics", () => {
  it("answers unknown API routes with a JSON 404", async () => {
    const res = await request(app).get("/api/nope");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Not found." });
  });

  it("does not advertise Express", async () => {
    const res = await request(app).get("/api/health");
    expect(res.headers["x-powered-by"]).toBeUndefined();
  });
});
