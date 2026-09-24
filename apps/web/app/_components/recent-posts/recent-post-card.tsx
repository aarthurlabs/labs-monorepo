import Link from "next/link";
import { Tag } from "@labs/ui/components/tag";
import type { RecentPost } from "./get-recent-posts";

const typeLabels = {
  PROJECT: "PROJETO",
  NOTE: "NOTA",
  EXPERIMENT: "EXPERIMENTO",
} as const;

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  timeZone: "UTC",
});

function formatPublishedDate(date: Date) {
  const parts = dateFormatter.formatToParts(date);
  const day = parts.find((part) => part.type === "day")?.value;
  const month = parts.find((part) => part.type === "month")?.value.replace(".", "");
  return `${day} ${month}`;
}

export function RecentPostCard({ post }: { post: RecentPost }) {
  return (
    <li className="border-b border-line">
      <Link
        href={`/${post.slug}`}
        className="grid min-w-0 grid-cols-1 gap-space-2 py-space-4 transition-colors hover:bg-surface-raised focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-accent-text sm:grid-cols-[96px_minmax(0,1fr)] sm:gap-space-4 px-4"
      >
        <div className="flex items-center gap-space-2 font-mono text-meta text-text-muted sm:flex-col sm:items-start sm:gap-0">
          {post.publishedAt && (
            <time dateTime={post.publishedAt.toISOString()} className="font-medium">
              {formatPublishedDate(post.publishedAt)}
            </time>
          )}
          <span className="text-label tracking-wide opacity-80">
            {typeLabels[post.type]}
          </span>
        </div>
        <div className="min-w-0">
          <h3 className="text-heading font-semibold text-text">{post.title}</h3>
          <p className="mt-space-1 text-small text-text-muted">{post.description}</p>
          {post.tags.length > 0 && (
            <div className="mt-space-2 flex flex-wrap gap-space-2">
              {post.tags.map((tag, index) => (
                <Tag key={`${tag}-${index}`}>{tag}</Tag>
              ))}
            </div>
          )}
        </div>
      </Link>
    </li>
  );
}
