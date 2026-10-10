"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  mounted: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    if (t === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  };

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("careercraft_theme") as Theme | null;
      if (stored === "dark" || stored === "light") {
        setThemeState(stored);
        applyTheme(stored);
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initial = prefersDark ? "dark" : "light";
        setThemeState(initial);
        applyTheme(initial);
      }
    } catch {
      // Fallback if localStorage or matchMedia is restricted
      applyTheme("light");
    }

    // Listen for system preference changes if user hasn't set an explicit manual preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem("careercraft_theme");
      if (!stored) {
        const newTheme = e.matches ? "dark" : "light";
        setThemeState(newTheme);
        applyTheme(newTheme);
      }
    };

    mediaQuery.addEventListener?.("change", handleChange);
    return () => mediaQuery.removeEventListener?.("change", handleChange);
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    applyTheme(t);
    try {
      localStorage.setItem("careercraft_theme", t);
    } catch {
      // Ignore storage errors
    }
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === "dark",
        mounted,
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: "light" as Theme,
      isDark: false,
      mounted: false,
      toggleTheme: () => {},
      setTheme: () => {},
    };
  }
  return context;
}
