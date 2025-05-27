import { memo, useEffect } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import toast from "react-hot-toast";
import TextArea from "antd/es/input/TextArea";
import { useForm } from "antd/es/form/Form";
import type { ColumnType } from "@/types/kanban.type";
import { useColumnStore, useModelKanbanForm } from "@/stores/kanban.store";

const initialValues: Partial<ColumnType> = {
  title: "",
  description: "",
};

const ColumnFormCreateUpdate = () => {
  // form
  const [form] = useForm<ColumnType>();
  const onFinish: FormProps<ColumnType>["onFinish"] = (values) => {
    handleCreateUpdate(values);
  };

  const onFinishFailed: FormProps<ColumnType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  // store
  const { isUpdate, data, onClose } = useModelKanbanForm();
  const { create, updateById, datas } = useColumnStore();

  const handleCreateUpdate = (values: ColumnType) => {
    try {
      if (isUpdate && data) {
        updateById(data?._id as string, values);
        toast.success(`Update successfully`);
      } else {
        create({ ...values });
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
    localStorage.setItem("kanban-column", JSON.stringify(datas));
  }, [datas]);

  return (
    <Form
      form={form}
      initialValues={initialValues}
      name="basic"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<ColumnType>
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input your title!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<ColumnType> label="Description" name="description">
        <TextArea />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {isUpdate ? "Update" : "Create"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default memo(ColumnFormCreateUpdate);
