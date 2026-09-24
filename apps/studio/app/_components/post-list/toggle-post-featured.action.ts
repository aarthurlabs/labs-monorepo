"use server";

import { db } from "@labs/database";
import { revalidatePath } from "next/cache";

export async function togglePostFeatured(postId: string, featured: boolean) {
  if (
    typeof postId !== "string" ||
    !postId.trim() ||
    typeof featured !== "boolean"
  ) {
    throw new Error("Dados de destaque inválidos.");
  }

  await db.post.update({
    where: { id: postId },
    data: { featured },
  });
  revalidatePath("/");
}
