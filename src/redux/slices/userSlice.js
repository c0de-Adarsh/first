import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: null,
    error: null,
    message: null,
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.message = "Sign out successfully!";
      },
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessages: (state) => {
      state.message = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFail, clearErrors, clearMessages,logoutSuccess } = userSlice.actions;
export default userSlice.reducer;
