import type { TextareaHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "min-h-[56px] w-full min-w-0 resize-y rounded-sm border border-line bg-surface px-[10px] py-space-2 text-[13px] leading-[20px] text-text outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-text-muted hover:border-line-strong focus:border-brand-600 focus:ring-4 focus:ring-brand-500/20 aria-invalid:border-danger disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
