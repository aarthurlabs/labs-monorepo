import Link from 'next/link'
import type { FeaturedPost } from './get-featured-posts'

interface FeaturedPostCardProps {
    post: FeaturedPost
}

const typeLabels = {
    PROJECT: 'PROJETO',
    NOTE: 'NOTA',
    EXPERIMENT: 'EXPERIMENTO',
} as const

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

export function FeaturedPostCard({ post }: FeaturedPostCardProps) {
    return (
        <Link
            href={`/${post.slug}`}
            className="group relative block overflow-hidden rounded-lg border border-line bg-surface p-space-4 shadow-[var(--shadow-card)] transition-colors duration-150 hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text sm:p-[28px]"
        >
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-[70px] -right-[40px] h-[180px] w-[260px] rounded-full bg-glow blur-[60px]"
            />
            <div className="relative">
                <span className="font-mono text-label font-medium uppercase text-accent-text">
                    {typeLabels[post.type]}
                    {post.number !== null &&
                        ` ${String(post.number).padStart(2, '0')}`}
                </span>
                <h2 className="mt-space-3 text-title font-semibold text-text">
                    {post.title}
                </h2>
                <p className="mt-space-2 max-w-[520px] text-body text-text-muted">
                    {post.description}
                </p>
                {post.tags.length > 0 && (
                    <div className="mt-space-4 flex flex-wrap gap-space-2">
                        {post.tags.map((tag, index) => (
                            <span
                                key={`${tag}-${index}`}
                                className="rounded-sm border border-line bg-surface-raised px-space-2 py-space-1 font-mono text-label text-text-muted"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                <div className="mt-space-6 flex items-center justify-between gap-space-4 font-mono text-meta text-text-muted">
                    {post.publishedAt && (
                        <time
                            dateTime={post.publishedAt
                                .toISOString()
                                .slice(0, 10)}
                        >
                            {formatPublishedAt(post.publishedAt)}
                        </time>
                    )}
                    <span className="ml-auto inline-flex items-center gap-space-2 font-sans text-meta font-medium text-accent-text">
                        Ler post <span aria-hidden="true">→</span>
                    </span>
                </div>
            </div>
        </Link>
    )
}
