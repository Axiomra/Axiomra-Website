import { describe, expect, it } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import NotFoundPage from "./NotFoundPage";
import { SERVICES_BASE_PATH } from "../routes.constants";
import { renderPage } from "../test/render";

describe("NotFoundPage", () => {
  it("explains the page is missing and links back into the site", () => {
    renderPage(<NotFoundPage />, { path: "/no-such-page" });
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/couldn.t find that page/i);
    expect(screen.getByRole("link", { name: /back to home/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /explore our services/i })).toHaveAttribute(
      "href",
      SERVICES_BASE_PATH
    );
  });

  it("keeps itself out of search results", async () => {
    renderPage(<NotFoundPage />, { path: "/no-such-page" });
    await waitFor(() =>
      expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute(
        "content",
        "noindex, nofollow"
      )
    );
    expect(document.title).toBe("Page not found | Axiomra");
  });
});
