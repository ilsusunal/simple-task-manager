import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  title: string;
  status: "open" | "in-progress" | "review" | "done";
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [
    { id: "1", title: "Task 1", status: "open" },
    { id: "2", title: "Task 2", status: "in-progress" },
  ],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ title: string }>) => {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        status: "open",
      };
      state.tasks.push(newTask);
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<{ id: string; status: Task["status"] }>
    ) => {
      const { id, status } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        task.status = status;
      }
    },
  },
});

export const { addTask, updateTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
