import { useCallback, useEffect, useMemo, useState } from "react";
import { THEME_STORAGE_KEY, THEME_OPTIONS, ThemeContext } from "./theme-context";

const DARK_QUERY = "(prefers-color-scheme: dark)";

/** Reads the stored preference. Falls back to "system" when unset or invalid. */
function readStoredTheme() {
  if (typeof window === "undefined") return "system";
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return THEME_OPTIONS.includes(stored) ? stored : "system";
  } catch {
    // Private mode / blocked storage, degrade to following the OS.
    return "system";
  }
}

function systemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

export default function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readStoredTheme);
  const [systemPref, setSystemPref] = useState(systemTheme);

  const resolvedTheme = theme === "system" ? systemPref : theme;

  // Track OS changes so "system" stays live rather than a one-time read.
  useEffect(() => {
    const mql = window.matchMedia(DARK_QUERY);
    const onChange = (e) => setSystemPref(e.matches ? "dark" : "light");
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // The single place that touches the DOM.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  }, [resolvedTheme]);

  const setTheme = useCallback((next) => {
    if (!THEME_OPTIONS.includes(next)) return;
    setThemeState(next);
    try {
      if (next === "system") localStorage.removeItem(THEME_STORAGE_KEY);
      else localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Preference just won't survive a reload; the UI still works.
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
