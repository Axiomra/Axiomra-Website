import path from "node:path";
import { pathToFileURL } from "node:url";
import { describe, expect, it } from "vitest";
import { companyStats } from "../lib/companyStats.js";
import { CHAT_SYSTEM_PROMPT } from "../lib/chatKnowledge.js";

describe("companyStats", () => {
  it("matches the client copy", async () => {
    const file = path.resolve(import.meta.dirname, "../../client/src/data/companyStats.js");
    const client = await import(pathToFileURL(file).href);
    expect(companyStats).toEqual(client.companyStats);
  });

  it("feeds the chat prompt", () => {
    expect(CHAT_SYSTEM_PROMPT).toContain(`${companyStats.experts}+ in-house engineers`);
    expect(CHAT_SYSTEM_PROMPT).toContain(
      `$${companyStats.pocRange.min}k–$${companyStats.pocRange.max}k`
    );
  });
});
