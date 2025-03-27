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
      // Ensure drivers is always an array
      state.drivers = Array.isArray(action.payload) 
        ? action.payload 
        : action.payload 
          ? [action.payload] 
          : [];
    },
 
    getDriversFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.drivers = []; 
    },
     
     getDriverDetailsRequest: (state) => {
      state.loading = true;
      state.selectedDriverDetails = null;
      state.error = null;
  },
  getDriverDetailsSuccess: (state, action) => {
      state.loading = false;
      state.selectedDriverDetails = action.payload;
      state.error = null;
  },
  getDriverDetailsFail: (state, action) => {
      state.loading = false;
      state.selectedDriverDetails = null;
      state.error = action.payload;
  },
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessages: (state) => {
      state.message = null;
    },
    verifyDriverSuccess: (state, action) => {
      const verifiedDriverId = action.payload;
      const driverIndex = state.drivers.findIndex(
          driver => driver.id === verifiedDriverId || driver._id === verifiedDriverId
      );
      
      if (driverIndex !== -1) {
          state.drivers[driverIndex].status = 'VERIFIED';
      }
  },
  },
});

export const {
  getDriversRequest,
  getDriversSuccess,
  getDriversFail,
  clearErrors,
  clearMessages,
  getDriverDetailsRequest,
  getDriverDetailsSuccess,
  getDriverDetailsFail
} = driversSlice.actions;

export default driversSlice.reducer;