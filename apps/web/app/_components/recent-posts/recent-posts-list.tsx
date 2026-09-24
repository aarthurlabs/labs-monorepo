import { connection } from "next/server";
import { getRecentPosts } from "./get-recent-posts";
import { getRecentPostsCount } from "./get-recent-posts-count";
import { RecentPostCard } from "./recent-post-card";

export async function RecentPostsList() {
  await connection();
  const [posts, count] = await Promise.all([
    getRecentPosts(),
    getRecentPostsCount(),
  ]);

  if (count === 0 || posts.length === 0) return null;

  const countLabel = count === 1 ? "1 post no total" : `${count} posts no total`;

  return (
    <section className="peer mx-auto w-full max-w-[var(--content-width)] px-space-4 pt-space-16">
      <div className="flex items-baseline justify-between gap-space-4 border-b border-line pb-space-3">
        <h2 className="text-heading font-semibold text-text">Posts recentes</h2>
        <span className="shrink-0 font-mono text-meta text-text-muted">
          {countLabel}
        </span>
      </div>
      <ul>{posts.map((post) => <RecentPostCard key={post.id} post={post} />)}</ul>
    </section>
  );
}
