import { db } from '@labs/database'

export async function GET() {
    try {
        const posts = await db.post.findMany({
            where: { status: 'PUBLISHED', featured: true },
            orderBy: { position: 'asc' },
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
        })

        return Response.json({ data: posts })
    } catch (error) {
        console.error('Erro ao carregar posts em destaque:', error)
        return Response.json(
            { error: 'Não foi possível carregar os posts.' },
            { status: 500 },
        )
    }
}
