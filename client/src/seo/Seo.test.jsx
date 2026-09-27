import { describe, expect, it } from "vitest";
import { waitFor } from "@testing-library/react";
import Seo from "./Seo";
import { SITE_URL } from "./seo.config";
import { renderPage } from "../test/render";

const head = (selector) => document.head.querySelector(selector);

describe("Seo", () => {
  it("writes title, description, canonical and social tags", async () => {
    renderPage(<Seo title="About | Axiomra" description="Who we are." />, { path: "/about/" });
    await waitFor(() => expect(document.title).toBe("About | Axiomra"));
    expect(head('meta[name="description"]')).toHaveAttribute("content", "Who we are.");
    // Trailing slash dropped, so /about and /about/ share one canonical.
    expect(head('link[rel="canonical"]')).toHaveAttribute("href", `${SITE_URL}/about`);
    expect(head('meta[property="og:url"]')).toHaveAttribute("content", `${SITE_URL}/about`);
    expect(head('meta[name="twitter:title"]')).toHaveAttribute("content", "About | Axiomra");
    expect(head('meta[name="robots"]')).toBeNull();
  });

  it("keeps the root canonical as a bare slash", async () => {
    renderPage(<Seo title="Home" />, { path: "/" });
    await waitFor(() =>
      expect(head('link[rel="canonical"]')).toHaveAttribute("href", `${SITE_URL}/`)
    );
  });

  it("marks noindex pages", async () => {
    renderPage(<Seo title="Admin" noindex />, { path: "/admin" });
    await waitFor(() =>
      expect(head('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow")
    );
  });

  it("emits breadcrumbs as JSON-LD with Home first", async () => {
    renderPage(<Seo title="FAQs" breadcrumbs={[{ name: "FAQs", path: "/faqs" }]} />, {
      path: "/faqs",
    });
    await waitFor(() => expect(head('script[type="application/ld+json"]')).not.toBeNull());
    const data = JSON.parse(head('script[type="application/ld+json"]').textContent);
    const nodes = data["@graph"] ?? [data];
    const crumbs = nodes.find((n) => n["@type"] === "BreadcrumbList");
    expect(crumbs.itemListElement.map((i) => i.name)).toEqual(["Home", "FAQs"]);
  });
});
