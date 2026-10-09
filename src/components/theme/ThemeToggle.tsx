"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md";
}

export function ThemeToggle({ className, size = "md" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className={cn(
          "w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500",
          className
        )}
        aria-label="Toggle theme"
      >
        <span className="w-4 h-4" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "relative rounded-xl border transition-all duration-200 flex items-center justify-center select-none focus:outline-none focus:ring-2 focus:ring-indigo-500",
        size === "sm" ? "w-8 h-8" : "w-9 h-9",
        isDark
          ? "border-slate-700 bg-slate-800 text-amber-400 hover:bg-slate-700 hover:text-amber-300 shadow-sm"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 shadow-xs",
        className
      )}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 scale-100" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-300 rotate-0 scale-100" />
      )}
    </button>
  );
}
