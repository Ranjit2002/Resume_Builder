"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "subtle";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

    const sizeStyles = {
      sm: "px-3 py-1.5 text-xs gap-1.5",
      md: "px-4 py-2 text-sm gap-2",
      lg: "px-6 py-3 text-base gap-2.5 font-semibold",
    };

    const variantStyles = {
      primary:
        "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-md hover:shadow-indigo-500/20 focus:ring-indigo-500",
      secondary:
        "bg-slate-900 hover:bg-slate-800 text-white shadow-sm hover:shadow-slate-900/20 focus:ring-slate-900",
      outline:
        "border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 shadow-xs focus:ring-indigo-500",
      ghost:
        "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900 focus:ring-slate-400",
      danger:
        "bg-rose-600 hover:bg-rose-700 text-white shadow-sm hover:shadow-rose-500/20 focus:ring-rose-500",
      subtle:
        "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 focus:ring-indigo-500",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
