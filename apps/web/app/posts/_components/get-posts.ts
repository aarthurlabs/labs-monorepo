import 'server-only'

import { db, type PostType, type Prisma } from '@labs/database'

const typeNames: Record<string, PostType> = {
    projeto: 'PROJECT',
    nota: 'NOTE',
    experimento: 'EXPERIMENT',
}

export async function getPosts(query: string) {
    const search = query.trim()
    const filters: Prisma.PostWhereInput[] = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { has: search} },
    ]

    const type = typeNames[search.toLocaleLowerCase('pt-BR')]
    if (type) filters.push({ type })

    const where: Prisma.PostWhereInput = {
        status: 'PUBLISHED',
        ...(search ? { OR: filters } : {}),
    }

    const [posts, total] = await Promise.all([
        db.post.findMany({
            where,
            orderBy: { publishedAt: 'desc' },
            select: {
                id: true,
                slug: true,
                title: true,
                description: true,
                type: true,
                tags: true,
                publishedAt: true,
            },
        }),
        db.post.count({ where }),
    ])

    return { posts, total }
}
