import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ColumnType } from "antd/es/table";
import type { TaskType } from "@/types/kanban.type";

type SortableItemType = {
  id: string;
  data: TaskType | ColumnType;
  type: "task" | "column";
  children: React.ReactNode;
};

export function SortableItem({ id, children, data, type }: SortableItemType) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: { data, type },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
