import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import countriesReducer from "./countriesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    countries: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
