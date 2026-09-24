'use server'

import { Prisma, db } from '@labs/database'
import { revalidatePath } from 'next/cache'
import slugify from 'slugify'
import { z } from 'zod'
import { postFormSchema } from './post-form.schema'

const upsertPostSchema = postFormSchema.extend({
    id: z.string().min(1).optional(),
    intent: z.enum(['draft', 'publish']),
})

type UpsertPostInput = z.infer<typeof upsertPostSchema>

export async function upsertPost(input: UpsertPostInput) {
    const parsed = upsertPostSchema.safeParse(input)
    if (!parsed.success) {
        return {
            success: false,
            error: 'Confira os dados do formulário.',
        } as const
    }

    const values = parsed.data
    const slug = slugify(values.title, {
        lower: true,
        strict: true,
        trim: true,
        locale: 'pt',
    })

    if (!slug) {
        return {
            success: false,
            error: 'Não foi possível gerar o slug do título.',
        } as const
    }

    try {
        const previousPost = values.id
            ? await db.post.findUnique({
                  where: { id: values.id },
                  select: { slug: true },
              })
            : null

        if (values.id && !previousPost) {
            return { success: false, error: 'Post não encontrado.' } as const
        }

        const status: 'PUBLISHED' | 'DRAFT' =
            values.intent === 'publish' ? 'PUBLISHED' : 'DRAFT'
        const publishedAt = values.intent === 'publish' ? new Date() : null

        const data = {
            title: values.title,
            slug,
            description: values.description,
            type: values.type,
            status,
            number: values.number ?? null,
            tags: values.tags,
            content: values.content,
            learnedTitle: values.learnedTitle,
            learnedContent: values.learnedContent,
            repositoryUrl: values.repositoryUrl || null,
            liveUrl: values.liveUrl || null,
            featured: values.featured,
            publishedAt,
        }

        const post = values.id
            ? await db.post.update({ where: { id: values.id }, data })
            : await db.post.create({ data })

        revalidatePath('/')
        revalidatePath(`/upsert/${post.slug}`)
        if (previousPost && previousPost.slug !== post.slug) {
            revalidatePath(`/upsert/${previousPost.slug}`)
        }

        return {
            success: true,
            post: {
                id: post.id,
                slug: post.slug,
                status: post.status,
            },
        } as const
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return {
                    success: false,
                    error: 'Já existe um post com este slug.',
                } as const
            }
            if (error.code === 'P2025') {
                return {
                    success: false,
                    error: 'Post não encontrado.',
                } as const
            }
        }

        console.error('Falha ao salvar o post:', error)
        return {
            success: false,
            error: 'Não foi possível salvar o post. Tente novamente.',
        } as const
    }
}
