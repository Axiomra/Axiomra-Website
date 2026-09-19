import { Moon, Sun } from "lucide-react";
import useTheme from "../theme/useTheme";
import { cn } from "../lib/utils";

// "inverse" is white-on-navy, for sitting on the always-dark navbar/hero
// blocks that never change with the theme. "surface" tracks `--content`
// instead, for chrome that sits on the normal themed page background (e.g.
// the admin panel header), because the inverse colors read as invisible there in
// light mode, since that background is light, not navy.
const VARIANTS = {
  inverse: "border-inverse-fg/20 text-inverse-fg/80 hover:border-inverse-fg/40 hover:text-inverse-fg",
  surface: "border-line text-content-dim hover:border-line-strong hover:text-content",
};

/** Light/dark switch. */
export default function ThemeToggle({ className = "", variant = "inverse" }) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      // Announce the ACTION, not the state, a screen reader user needs to know what pressing it does.
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={cn(
        "relative grid h-9 w-9 place-items-center rounded-full border transition-colors focus-ring",
        VARIANTS[variant] || VARIANTS.inverse,
        className,
      )}
    >
      <Sun
        size={16}
        className={`absolute transition-all duration-300 ${
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
        }`}
      />
      <Moon
        size={16}
        className={`absolute transition-all duration-300 ${
          isDark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      />
    </button>
  );
}
