import {
  cloneElement,
  useId,
  type HTMLAttributes,
  type ReactElement,
} from "react";
import { cn } from "../lib/cn";

export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactElement<{
    id?: string;
    "aria-invalid"?: boolean;
    "aria-describedby"?: string;
  }>;
}

export function Field({
  label,
  optional = false,
  error,
  children,
  className,
  ...props
}: FieldProps) {
  const generatedId = useId();
  const controlId = children.props.id ?? generatedId;
  const errorId = `${controlId}-error`;
  return (
    <div
      className={cn("flex min-w-0 flex-col gap-[5px]", className)}
      {...props}
    >
      <label
        htmlFor={controlId}
        className="text-[12px] leading-[16px] font-medium text-text-muted"
      >
        {label}
        {optional && <span className="font-normal"> · opcional</span>}
      </label>
      {cloneElement(children, {
        id: controlId,
        "aria-invalid": error ? true : children.props["aria-invalid"],
        "aria-describedby": error
          ? [children.props["aria-describedby"], errorId]
              .filter(Boolean)
              .join(" ")
          : children.props["aria-describedby"],
      })}
      {error && (
        <span id={errorId} className="text-[12px] text-danger">
          {error}
        </span>
      )}
    </div>
  );
}
