import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface StatusProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "success" | "muted" | "warning" | "danger" | "info";
}

const dots = {
  success: "bg-success",
  muted: "bg-text-muted",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
};

export function Status({
  tone = "muted",
  className,
  children,
  ...props
}: StatusProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[6px] font-mono text-[12px] leading-[16px] font-medium text-text-muted",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn("size-[6px] rounded-full", dots[tone])}
      />
      {children}
    </span>
  );
}
