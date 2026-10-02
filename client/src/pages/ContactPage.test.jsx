import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactPage from "./ContactPage";
import { renderPage } from "../test/render";

// The WebGL backdrop has nothing to test here and jsdom has no WebGL.
vi.mock("../components/NetworkBackground", () => ({ default: () => null }));

let fetchMock;

beforeEach(() => {
  fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => vi.unstubAllGlobals());

const jsonResponse = (status, body) => ({
  ok: status >= 200 && status < 300,
  status,
  json: async () => body,
});

function setup() {
  const user = userEvent.setup();
  renderPage(<ContactPage />, { path: "/contact" });
  const form = screen.getByRole("button", { name: /send message/i }).closest("form");
  return { user, form };
}

async function fillValid(user) {
  await user.type(screen.getByLabelText(/your name/i), "Jane Cooper");
  await user.type(screen.getByLabelText(/work email/i), "jane@example.com");
  await user.type(
    screen.getByPlaceholderText(/the problem, the rough idea/i),
    "We need a support chatbot."
  );
}

describe("ContactPage form", () => {
  it("shows field errors and sends nothing when required fields are empty", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByText("Please enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Please enter your email.")).toBeInTheDocument();
    expect(screen.getByLabelText(/your name/i)).toHaveAttribute("aria-invalid", "true");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts the form with the spam signals and confirms", async () => {
    fetchMock.mockResolvedValue(jsonResponse(201, { success: true, id: "1" }));
    const { user } = setup();
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toMatch(/\/api\/contact$/);
    expect(init.method).toBe("POST");
    const body = JSON.parse(init.body);
    expect(body).toMatchObject({
      name: "Jane Cooper",
      email: "jane@example.com",
      message: "We need a support chatbot.",
      hp_q7v: "",
    });
    expect(typeof body.elapsedMs).toBe("number");
    expect(await screen.findByText("Message sent.")).toBeInTheDocument();
  });

  it("shows the server's error message when the submission fails", async () => {
    fetchMock.mockResolvedValue(jsonResponse(400, { error: "Please enter a valid email." }));
    const { user } = setup();
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByText("Please enter a valid email.")).toBeInTheDocument();
  });

  it("says the server is unreachable on a network failure", async () => {
    fetchMock.mockRejectedValue(new TypeError("Failed to fetch"));
    const { user } = setup();
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByText(/could not reach the server/i)).toBeInTheDocument();
  });

  it("keeps the honeypot out of the accessible form", () => {
    setup();
    const trap = document.querySelector('input[name="hp_q7v"]');
    expect(trap).toHaveAttribute("tabindex", "-1");
    expect(trap.closest('[aria-hidden="true"]')).not.toBeNull();
  });
});
