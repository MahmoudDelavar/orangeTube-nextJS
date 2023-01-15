import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isLoggined } from "../../../fetching/userFetching";
//==============================================================

const initialState = {
  userInfo: {},
  isLoading: false,
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
