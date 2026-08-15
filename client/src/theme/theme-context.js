import { createContext } from "react";

/** localStorage key. Must stay in sync with the boot script in index.html. */
export const THEME_STORAGE_KEY = "axiomra-theme";

/** User-selectable preferences. "system" follows the OS setting live. */
export const THEME_OPTIONS = ["light", "dark", "system"];

export const ThemeContext = createContext({
  /** What the user picked: "light" | "dark" | "system". */
  theme: "system",
  /** What is actually on screen: "light" | "dark". Never "system". */
  resolvedTheme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
});
