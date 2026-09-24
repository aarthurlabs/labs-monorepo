"use client";

import { useState } from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { ListedPost } from "./get-posts";
import { PostListItem } from "./post-list-item";
import { reorderPosts } from "./reorder-posts.action";

interface SortablePostListProps {
  posts: ListedPost[];
}

export function SortablePostList({ posts }: SortablePostListProps) {
  const [items, setItems] = useState(posts);
  const [lastServerPosts, setLastServerPosts] = useState(posts);
  const [reordering, setReordering] = useState(false);
  const [reorderError, setReorderError] = useState(false);
  if (posts !== lastServerPosts && !reordering) {
    setLastServerPosts(posts);
    setItems(posts);
  }
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  async function handleDragEnd({ active, over }: DragEndEvent) {
    if (!over || active.id === over.id || reordering) return;

    const oldIndex = items.findIndex((post) => post.id === active.id);
    const newIndex = items.findIndex((post) => post.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;

    const previous = items;
    const next = arrayMove(items, oldIndex, newIndex);
    setItems(next);
    setReordering(true);
    setReorderError(false);

    try {
      await reorderPosts(next.map((post) => post.id));
    } catch {
      setItems(previous);
      setReorderError(true);
    } finally {
      setReordering(false);
    }
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((post) => post.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="border-t border-line">
            {items.map((post) => (
              <PostListItem
                key={post.id}
                post={post}
                dragDisabled={reordering}
                onDeleted={(id) => {
                  setItems((current) =>
                    current.filter((item) => item.id !== id),
                  );
                }}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <p className="mt-space-4 text-meta text-text-muted">
        Arraste pela alça para reordenar, ou foque a alça e use{" "}
        <kbd className="rounded-sm border border-line px-space-1 font-mono text-label">
          Espaço
        </kbd>{" "}
        e as setas.
      </p>
      {reorderError && (
        <p role="alert" className="mt-space-2 text-label text-danger">
          Não foi possível salvar a ordem. A lista voltou à ordem anterior.
        </p>
      )}
    </>
  );
}
