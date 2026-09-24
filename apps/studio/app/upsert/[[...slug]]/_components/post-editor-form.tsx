'use client'

import { useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Post } from '@labs/database'
import { LabMark } from '@labs/ui/components/brand/lab-mark'
import { Button } from '@labs/ui/components/button'
import { Field } from '@labs/ui/components/field'
import { Input } from '@labs/ui/components/input'
import { MdxEditor } from '@labs/ui/components/mdx/mdx-editor'
import { SegmentedControl } from '@labs/ui/components/segmented-control'
import { Switch } from '@labs/ui/components/switch'
import { Tag } from '@labs/ui/components/tag'
import { Textarea } from '@labs/ui/components/textarea'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import slugify from 'slugify'
import { postFormSchema, type PostFormValues } from './post-form.schema'
import { upsertPost } from './upsert-post.action'

interface PostEditorFormProps {
    post?: Post
}

const typeOptions = [
    { value: 'PROJECT', label: 'Projeto' },
    { value: 'NOTE', label: 'Nota' },
    { value: 'EXPERIMENT', label: 'Experimento' },
] as const

const statusOptions = [
    { value: 'DRAFT', label: 'Rascunho' },
    { value: 'PUBLISHED', label: 'Publicado' },
] as const

function getDefaultValues(post?: Post): PostFormValues {
    return {
        title: post?.title ?? '',
        description: post?.description ?? '',
        type: post?.type ?? 'EXPERIMENT',
        status: post?.status ?? 'DRAFT',
        number: post?.number ?? undefined,
        tags: post?.tags ?? [],
        repositoryUrl: post?.repositoryUrl ?? '',
        liveUrl: post?.liveUrl ?? '',
        featured: post?.featured ?? false,
        publishedAt: post?.publishedAt
            ? post.publishedAt.toISOString().slice(0, 10)
            : '',
        learnedTitle: post?.learnedTitle ?? '',
        learnedContent: post?.learnedContent ?? '',
        content: post?.content ?? '',
    }
}

