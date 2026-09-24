import "server-only";

import { db } from "@labs/database";

export async function getPosts() {
  return db.post.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      number: true,
      type: true,
      status: true,
      featured: true,
      position: true,
      publishedAt: true,
      createdAt: true,
    },
    orderBy: [{ position: "asc" }, { createdAt: "desc" }],
  });
}

export type ListedPost = Awaited<ReturnType<typeof getPosts>>[number];
