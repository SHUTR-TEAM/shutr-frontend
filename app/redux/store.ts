import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./features/chat";
import portfolioReducer from "./features/portfolio";
import searchReducer from "./features/searchSlice";
import bookingReducer from "./features/booking";
import { apiSlice } from './features/auth/apiSlice';
import authReducer from './features/auth/authSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authReducer,
      chat: chatReducer,
      portfolio: portfolioReducer,
      search: searchReducer,
      booking: bookingReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
