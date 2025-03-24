"use client";

import { useRetrieveUserQuery } from "@/app/redux/features/auth/authApiSlice";
import {
  finishInitialLoad,
  setAuth,
  setError,
  setUser,
} from "@/app/redux/features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useInitializeAuth = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useRetrieveUserQuery();

  useEffect(() => {
    console.log("--------------------------------");
    if (data) {
      dispatch(setUser({ user: data }));
      dispatch(setAuth());
    }

    if (!isLoading) {
      dispatch(finishInitialLoad());
    }

    if (error) {
      dispatch(setError(error || "Failed to retrieve user"));
    }
  }, [data, isLoading, error, dispatch]);

  return { isLoading };
};
