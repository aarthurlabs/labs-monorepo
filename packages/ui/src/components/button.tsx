import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type ButtonSize = "default" | "compact";

interface ButtonAppearance {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export type ButtonProps =
  | (ButtonHTMLAttributes<HTMLButtonElement> &
      ButtonAppearance & { href?: never })
  | (AnchorHTMLAttributes<HTMLAnchorElement> &
      ButtonAppearance & { href: string });

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-brand-500 text-on-brand font-semibold hover:not-disabled:bg-brand-600",
  secondary:
    "border-line bg-surface text-text hover:not-disabled:border-line-strong",
  ghost:
    "border-transparent text-text-muted hover:not-disabled:bg-surface-raised hover:not-disabled:text-text",
  danger:
    "border-transparent bg-danger text-on-brand font-semibold hover:not-disabled:brightness-110",
  outline:
    "border-line bg-transparent text-text-muted hover:not-disabled:border-line-strong hover:not-disabled:text-text",
};

export function Button({
  variant = "secondary",
  size = "default",
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-sm border font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text disabled:cursor-not-allowed disabled:opacity-50",
    size === "compact"
      ? "h-[26px] gap-[6px] px-space-2 text-[12px]"
      : "h-space-8 gap-[6px] px-space-3 text-[length:var(--type-meta-size)]",
    variants[variant],
    className,
  );

  if (typeof props.href === "string") {
    return (
      <a
        className={classes}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
}
