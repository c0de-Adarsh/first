import { createSlice } from "@reduxjs/toolkit";

const driversSlice = createSlice({
  name: "drivers",
  initialState: {
    loading: false,
    drivers: [],
    error: null,
    message: null,
  },
  reducers: {
    getDriversRequest: (state) => {
      state.loading = true;
    },
    getDriversSuccess: (state, action) => {
      state.loading = false;
      state.drivers = action.payload;
    },
    getDriversFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessages: (state) => {
      state.message = null;
    },
  },
});

export const {
  getDriversRequest,
  getDriversSuccess,
  getDriversFail,
  clearErrors,
  clearMessages,
} = driversSlice.actions;

export default driversSlice.reducer;
