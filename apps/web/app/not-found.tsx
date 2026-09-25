import Link from 'next/link'

export default function NotFound() {
    return (
        <main className="mx-auto w-full max-w-[var(--content-width)] flex-1 px-space-4 pt-space-24 pb-space-24 sm:px-space-6">
            <p className="font-mono text-label uppercase text-accent-text">
                404
            </p>
            <h1 className="mt-space-4 text-title text-text">
                Página não encontrada
            </h1>
            <p className="mt-space-2 text-body text-text-muted">
                Esse experimento parece ter saído do laboratório.
            </p>

            <div className="mt-space-8 flex flex-wrap items-center gap-x-space-6 gap-y-space-4">
                <Link
                    href="/"
                    className="inline-flex h-10 items-center justify-center rounded-pill border border-line bg-surface px-space-4 text-small font-semibold text-text transition-colors hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
                >
                    Voltar ao Laboratório
                </Link>
                <Link
                    href="/posts"
                    className="inline-flex items-center gap-space-2 rounded-sm text-small font-medium text-text-muted transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
                >
                    Explorar posts
                    <span aria-hidden="true" className="text-accent-text">
                        →
                    </span>
                </Link>
            </div>
        </main>
    )
}
