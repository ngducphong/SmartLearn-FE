import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllLessons } from "../../api/lessonAPIs";

export const getLessonsThunk = createAsyncThunk("getLesson", async () => {
  const data = await getAllLessons();
  return data;
});

const lessonSlice = createSlice({
  name: "lesson",
  initialState: {
    lesson: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLessonsThunk.fulfilled, (state, action) => {
      state.lesson = action.payload;
    });
  },
});

export default lessonSlice.reducer;
