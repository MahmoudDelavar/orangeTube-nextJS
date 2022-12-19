import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { dev_phase } from "../../../next.config";
//===============================================
const initialState = {
  user: {},
  isLoading: false,
  successMsg: null,
  errMsg: null,
};
//-----------------------------------------------

export const fechLogin = createAsyncThunk("login/api", async (userInfo) => {
  let url = `${dev_phase.fechUrl}/api/auth/login`;
  const response = await axios.post(url, userInfo);

  setTimeout(() => {
    window.location = "/";
  }, 2000);

  return response;
});
//-----------------------------------------------
const loginSlice = createSlice({
  name: "login",
  initialState,
  extraReducers: {
    [fechLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [fechLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data.data.user;
      state.successMsg = action.payload.data.message;
      state.errMsg = null;
      localStorage.setItem("token", action.payload.data.data.token);
    },
    [fechLogin.rejected]: (state) => {
      state.isLoading = false;
      state.errMsg = "ایمیل یا پسورد صحیح نیست";
    },
  },
});

export default loginSlice.reducer;
