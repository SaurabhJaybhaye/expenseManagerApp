import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../slices/accountSlice";
import loaderReducer from "../slices/loaderSlice";
export const store = configureStore({
  reducer: {
    accounts: accountReducer,
    loader: loaderReducer,
  },
});
