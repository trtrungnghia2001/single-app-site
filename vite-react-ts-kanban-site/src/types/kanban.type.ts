export type StatusType =
  | "pending"
  | "progress"
  | "completed"
  | "failed"
  | "cancelled";

export type PriorityType = "low" | "medium" | "high";

export type ColumnType = {
  _id: string;
  title: string;
  description: string;
  position: number;
  createdAt: string;
  updatedAt: string;
};

export type TaskType = {
  _id: string;
  title: string;
  description: string;
  column: string;
  status: string;
  priority: string;
  dueDate: string;
  tags: string;

  createdAt: string;
  updatedAt: string;
};

// form
export type ModelKanbanFormType = {
  open: boolean;
  type: "task" | "column" | "board" | null;
  data: ColumnType | TaskType | null;
  isUpdate: boolean;
  columnId: string | null;
  onOpen: (type: "task" | "column" | "board", columnId?: string) => void;
  onClose: () => void;
  updateData: (data: ColumnType | TaskType | null) => void;
};
