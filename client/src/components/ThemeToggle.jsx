import { Moon, Sun } from "lucide-react";
import useTheme from "../theme/useTheme";
import { cn } from "../lib/utils";

/**
 * Light/dark switch.
 *
 * Defaults to `inverse` tokens because that is what the solid navbar needs.
 * The navbar overrides them via `className` when it is floating transparent
 * over a light hero — `cn` merges the conflict so the caller wins.
 */
export default function ThemeToggle({ className = "" }) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      // Announce the ACTION, not the state — a screen reader user needs to
      // know what pressing it does.
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={cn(
        "relative grid h-9 w-9 place-items-center rounded-full border border-inverse-fg/20 text-inverse-fg/80 transition-colors hover:border-inverse-fg/40 hover:text-inverse-fg focus-ring",
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
