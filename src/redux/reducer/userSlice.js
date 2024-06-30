import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "../../api/userAPIs";

export const getUsersThunk = createAsyncThunk("getUsers", async (search) => {
  const response = await getAllUsers(search);
  return response.data;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    totalPages: 1,
    size: 1,
    current: 1,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsersThunk.fulfilled, (state, action) => {
        state.users = action.payload.content;
        state.loading = false;
      })
      .addCase(getUsersThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
