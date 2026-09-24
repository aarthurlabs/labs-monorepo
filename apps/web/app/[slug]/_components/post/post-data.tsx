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
                />
                <MdxContent content={post.content} className="mt-space-16" />
                <WhatLearned
                    title={post.learnedTitle}
                    content={post.learnedContent}
                />
                {(post.repositoryUrl || post.liveUrl) && (
                    <nav
                        aria-label="Links do post"
                        className="mt-space-12 flex flex-wrap gap-space-3"
                    >
                        {post.repositoryUrl && (
                            <a
                                href={post.repositoryUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-9 items-center gap-space-2 rounded-pill border border-line bg-surface px-space-4 text-small font-medium text-text transition-colors hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
                            >
                                Ver repositório{' '}
                                <span aria-hidden="true">↗</span>
                            </a>
                        )}
                        {post.liveUrl && (
                            <a
                                href={post.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-9 items-center gap-space-2 rounded-pill border border-line bg-surface px-space-4 text-small font-medium text-text transition-colors hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
                            >
                                Ver projeto <span aria-hidden="true">↗</span>
                            </a>
                        )}
                    </nav>
                )}
                <NextPost currentPublishedAt={post.publishedAt} />
            </article>
        </main>
    )
}
