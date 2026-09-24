import { Suspense } from "react";
import { PostList } from "./_components/post-list/post-list";

function PostListSkeleton() {
  return (
    <main
      role="status"
      aria-label="Carregando posts"
      className="mx-auto w-full max-w-[832px] animate-pulse px-space-4 py-space-8 sm:px-space-6"
    >
      <div aria-hidden="true">
        <div className="mb-space-4 flex items-center justify-between">
          <div className="h-7 w-28 rounded-sm bg-surface-raised" />
          <div className="h-space-8 w-28 rounded-sm bg-surface-raised" />
        </div>
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="border-t border-line py-space-4">
            <div className="ml-space-12 h-4 w-64 max-w-[70%] rounded-sm bg-surface-raised" />
            <div className="ml-space-12 mt-space-2 h-3 w-40 rounded-sm bg-surface-raised" />
          </div>
        ))}
      </div>
      <span className="sr-only">Carregando posts...</span>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<PostListSkeleton />}>
      <PostList />
    </Suspense>
  );
}
