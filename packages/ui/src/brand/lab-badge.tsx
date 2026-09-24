import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export type LabBadgeProps = HTMLAttributes<HTMLSpanElement>

export function LabBadge({
    className,
    children = 'Lab',
    ...props
}: LabBadgeProps) {
    return (
        <span
            className={cn(
                'relative inline-flex h-[20px] items-center rounded-pill bg-[linear-gradient(135deg,var(--brand-300),var(--brand-400)_50%,var(--brand-600))] px-[9px] text-[11px] font-bold text-on-brand shadow-[0_0_18px_var(--glow)]',
                className,
            )}
            {...props}
        >
            {children}
        </span>
    )
}
