import "server-only";

import { db } from "@labs/database";

export async function getFeaturedPosts() {
  return db.post.findMany({
    where: {
      status: "PUBLISHED",
      featured: true,
    },
    orderBy: { position: "asc" },
    take: 3,
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      number: true,
      type: true,
      tags: true,
      publishedAt: true,
    },
  });
}

export type FeaturedPost = Awaited<ReturnType<typeof getFeaturedPosts>>[number];
