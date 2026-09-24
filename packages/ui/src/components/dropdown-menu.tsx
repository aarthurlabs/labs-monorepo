"use client";

import {
  cloneElement,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn";

export interface DropdownMenuProps {
  trigger: ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>;
  label: string;
  children: ReactNode;
  className?: string;
}

export function DropdownMenu({
  trigger,
  label,
  children,
  className,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  function focusItem(index: number) {
    const items = menuRef.current?.querySelectorAll<HTMLElement>(
      '[role="menuitem"]:not(:disabled)',
    );
    items?.[index]?.focus();
  }

  function close(restoreFocus = false) {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.querySelector("button")?.focus();
  }

  useLayoutEffect(() => {
    if (!open) return;
    const anchor = triggerRef.current?.querySelector("button");
    const menu = menuRef.current;
    if (!anchor || !menu) return;
    const rect = anchor.getBoundingClientRect();
    const width = menu.offsetWidth;
    const height = menu.offsetHeight;
    setPosition({
      left: Math.max(
        8,
        Math.min(rect.right - width, window.innerWidth - width - 8),
      ),
      top:
        rect.bottom + 4 + height > window.innerHeight
          ? Math.max(8, rect.top - height - 4)
          : rect.bottom + 4,
    });
    focusItem(0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (
        menuRef.current?.contains(event.target as Node) ||
        triggerRef.current?.contains(event.target as Node)
      )
        return;
      close();
    }
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>(
        '[role="menuitem"]:not(:disabled)',
      ) ?? [],
    );
    const index = items.indexOf(document.activeElement as HTMLElement);
    if (event.key === "Escape") {
      event.preventDefault();
      close(true);
    }
    if (event.key === "Tab") close();
    if (event.key === "ArrowDown" && items.length) {
      event.preventDefault();
      items[(index + 1) % items.length].focus();
    }
    if (event.key === "ArrowUp" && items.length) {
      event.preventDefault();
      items[(index - 1 + items.length) % items.length].focus();
    }
  }

  function onTriggerClick(event: MouseEvent<HTMLButtonElement>) {
    trigger.props.onClick?.(event);
    if (!event.defaultPrevented) setOpen((current) => !current);
  }

  return (
    <>
      <span ref={triggerRef} className="inline-flex">
        {cloneElement(trigger, {
          "aria-haspopup": "menu",
          "aria-expanded": open,
          "aria-controls": open ? menuId : undefined,
          onClick: onTriggerClick,
        })}
      </span>
      {open && (
        <div
          id={menuId}
          ref={menuRef}
          role="menu"
          aria-label={label}
          onKeyDown={onKeyDown}
          onClick={(event) => {
            if ((event.target as Element).closest('[role="menuitem"]')) close();
          }}
          style={position}
          className={cn(
            "fixed z-50 min-w-[180px] rounded-md border border-line bg-surface p-space-1 shadow-[var(--shadow-card)]",
            className,
          )}
        >
          {children}
        </div>
      )}
    </>
  );
}

export interface DropdownMenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "danger";
}

export function DropdownMenuItem({
  variant = "default",
  className,
  type = "button",
  ...props
}: DropdownMenuItemProps) {
  return (
    <button
      type={type}
      role="menuitem"
      className={cn(
        "flex h-[30px] w-full cursor-pointer items-center gap-space-2 rounded-sm px-[10px] text-left text-[13px] hover:bg-surface-raised focus-visible:bg-surface-raised focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        variant === "danger" ? "text-danger" : "text-text",
        className,
      )}
      {...props}
    />
  );
}

export function DropdownMenuSeparator({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="separator"
      className={cn("m-space-1 h-px bg-line", className)}
      {...props}
    />
  );
}
