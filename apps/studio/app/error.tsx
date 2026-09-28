'use client'

import { Button } from '@labs/ui/components/button'

export default function Error({
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <main className="mx-auto flex w-full max-w-[832px] flex-1 items-center px-space-4 py-space-16 sm:px-space-6">
            <section className="max-w-[520px]">
                <p className="font-mono text-label uppercase tracking-wide text-danger">
                    Erro
                </p>
                <h1 className="mt-space-3 text-title text-text">
                    Não foi possível carregar esta página
                </h1>
                <p className="mt-space-2 text-body text-text-muted">
                    Ocorreu um problema inesperado. Tente novamente ou volte ao dashboard.
                </p>
                <div className="mt-space-6 flex flex-wrap gap-space-3">
                    <Button type="button" variant="primary" onClick={() => reset()}>
                        Tentar novamente
                    </Button>
                    <Button href="/" variant="secondary">
                        Voltar ao dashboard
                    </Button>
                </div>
            </section>
        </main>
    )
}
