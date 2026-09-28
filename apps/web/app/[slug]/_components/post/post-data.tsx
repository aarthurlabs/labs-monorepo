import { redirect } from 'next/navigation'
import { MdxContent } from '@labs/ui/components/mdx/mdx-content'
import { getPost } from './get-post'
import { NextPost } from './next-post'
import { PostHeader } from './post-header'
import { WhatLearned } from './what-learned'

export async function PostData({ slug }: { slug: string }) {
    const post = await getPost(slug)

    if (!post) redirect('/')

    return (
        <main className="mx-auto w-full max-w-[var(--content-width)] px-space-6 pb-space-24">
            <article>
                <PostHeader
                    title={post.title}
                    description={post.description}
                    type={post.type}
                    number={post.number}
                    tags={post.tags}
                    publishedAt={post.publishedAt}
                    repositoryUrl={post.repositoryUrl}
                    liveUrl={post.liveUrl}
                />
                <MdxContent content={post.content} className="mt-space-16" />
                <WhatLearned
                    title={post.learnedTitle}
                    content={post.learnedContent}
                />
                <NextPost currentPublishedAt={post.publishedAt} />
            </article>
        </main>
    )
}
