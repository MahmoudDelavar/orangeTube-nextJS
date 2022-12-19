import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { dev_phase } from "../../../next.config";

//==============================================================

//----------------- initial data-----------------

const initialState = {
  user: {},
  token: null,
  isLoading: false,
  message: null,
};

const baseUrl = dev_phase.fechUrl;

//------------------------------------------------
export const fechUser = createAsyncThunk("user/fech", async (userInfo) => {
  let url = `${baseUrl}/api/auth/register`;
  const response = await axios.post(url, userInfo);
  const { user, token } = response.data.data;
  console.log(` FechUawer## user:${user} ansd token:${token}`);
  return response;
});

//------------------------------------------------
const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [fechUser.fulfilled]: (state, action) => {
      state.token = action.payload.data.data.token;
      state.user = action.payload.data.data.user;
      state.isLoading = false;
      state.message = action.payload.data.message;
    },
    [fechUser.pending]: (state) => {
      state.isLoading = true;
    },
    [fechUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.data.message;
    },
  },
});

export default userSlice.reducer;
