import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { PostEditor } from './_components/post-editor'

interface UpsertPageProps {
    params: Promise<{ slug?: string[] }>
}

function PostEditorSkeleton() {
    return (
        <div
            role="status"
            aria-label="Carregando editor"
            className="animate-pulse"
        >
            <div aria-hidden="true">
                <div className="flex h-14 items-center gap-space-4 border-b border-line px-space-6">
                    <div className="h-4 w-16 rounded-sm bg-surface-raised" />
                    <div className="h-5 w-24 rounded-sm bg-surface-raised" />
                    <div className="ml-auto h-space-8 w-28 rounded-sm bg-surface-raised" />
                    <div className="h-space-8 w-20 rounded-sm bg-surface-raised" />
                </div>
                <div className="mx-auto w-full max-w-5xl px-space-4 py-space-8 sm:px-space-6">
                    <div className="rounded-md border border-line bg-surface p-space-6">
                        <div className="mb-space-6 h-4 w-40 rounded-sm bg-surface-raised" />
                        <div className="mb-space-3 h-space-8 w-full rounded-sm bg-surface-raised" />
                        <div className="mb-space-3 h-space-8 w-full rounded-sm bg-surface-raised" />
                        <div className="mb-space-8 h-space-16 w-full rounded-sm bg-surface-raised" />
                        <div className="h-64 w-full rounded-sm bg-surface-raised" />
                    </div>
                </div>
            </div>
            <span className="sr-only">Carregando editor...</span>
        </div>
    )
}

export default async function UpsertPage({ params }: UpsertPageProps) {
    const { slug: segments } = await params

    if (segments && segments.length > 1) {
        redirect('/')
    }

    const slug = segments?.[0]

    return (
        <Suspense fallback={<PostEditorSkeleton />}>
            <PostEditor slug={slug} />
        </Suspense>
    )
}
