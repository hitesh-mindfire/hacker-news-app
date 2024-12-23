import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import { fetchNewNewsIds, fetchPastNewsIds } from "../actions/NewsActions";
import { createSlice } from "@reduxjs/toolkit";
import { NewsState } from "src/types/NewsTypes";

const initialState: NewsState = {
  newNewsIds: [],
  pastNewsIds: [],
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewNewsIds.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewNewsIds.fulfilled, (state, action) => {
        state.loading = false;
        state.newNewsIds = action.payload;
      })
      .addCase(fetchNewNewsIds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch new story IDs";
      })
      .addCase(fetchPastNewsIds.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPastNewsIds.fulfilled, (state, action) => {
        state.loading = false;
        state.pastNewsIds = action.payload;
      })
      .addCase(fetchPastNewsIds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch past story IDs";
      });
  },
});

const persistConfig = {
  key: "stories",
  storage: AsyncStorage,
  whitelist: ["newNewsIds", "pastNewsIds"],
};

export const persistedNewsReducer = persistReducer(
  persistConfig,
  newsSlice.reducer
);
