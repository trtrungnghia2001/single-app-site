import { memo, useEffect } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Select, Space } from "antd";
import toast from "react-hot-toast";
import TextArea from "antd/es/input/TextArea";
import { useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import type { TaskType } from "@/types/kanban.type";
import { priority_options, status_options } from "@/constants/options";
import { useModelKanbanForm, useTaskStore } from "@/stores/kanban.store";

const initialValues: Partial<TaskType> = {
  title: "",
  description: "",
  dueDate: "",
  priority: priority_options[0].value,
  status: status_options[0].value,
  tags: "",
};
const TaskFormCreateUpdate = () => {
  // path
  const { id } = useParams();

  // form
  const [form] = useForm<TaskType>();
  const onFinish: FormProps<TaskType>["onFinish"] = (values) => {
    handleCreateUpdate(values);
  };

  const onFinishFailed: FormProps<TaskType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // store
  const { isUpdate, columnId, onClose, data } = useModelKanbanForm();
  const { create, updateById, deleteById, datas } = useTaskStore();

  const handleDelete = () => {
    try {
      deleteById(id as string);
      toast.success(`Delete successfully`);
    } catch (error) {
      toast.error(`Delete failed`);
      console.error(error);
    }
  };

  const handleCreateUpdate = (values: TaskType) => {
    try {
      if (isUpdate && data) {
        updateById(data?._id as string, values);
        toast.success(`Update successfully`);
      } else {
        create({ ...values, column: columnId as string });
        toast.success(`Create successfully`);
      }
    } catch (error) {
      toast.error(`Error. Please try again`);
      console.error(error);
    }
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    if (isUpdate && data) {
      form.setFieldsValue(data);
    } else {
      form.resetFields();
    }
  }, [isUpdate, data]);

  useEffect(() => {
    localStorage.setItem("kanban-task", JSON.stringify(datas));
  }, [datas]);

  return (
    <div className="space-y-4">
      <Form
        form={form}
        initialValues={initialValues}
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<TaskType>
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input your title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<TaskType>
          label="Due Date"
          name="dueDate"
          rules={[{ required: true, message: "Please input your due date!" }]}
        >
          <Input type="date" className="w-full" />
        </Form.Item>

        <Form.Item<TaskType> label="Status" name="status">
          <Select>
            {status_options.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item<TaskType> label="Priority" name="priority">
          <Select>
            {priority_options.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item<TaskType> label="Tags" name="tags">
          <TextArea placeholder="Enter tags separated by commas" />
        </Form.Item>

        <Form.Item<TaskType> label="Description" name="description">
          <TextArea rows={5} />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              {isUpdate ? "Update" : "Create"}
            </Button>
            {isUpdate && (
              <Button
                onClick={handleDelete}
                type="primary"
                htmlType="button"
                danger
              >
                Delete
              </Button>
            )}
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default memo(TaskFormCreateUpdate);
