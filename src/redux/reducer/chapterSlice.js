import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllChapters } from "../../api/chapterAPIs";

export const getChaptersThunk = createAsyncThunk("getChapters", async (id) => {
  const data = await getAllChapters(id);
  return data;
});

const chapterSlice = createSlice({
  name: "chapter",
  initialState: {
    chapters: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChaptersThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChaptersThunk.fulfilled, (state, action) => {
        state.chapters = action.payload;
        state.loading = false;
      })
      .addCase(getChaptersThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default chapterSlice.reducer;
