"use client";

import { useId, useRef, type HTMLAttributes, type KeyboardEvent } from "react";
import { cn } from "../lib/cn";

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  disabled?: boolean;
}

export interface SegmentedControlProps<T extends string> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  label: string;
  options: readonly SegmentedOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
}

export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onValueChange,
  className,
  ...props
}: SegmentedControlProps<T>) {
  const labelId = useId();
  const groupRef = useRef<HTMLDivElement>(null);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (
      !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)
    )
      return;
    event.preventDefault();
    const enabled = options.filter((option) => !option.disabled);
    if (!enabled.length) return;
    const index = enabled.findIndex((option) => option.value === value);
    const direction =
      event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
    const next = enabled[(index + direction + enabled.length) % enabled.length];
    onValueChange(next.value);
    groupRef.current
      ?.querySelectorAll<HTMLButtonElement>('[role="radio"]')
      [options.findIndex((option) => option.value === next.value)]?.focus();
  }

  return (
    <div {...props}>
      <span id={labelId} className="sr-only">
        {label}
      </span>
      <div
        ref={groupRef}
        role="radiogroup"
        aria-labelledby={labelId}
        onKeyDown={onKeyDown}
        className={cn(
          "flex h-space-8 rounded-sm border border-line bg-surface p-[2px]",
          className,
        )}
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={option.value === value}
            tabIndex={option.value === value ? 0 : -1}
            disabled={option.disabled}
            onClick={() => onValueChange(option.value)}
            className="h-[26px] flex-1 cursor-pointer whitespace-nowrap rounded-[4px] px-[6px] text-[12px] font-medium text-text-muted hover:text-text aria-checked:bg-surface-raised aria-checked:text-text aria-checked:shadow-[inset_0_0_0_1px_var(--line-strong)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-text disabled:cursor-not-allowed disabled:opacity-50"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
