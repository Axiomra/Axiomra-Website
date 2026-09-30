import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { ORIGIN, nextIp, startApp } from "./helpers.js";

let app;
let stop;
let User;

const ADMIN = { email: "admin@example.com", password: "Original-Pass-123" };
const PASS_KEY = `x.Ab9%{!key:~"Q$'£tail`;

beforeAll(async () => {
  ({ app, stop } = await startApp());
  ({ default: User } = await import("../models/User.js"));
  const user = new User({ email: ADMIN.email, name: "Admin", role: "admin" });
  await user.setPassword(ADMIN.password);
  user.sessionsValidFrom = new Date(Date.now() - 60_000);
  await user.save();
});
afterAll(() => stop());

async function signedIn(password) {
  const agent = request.agent(app);
  const res = await agent
    .post("/api/auth/login")
    .set("Origin", ORIGIN)
    .set("X-Forwarded-For", nextIp())
    .send({ email: ADMIN.email, password });
  expect(res.status).toBe(200);
  return agent;
}

const change = (agent, body) =>
  agent
    .post("/api/auth/change-password")
    .set("Origin", ORIGIN)
    .set("X-Forwarded-For", nextIp())
    .send(body);

describe("single admin", () => {
  it("refuses a second admin account", async () => {
    const second = new User({ email: ADMIN.email.replace("admin", "other"), role: "admin" });
    await second.setPassword("Another-Pass-123");
    await expect(second.save()).rejects.toThrow(/Only admin@example.com/);
  });

  it("refuses a second account even with the admin address", async () => {
    await expect(User.collection.countDocuments()).resolves.toBe(1);
    const dup = new User({ email: ADMIN.email, role: "admin" });
    await dup.setPassword("Another-Pass-123");
    await expect(dup.save()).rejects.toThrow(/only be one/);
  });

  it("refuses changing the admin to another address", async () => {
    const user = await User.findOne({ email: ADMIN.email });
    user.email = "someone@example.com";
    await expect(user.save()).rejects.toThrow(/Only admin@example.com/);
  });
});

describe("recovery key on password change", () => {
  it("blocks every change while no key is on file", async () => {
    const agent = await signedIn(ADMIN.password);
    const res = await change(agent, {
      currentPassword: ADMIN.password,
      newPassword: "Brand-New-Pass-1",
      recoveryKey: PASS_KEY,
    });
    expect(res.status).toBe(403);
  });

  it("accepts a long key with quotes and non-ASCII characters", async () => {
    const user = await User.findOne({ email: ADMIN.email });
    await user.setRecoveryKey(PASS_KEY);
    await user.save();
    const fresh = await User.findOne({ email: ADMIN.email }).select("+recoveryKeyHash");
    await expect(fresh.verifyRecoveryKey(PASS_KEY)).resolves.toBe(true);
  });

  it("refuses a change without the key", async () => {
    const agent = await signedIn(ADMIN.password);
    const res = await change(agent, {
      currentPassword: ADMIN.password,
      newPassword: "Brand-New-Pass-1",
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/recovery key is required/i);
  });

  it("refuses a change with the wrong key and counts the attempt", async () => {
    const agent = await signedIn(ADMIN.password);
    const res = await change(agent, {
      currentPassword: ADMIN.password,
      newPassword: "Brand-New-Pass-1",
      recoveryKey: `${PASS_KEY}wrong`,
    });
    expect(res.status).toBe(401);
    expect(res.body.attemptsLeft).toBe(4);
  });

  it("refuses the right key with the wrong current password", async () => {
    const agent = await signedIn(ADMIN.password);
    const res = await change(agent, {
      currentPassword: "Not-The-Password-1",
      newPassword: "Brand-New-Pass-1",
      recoveryKey: PASS_KEY,
    });
    expect(res.status).toBe(401);
  });

  it("changes the password with the right key", async () => {
    const agent = await signedIn(ADMIN.password);
    const res = await change(agent, {
      currentPassword: ADMIN.password,
      newPassword: "Brand-New-Pass-1",
      recoveryKey: PASS_KEY,
    });
    expect(res.status).toBe(200);
    await signedIn("Brand-New-Pass-1");
    ADMIN.password = "Brand-New-Pass-1";
  });
});

describe("recovery key on emailed reset", () => {
  async function freshToken() {
    const user = await User.findOne({ email: ADMIN.email });
    const token = user.issueResetToken();
    await user.save();
    return token;
  }

  const reset = (body) =>
    request(app)
      .post("/api/auth/reset-password")
      .set("Origin", ORIGIN)
      .set("X-Forwarded-For", nextIp())
      .send(body);

  it("refuses a valid reset link without the key", async () => {
    const res = await reset({ token: await freshToken(), password: "Reset-Pass-123" });
    expect(res.status).toBe(400);
  });

  it("resets with the link and the key", async () => {
    const res = await reset({
      token: await freshToken(),
      password: "Reset-Pass-123",
      recoveryKey: PASS_KEY,
    });
    expect(res.status).toBe(200);
    await signedIn("Reset-Pass-123");
  });

  it("always reports the key as required", async () => {
    const res = await request(app).get("/api/auth/reset-requirements?token=anything");
    expect(res.body.recoveryKeyRequired).toBe(true);
  });
});
