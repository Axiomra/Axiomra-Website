import { render } from "@testing-library/react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { describe, expect, it } from "vitest";
import ThemeToggle from "../components/ThemeToggle";
import ThemeProvider from "../theme/ThemeProvider";

/*
 * cn() used to be twMerge(clsx(...)). These pin the classes each former
 * conflict site now renders to exactly what twMerge produced, so dropping the
 * library changed no pixel.
 */
const classSet = (s) => new Set(s.split(/\s+/).filter(Boolean));

const OLD_VARIANTS = {
  inverse:
    "border-inverse-fg/20 text-inverse-fg/80 hover:border-inverse-fg/40 hover:text-inverse-fg",
  surface: "border-line text-content-dim hover:border-line-strong hover:text-content",
};
const OLD_BASE =
  "relative grid h-9 w-9 place-items-center rounded-full border transition-colors focus-ring";
const CALLER = {
  dark: "border-inverse-fg/15 text-inverse-fg/80 hover:text-accent-vivid",
  light: "border-content/15 text-content/75 hover:text-brand",
  none: "",
};

describe("ThemeToggle classes match the tailwind-merge output", () => {
  for (const variant of Object.keys(OLD_VARIANTS)) {
    for (const [tone, className] of Object.entries(CALLER)) {
      it(`${variant} / ${tone}`, () => {
        const { getByRole } = render(
          <ThemeProvider>
            <ThemeToggle variant={variant} className={className} />
          </ThemeProvider>
        );
        const expected = twMerge(clsx(OLD_BASE, OLD_VARIANTS[variant], className));
        expect(classSet(getByRole("button").className)).toEqual(classSet(expected));
      });
    }
  }
});

describe("navbar link classes match the tailwind-merge output", () => {
  const OLD_NAV_ITEM =
    "relative flex items-center gap-1 rounded-full px-4 py-2 text-base font-medium transition-all duration-300 hover:-translate-y-0.5 focus-ring " +
    "after:absolute after:bottom-0.5 after:left-4 after:right-4 after:h-[2px] after:origin-left after:scale-x-0 " +
    "after:bg-gradient-to-r after:from-accent-vivid after:to-brand after:transition-transform after:duration-300 " +
    "hover:after:scale-x-100 focus-visible:after:scale-x-100";
  const NAV_ITEM = OLD_NAV_ITEM.replace(" after:scale-x-0 ", " ");

  it("active mega link", () => {
    const tail = "bg-inverse-fg/10 text-accent-vivid after:scale-x-100";
    expect(classSet(clsx(NAV_ITEM, tail))).toEqual(classSet(twMerge(clsx(OLD_NAV_ITEM, tail))));
  });
  it("idle link", () => {
    const link = "text-inverse-fg/80 hover:text-accent-vivid";
    expect(classSet(clsx(NAV_ITEM, `${link} after:scale-x-0`))).toEqual(
      classSet(twMerge(clsx(OLD_NAV_ITEM, link)))
    );
  });
});
