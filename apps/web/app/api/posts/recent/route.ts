import { db } from '@labs/database'

export async function GET() {
    try {
        const where = { status: 'PUBLISHED' } as const
        const [posts, total] = await Promise.all([
            db.post.findMany({
                where,
                orderBy: { publishedAt: 'desc' },
                take: 3,
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
        console.error('Erro ao carregar posts recentes:', error)
        return Response.json(
            { error: 'Não foi possível carregar os posts.' },
            { status: 500 },
        )
    }
}
