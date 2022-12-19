import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { dev_phase } from "../../../next.config";
//===============================================
const initialState = {
  user: {},
  isLoading: false,
  message: null,
  err: null,
};

//-----------------------------------------------
export const fechRegister = createAsyncThunk(
  "register/api",
  async (userInfo) => {
    let url = `${dev_phase.fechUrl}/api/auth/register`;
    const response = await axios.post(url, userInfo);

    setTimeout(() => {
      window.location = "/";
    }, 2000);

    return response;
  }
);

//-----------------------------------------------
const registerSlice = createSlice({
  name: "register",
  initialState,
  extraReducers: {
    [fechRegister.pending]: (state) => {
      state.isLoading = true;
    },
    [fechRegister.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data.data.user;
      state.message = action.payload.data.message;
      state.err = null;
      localStorage.setItem("token", action.payload.data.data.token);
    },
    [fechRegister.rejected]: (state) => {
      state.isLoading = false;
      state.err = "ایمیل قبلا ثبت شده است";
    },
  },
});

export default registerSlice.reducer;
