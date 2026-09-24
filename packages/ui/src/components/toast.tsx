import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
    open: boolean
}

export function Toast({ open, className, children, ...props }: ToastProps) {
    return (
        <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className={cn(
                'pointer-events-none fixed bottom-space-6 left-1/2 z-70 -translate-x-1/2 rounded-pill bg-text px-[14px] py-space-2 text-[13px] font-medium text-bg transition-[opacity,transform] duration-200',
                open
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-space-2 opacity-0',
                className,
            )}
            {...props}
        >
            {children}
        </div>
    )
}
