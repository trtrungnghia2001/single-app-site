import type {
  ColumnType,
  ModelKanbanFormType,
  TaskType,
} from "@/types/kanban.type";
import { create } from "zustand";

interface IKanbanStore<T = unknown> {
  datas: T[];
  create: (data: T) => void;
  updateById: (id: string, data: Partial<T>) => void;
  deleteById: (id: string) => void;
  getById: (id: string) => T | undefined;
  getAll: () => void;
  setDatas: (datas: T[]) => void;
}

export const useColumnStore = create<IKanbanStore<ColumnType>>()(
  (set, get) => ({
    datas: [],
    create: (data) => {
      const newData: ColumnType = {
        ...data,
        _id: Date.now().toString(),
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      };
      set({ datas: [...get().datas, newData] });
    },
    updateById: (id, data) => {
      set({
        datas: get().datas.map((item) =>
          item._id === id ? { ...item, ...data } : item
        ),
      });
    },
    deleteById: (id) => {
      set({
        datas: get().datas.filter((item) => item._id !== id),
      });
    },
    getById: (id) => {
      return get().datas.find((item) => item._id === id);
    },
    getAll: async () => {
      const getDataLocal = localStorage.getItem("kanban-column");
      if (getDataLocal) {
        set({
          datas: JSON.parse(getDataLocal) as ColumnType[],
        });
      }
    },
    setDatas: (datas) => {
      set({ datas: datas });
    },
  })
);

export const useTaskStore = create<IKanbanStore<TaskType>>()((set, get) => ({
  datas: [],
  create: (data) => {
    const newData: TaskType = {
      ...data,
      _id: Date.now().toString(),
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };
    set({ datas: [...get().datas, newData] });
  },
  updateById: (id, data) => {
    set({
      datas: get().datas.map((item) =>
        item._id === id ? { ...item, ...data } : item
      ),
    });
  },
  deleteById: (id) => {
    set({
      datas: get().datas.filter((item) => item._id !== id),
    });
  },
  getById: (id) => {
    return get().datas.find((item) => item._id === id);
  },
  getAll: async () => {
    const getDataLocal = localStorage.getItem("kanban-task");
    if (getDataLocal) {
      set({
        datas: JSON.parse(getDataLocal) as TaskType[],
      });
    }
  },
  setDatas: (datas) => {
    set({ datas: datas });
  },
}));

// form
export const useModelKanbanForm = create<ModelKanbanFormType>()((set) => ({
  open: false,
  type: null,
  data: null,
  isUpdate: false,
  columnId: null,
  onClose: () => {
    set({
      open: false,
      type: null,
      data: null,
      isUpdate: false,
      columnId: null,
    });
  },
  onOpen: (type, columnId) => {
    set({ open: true, type: type, columnId: columnId });
  },
  updateData: (data) => {
    set({ data, isUpdate: true });
  },
}));
