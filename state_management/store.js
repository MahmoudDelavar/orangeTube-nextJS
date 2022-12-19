import { configureStore } from "@reduxjs/toolkit";

import registerReducer from "../state_management/slices/user-slices/register";
import loginReducer from "../state_management/slices/user-slices/login";
const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
  },
});

export default store;
