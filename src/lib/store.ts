import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "@/lib/features/tasks/tasksSlice";
import projectsReducer from "@/lib/features/project/projectsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      tasks: tasksReducer,
      projects: projectsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
