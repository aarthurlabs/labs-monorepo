import Link from 'next/link'
import { getNextPost } from './get-next-post'

export async function NextPost({
    currentPublishedAt,
}: {
    currentPublishedAt: Date | null
}) {
    const post = await getNextPost(currentPublishedAt)

    if (!post) return null

    return (
        <section aria-label="Continuar explorando" className="mt-space-12">
            <h2 className="mb-space-3 font-mono text-label uppercase tracking-wide text-text-muted">
                CONTINUAR EXPLORANDO
            </h2>
            <Link
                href={`/${post.slug}`}
                className="group flex items-center justify-between gap-space-4 border-y border-line py-space-4 text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
            >
                <span className="min-w-0">
                    <span className="block font-mono text-meta text-text-muted">
                        Próximo experimento
                    </span>
                    <span className="mt-space-1 block text-heading font-semibold group-hover:underline group-hover:decoration-line-strong group-hover:underline-offset-4">
                        {post.title}
                    </span>
                </span>
                <span
                    aria-hidden="true"
                    className="shrink-0 text-heading text-accent-text"
                >
                    →
                </span>
            </Link>
        </section>
    )
}
