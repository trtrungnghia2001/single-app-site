import { useModelKanbanForm } from "@/stores/kanban.store";
import type { TaskType } from "@/types/kanban.type";
import {
  CheckCircleFilled,
  EditOutlined,
  ExclamationCircleFilled,
  PauseCircleFilled,
} from "@ant-design/icons";

type Type = {
  task: TaskType;
};

const TaskCard = ({ task }: Type) => {
  const { onOpen, updateData } = useModelKanbanForm();
  return (
    <div className="group bg-white p-2 rounded-lg overflow-hidden shadow flex items-start justify-between gap-4 ">
      <div className="flex items-center gap-2">
        {task.status === "completed" && (
          <CheckCircleFilled
            style={{
              color: `#28a745`,
            }}
          />
        )}
        {task.status === "failed" && (
          <ExclamationCircleFilled
            style={{
              color: `#fb2c36`,
            }}
          />
        )}
        {task.status === "cancelled" && (
          <PauseCircleFilled
            style={{
              color: `#FFD700`,
            }}
          />
        )}
        <span className="break-all">{task.title}</span>
      </div>
      <button
        className="group-hover:block hidden"
        onClick={() => {
          updateData(task as TaskType);
          onOpen("task");
        }}
      >
        <EditOutlined />
      </button>
    </div>
  );
};

export default TaskCard;
