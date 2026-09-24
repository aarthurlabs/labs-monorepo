import type { Post } from "@labs/database";

interface PostEditorFormProps {
  post?: Post;
}

export function PostEditorForm({ post }: PostEditorFormProps) {
  return (
    <main className="mx-auto w-full max-w-5xl px-space-4 py-space-8 sm:px-space-6">
      <section aria-labelledby="post-information" className="rounded-md border border-line bg-surface p-space-6">
        <h2 id="post-information" className="font-mono text-label uppercase text-text-muted">
          Informações do post
        </h2>
        <p className="mt-space-3 text-meta text-text-muted">
          {post
            ? "Os campos de edição serão adicionados aqui."
            : "Os campos de criação serão adicionados aqui."}
        </p>
      </section>
    </main>
  );
}
