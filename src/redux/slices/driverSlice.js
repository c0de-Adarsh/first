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
      // Ensure drivers is always an array and has a consistent status
      state.drivers = (Array.isArray(action.payload) 
        ? action.payload 
        : action.payload 
          ? [action.payload] 
          : []).map(driver => ({
            ...driver,
            status: driver.status || 'PENDING' // Ensure status is always set
          }));
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
  deleteDriverSuccess: (state, action) => {
    state.drivers = state.drivers.filter(driver => 
      (driver.id || driver._id) !== action.payload
    );
    state.loading = false;
  },
  updateDriverStatusInStore: (state, action) => {
    const { id, status } = action.payload;
    const driverIndex = state.drivers.findIndex(driver => 
      driver.id === id || driver._id === id
    );
    
    if (driverIndex !== -1) {
      // Create a new array to trigger re-render
      state.drivers = state.drivers.map((driver, index) => 
        index === driverIndex 
          ? { ...driver, status: status } 
          : driver
      );
    }
  }
  },
});

export const {
  getDriversRequest,
  getDriversSuccess,
  getDriversFail,
  deleteDriverSuccess,
  clearErrors,
  verifyDriverSuccess,
  updateDriverStatusInStore,
  clearMessages,
  getDriverDetailsRequest,
  getDriverDetailsSuccess,
  getDriverDetailsFail
} = driversSlice.actions;

export default driversSlice.reducer;