"use client";

import {
  useEffect,
  useId,
  useRef,
  type DialogHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn";

export interface DialogProps extends Omit<
  DialogHTMLAttributes<HTMLDialogElement>,
  "open" | "onClose"
> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: ReactNode;
  footer?: ReactNode;
  alert?: boolean;
}

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  footer,
  alert = false,
  className,
  children,
  ...props
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      role={alert ? "alertdialog" : "dialog"}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClose={() => onOpenChange(false)}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
          event.currentTarget.close();
        }
      }}
      className={cn(
        "m-auto w-[min(420px,calc(100%-48px))] rounded-lg border border-line bg-surface p-[20px] text-text shadow-[var(--shadow-card)] backdrop:bg-on-brand/50",
        className,
      )}
      {...props}
    >
      <h2 id={titleId} className="text-[16px] leading-[24px] font-semibold">
        {title}
      </h2>
      {description && (
        <p id={descriptionId} className="mt-[6px] text-text-muted">
          {description}
        </p>
      )}
      {children}
      {footer && (
        <div className="mt-[20px] flex justify-end gap-space-2">{footer}</div>
      )}
    </dialog>
  );
}
