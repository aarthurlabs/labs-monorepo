import Link from "next/link";

export function PostListEmpty() {
  return (
    <div className="rounded-md border border-line bg-surface px-space-6 py-space-12 text-center">
      <h2 className="text-heading text-text">Nenhum post ainda.</h2>
      <p className="mt-space-2 text-meta text-text-muted">
        Crie o primeiro post do Laboratório para começar.
      </p>
      <Link
        href="/upsert"
        className="mt-space-6 inline-flex h-space-8 items-center justify-center gap-[6px] rounded-sm border border-transparent bg-brand-500 px-space-3 text-meta font-semibold text-on-brand transition-colors hover:bg-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
      >
        <span aria-hidden="true">+</span> Novo post
      </Link>
    </div>
  );
}
