import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export type CardProps =
  | (HTMLAttributes<HTMLDivElement> & { href?: never; elevated?: boolean })
  | (AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
      elevated?: boolean;
    });

export function Card(props: CardProps) {
  const { className, elevated = false, ...rest } = props;
  const classes = cn(
    "block rounded-lg border border-line bg-surface",
    elevated && "shadow-[var(--shadow-card)]",
    className,
  );
  if (typeof props.href === "string") {
    return (
      <a
        className={cn(
          classes,
          "transition-colors duration-150 hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text",
        )}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }
  return (
    <div className={classes} {...(rest as HTMLAttributes<HTMLDivElement>)} />
  );
}
