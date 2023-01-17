import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../../fetching/userFetching";
//===============================================
const initialState = {
  user: {},
  isLoading: false,
  successMsg: null,
  errMsg: null,
};

//-----------------------------------------------
export const fechLogin = createAsyncThunk("login/api", async (userInfo) => {
  const response = await loginUser(userInfo);
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
      localStorage.setItem("userID", action.payload.data.data.user._id);
    },
    [fechLogin.rejected]: (state) => {
      state.isLoading = false;
      state.errMsg = "ایمیل یا پسورد صحیح نیست";
    },
  },
});

export default loginSlice.reducer;
