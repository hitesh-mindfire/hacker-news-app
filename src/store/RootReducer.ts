import { UnknownAction, combineSlices } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistedNewsReducer } from "./slices/NewsSlice";
import userReducer from "./slices/UserSlice";
export const RESET_STATE = "RESET_STATE";

/**
 * Combine all the reducers
 */
export const rootReducer = combineSlices({
  news: persistedNewsReducer,
  user: userReducer,
});
