import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "@/lib/features/project/projectsSlice";
import teamsReducer from "@/lib/features/teams/teamsSlicer";

export const makeStore = () => {
  return configureStore({
    reducer: {
      projects: projectsReducer,
      teams: teamsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
