import 'server-only'
import { db } from '@labs/database'

export async function getNextPost(currentPublishedAt: Date | null) {
    if (!currentPublishedAt) return null

    return db.post.findFirst({
        where: {
            status: 'PUBLISHED',
            type: 'EXPERIMENT',
            publishedAt: { gt: currentPublishedAt },
        },
        orderBy: [{ publishedAt: 'asc' }, { id: 'asc' }],
        select: { id: true, slug: true, title: true },
    })
}
