import { db, type PostType, type Prisma } from '@labs/database'

const typeNames: Record<string, PostType> = {
    projeto: 'PROJECT',
    nota: 'NOTE',
    experimento: 'EXPERIMENT',
}

export async function GET(request: Request) {
    try {
        const query = new URL(request.url).searchParams.get('q')?.trim() ?? ''
        const filters: Prisma.PostWhereInput[] = [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { tags: { has: query } },
        ]

        const type = typeNames[query.toLocaleLowerCase('pt-BR')]
        if (type) filters.push({ type })

        const where: Prisma.PostWhereInput = {
            status: 'PUBLISHED',
            ...(query ? { OR: filters } : {}),
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
                    number: true,
                    tags: true,
                    featured: true,
                    publishedAt: true,
                    repositoryUrl: true,
                    liveUrl: true,
                },
            }),
            db.post.count({ where }),
        ])

        return Response.json({ data: posts, total })
    } catch (error) {
        console.error('Erro ao carregar posts públicos:', error)
        return Response.json(
            { error: 'Não foi possível carregar os posts.' },
            { status: 500 },
        )
    }
}
