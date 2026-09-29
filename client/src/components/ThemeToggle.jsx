import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import useTheme from "../theme/useTheme";
import { cn } from "../lib/utils";

// "inverse" is white-on-navy, for sitting on the always-dark navbar/hero
// blocks that never change with the theme. "surface" tracks `--content`
// instead, for chrome that sits on the normal themed page background (e.g.
// the admin panel header), because the inverse colors read as invisible there in
// light mode, since that background is light, not navy.
//
// `hoverBorder` survives a caller's className; the rest is replaced by it, since
// a caller only ever passes its own border and text colours.
const VARIANTS = {
  inverse: {
    base: "border-inverse-fg/20 text-inverse-fg/80 hover:text-inverse-fg",
    hoverBorder: "hover:border-inverse-fg/40",
  },
  surface: {
    base: "border-line text-content-dim hover:text-content",
    hoverBorder: "hover:border-line-strong",
  },
};

/** Light/dark switch. */
export default function ThemeToggle({ className = "", variant = "inverse" }) {
  const { resolvedTheme, toggleTheme } = useTheme();
  // The prerendered HTML cannot know the visitor's theme, and React does not
  // patch attributes that differ after hydration. So the label reads "light"
  // (what the prerender assumed) until mounted, and the icons follow the
  // `dark` class on <html>, which the boot script in index.html sets before
  // first paint.
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- one render after hydration
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      // Announce the ACTION, not the state, a screen reader user needs to know what pressing it does.
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={cn(
        "relative grid h-9 w-9 place-items-center rounded-full border transition-colors focus-ring",
        (VARIANTS[variant] || VARIANTS.inverse).hoverBorder,
        className || (VARIANTS[variant] || VARIANTS.inverse).base
      )}
    >
      <Sun
        size={16}
        className="absolute -rotate-90 scale-50 opacity-0 transition-all duration-300 dark:rotate-0 dark:scale-100 dark:opacity-100"
      />
      <Moon
        size={16}
        className="absolute rotate-0 scale-100 opacity-100 transition-all duration-300 dark:rotate-90 dark:scale-50 dark:opacity-0"
      />
    </button>
  );
}
