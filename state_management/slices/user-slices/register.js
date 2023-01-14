import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser } from "../../../fetching/userFetching";
//===============================================
const initialState = {
  user: {},
  isLoading: false,
  successMsg: null,
  errMsg: null,
};

//-----------------------------------------------
export const fechRegister = createAsyncThunk(
  "register/api",
  async (userInfo) => {
    const response = await registerUser(userInfo);

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
      state.successMsg = action.payload.data.message;
      state.errMsg = null;
      localStorage.setItem("token", action.payload.data.data.token);
    },
    [fechRegister.rejected]: (state) => {
      state.isLoading = false;
      state.errMsg = "ایمیل قبلا ثبت شده است";
    },
  },
});

export default registerSlice.reducer;
