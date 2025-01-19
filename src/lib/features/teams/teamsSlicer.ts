import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Team } from "@/types/kanban";

interface TeamsState {
  data: Team[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TeamsState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchAllTeams = createAsyncThunk("teams/fetchAll", async () => {
  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
  const response = await axios.get<Team[]>(`${endpoint}/team` || "");
  return response.data;
});

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTeams.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllTeams.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchAllTeams.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch teams";
      });
  },
});

export default teamsSlice.reducer;
