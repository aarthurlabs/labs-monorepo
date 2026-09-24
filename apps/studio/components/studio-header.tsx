import Link from 'next/link'
import { Badge } from '@labs/ui/components/badge'
import { LabMark } from '@labs/ui/components/brand/lab-mark'

export function StudioHeader() {
    return (
        <header className="flex h-space-12 items-center gap-space-6 border-b border-line bg-surface px-space-4 sm:px-space-6">
            <div className="flex items-center gap-space-2">
                <Link
                    href="/"
                    aria-label="ArthurLabs Studio — início"
                    className="inline-flex items-center gap-space-2 rounded-sm font-semibold text-text transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
                >
                    <LabMark
                        className="inline-block h-5 w-[18px] shrink-0"
                        decorative
                    />
                    <span className="text-[14px]">ArthurLabs</span>
                </Link>
                <Badge>Studio</Badge>
            </div>

            <nav aria-label="Navegação principal">
                <Link
                    href="/"
                    aria-current="page"
                    className="inline-flex h-7 items-center rounded-sm bg-surface-raised px-space-3 text-meta font-semibold text-text transition-colors hover:bg-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
                >
                    Posts
                </Link>
            </nav>
        </header>
    )
}
