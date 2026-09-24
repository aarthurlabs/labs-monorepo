import Link from 'next/link'
import { Suspense } from 'react'
import { PostsSearch } from './_components/posts-search'

export default function PostsPage() {
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
        </main>
    )
}
