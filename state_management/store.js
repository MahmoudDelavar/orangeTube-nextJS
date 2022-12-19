import { configureStore } from "@reduxjs/toolkit";

import registerReducer from "../state_management/slices/user-slices/register";
const store = configureStore({
  reducer: {
    register: registerReducer,
  },
});

export default store;
