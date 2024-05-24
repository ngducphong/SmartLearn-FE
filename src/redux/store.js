import { configureStore } from "@reduxjs/toolkit";
import courseSlice from "./reducer/courseSlice";
import chapterSlice from "./reducer/chapterSlice";
import lessonSlice from "./reducer/lessonSlice";
import userSlice from "./reducer/userSlice";

const store = configureStore({
  reducer: {
    courseSlice: courseSlice,
    chapterSlice: chapterSlice,
    lessonSlice: lessonSlice,
    userSlice: userSlice,
  },
});
export default store;
