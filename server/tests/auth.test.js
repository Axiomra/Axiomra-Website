import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { ORIGIN, nextIp, startApp } from "./helpers.js";

let app;
let stop;

const ADMIN = { email: "admin@example.com", password: "correct horse battery staple" };

beforeAll(async () => {
  ({ app, stop } = await startApp());
  const { default: User } = await import("../models/User.js");
  const user = new User({ email: ADMIN.email, name: "Admin", role: "admin" });
  await user.setPassword(ADMIN.password);
  // Sessions issued in the same second as the password change would count as
  // older than it.
  user.sessionsValidFrom = new Date(Date.now() - 60_000);
  await user.save();
});
afterAll(() => stop());

const login = (body, ip = nextIp()) =>
  request(app).post("/api/auth/login").set("Origin", ORIGIN).set("X-Forwarded-For", ip).send(body);

describe("admin session", () => {
  it("signs in with the right password and sets an httpOnly cookie", async () => {
    const res = await login(ADMIN);
    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(ADMIN.email);
    expect(res.body).not.toHaveProperty("user.passwordHash");
    const cookie = res.headers["set-cookie"]?.join(";") ?? "";
    expect(cookie).toMatch(/axiomra_admin=/);
    expect(cookie).toMatch(/HttpOnly/i);
  });

  it("gives the same answer for a wrong password and an unknown account", async () => {
    const wrong = await login({ ...ADMIN, password: "not the password" });
    const unknown = await login({ email: "ghost@example.com", password: "whatever" });
    expect(wrong.status).toBe(401);
    expect(unknown.status).toBe(401);
    expect(wrong.body).toEqual(unknown.body);
  });

  it("lets the session cookie reach protected routes", async () => {
    const agent = request.agent(app);
    const signIn = await agent
      .post("/api/auth/login")
      .set("Origin", ORIGIN)
      .set("X-Forwarded-For", nextIp())
      .send(ADMIN);
    expect(signIn.status).toBe(200);
    const me = await agent.get("/api/auth/me");
    expect(me.status).toBe(200);
    expect(me.body.user.email).toBe(ADMIN.email);
  });

  it.each(["/api/leads", "/api/auth/me", "/api/lead-fields"])(
    "refuses %s without a session",
    async (path) => {
      const res = await request(app).get(path);
      expect(res.status).toBe(401);
    }
  );
});

describe("rate limits", () => {
  it("blocks the 6th failed sign-in from one IP", async () => {
    const ip = nextIp();
    const codes = [];
    for (let i = 0; i < 6; i += 1) {
      codes.push((await login({ email: "nobody@example.com", password: "wrong" }, ip)).status);
    }
    expect(codes.slice(0, 5).every((c) => c === 401)).toBe(true);
    expect(codes[5]).toBe(429);
  });

  it("limits reset emails to 3 an hour per address, across IPs and letter case", async () => {
    const codes = [];
    for (let i = 0; i < 4; i += 1) {
      const res = await request(app)
        .post("/api/auth/forgot-password")
        .set("X-Forwarded-For", nextIp())
        .send({ email: " Victim@Example.com " });
      codes.push(res.status);
    }
    expect(codes).toEqual([200, 200, 200, 429]);
  });

  it("limits reset requests to 10 an hour per IP", async () => {
    const ip = nextIp();
    const codes = [];
    for (let i = 0; i < 11; i += 1) {
      const res = await request(app)
        .post("/api/auth/forgot-password")
        .set("X-Forwarded-For", ip)
        .send({ email: `user${i}@example.com` });
      codes.push(res.status);
    }
    expect(codes.slice(0, 10).every((c) => c === 200)).toBe(true);
    expect(codes[10]).toBe(429);
  });
});
