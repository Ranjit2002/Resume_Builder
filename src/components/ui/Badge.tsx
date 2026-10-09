"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "info"
    | "pro"
    | "outline";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px] font-semibold",
    md: "px-2.5 py-1 text-xs font-semibold",
  };

  const variantStyles = {
    default: "bg-slate-100 text-slate-700 border border-slate-200/60",
    primary: "bg-indigo-50 text-indigo-700 border border-indigo-200/60",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
    warning: "bg-amber-50 text-amber-700 border border-amber-200/60",
    info: "bg-sky-50 text-sky-700 border border-sky-200/60",
    pro: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xs font-bold",
    outline: "border border-slate-300 text-slate-700 bg-transparent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full transition-colors",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
