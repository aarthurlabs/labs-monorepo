import { PostCard } from '../../../components/post-card'
import { getPosts } from './get-posts'

interface PostsListProps {
    query: string
}

export async function PostsList({ query }: PostsListProps) {
    const { posts, total } = await getPosts(query)
    const title = query ? 'Resultados' : 'Todos os posts'
    const countLabel = `${total} ${total === 1 ? 'post' : 'posts'}`

    return (
        <section aria-label={title} className="mt-space-12">
            <div className="flex items-baseline justify-between gap-space-4 border-b border-line pb-space-3">
                <h2 className="text-heading font-semibold text-text">{title}</h2>
                <span className="shrink-0 font-mono text-meta text-text-muted">
                    {countLabel}
                </span>
            </div>

            {total > 0 ? (
                <ul>
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </ul>
            ) : (
                <p className="py-space-8 text-small text-text-muted">
                    {query
                        ? `Nenhum post encontrado para “${query}”.`
                        : 'Nenhum post publicado ainda.'}
                </p>
            )}
        </section>
    )
}