export function PostEditorForm({ post }: PostEditorFormProps) {
    const router = useRouter()
    const [tagDraft, setTagDraft] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [saveError, setSaveError] = useState<string | null>(null)
    const previousPostId = useRef(post?.id)
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<PostFormValues>({
        resolver: zodResolver(postFormSchema),
        defaultValues: getDefaultValues(post),
    })

    useEffect(() => {
        if (previousPostId.current !== post?.id) {
            reset(getDefaultValues(post))
            setTagDraft('')
            previousPostId.current = post?.id
        }
    }, [post, reset])

    function addTag(tags: string[], onChange: (tags: string[]) => void) {
        const tag = tagDraft.trim()
        if (tag && !tags.includes(tag)) {
            onChange([...tags, tag])
        }
        setTagDraft('')
    }

    async function onSubmit(
        values: PostFormValues,
        event?: React.BaseSyntheticEvent,
    ) {
        if (isSaving) return
        setIsSaving(true)
        setSaveError(null)

        const submitter = (event?.nativeEvent as SubmitEvent | undefined)
            ?.submitter
        const intent =
            submitter?.getAttribute('value') === 'publish' ? 'publish' : 'draft'
        const status = intent === 'publish' ? 'PUBLISHED' : 'DRAFT'
        const slug = slugify(values.title, {
            lower: true,
            strict: true,
            trim: true,
            locale: 'pt',
        })

        let navigating = false
        try {
            const result = await upsertPost({
                ...values,
                id: post?.id,
                slug,
                status,
                intent,
            })

            if (!result.success) {
                setSaveError(result.error)
                return
            }

            reset({
                ...values,
                status: result.post.status,
                publishedAt: result.post.publishedAt,
            })

            if (!post || post.slug !== result.post.slug) {
                navigating = true
                router.replace(`/upsert/${result.post.slug}`)
            } else {
                router.refresh()
            }
        } catch {
            setSaveError('Não foi possível salvar o post. Tente novamente.')
        } finally {
            if (!navigating) setIsSaving(false)
        }
    }

    return (
        <main className="mx-auto w-full max-w-5xl px-space-4 py-space-8 sm:px-space-6">
            <form
                id="post-editor-form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
            >
                <section aria-labelledby="post-information">
                    <h2
                        id="post-information"
                        className="font-mono text-label uppercase text-text-muted"
                    >
                        Informações do post
                    </h2>

                    <div className="mt-space-4 flex flex-col gap-space-3">
                        <Field label="Título" error={errors.title?.message}>
                            <Input
                                variant="title"
                                placeholder="Título do post"
                                {...register('title')}
                            />
                        </Field>

                        <Field
                            label="Descrição"
                            error={errors.description?.message}
                        >
                            <Textarea
                                placeholder="Uma ou duas frases que apresentam o post."
                                {...register('description')}
                            />
                        </Field>

                        <div className="grid gap-space-4 md:grid-cols-3">
                            <div className="flex min-w-0 flex-col gap-[5px]">
                                <span className="text-label font-medium text-text-muted">
                                    Tipo
                                </span>
                                <Controller
                                    control={control}
                                    name="type"
                                    render={({ field }) => (
                                        <SegmentedControl
                                            label="Tipo"
                                            options={typeOptions}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            onBlur={field.onBlur}
                                            aria-invalid={Boolean(errors.type)}
                                            aria-describedby={
                                                errors.type
                                                    ? 'type-error'
                                                    : undefined
                                            }
                                        />
                                    )}
                                />
                                {errors.type && (
                                    <span
                                        id="type-error"
                                        className="text-label text-danger"
                                    >
                                        {errors.type.message}
                                    </span>
                                )}
                            </div>

                            <Field
                                label="Número"
                                optional
                                error={errors.number?.message}
                            >
                                <Input
                                    type="number"
                                    min={1}
                                    step={1}
                                    mono
                                    placeholder="01"
                                    {...register('number', {
                                        setValueAs: (value: string) =>
                                            value === ''
                                                ? undefined
                                                : Number(value),
                                    })}
                                />
                            </Field>

                            <Field
                                label="Data de publicação"
                                error={errors.publishedAt?.message}
                            >
                                <Input
                                    type="date"
                                    {...register('publishedAt')}
                                />
                            </Field>
                        </div>

                        <div className="grid gap-space-4 md:grid-cols-2">
                            <div className="flex min-w-0 flex-col gap-[5px]">
                                <span className="text-label font-medium text-text-muted">
                                    Status
                                </span>
                                <Controller
                                    control={control}
                                    name="status"
                                    render={({ field }) => (
                                        <SegmentedControl
                                            label="Status"
                                            options={statusOptions}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            onBlur={field.onBlur}
                                            aria-invalid={Boolean(
                                                errors.status,
                                            )}
                                            aria-describedby={
                                                errors.status
                                                    ? 'status-error'
                                                    : undefined
                                            }
                                        />
                                    )}
                                />
                                {errors.status && (
                                    <span
                                        id="status-error"
                                        className="text-label text-danger"
                                    >
                                        {errors.status.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex min-w-0 flex-col gap-[5px]">
                                <span className="text-label font-medium text-text-muted">
                                    Destaque
                                </span>
                                <Controller
                                    control={control}
                                    name="featured"
                                    render={({ field }) => (
                                        <Switch
                                            label="Post em destaque"
                                            name={field.name}
                                            checked={field.value}
                                            onChange={(event) =>
                                                field.onChange(
                                                    event.target.checked,
                                                )
                                            }
                                            onBlur={field.onBlur}
                                            aria-invalid={Boolean(
                                                errors.featured,
                                            )}
                                            aria-describedby={
                                                errors.featured
                                                    ? 'featured-error'
                                                    : undefined
                                            }
                                        />
                                    )}
                                />
                                {errors.featured && (
                                    <span
                                        id="featured-error"
                                        className="text-label text-danger"
                                    >
                                        {errors.featured.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex min-w-0 flex-col gap-[5px]">
                            <label
                                htmlFor="post-tags"
                                className="text-label font-medium text-text-muted"
                            >
                                Tags
                            </label>
                            <Controller
                                control={control}
                                name="tags"
                                render={({ field }) => (
                                    <div className="flex min-h-space-8 flex-wrap items-center gap-space-2 rounded-sm border border-line bg-surface px-[10px] py-space-1 focus-within:border-brand-600 focus-within:ring-4 focus-within:ring-brand-500/20">
                                        {field.value.map((tag, index) => (
                                            <Tag
                                                key={`${tag}-${index}`}
                                                onRemove={() =>
                                                    field.onChange(
                                                        field.value.filter(
                                                            (_, itemIndex) =>
                                                                itemIndex !==
                                                                index,
                                                        ),
                                                    )
                                                }
                                            >
                                                {tag}
                                            </Tag>
                                        ))}
                                        <input
                                            id="post-tags"
                                            name={field.name}
                                            ref={field.ref}
                                            value={tagDraft}
                                            onChange={(event) =>
                                                setTagDraft(event.target.value)
                                            }
                                            onKeyDown={(event) => {
                                                if (event.key === 'Enter') {
                                                    event.preventDefault()
                                                    addTag(
                                                        field.value,
                                                        field.onChange,
                                                    )
                                                }
                                            }}
                                            onBlur={() => {
                                                addTag(
                                                    field.value,
                                                    field.onChange,
                                                )
                                                field.onBlur()
                                            }}
                                            placeholder="+ adicionar"
                                            aria-invalid={Boolean(errors.tags)}
                                            aria-describedby={
                                                errors.tags
                                                    ? 'tags-error'
                                                    : undefined
                                            }
                                            className="min-w-28 flex-1 bg-transparent font-mono text-label text-text outline-none placeholder:text-text-muted"
                                        />
                                    </div>
                                )}
                            />
                            {errors.tags && (
                                <span
                                    id="tags-error"
                                    className="text-label text-danger"
                                >
                                    {errors.tags.message}
                                </span>
                            )}
                        </div>

                        <div className="grid gap-space-4 md:grid-cols-2">
                            <Field
                                label="Repositório"
                                error={errors.repositoryUrl?.message}
                            >
                                <Input
                                    type="url"
                                    mono
                                    placeholder="https://github.com/..."
                                    {...register('repositoryUrl')}
                                />
                            </Field>
                            <Field
                                label="Projeto"
                                error={errors.liveUrl?.message}
                            >
                                <Input
                                    type="url"
                                    mono
                                    placeholder="https://..."
                                    {...register('liveUrl')}
                                />
                            </Field>
                        </div>
                    </div>
                </section>

                <section
                    aria-labelledby="post-learning"
                    className="mt-space-8 border-t border-line pt-space-6"
                >
                    <h2
                        id="post-learning"
                        className="flex items-center gap-space-2 font-mono text-label uppercase text-text-muted"
                    >
                        <LabMark
                            decorative
                            className="inline-block h-4 w-[14px] shrink-0"
                        />
                        O que aprendemos
                    </h2>
                    <div className="mt-space-4 flex flex-col gap-space-3">
                        <Field
                            label="Título"
                            error={errors.learnedTitle?.message}
                        >
                            <Input
                                placeholder="A ideia principal, numa frase."
                                {...register('learnedTitle')}
                            />
                        </Field>
                        <Field
                            label="Conteúdo"
                            error={errors.learnedContent?.message}
                        >
                            <Textarea
                                className="min-h-[76px]"
                                placeholder="Por que isso importa, em duas ou três linhas."
                                {...register('learnedContent')}
                            />
                        </Field>
                    </div>
                </section>

                <section
                    aria-label="Conteúdo em MDX"
                    className="mt-space-8 border-t border-line pt-space-6"
                >
                    <Controller
                        control={control}
                        name="content"
                        render={({ field }) => (
                            <div
                                aria-invalid={Boolean(errors.content)}
                                aria-describedby={
                                    errors.content ? 'content-error' : undefined
                                }
                            >
                                <MdxEditor
                                    name={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder={
                                        '## Comece pelo problema\n\nEscreva livremente em MDX: títulos, listas, código, imagens, tabelas e componentes como <Callout>.'
                                    }
                                />
                            </div>
                        )}
                    />
                    {errors.content && (
                        <span
                            id="content-error"
                            className="mt-space-2 block text-label text-danger"
                        >
                            {errors.content.message}
                        </span>
                    )}
                </section>
                <div className="mt-space-6 flex flex-wrap items-center justify-end gap-space-2 border-t border-line pt-space-4">
                    {saveError && (
                        <p
                            role="alert"
                            className="mr-auto text-label text-danger"
                        >
                            {saveError}
                        </p>
                    )}
                    <Button
                        type="submit"
                        name="intent"
                        value="draft"
                        variant="secondary"
                        disabled={isSaving || isSubmitting}
                    >
                        {isSaving ? 'Salvando...' : 'Salvar rascunho'}
                    </Button>
                    <Button
                        type="submit"
                        name="intent"
                        value="publish"
                        variant="primary"
                        disabled={isSaving || isSubmitting}
                    >
                        {isSaving ? 'Salvando...' : 'Publicar'}
                    </Button>
                </div>
            </form>
        </main>
    )
}
