import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { dev_phase } from "../../../next.config";

//==============================================================

//----------------- initial data-----------------

const initialState = {
  userInfo: {},
  isLoading: false,
  message: null,
};

const baseUrl = dev_phase.fechUrl;

//------------------------------------------------
export const fechMe = createAsyncThunk("user/fech", async ({ token }) => {
  let url = `${baseUrl}/api/auth/me`;
  const response = await axios.post(url, { token });

  return response;
});

//------------------------------------------------
const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [fechMe.fulfilled]: (state, action) => {
      state.userInfo = action.payload.data.data.userInfo;
      state.isLoading = false;
      state.message = action.payload.data.message;
    },
    [fechMe.pending]: (state) => {
      state.isLoading = true;
    },
    [fechMe.rejected]: (state, action) => {
      state.isLoading = false;
      state.message = "not Loggined";
    },
  },
});

export default userSlice.reducer;
