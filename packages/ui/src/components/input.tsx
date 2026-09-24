import type { InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "title";
  mono?: boolean;
}

export function Input({
  variant = "default",
  mono = false,
  className,
  ...props
}: InputProps) {
  return (
    <input
      className={cn(
        "w-full min-w-0 rounded-sm border border-line bg-surface px-[10px] text-text outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-text-muted hover:border-line-strong focus:border-brand-600 focus:ring-4 focus:ring-brand-500/20 aria-invalid:border-danger disabled:cursor-not-allowed disabled:opacity-50",
        variant === "title"
          ? "h-[38px] text-[16px] font-semibold tracking-[-0.01em]"
          : "h-space-8",
        mono ? "font-mono text-[12px]" : variant === "default" && "text-[13px]",
        className,
      )}
      {...props}
    />
  );
}
