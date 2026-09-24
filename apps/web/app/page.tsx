import { Suspense } from 'react'
import Link from 'next/link'
import { FeaturedPostsList } from './_components/featured-posts/featured-posts-list'
import { RecentPostsList } from './_components/recent-posts/recent-posts-list'

function FeaturedPostsSkeleton() {
    return (
        <div
            role="status"
            aria-label="Carregando posts em destaque"
            className="mx-auto w-full max-w-[var(--content-width)] px-space-4 pt-space-12 sm:pt-space-16"
        >
            <div
                aria-hidden="true"
                className="h-64 animate-pulse rounded-lg border border-line bg-surface"
            />
            <span className="sr-only">Carregando posts em destaque...</span>
        </div>
    )
}

function RecentPostsSkeleton() {
    return (
        <div
            role="status"
            aria-label="Carregando posts recentes"
            className="mx-auto w-full max-w-[var(--content-width)] px-space-4 pt-space-16"
        >
            <div
                aria-hidden="true"
                className="mb-space-3 h-8 w-full animate-pulse rounded-sm bg-surface-raised"
            />
            {Array.from({ length: 3 }, (_, index) => (
                <div
                    key={index}
                    aria-hidden="true"
                    className="space-y-space-2 border-t border-line py-space-4"
                >
                    <div className="h-5 w-2/3 animate-pulse rounded-sm bg-surface-raised" />
                    <div className="h-4 w-full animate-pulse rounded-sm bg-surface-raised" />
                </div>
            ))}
            <span className="sr-only">Carregando posts recentes...</span>
        </div>
    )
}

export default function Home() {
    return (
        <main>
            <Suspense fallback={<FeaturedPostsSkeleton />}>
                <FeaturedPostsList />
            </Suspense>
            <Suspense fallback={<RecentPostsSkeleton />}>
                <RecentPostsList />
            </Suspense>
            <div className="mx-auto w-full max-w-[var(--content-width)] px-space-4 pt-space-16 peer:block">
                <Link
                    href="/posts"
                    className="inline-flex h-10 items-center gap-space-3 rounded-pill border border-line bg-surface px-space-4 text-small font-semibold text-text transition-colors hover:border-line-strong focus-visible:outline-2 focus-visible:outline-accent-text"
                >
                    Explorar laboratório{' '}
                    <span aria-hidden="true" className="text-accent-text">
                        →
                    </span>
                </Link>
            </div>
        </main>
    )
}
