import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCourses } from "../../api/courseAPIs";

export const getAllCoursesAPI = createAsyncThunk(
  "getCourses",
  async (infoGetData) => {
    const { page, searchValue, size, home, categories } = infoGetData;
    const data = await getAllCourses(page, searchValue, size, home, categories);
    return data;
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: [],
    totalPages: 1,
    size: 1,
    current: 1,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoursesAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCoursesAPI.fulfilled, (state, action) => {
        state.courses = action.payload?.content;
        state.totalPages = action.payload?.totalPages;
        state.current = action.payload?.number;
        state.loading = false;
      })
      .addCase(getAllCoursesAPI.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default courseSlice.reducer;
