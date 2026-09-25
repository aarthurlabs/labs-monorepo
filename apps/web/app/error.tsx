"use client";

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@labs/ui/components/button'

interface ErrorPageProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <main className="mx-auto w-full max-w-[var(--content-width)] flex-1 px-space-4 pt-space-24 pb-space-24 sm:px-space-6">
            <p className="font-mono text-label uppercase text-accent-text">
                Erro
            </p>
            <h1 className="mt-space-4 text-title text-text">
                Algo deu errado
            </h1>
            <p className="mt-space-2 text-body text-text-muted">
                Não foi possível carregar esta parte do laboratório.
            </p>
            <p className="mt-space-1 text-body text-text-muted">
                Tente novamente ou volte para o início.
            </p>

            <div className="mt-space-8 flex flex-wrap items-center gap-x-space-6 gap-y-space-4">
                <Button
                    type="button"
                    variant="secondary"
                    className="min-h-10 rounded-[var(--radius-pill)] px-space-4 text-small font-semibold"
                    onClick={() => reset()}
                >
                    Tentar novamente
                </Button>
                <Link
                    href="/"
                    className="inline-flex items-center gap-space-2 rounded-sm text-small font-medium text-text-muted transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
                >
                    Voltar ao Laboratório
                    <span aria-hidden="true" className="text-accent-text">
                        →
                    </span>
                </Link>
            </div>
        </main>
    )
}
