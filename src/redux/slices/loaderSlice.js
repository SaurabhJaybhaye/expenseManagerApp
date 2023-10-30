// loaderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    loadingCount: 0, // Initialize loadingCount to 0
  },
  reducers: {
    startLoading: (state) => {
      state.loadingCount += 1; // Increment loadingCount
    },
    stopLoading: (state) => {
      state.loadingCount -= 1; // Decrement loadingCount
    },
  },
});

export const { startLoading, stopLoading } = loaderSlice.actions;

export default loaderSlice.reducer;
