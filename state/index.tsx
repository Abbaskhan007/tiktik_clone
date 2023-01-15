import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("--- login action---", action.payload);
      localStorage.setItem("tiktik-user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
      localStorage.removeItem("tiktik-user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
