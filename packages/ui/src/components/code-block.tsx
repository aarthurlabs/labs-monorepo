import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface CodeBlockProps extends HTMLAttributes<HTMLElement> {
  code: string;
  language?: string;
  title?: string;
  renderLine?: (line: string, index: number) => ReactNode;
}

export function CodeBlock({
  code,
  language,
  title,
  renderLine,
  className,
  ...props
}: CodeBlockProps) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-md border border-line bg-surface",
        className,
      )}
      {...props}
    >
      <figcaption className="flex items-center justify-between border-b border-line px-[14px] py-[7px] font-mono text-[12px] text-text-muted">
        <span>{title || language || "código"}</span>
        <span>{language}</span>
      </figcaption>
      <pre className="overflow-x-auto py-space-3 font-mono text-[13px] leading-[22px]">
        <code>
          {code.split("\n").map((line, index) => (
            <span key={index} className="block whitespace-pre px-[14px]">
              <span
                aria-hidden="true"
                className="inline-block w-[26px] select-none text-code-comment opacity-60"
              >
                {index + 1}
              </span>
              {renderLine ? renderLine(line, index) : line || " "}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
