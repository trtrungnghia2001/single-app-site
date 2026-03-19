import { MOCK_TASKS } from "@/constants/index.constant";
import { TaskType } from "@/type/task.type";
import { v4 } from "uuid";

interface Action {
  type: "ADD" | "REMOVE" | "EDIT" | "ADD_MOCK_DATA";
  payload?: TaskType;
}
// MOCK_TASKS
export const initialState: TaskType[] =
  JSON.parse(localStorage.getItem("todos") || "[]") || [];

const reducer = (state = initialState, action: Action): TaskType[] => {
  switch (action.type) {
    case "ADD_MOCK_DATA": {
      return [...MOCK_TASKS, ...state];
    }

    case "ADD": {
      if (!action.payload) return state;
      const newTask: TaskType = {
        ...action.payload,
        _id: v4(),
      };
      return [newTask, ...state];
    }

    case "EDIT": {
      if (!action.payload) return state;

      return state.map((item) =>
        item._id === action.payload?._id
          ? { ...item, ...action.payload }
          : item,
      );
    }

    case "REMOVE": {
      if (!action.payload) return state;

      return state.filter((item) => item._id !== action.payload?._id);
    }

    default:
      return [];
  }
};

export default reducer;
