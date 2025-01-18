import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "@/lib/features/tasks/tasksSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      tasks: tasksReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
