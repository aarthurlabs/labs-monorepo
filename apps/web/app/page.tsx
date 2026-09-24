import { Suspense } from 'react'
import { MdxContent } from '@labs/ui/components/mdx/mdx-content'
import { FeaturedPostsList } from './_components/featured-posts/featured-posts-list'

const exampleContent = `# Cache na Weather API

## Problema

Descreva o problema que motivou o experimento.

## Solução

Explique a implementação em MDX. Você pode usar **Markdown**, listas e blocos de código.

### Próximos passos

- [ ] Documentar os resultados
- [ ] Revisar a estratégia de cache
`

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

export default function Home() {
    return (
        <main>
            <Suspense fallback={<FeaturedPostsSkeleton />}>
                <FeaturedPostsList />
            </Suspense>
        </main>
    )
}
