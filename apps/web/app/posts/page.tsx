import Link from 'next/link'
import { Suspense } from 'react'
import { PostsSearch } from './_components/posts-search'
import { PostsList } from './_components/posts-list'

export default async function PostsPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string | string[] }>
}) {
    const rawQuery = (await searchParams).q
    const query = (Array.isArray(rawQuery) ? rawQuery[0] : rawQuery)?.trim() ?? ''

    return (
        <main className="mx-auto w-full max-w-[var(--content-width)] px-space-6 pt-space-12 pb-space-24">
            <Link
                href="/"
                className="inline-flex items-center gap-space-2 rounded-sm text-small font-medium text-text-muted transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
            >
                <span aria-hidden="true">‹</span> Início
            </Link>

            <h1 className="mt-space-6 text-[32px] leading-[38px] font-semibold tracking-[-0.02em] text-text">
                Laboratório
            </h1>
            <p className="mt-space-2 text-body text-text-muted">
                Todos os projetos, notas e experimentos publicados.
            </p>

            <Suspense
                fallback={
                    <div
                        role="status"
                        aria-label="Carregando busca"
                        className="mt-space-8 h-space-12 w-full animate-pulse rounded-pill border border-line bg-surface"
                    />
                }
            >
                <PostsSearch />
            </Suspense>

            <Suspense
                key={query}
                fallback={
                    <div role="status" aria-label="Carregando posts" className="mt-space-12">
                        <div aria-hidden="true" className="mb-space-3 h-8 w-full animate-pulse rounded-sm bg-surface-raised" />
                        {Array.from({ length: 3 }, (_, index) => (
                            <div key={index} aria-hidden="true" className="space-y-space-2 border-t border-line py-space-4">
                                <div className="h-5 w-2/3 animate-pulse rounded-sm bg-surface-raised" />
                                <div className="h-4 w-full animate-pulse rounded-sm bg-surface-raised" />
                            </div>
                        ))}
                        <span className="sr-only">Carregando posts...</span>
                    </div>
                }
            >
                <PostsList query={query} />
            </Suspense>
        </main>
    )
}
