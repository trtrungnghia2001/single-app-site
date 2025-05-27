import { Button, Dropdown } from "antd";
import {
  DeleteFilled,
  EditFilled,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import toast from "react-hot-toast";
import type { ColumnType, TaskType } from "@/types/kanban.type";
import { SortableItem } from "./SortableItem";
import { useColumnStore, useModelKanbanForm } from "@/stores/kanban.store";
import type { ItemType } from "antd/es/menu/interface";
import TaskCard from "./TaskCard";

type Type = {
  column: ColumnType;
  tasks: TaskType[];
};

const ColumnCard = ({ tasks, column }: Type) => {
  const { onOpen, updateData } = useModelKanbanForm();
  const { deleteById } = useColumnStore();
  const handleDelete = () => {
    try {
      deleteById(column._id);
      toast.success(`Delete successfully`);
    } catch (error) {
      toast.error(`Delete failed`);
      console.error(error);
    }
  };
  const items: ItemType[] = [
    {
      key: 1,
      label: (
        <button
          onClick={() => {
            onOpen("column");
            updateData(column);
          }}
          className="flex items-center gap-2"
        >
          <EditFilled />
          Edit
        </button>
      ),
    },
    {
      key: 2,
      label: (
        <button onClick={handleDelete} className="flex items-center gap-2">
          <DeleteFilled />
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="p-2 rounded-lg min-w-64 max-w-64 bg-gray-100 space-y-2 shadow">
      <div className="group flex items-center gap-4 justify-between">
        <h6 className="p-2 break-all">{column?.title}</h6>
        <Dropdown menu={{ items }} placement="bottomRight">
          <MoreOutlined />
        </Dropdown>
      </div>
      <SortableContext
        items={tasks.map((item) => item._id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <SortableItem
            key={task._id}
            id={task._id as string}
            data={task as TaskType}
            type="task"
          >
            <TaskCard key={task._id} task={task} />
          </SortableItem>
        ))}
      </SortableContext>

      <Button block onClick={() => onOpen("task", column._id)}>
        <PlusOutlined />
        Add task
      </Button>
    </div>
  );
};

export default ColumnCard;
