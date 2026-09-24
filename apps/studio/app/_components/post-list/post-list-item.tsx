'use client'

import { useEffect, useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button } from '@labs/ui/components/button'
import { Dialog } from '@labs/ui/components/dialog'
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@labs/ui/components/dropdown-menu'
import Link from 'next/link'
import type { ListedPost } from './get-posts'
import { deletePost } from './delete-post.action'
import { togglePostFeatured } from './toggle-post-featured.action'

interface PostListItemProps {
    post: ListedPost
    dragDisabled: boolean
    onDeleted: (id: string) => void
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

export function PostListItem({ post, dragDisabled, onDeleted }: PostListItemProps) {
    const [featured, setFeatured] = useState(post.featured)
    const [lastServerFeatured, setLastServerFeatured] = useState(post.featured)
    const [featuredPending, setFeaturedPending] = useState(false)
    const [featuredError, setFeaturedError] = useState(false)
    const [copyStatus, setCopyStatus] = useState<'copied' | 'error' | null>(null)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deletePending, setDeletePending] = useState(false)
    const [deleteError, setDeleteError] = useState(false)
    if (post.featured !== lastServerFeatured && !featuredPending) {
        setLastServerFeatured(post.featured)
        setFeatured(post.featured)
    }
    useEffect(() => {
        if (!copyStatus) return
        const timeout = window.setTimeout(() => setCopyStatus(null), 2000)
        return () => window.clearTimeout(timeout)
    }, [copyStatus])
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

    async function handleCopySlug() {
        try {
            await navigator.clipboard.writeText(post.slug)
            setCopyStatus('copied')
        } catch {
            setCopyStatus('error')
        }
    }

    async function handleDelete() {
        if (deletePending) return
        setDeletePending(true)
        setDeleteError(false)
        try {
            await deletePost(post.id)
            setDeleteOpen(false)
            onDeleted(post.id)
        } catch {
            setDeleteError(true)
        } finally {
            setDeletePending(false)
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
                        className="flex h-[30px] items-center gap-space-2 rounded-sm px-[10px] text-meta text-text hover:bg-surface-raised focus-visible:bg-surface-raised focus-visible:outline-none"
                    >
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            className="size-4 shrink-0"
                        >
                            <path d="m3 11 8-8 2 2-8 8-3 1 1-3Z" />
                        </svg>
                        Editar
                    </Link>
                    <DropdownMenuItem onClick={handleCopySlug}>
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            className="size-4 shrink-0"
                        >
                            <rect x="5" y="5" width="8" height="8" rx="1" />
                            <path d="M11 3H4a1 1 0 0 0-1 1v7" />
                        </svg>
                        Copiar slug
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        variant="danger"
                        onClick={() => {
                            setDeleteError(false)
                            setDeleteOpen(true)
                        }}
                    >
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            className="size-4 shrink-0"
                        >
                            <path d="M3 4h10M6 4V2.5h4V4M5 6v7h6V6M7 7.5v4M9 7.5v4" />
                        </svg>
                        Excluir post
                    </DropdownMenuItem>
                </DropdownMenu>
            </div>
            <Dialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                alert
                title="Excluir post?"
                description={
                    <>
                        <strong className="font-semibold text-text">
                            {post.title}
                        </strong>{' '}
                        será removido do Studio e deixará de aparecer no Labs.
                        Essa ação não pode ser desfeita.
                    </>
                }
                footer={
                    <>
                        <Button
                            type="button"
                            variant="secondary"
                            autoFocus
                            disabled={deletePending}
                            onClick={() => setDeleteOpen(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            variant="danger"
                            disabled={deletePending}
                            onClick={handleDelete}
                        >
                            {deletePending ? 'Excluindo...' : 'Excluir post'}
                        </Button>
                    </>
                }
            >
                {deleteError && (
                    <p role="alert" className="mt-space-3 text-label text-danger">
                        Não foi possível excluir o post. Tente novamente.
                    </p>
                )}
            </Dialog>
            {copyStatus && (
                <p
                    role={copyStatus === 'error' ? 'alert' : 'status'}
                    className={
                        copyStatus === 'error'
                            ? 'pb-space-2 pl-space-12 text-label text-danger'
                            : 'pb-space-2 pl-space-12 text-label text-text-muted'
                    }
                >
                    {copyStatus === 'error'
                        ? 'Não foi possível copiar o slug.'
                        : 'Slug copiado.'}
                </p>
            )}
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
