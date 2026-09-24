"use server";

import { db } from "@labs/database";
import { revalidatePath } from "next/cache";

export async function reorderPosts(postIds: string[]) {
  if (
    !Array.isArray(postIds) ||
    postIds.length === 0 ||
    postIds.some((id) => typeof id !== "string" || !id.trim()) ||
    new Set(postIds).size !== postIds.length
  ) {
    throw new Error("Ordem de posts inválida.");
  }

  await db.$transaction(async (transaction) => {
    const existing = await transaction.post.findMany({
      select: { id: true },
    });
    const submittedIds = new Set(postIds);
    if (
      existing.length !== postIds.length ||
      existing.some(({ id }) => !submittedIds.has(id))
    ) {
      throw new Error("A lista de posts mudou. Recarregue e tente novamente.");
    }

    for (let position = 0; position < postIds.length; position++) {
      await transaction.post.update({
        where: { id: postIds[position] },
        data: { position },
      });
    }
  });
  revalidatePath("/");
}
