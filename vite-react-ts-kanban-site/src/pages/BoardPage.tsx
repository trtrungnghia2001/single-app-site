import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragMoveEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useCallback, useEffect, useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  useColumnStore,
  useModelKanbanForm,
  useTaskStore,
} from "@/stores/kanban.store";
import { SortableItem } from "@/components/SortableItem";
import ColumnCard from "@/components/ColumnCard";
import type { ColumnType, TaskType } from "@/types/kanban.type";
import TaskCard from "@/components/TaskCard";

type ActiveItem = { type: string; id: string; data: unknown };

const BoardIdPage = () => {
  const {
    datas: columns,
    setDatas: setColumns,
    getAll: getAllColumn,
  } = useColumnStore();
  const {
    datas: tasks,
    setDatas: setTasks,
    getAll: getAllTask,
  } = useTaskStore();

  useEffect(() => {
    getAllColumn();
    getAllTask();
  }, []);

  // from
  const { onOpen } = useModelKanbanForm();

  // dnd
  const [activeItem, setActiveItem] = useState<ActiveItem | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveItem(event.active.data.current as ActiveItem);
  };

  const handleDragMove = useCallback(
    (event: DragMoveEvent) => {
      const { active, over } = event;
      if (!active || !over || active.id === over.id) return;

      // column x column
      if (
        active.data.current?.type === "column" &&
        over?.data.current?.type === "column"
      ) {
        const activeIndex = columns.findIndex((item) => item._id === active.id);
        const overIndex = columns.findIndex((item) => item._id === over.id);
        const newColumns = arrayMove(columns, activeIndex, overIndex);
        setColumns(newColumns);
        return;
      }

      // column x task
      if (
        active.data.current?.type === "column" &&
        over?.data.current?.type === "task"
      ) {
        const taskOver = tasks.find((item) => item._id === over.id);
        if (!taskOver) return;
        const activeIndex = columns.findIndex((item) => item._id === active.id);

        const overIndex = columns.findIndex(
          (item) => item._id === taskOver?.column
        );

        const newColumns = arrayMove(columns, activeIndex, overIndex);
        setColumns(newColumns);
        return;
      }

      // task x task
      if (
        active.data.current?.type === "task" &&
        over?.data.current?.type === "task"
      ) {
        // same column

        const activeIndex = tasks.findIndex((item) => item._id === active.id);
        const overIndex = tasks.findIndex((item) => item._id === over.id);
        if (
          active.data.current?.data.column._id ===
          over.data.current?.data.column._id
        ) {
          const newTasks = arrayMove(tasks, activeIndex, overIndex);
          setTasks(newTasks);
        }
        // different column
        if (
          active.data.current?.data.column._id !==
          over.data.current?.data.column._id
        ) {
          const newTask = {
            ...active.data.current?.data,
            column: over.id,
          } as TaskType;
          const newTasks = tasks.map((item) =>
            item._id === newTask._id ? newTask : item
          );
          setTasks(newTasks);
        }
      }

      // task x column
      if (
        active.data.current?.type === "task" &&
        over?.data.current?.type === "column"
      ) {
        const newTask = {
          ...active.data.current?.data,
          column: over.id,
        } as TaskType;
        const newTasks = tasks.map((item) =>
          item._id === newTask._id ? newTask : item
        );
        setTasks(newTasks);
      }
    },
    [tasks, columns]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveItem(null);
      const { active, over } = event;

      if (!active || !over) return;

      localStorage.setItem("kanban-column", JSON.stringify(columns));
      localStorage.setItem("kanban-task", JSON.stringify(tasks));
    },
    [columns, tasks]
  );

  return (
    <div className="overflow-x-auto h-screen w-screen p-3 bg-blue-200">
      <div className="flex items-start gap-3">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={columns.map((item) => item._id) as string[]}
            strategy={verticalListSortingStrategy}
          >
            {columns.map((column) => {
              return (
                <SortableItem
                  key={column._id}
                  id={column._id as string}
                  data={column as ColumnType}
                  type="column"
                >
                  <ColumnCard
                    key={column._id}
                    column={column as ColumnType}
                    tasks={tasks.filter((task) => task.column === column._id)}
                  />
                </SortableItem>
              );
            })}
          </SortableContext>
          {activeItem && (
            <DragOverlay>
              {activeItem.type === "column" && (
                <ColumnCard
                  column={activeItem.data as ColumnType}
                  tasks={
                    tasks.filter(
                      (task) =>
                        task.column === (activeItem.data as ColumnType)._id
                    ) as TaskType[]
                  }
                />
              )}
              {activeItem.type === "task" && (
                <TaskCard task={activeItem.data as TaskType} />
              )}
            </DragOverlay>
          )}
        </DndContext>
        <Button
          className="min-w-64 max-w-64"
          block
          onClick={() => onOpen("column")}
        >
          <PlusOutlined />
          Add Column
        </Button>
      </div>
    </div>
  );
};

export default BoardIdPage;
