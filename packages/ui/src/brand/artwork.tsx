import type { HTMLAttributes } from "react";

export interface BrandArtworkProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "children"
> {
  decorative?: boolean;
}

interface ArtworkProps extends BrandArtworkProps {
  lightSrc: string;
  darkSrc: string;
  label: string;
  defaultClassName: string;
}

export function BrandArtwork({
  lightSrc,
  darkSrc,
  label,
  defaultClassName,
  decorative = false,
  className,
  ...props
}: ArtworkProps) {
  return (
    <span
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative || undefined}
      className={className ?? defaultClassName}
      {...props}
    >
      <img
        src={lightSrc}
        alt=""
        className="block h-full w-full object-contain dark:hidden [html[data-theme=dark]_&]:hidden [html[data-theme=light]_&]:block"
      />
      <img
        src={darkSrc}
        alt=""
        className="hidden h-full w-full object-contain dark:block [html[data-theme=dark]_&]:block [html[data-theme=light]_&]:hidden"
      />
    </span>
  );
}
