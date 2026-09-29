import { afterEach, describe, expect, it, vi } from "vitest";

const saved = { ...process.env };

async function loadConfig(model) {
  vi.resetModules();
  process.env = { ...saved, CHAT_MODEL: model };
  return import("../lib/chatConfig.js");
}

afterEach(() => {
  process.env = { ...saved };
  vi.restoreAllMocks();
});

describe("chat model config", () => {
  it("defaults to gpt-5-mini and prices it from the map without a warning", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const config = await loadConfig("");
    expect(config.CHAT_MODEL).toBe("gpt-5-mini");
    expect(config.priceFor("gpt-5-mini")).toEqual({ input: 0.25, output: 2 });
    expect(warn).not.toHaveBeenCalled();
  });

  it("warns once at startup for an unlisted model and budgets it at the top rate", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const config = await loadConfig("gpt-9-turbo");
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toMatch(/no price configured for model "gpt-9-turbo"/);

    const top = Math.max(...Object.values(config.MODEL_PRICES).map((p) => p.input + p.output));
    const price = config.priceFor("gpt-9-turbo");
    expect(price.input + price.output).toBe(top);
    expect(warn).toHaveBeenCalledTimes(1);
  });
});
