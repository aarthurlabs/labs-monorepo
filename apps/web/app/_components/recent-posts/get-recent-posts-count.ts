import "server-only";
import { db } from "@labs/database";

export async function getRecentPostsCount() {
  return db.post.count({ where: { status: "PUBLISHED" } });
}
