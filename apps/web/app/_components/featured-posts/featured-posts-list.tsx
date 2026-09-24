import { connection } from "next/server";
import { FeaturedPostCard } from "./featured-post-card";
import { getFeaturedPosts } from "./get-featured-posts";

export async function FeaturedPostsList() {
  await connection();
  const posts = await getFeaturedPosts();

  if (!posts.length) return null;

  return (
    <section
      aria-label="Posts em destaque"
      className="mx-auto w-full max-w-[var(--content-width)] space-y-space-3 px-space-4 pt-space-12 sm:pt-space-16"
    >
      {posts.map((post) => (
        <FeaturedPostCard key={post.id} post={post} />
      ))}
    </section>
  );
}
