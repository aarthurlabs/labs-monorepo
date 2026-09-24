import Link from "next/link";
import { connection } from "next/server";
import { getPostCount } from "./get-post-count";
import { getPosts } from "./get-posts";
import { PostListEmpty } from "./post-list-empty";
import { SortablePostList } from "./sortable-post-list";

export async function PostList() {
  await connection();
  const [posts, count] = await Promise.all([getPosts(), getPostCount()]);

  return (
    <main className="mx-auto w-full max-w-[832px] px-space-4 py-space-8 sm:px-space-6">
      <div className="mb-space-4 flex items-center justify-between gap-space-4">
        <h1 className="flex items-center gap-space-2 text-heading text-text">
          Posts
          <span className="font-mono text-label font-normal text-text-muted">
            {count}
          </span>
        </h1>
        <Link
          href="/upsert"
          className="inline-flex h-space-8 items-center justify-center gap-[6px] rounded-sm border border-transparent bg-brand-500 px-space-3 text-meta font-semibold text-on-brand transition-colors hover:bg-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
        >
          <span aria-hidden="true">+</span> Novo post
        </Link>
      </div>
      {count === 0 || posts.length === 0 ? (
        <PostListEmpty />
      ) : (
        <SortablePostList posts={posts} />
      )}
    </main>
  );
}
