import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { ORIGIN, nextIp, startApp } from "./helpers.js";

let app;
let stop;
let agent;

const ADMIN = { email: "admin@example.com", password: "correct horse battery staple" };

beforeAll(async () => {
  ({ app, stop } = await startApp());
  const { default: User } = await import("../models/User.js");
  const user = new User({ email: ADMIN.email, name: "Admin", role: "admin" });
  await user.setPassword(ADMIN.password);
  user.sessionsValidFrom = new Date(Date.now() - 60_000);
  await user.save();

  agent = request.agent(app);
  const res = await agent
    .post("/api/auth/login")
    .set("Origin", ORIGIN)
    .set("X-Forwarded-For", nextIp())
    .send(ADMIN);
  expect(res.status).toBe(200);
});
afterAll(() => stop());

const create = (body) => agent.post("/api/blogs").set("Origin", ORIGIN).send(body);
const patch = (id, body) => agent.patch(`/api/blogs/${id}`).set("Origin", ORIGIN).send(body);

describe("blog posts", () => {
  it("refuses writes and the drafts list without a session", async () => {
    expect((await request(app).post("/api/blogs").send({ title: "x" })).status).toBe(401);
    expect((await request(app).get("/api/blogs/admin/all")).status).toBe(401);
  });

  it("hides drafts from the public until they are published", async () => {
    const draft = await create({ title: "Why AI Projects Fail!", content: "Hello\n\nWorld" });
    expect(draft.status).toBe(201);
    expect(draft.body.slug).toBe("why-ai-projects-fail");
    expect(draft.body.status).toBe("draft");
    expect(draft.body.publishedAt).toBeNull();

    const before = await request(app).get("/api/blogs?limit=1");
    expect(before.body.total).toBe(0);
    expect((await request(app).get("/api/blogs/why-ai-projects-fail")).status).toBe(404);

    const live = await patch(draft.body._id, { status: "published" });
    expect(live.status).toBe(200);
    expect(live.body.publishedAt).toBeTruthy();

    const after = await request(app).get("/api/blogs?limit=1");
    expect(after.body.total).toBe(1);
    expect(after.body.items[0]).not.toHaveProperty("content");

    const one = await request(app).get("/api/blogs/why-ai-projects-fail");
    expect(one.status).toBe(200);
    expect(one.body.content).toBe("Hello\n\nWorld");
  });

  it("gives a repeated title its own slug and strips tags", async () => {
    const res = await create({ title: "Why AI Projects Fail", content: "<script>x</script>ok" });
    expect(res.body.slug).toBe("why-ai-projects-fail-2");
    expect(res.body.content).toBe("xok");
  });

  it("rejects a non-https cover image and a taken slug", async () => {
    expect((await create({ title: "Img", coverImage: "http://example.com/a.png" })).status).toBe(
      400
    );
    const post = await create({ title: "Another" });
    expect((await patch(post.body._id, { slug: "why-ai-projects-fail" })).status).toBe(400);
  });

  it("deletes a post", async () => {
    const post = await create({ title: "Temporary" });
    const res = await agent.delete(`/api/blogs/${post.body._id}`).set("Origin", ORIGIN);
    expect(res.status).toBe(200);
    const all = await agent.get("/api/blogs/admin/all");
    expect(all.body.items.some((p) => p._id === post.body._id)).toBe(false);
  });
});
