import { afterEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderPage } from "../../test/render";
import ChatWidget from "./ChatWidget";
import RichText from "./richText";

/** A fetch Response whose body streams the given server-sent events. */
function sseResponse(events) {
  const body = new ReadableStream({
    start(controller) {
      const enc = new TextEncoder();
      for (const e of events) controller.enqueue(enc.encode(`data: ${JSON.stringify(e)}\n\n`));
      controller.close();
    },
  });
  return new Response(body, { status: 200, headers: { "Content-Type": "text/event-stream" } });
}

afterEach(() => {
  vi.restoreAllMocks();
  sessionStorage.clear();
});

describe("ChatWidget", () => {
  it("opens from the launcher and streams a reply", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(
        sseResponse([
          { type: "text", text: "We build " },
          { type: "text", text: "**AI systems**." },
          { type: "done" },
        ])
      );
    const user = userEvent.setup();
    renderPage(<ChatWidget />);

    await user.click(screen.getByRole("button", { name: "Chat with Axiomra Assistant" }));
    expect(screen.getByRole("dialog", { name: "Axiomra Assistant" })).toBeInTheDocument();

    await user.type(
      screen.getByLabelText("Message Axiomra Assistant"),
      "What services do you offer?{Enter}"
    );

    expect(await screen.findByText("AI systems")).toBeInTheDocument();
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.messages).toEqual([{ role: "user", content: "What services do you offer?" }]);
  });

  it("shows the server's error and restores the draft", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ error: "The assistant is not available right now." }), {
        status: 503,
      })
    );
    const user = userEvent.setup();
    renderPage(<ChatWidget />);

    await user.click(screen.getByRole("button", { name: "Chat with Axiomra Assistant" }));
    const input = screen.getByLabelText("Message Axiomra Assistant");
    await user.type(input, "Hello{Enter}");

    expect(await screen.findByRole("alert")).toHaveTextContent("not available right now");
    await waitFor(() => expect(input).toHaveValue("Hello"));
  });
});

describe("RichText", () => {
  it("renders bullets, bold, emails and site links", () => {
    renderPage(<RichText text={"Reach us:\n- **Sales**: sales@axiomra.co\n- Visit /contact."} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByText("Sales").tagName).toBe("STRONG");
    expect(screen.getByRole("link", { name: "sales@axiomra.co" })).toHaveAttribute(
      "href",
      "mailto:sales@axiomra.co"
    );
    expect(screen.getByRole("link", { name: "/contact" })).toHaveAttribute("href", "/contact");
  });
});
