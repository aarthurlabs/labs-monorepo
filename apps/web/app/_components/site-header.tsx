import Link from 'next/link'
import { LabBadge } from '@labs/ui/components/brand/lab-badge'
import { LabMark } from '@labs/ui/components/brand/lab-mark'

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-20 isolate px-space-2 pt-space-4 sm:px-space-4">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-[60px] right-[10%] h-[140px] w-[260px] rounded-full bg-glow blur-[60px]"
            />
            <div className="relative mx-auto flex w-full max-w-[var(--content-width)] items-center justify-between gap-space-2 rounded-pill border border-line bg-glass py-[10px] pr-space-2 pl-space-2 backdrop-blur-[var(--blur-glass)] sm:pr-space-3 sm:pl-space-4">
                <Link
                    href="/"
                    aria-label="Laboratório da ArthurLabs, início"
                    className="inline-flex shrink-0 items-center gap-space-1 rounded-sm text-[13px] font-semibold tracking-[-0.01em] text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text sm:gap-space-2 sm:text-[16px]"
                >
                    <LabMark
                        decorative
                        className="inline-block h-[20px] w-[18px] shrink-0 sm:h-[24px] sm:w-[22px]"
                    />
                    <span>ArthurLabs</span>
                    <LabBadge className="h-[18px] px-space-2 text-[10px] sm:h-[20px] sm:px-[9px] sm:text-[11px]" />
                </Link>

                <nav
                    aria-label="Links"
                    className="flex items-center gap-space-2 sm:gap-space-4"
                >
                    <a
                        href="https://www.linkedin.com/in/reisarthur/"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-space-1 whitespace-nowrap rounded-sm text-[11px] font-medium text-text-muted transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text sm:text-[14px]"
                    >
                        LinkedIn <span aria-hidden="true">↗</span>
                    </a>
                    <a
                        href="https://arthurlabs.io/"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-space-1 whitespace-nowrap rounded-sm text-[11px] font-medium text-text-muted transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text sm:text-[14px]"
                    >
                        ArthurLabs <span aria-hidden="true">↗</span>
                    </a>
                </nav>
            </div>
        </header>
    )
}
