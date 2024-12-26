import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserDetails } from "../actions/UserActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import { UserDetails, UserState } from "src/types/ProfileTypes";

const initialState: UserState = {
  userDetails: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.userDetails = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserDetails.fulfilled,
        (state, action: PayloadAction<UserDetails>) => {
          state.loading = false;
          state.userDetails = action.payload;
        }
      )
      .addCase(
        fetchUserDetails.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Error fetching user details";
        }
      );
  },
});

const persistConfig = {
  key: "user",
  storage: AsyncStorage,
  whitelist: ["userDetails"],
};
export const { clearUser } = userSlice.actions;
export const persistedUserReducer = persistReducer(
  persistConfig,
  userSlice.reducer
);
