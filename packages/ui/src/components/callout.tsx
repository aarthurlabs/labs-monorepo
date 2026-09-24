import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface CalloutProps extends HTMLAttributes<HTMLElement> {
  icon?: ReactNode;
}

const infoIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v6M12 7.5v.01" />
  </svg>
);

export function Callout({
  icon = infoIcon,
  className,
  children,
  ...props
}: CalloutProps) {
  return (
    <aside
      className={cn(
        "flex gap-space-3 rounded-md border border-line border-l-2 border-l-brand-500 bg-surface px-space-4 py-[14px] text-small text-text",
        className,
      )}
      {...props}
    >
      <span aria-hidden="true" className="mt-space-1 shrink-0 text-accent-text">
        {icon}
      </span>
      <div>{children}</div>
    </aside>
  );
}
