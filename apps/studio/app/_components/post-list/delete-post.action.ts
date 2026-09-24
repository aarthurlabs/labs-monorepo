"use server";

import { db } from "@labs/database";
import { revalidatePath } from "next/cache";

export async function deletePost(postId: string) {
  if (typeof postId !== "string" || !postId.trim()) {
    throw new Error("Post inválido.");
  }

  await db.post.delete({ where: { id: postId } });
  revalidatePath("/");
}
