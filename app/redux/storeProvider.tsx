"use client";
import { useRef } from "react";

//Provider → Comes from react-redux; it wraps the entire app and provides access to the Redux store.
import { Provider } from "react-redux";

//makeStore() → A function that creates the Redux store.
import { AppStore, makeStore } from "./store";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();

    /*  Checks if storeRef.current exists:
        If not created yet, it calls makeStore() to create the Redux store.
        If already created, it keeps using the existing store.
        This ensures that the Redux store is created only once per page load.   */
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  /*Wraps children (all app components) inside the Provider.
    This allows any component in the app to access Redux state.*/
  return <Provider store={storeRef.current}>{children}</Provider>;
}
