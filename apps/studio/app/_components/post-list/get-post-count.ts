import "server-only";

import { db } from "@labs/database";

export async function getPostCount() {
  return db.post.count();
}
