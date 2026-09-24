import Link from 'next/link'
import type { PostType } from '@labs/database'
import { Tag } from '@labs/ui/components/tag'

interface PostHeaderProps {
    title: string
    description: string
    type: PostType
    number: number | null
    tags: string[]
    publishedAt: Date | null
}

const typeLabels: Record<PostType, string> = {
    PROJECT: 'PROJETO',
    NOTE: 'NOTA',
    EXPERIMENT: 'EXPERIMENTO',
}

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
})

function formatPublishedAt(date: Date) {
    const parts = dateFormatter.formatToParts(date)
    const day = parts.find((part) => part.type === 'day')?.value
    const month = parts
        .find((part) => part.type === 'month')
        ?.value.replace('.', '')
    const year = parts.find((part) => part.type === 'year')?.value
    return [day, month, year].filter(Boolean).join(' ')
}

export function PostHeader({
    title,
    description,
    type,
    number,
    tags,
    publishedAt,
}: PostHeaderProps) {
    return (
        <header className="relative isolate overflow-hidden pt-space-8">
            <Link
                href="/"
                className="inline-flex items-center gap-space-2 rounded-sm text-small font-medium text-text-muted transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
            >
                <span aria-hidden="true">‹</span> Laboratório
            </Link>
            <div className="mt-space-8 flex flex-wrap items-center gap-space-2 font-mono text-label uppercase tracking-wide text-accent-text">
                <span>
                    {typeLabels[type]}
                    {number !== null && ` ${String(number).padStart(2, '0')}`}
                </span>
                <span
                    aria-hidden="true"
                    className="size-[6px] rounded-full bg-success shadow-[0_0_10px_var(--success)]"
                />
                <span>NO AR</span>
            </div>
            <h1 className="mt-space-4 text-[32px] leading-[38px] font-semibold tracking-[-0.02em] text-text sm:text-[40px] sm:leading-[44px]">
                {title}
            </h1>
            <p className="mt-space-2 max-w-[560px] text-body text-text-muted">
                {description}
            </p>
            {(publishedAt || tags.length > 0) && (
                <div className="mt-space-6 flex flex-wrap items-center gap-space-2 font-mono text-label text-text-muted">
                    {publishedAt && (
                        <time
                            dateTime={publishedAt.toISOString()}
                            className="mr-space-1"
                        >
                            {formatPublishedAt(publishedAt)}
                        </time>
                    )}
                    {tags.map((tag, index) => (
                        <Tag key={`${tag}-${index}`}>{tag}</Tag>
                    ))}
                </div>
            )}
        </header>
    )
}
