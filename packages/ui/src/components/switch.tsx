import type { InputHTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export interface SwitchProps extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'size'
> {
    label: string
}

export function Switch({ label, className, disabled, ...props }: SwitchProps) {
    return (
        <label
            className={cn(
                'flex h-space-8 cursor-pointer items-center justify-between gap-space-3 rounded-sm border border-line bg-surface px-[10px] text-[13px] text-text has-disabled:cursor-not-allowed has-disabled:opacity-50',
                className,
            )}
        >
            <span>{label}</span>
            <input
                type="checkbox"
                role="switch"
                className="peer sr-only"
                disabled={disabled}
                {...props}
            />
            <span
                aria-hidden="true"
                className="relative h-[18px] w-[30px] shrink-0 rounded-pill bg-line-strong transition-colors duration-150 after:absolute after:top-[2px] after:left-[2px] after:size-[14px] after:rounded-full after:bg-text after:transition-transform after:duration-150 peer-checked:bg-brand-500 peer-checked:after:translate-x-[12px] peer-checked:after:bg-on-brand peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-text"
            />
        </label>
    )
}
