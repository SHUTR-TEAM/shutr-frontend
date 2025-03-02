//sets up the Redux store 

import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features//searchSlice";

export const makeStore = () => {
  return configureStore({
    //object → Defines the reducers that will manage different parts of the state
    //A reducer is a function that determines how the state changes when an action is dispatched.
    reducer: {
      search: searchReducer, // Add search reducer
    },
  });
};

//dispatch is a function in Redux that sends actions to the Redux store. It tells Redux what to do—


//Define Types for TypeScript
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];