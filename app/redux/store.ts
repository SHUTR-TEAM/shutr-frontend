import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./features/chat";
import portfolioReducer from "./features/portfolio"
import searchReducer from "./features/searchSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      chat: chatReducer,
      portfolio : portfolioReducer,
      search: searchReducer
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
