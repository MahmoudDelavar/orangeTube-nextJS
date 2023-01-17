import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isLoggined } from "../../../fetching/userFetching";
//==============================================================

const initialState = {
  userInfo: {},
  isLoading: false,
  isLoggined: false,
  message: null,
};

//------------------------------------------------
export const fechMe = createAsyncThunk("user/fech", async ({ token }) => {
  const response = await isLoggined(token);
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
      state.isLoggined = true;
    },
    [fechMe.pending]: (state) => {
      state.isLoading = true;
      state.isLoggined = false;
    },
    [fechMe.rejected]: (state, action) => {
      state.isLoading = false;
      state.message = "not Loggined";
      state.isLoggined = false;
    },
  },
});

export default userSlice.reducer;
