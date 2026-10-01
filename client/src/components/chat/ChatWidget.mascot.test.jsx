import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, screen } from "@testing-library/react";
import { renderPage } from "../../test/render";
import ChatWidget from "./ChatWidget";

const calls = [];
vi.mock("./mascot", () => ({
  mountMascot: () => {
    const move = (name) => () => {
      calls.push(name);
      return Promise.resolve();
    };
    return {
      wave: move("wave"),
      jump: move("jump"),
      pageChange: move("pageChange"),
      attention: move("attention"),
      spin: move("spin"),
      blink: move("blink"),
      walk: move("walk"),
      destroy: () => {},
    };
  },
}));

beforeEach(() => {
  calls.length = 0;
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  sessionStorage.clear();
});

describe("ChatWidget mascot routine", () => {
  it("greets, then waves, spins, blinks and walks 10s apart, on repeat", () => {
    renderPage(<ChatWidget />);

    act(() => vi.advanceTimersByTime(600));
    expect(calls).toEqual(["wave"]);

    act(() => vi.advanceTimersByTime(12000 - 600));
    expect(calls).toEqual(["wave", "wave"]);

    act(() => vi.advanceTimersByTime(40000));
    expect(calls).toEqual(["wave", "wave", "spin", "blink", "walk", "wave"]);
  });

  it("pauses while the chat is open", () => {
    renderPage(<ChatWidget />);
    act(() => vi.advanceTimersByTime(600));
    fireEvent.click(screen.getByRole("button", { name: "Chat with Axiomra Assistant" }));
    calls.length = 0;

    act(() => vi.advanceTimersByTime(60000));
    expect(calls).toEqual([]);
  });
});
