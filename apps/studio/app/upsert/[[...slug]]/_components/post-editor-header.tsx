import Link from 'next/link'
import type { Post } from '@labs/database'

interface PostEditorHeaderProps {
    post?: Post
}

export function PostEditorHeader({ post }: PostEditorHeaderProps) {
    const isPublished = post?.status === 'PUBLISHED'
    const status = isPublished ? 'Publicado' : 'Em rascunho'
    return (
        <header className="border-b border-line bg-bg">
            <div className="flex min-h-14 flex-wrap items-center gap-x-space-4 gap-y-space-2 px-space-4 py-space-2 sm:px-space-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-space-2 rounded-sm text-meta text-text-muted transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
                >
                    <span
                        aria-hidden="true"
                        className="text-heading leading-none"
                    >
                        ‹
                    </span>
                    Posts
                </Link>
                <h1 className="text-small font-semibold text-text">
                    {post ? 'Editar post' : 'Novo post'}
                </h1>
                <span
                    className={`inline-flex items-center gap-space-2 font-mono text-label ${isPublished ? 'text-accent-text' : 'text-text-muted'}`}
                >
                    <span
                        aria-hidden="true"
                        className={`size-[6px] rounded-pill ${isPublished ? 'bg-accent-text' : 'bg-text-muted'}`}
                    />
                    {status}
                </span>
            </div>
        </header>
    )
}
