import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { ORIGIN, nextIp, startApp } from "./helpers.js";

let app;
let stop;
let Lead;

beforeAll(async () => {
  ({ app, stop } = await startApp());
  ({ default: Lead } = await import("../models/Lead.js"));
});
afterAll(() => stop());

const lead = {
  name: "Test Person",
  email: "test@example.com",
  message: "Hello there",
  elapsedMs: 5000,
};

const submit = (body, ip = nextIp()) =>
  request(app).post("/api/contact").set("Origin", ORIGIN).set("X-Forwarded-For", ip).send(body);

describe("POST /api/contact", () => {
  it("stores a real submission", async () => {
    const before = await Lead.countDocuments();
    const res = await submit(lead);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(await Lead.countDocuments()).toBe(before + 1);
  });

  it("still stores a submission from a client that predates the timing field", async () => {
    const { elapsedMs: _elapsedMs, ...legacy } = lead;
    const before = await Lead.countDocuments();
    const res = await submit(legacy);
    expect(res.status).toBe(201);
    expect(await Lead.countDocuments()).toBe(before + 1);
  });

  it("rejects a submission without required fields", async () => {
    const res = await submit({ name: "", email: "not-an-email", message: "" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeTruthy();
  });

  it("accepts a phone number that fits its dial code", async () => {
    const res = await submit({ ...lead, phone: "+92 300 1234567" });
    expect(res.status).toBe(201);
  });

  it("rejects a phone number that does not fit its dial code", async () => {
    // Ten digits, but a Pakistani mobile is not a US number.
    const res = await submit({ ...lead, phone: "+1 3001234567" });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/phone/i);
  });

  it.each([
    ["a filled honeypot", { website: "http://spam.example" }],
    ["a form sent too fast", { elapsedMs: 800 }],
    ["a non-numeric timing value", { elapsedMs: "abc" }],
  ])("answers %s like a success but stores nothing", async (_label, extra) => {
    const before = await Lead.countDocuments();
    const res = await submit({ ...lead, ...extra });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.id).toBeTruthy();
    expect(await Lead.countDocuments()).toBe(before);
  });

  it("limits one network to 5 messages an hour", async () => {
    const ip = nextIp();
    const codes = [];
    for (let i = 0; i < 6; i += 1) codes.push((await submit(lead, ip)).status);
    expect(codes).toEqual([201, 201, 201, 201, 201, 429]);
  });
});
