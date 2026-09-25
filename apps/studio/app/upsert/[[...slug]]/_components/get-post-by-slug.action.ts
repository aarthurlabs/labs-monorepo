'use server'

import { db } from '@labs/database'

export async function getPostBySlug(slug: string) {
    return db.post.findUnique({
        where: { slug },
    })
}
