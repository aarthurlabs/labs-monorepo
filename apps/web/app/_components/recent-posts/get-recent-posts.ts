import "server-only";
import { db } from "@labs/database";

export async function getRecentPosts() {
  return db.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: 3,
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      type: true,
      tags: true,
      publishedAt: true,
    },
  });
}

export type RecentPost = Awaited<ReturnType<typeof getRecentPosts>>[number];
