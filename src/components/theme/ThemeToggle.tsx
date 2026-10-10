"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils/cn";

export interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "icon" | "button" | "pill";
  showLabel?: boolean;
}

export function ThemeToggle({
  className,
  size = "md",
  variant = "icon",
  showLabel = false,
}: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  const isDark = mounted ? theme === "dark" : false;

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-10 h-10 text-base",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-4.5 h-4.5",
    lg: "w-5 h-5",
  };

  // SSR or unmounted fallback placeholder with matching dimensions
  if (!mounted) {
    if (variant === "button" || showLabel) {
      return (
        <div
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 opacity-70",
            className
          )}
          aria-hidden="true"
        >
          <div className={cn(iconSizes[size], "rounded-full bg-slate-300 dark:bg-slate-700 animate-pulse")} />
          <span className="text-xs font-medium text-slate-500">Theme</span>
        </div>
      );
    }

    if (variant === "pill") {
      return (
        <div
          className={cn(
            "w-14 h-7 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 opacity-60",
            className
          )}
          aria-hidden="true"
        />
      );
    }

    return (
      <div
        className={cn(
          "inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 opacity-60",
          sizeClasses[size],
          className
        )}
        aria-hidden="true"
      />
    );
  }

  // Pill variant
  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          "relative inline-flex h-7 w-14 items-center rounded-full p-0.5 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 cursor-pointer shadow-inner",
          isDark
            ? "bg-slate-950 border border-slate-700/80"
            : "bg-slate-200 border border-slate-300",
          className
        )}
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      >
        <span className="absolute left-1.5 flex items-center justify-center text-amber-500/80">
          <Sun className="w-3 h-3" />
        </span>
        <span className="absolute right-1.5 flex items-center justify-center text-indigo-400/80">
          <Moon className="w-3 h-3" />
        </span>
        <span
          className={cn(
            "pointer-events-none z-10 flex h-6 w-6 transform items-center justify-center rounded-full shadow-md transition-transform duration-300 ease-in-out",
            isDark
              ? "translate-x-7 bg-indigo-600 text-white shadow-indigo-500/40"
              : "translate-x-0 bg-white text-amber-500 shadow-slate-400/30"
          )}
        >
          {isDark ? (
            <Moon className="w-3.5 h-3.5 fill-white text-white" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          )}
        </span>
        <span className="sr-only">Toggle Dark Mode</span>
      </button>
    );
  }

  // Button with text label variant
  if (variant === "button" || showLabel) {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          "group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 active:scale-95 shadow-2xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50",
          isDark
            ? "bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-slate-600 hover:text-white"
            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900",
          className
        )}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <div
          className={cn(
            "flex items-center justify-center rounded-lg p-1 transition-transform group-hover:rotate-12 duration-200",
            isDark
              ? "bg-amber-400/10 text-amber-400"
              : "bg-indigo-50 text-indigo-600"
          )}
        >
          {isDark ? (
            <Sun className={iconSizes[size]} />
          ) : (
            <Moon className={iconSizes[size]} />
          )}
        </div>
        <span className="select-none">
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      </button>
    );
  }

  // Standard icon button variant
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "group relative inline-flex items-center justify-center rounded-xl border transition-all duration-200 active:scale-95 shadow-2xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50",
        sizeClasses[size],
        isDark
          ? "border-slate-700/80 bg-slate-800/80 text-amber-400 hover:bg-slate-700/90 hover:border-slate-600 hover:text-amber-300"
          : "border-slate-200/90 bg-white/90 text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:text-indigo-600",
        className
      )}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        {isDark ? (
          <Sun className={cn(iconSizes[size], "transition-all duration-300 rotate-0 scale-100")} />
        ) : (
          <Moon className={cn(iconSizes[size], "transition-all duration-300 rotate-0 scale-100")} />
        )}
      </div>
      <span className="sr-only">
        {isDark ? "Switch to light theme" : "Switch to dark theme"}
      </span>
    </button>
  );
}
