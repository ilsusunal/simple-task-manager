import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ProjectData, Task } from "@/types/kanban";

interface ProjectsState {
  data: ProjectData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProjectsState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchAllProjects = createAsyncThunk(
  "projects/fetchAllProjects",
  async () => {
    const endpoint = process.env.NEXT_PUBLIC_PROJECTS_ENDPOINT;
    const response = await axios.get<ProjectData[]>(endpoint || "");
    return response.data;
  }
);

export const saveProjectToMockAPI = createAsyncThunk<
  ProjectData,
  string // projectId
>("projects/saveProject", async (projectId, { getState }) => {
  const state = getState() as { projects: ProjectsState };
  const projectData = state.projects.data.find(
    (p) => p.project.id === projectId
  );
  if (!projectData) {
    throw new Error(`Project with id ${projectId} not found in store`);
  }

  const putEndpoint = `${process.env.NEXT_PUBLIC_PROJECTS_ENDPOINT}/${projectId}`;
  const response = await axios.put<ProjectData>(putEndpoint, projectData);
  return response.data;
});

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    updateTaskStatusInProject: (
      state,
      action: PayloadAction<{
        projectId: string;
        taskId: string;
        status: Task["status"];
      }>
    ) => {
      const { projectId, taskId, status } = action.payload;
      const project = state.data.find((p) => p.project.id === projectId);
      if (!project) return;

      const task = project.tasks.find((t) => t.id === taskId);
      if (!task) return;

      task.status = status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        console.log("state.data : ", state.data);
      })
      .addCase(fetchAllProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch projects";
      })
      .addCase(saveProjectToMockAPI.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.data.findIndex(
          (p) => p.project.id === updated.project.id
        );
        if (index !== -1) {
          state.data[index] = updated;
        }
      })
      .addCase(saveProjectToMockAPI.rejected, (state, action) => {
        console.error("Failed to save project to MockAPI:", action.error);
      });
  },
});

export const { updateTaskStatusInProject } = projectsSlice.actions;
export default projectsSlice.reducer;
