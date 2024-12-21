import { UnknownAction, combineSlices } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistedNewsReducer } from "./slices/NewsSlice";
export const RESET_STATE = "RESET_STATE";

export const resetState = () => {
  return {
    type: RESET_STATE,
  };
};

/**
 * Combine all the reducers
 */
const appReducer = combineSlices({
  news: persistedNewsReducer,
});

/**
 * Return root reduces
 * Provides method to reset redux state
 * @param state
 * @param action
 */
export const rootReducer = (state: any, action: UnknownAction) => {
  if (action.type === RESET_STATE) {
    AsyncStorage.multiRemove(["persist:auth"]);
  }
  return appReducer(state, action);
};
