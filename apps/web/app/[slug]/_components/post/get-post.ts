import 'server-only'
import { db } from '@labs/database'

export async function getPost(slug: string) {
    return db.post.findFirst({
        where: { slug, status: 'PUBLISHED' },
        select: {
            id: true,
            slug: true,
            title: true,
            description: true,
            type: true,
            number: true,
            tags: true,
            content: true,
            learnedTitle: true,
            learnedContent: true,
            repositoryUrl: true,
            liveUrl: true,
            publishedAt: true,
        },
    })
}
