import { Suspense } from 'react'
import { PostData } from './_components/post/post-data'

function PostSkeleton() {
    return (
        <div
            role="status"
            aria-label="Carregando post"
            className="mx-auto w-full max-w-[var(--content-width)] space-y-space-4 px-space-6 pt-space-8"
        >
            <div aria-hidden="true" className="h-5 w-32 animate-pulse rounded-sm bg-surface-raised" />
            <div aria-hidden="true" className="mt-space-12 h-4 w-44 animate-pulse rounded-sm bg-surface-raised" />
            <div aria-hidden="true" className="h-12 w-4/5 animate-pulse rounded-sm bg-surface-raised" />
            <div aria-hidden="true" className="h-6 w-full animate-pulse rounded-sm bg-surface-raised" />
            <div aria-hidden="true" className="mt-space-16 h-48 w-full animate-pulse rounded-lg border border-line bg-surface" />
            <span className="sr-only">Carregando post...</span>
        </div>
    )
}

export default async function PostPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    return (
        <Suspense fallback={<PostSkeleton />}>
            <PostData slug={slug} />
        </Suspense>
    )
}
