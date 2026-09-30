import { describe, expect, it } from "vitest";
import { BOOKING_URL, ctaTarget } from "./booking";

describe("ctaTarget", () => {
  it.each(["Book a Call", "book a free consultation", "  BOOK NOW  ", "Book"])(
    "sends %j to the booking calendar",
    (label) => {
      expect(ctaTarget(label)).toBe(BOOKING_URL);
    }
  );

  it.each(["Contact Us", "Get Started", "Let's book a call", "Bookmark this", "Booking info", ""])(
    "sends %j to the contact page",
    (label) => {
      expect(ctaTarget(label)).toBe("/contact");
    }
  );

  it("falls back to /contact without a label", () => {
    expect(ctaTarget()).toBe("/contact");
  });

  it("points at an https calendar URL", () => {
    expect(BOOKING_URL).toMatch(/^https:\/\/calendar\.google\.com\//);
  });
});
