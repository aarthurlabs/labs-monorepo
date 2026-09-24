import { redirect } from "next/navigation";
import { getPostBySlug } from "./get-post-by-slug.action";
import { PostEditorForm } from "./post-editor-form";
import { PostEditorHeader } from "./post-editor-header";

interface PostEditorProps {
  slug?: string;
}

export async function PostEditor({ slug }: PostEditorProps) {
  const post = slug === undefined ? undefined : await getPostBySlug(slug);

  if (post === null) {
    redirect("/");
  }

  return (
    <>
      <PostEditorHeader post={post} />
      <PostEditorForm post={post} />
    </>
  );
}
