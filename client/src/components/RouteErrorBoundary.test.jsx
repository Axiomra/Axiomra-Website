import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import RouteErrorBoundary, { RELOAD_PARAM } from "./RouteErrorBoundary";

const PAGE_URL = "https://axiomra.com/services?ref=nav";

function chunkError() {
  const error = new Error("Loading chunk 42 failed.");
  error.name = "ChunkLoadError";
  return error;
}

function Boom({ error }) {
  throw error;
}

function renderRoute(child, resetKey = "/services") {
  return render(
    <RouteErrorBoundary resetKey={resetKey} pending={<p>Reloading…</p>}>
      {child}
    </RouteErrorBoundary>
  );
}

let store;
let originalLocation;

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-09-29T12:00:00Z"));

  store = new Map();
  vi.stubGlobal("sessionStorage", {
    getItem: vi.fn((k) => (store.has(k) ? store.get(k) : null)),
    setItem: vi.fn((k, v) => store.set(k, String(v))),
    removeItem: vi.fn((k) => store.delete(k)),
    clear: vi.fn(() => store.clear()),
  });

  // The boundary reloads with location.replace (so the broken page stays out
  // of history); reload is stubbed too so a stray call would be caught.
  originalLocation = window.location;
  Object.defineProperty(window, "location", {
    configurable: true,
    value: { href: PAGE_URL, replace: vi.fn(), reload: vi.fn() },
  });

  // React logs every caught render error; keep the output readable.
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  Object.defineProperty(window, "location", { configurable: true, value: originalLocation });
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe("RouteErrorBoundary", () => {
  it("reloads exactly once with a cache-busting param on a chunk-load error", () => {
    renderRoute(<Boom error={chunkError()} />);

    expect(window.location.replace).toHaveBeenCalledTimes(1);
    expect(window.location.reload).not.toHaveBeenCalled();
    const target = new URL(window.location.replace.mock.calls[0][0]);
    expect(target.pathname).toBe("/services");
    expect(target.searchParams.get("ref")).toBe("nav");
    expect(target.searchParams.get(RELOAD_PARAM)).toBeTruthy();

    expect(screen.getByText("Reloading…")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("shows the fallback instead of reloading again when a second chunk error lands within 30s", () => {
    const first = renderRoute(<Boom error={chunkError()} />);
    expect(window.location.replace).toHaveBeenCalledTimes(1);
    first.unmount();

    // The reloaded page fails again 20s later: the new HTML didn't help.
    vi.setSystemTime(Date.now() + 20000);
    renderRoute(<Boom error={chunkError()} />);

    expect(window.location.replace).toHaveBeenCalledTimes(1);
    expect(window.location.reload).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent("The site was just updated");
    expect(screen.getByRole("button", { name: "Reload" })).toBeInTheDocument();
  });

  it("shows the fallback straight away for an error that is not a chunk failure", () => {
    renderRoute(<Boom error={new TypeError("Cannot read properties of undefined")} />);

    expect(window.location.replace).not.toHaveBeenCalled();
    expect(window.location.reload).not.toHaveBeenCalled();
    expect(sessionStorage.setItem).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong");
  });

  it("clears the error when the pathname changes", () => {
    const { rerender } = renderRoute(<Boom error={new Error("page crashed")} />, "/broken");
    expect(screen.getByRole("alert")).toBeInTheDocument();

    rerender(
      <RouteErrorBoundary resetKey="/contact" pending={<p>Reloading…</p>}>
        <p>Contact page</p>
      </RouteErrorBoundary>
    );

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByText("Contact page")).toBeInTheDocument();
  });
});
