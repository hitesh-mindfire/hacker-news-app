import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export const selectedUser = (state: any) => state.user.user;
export const IsAuthenticated = (state: RootState) => state.user.isAuthenticated;

export default userSlice.reducer;
