import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./slices/userSlice";
import driverReducer from './slices/driverSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    drivers: driverReducer
  },
  
});
