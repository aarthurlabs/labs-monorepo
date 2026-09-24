import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  onRemove?: () => void;
  removeLabel?: string;
}

export function Tag({
  onRemove,
  removeLabel,
  className,
  children,
  ...props
}: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-line bg-surface-raised font-mono text-text",
        onRemove
          ? "h-[22px] gap-[2px] rounded-[4px] pl-[7px] text-[11px]"
          : "rounded-sm px-space-2 py-[2px] text-[12px] leading-[16px] font-medium text-text-muted",
        className,
      )}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          aria-label={removeLabel ?? `Remover ${String(children)}`}
          onClick={onRemove}
          className="grid size-[18px] cursor-pointer place-items-center rounded-[3px] text-text-muted hover:bg-line hover:text-text focus-visible:outline-1 focus-visible:outline-text"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      )}
    </span>
  );
}
