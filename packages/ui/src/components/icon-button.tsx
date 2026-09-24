import type { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
}

export function IconButton({
  className,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "grid size-[28px] shrink-0 cursor-pointer place-items-center rounded-sm text-text-muted hover:bg-surface-raised hover:text-text focus-visible:outline-2 focus-visible:outline-text disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
