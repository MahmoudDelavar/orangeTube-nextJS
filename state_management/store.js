import { configureStore } from "@reduxjs/toolkit";

import registerReducer from "../state_management/slices/user-slices/register";
import loginReducer from "../state_management/slices/user-slices/login";
import userReducer from "./slices/user-slices/isLoggined";
const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    user: userReducer,
  },
});

export default store;
