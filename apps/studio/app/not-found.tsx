import { Button } from '@labs/ui/components/button'

export default function NotFound() {
    return (
        <main className="mx-auto flex w-full max-w-[832px] flex-1 items-center px-space-4 py-space-16 sm:px-space-6">
            <section className="max-w-[520px]">
                <p className="font-mono text-label uppercase tracking-wide text-accent-text">
                    404
                </p>
                <h1 className="mt-space-3 text-title text-text">
                    Conteúdo não encontrado
                </h1>
                <p className="mt-space-2 text-body text-text-muted">
                    O post ou recurso que você procura não existe ou foi removido.
                </p>
                <Button href="/" className="mt-space-6" variant="primary">
                    Voltar ao dashboard
                </Button>
            </section>
        </main>
    )
}
