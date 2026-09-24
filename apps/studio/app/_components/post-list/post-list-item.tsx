'use client'

import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DropdownMenu } from '@labs/ui/components/dropdown-menu'
import Link from 'next/link'
import type { ListedPost } from './get-posts'
import { togglePostFeatured } from './toggle-post-featured.action'

interface PostListItemProps {
    post: ListedPost
    dragDisabled: boolean
}

const typeLabels = {
    PROJECT: 'Projeto',
    NOTE: 'Nota',
    EXPERIMENT: 'Experimento',
} as const

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
})

export function PostListItem({ post, dragDisabled }: PostListItemProps) {
    const [featured, setFeatured] = useState(post.featured)
    const [lastServerFeatured, setLastServerFeatured] = useState(post.featured)
    const [featuredPending, setFeaturedPending] = useState(false)
    const [featuredError, setFeaturedError] = useState(false)
    if (post.featured !== lastServerFeatured && !featuredPending) {
        setLastServerFeatured(post.featured)
        setFeatured(post.featured)
    }
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: post.id, disabled: dragDisabled })

    async function handleFeaturedClick() {
        if (featuredPending) return
        const previous = featured
        const next = !previous
        setFeatured(next)
        setFeaturedPending(true)
        setFeaturedError(false)

        try {
            await togglePostFeatured(post.id, next)
        } catch {
            setFeatured(previous)
            setFeaturedError(true)
        } finally {
            setFeaturedPending(false)
        }
    }

    return (
        <li
            ref={setNodeRef}
            style={{
                transform: CSS.Transform.toString(transform),
                transition,
            }}
            className={`relative border-b border-line bg-bg ${isDragging ? 'z-10 bg-surface-raised' : ''}`}
        >
            <div className="flex min-h-[65px] items-center gap-space-3 py-space-2">
                <button
                    ref={setActivatorNodeRef}
                    type="button"
                    {...attributes}
                    {...listeners}
                    aria-label={`Reordenar ${post.title}`}
                    disabled={dragDisabled}
                    className="inline-flex size-space-8 shrink-0 cursor-grab touch-none items-center justify-center rounded-sm font-mono text-label text-text-muted hover:text-text focus-visible:outline-2 focus-visible:outline-accent-text active:cursor-grabbing disabled:cursor-not-allowed"
                >
                    <span aria-hidden="true">⠿</span>
                </button>
                <button
                    type="button"
                    onClick={handleFeaturedClick}
                    disabled={featuredPending}
                    aria-label={featured ? 'Remover destaque' : 'Destacar post'}
                    aria-pressed={featured}
                    className={`inline-flex size-space-8 shrink-0 items-center justify-center rounded-sm text-small transition-colors focus-visible:outline-2 focus-visible:outline-accent-text disabled:cursor-wait ${featured ? 'text-warning' : 'text-text-muted hover:text-text'}`}
                >
                    <span aria-hidden="true">{featured ? '★' : '☆'}</span>
                </button>
                <div className="min-w-0 flex-1 ">
                    <p className="truncate text-small font-semibold text-text">
                        {post.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-space-4 font-mono text-label text-text-muted">
                        {post.number !== null && (
                            <span>#{String(post.number).padStart(2, '0')}</span>
                        )}
                        <span>{typeLabels[post.type]}</span>
                        <span className="inline-flex items-center gap-space-1">
                            <span
                                aria-hidden="true"
                                className={`size-[6px] rounded-pill ${post.status === 'PUBLISHED' ? 'bg-brand-500' : 'bg-text-muted'}`}
                            />
                            {post.status === 'PUBLISHED'
                                ? 'Publicado'
                                : 'Rascunho'}
                        </span>
                        {post.publishedAt && (
                            <time
                                dateTime={post.publishedAt
                                    .toISOString()
                                    .slice(0, 10)}
                            >
                                {dateFormatter.format(post.publishedAt)}
                            </time>
                        )}
                    </div>
                </div>
                <Link
                    href={`/upsert/${post.slug}`}
                    className="rounded-sm px-space-1 text-meta text-text transition-colors hover:text-accent-text focus-visible:outline-2 focus-visible:outline-accent-text"
                >
                    Editar
                </Link>
                <DropdownMenu
                    label={`Opções de ${post.title}`}
                    trigger={
                        <button
                            type="button"
                            aria-label={`Mais opções para ${post.title}`}
                            className="inline-flex size-space-8 items-center justify-center rounded-sm text-text-muted hover:bg-surface-raised hover:text-text focus-visible:outline-2 focus-visible:outline-accent-text"
                        >
                            <span aria-hidden="true">···</span>
                        </button>
                    }
                >
                    <Link
                        href={`/upsert/${post.slug}`}
                        role="menuitem"
                        className="flex h-[30px] items-center rounded-sm px-[10px] text-meta text-text hover:bg-surface-raised focus-visible:bg-surface-raised focus-visible:outline-none"
                    >
                        Editar post
                    </Link>
                </DropdownMenu>
            </div>
            {featuredError && (
                <p
                    role="alert"
                    className="pb-space-2 pl-space-12 text-label text-danger"
                >
                    Não foi possível alterar o destaque.
                </p>
            )}
        </li>
    )
}
