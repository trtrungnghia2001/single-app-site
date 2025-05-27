import { useModelKanbanForm } from "@/stores/kanban.store";
import { Modal } from "antd";
import { memo } from "react";
import TaskFormCreateUpdate from "./TaskFormCreateUpdate";
import ColumnFormCreateUpdate from "./ColumnFormCreateUpdate";

const ModelKanbanForm = () => {
  const { open, type, onClose, isUpdate } = useModelKanbanForm();

  return (
    <Modal
      footer={false}
      width={600}
      title={
        (type === "board" &&
          (isUpdate ? "Update board" : "Create new board")) ||
        (type === "column" &&
          (isUpdate ? "Update column" : "Create new column")) ||
        (type === "task" && (isUpdate ? "Update task" : "Create new task"))
      }
      open={open}
      onOk={onClose}
      onCancel={onClose}
    >
      {type === "column" && <ColumnFormCreateUpdate />}
      {type === "task" && <TaskFormCreateUpdate />}
    </Modal>
  );
};

export default memo(ModelKanbanForm);
