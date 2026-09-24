import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "outline" | "label";
}

export function Badge({
  variant = "outline",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center",
        variant === "outline"
          ? "h-[20px] rounded-pill border border-line-strong px-space-2 text-[11px] font-semibold text-accent-text"
          : "font-mono text-label text-accent-text",
        className,
      )}
      {...props}
    />
  );
}
