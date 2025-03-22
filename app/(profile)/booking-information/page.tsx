"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBookings } from "@/app/redux/features/bookingInformation";
import { RootState, AppDispatch } from "@/app/redux/store";
import styles from "./page.module.css";
import CartSection from "@/app/components/BookingDetails/CartSection";
import ErrorSection from "@/app/components/BookingDetails/errorComponent";
import LoadingSection from "@/app/components/BookingDetails/loadingComponent";

const BookingDetails = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Select booking-related state from Redux store
  const { bookings, loading, error } = useSelector(
    (state: RootState) => state.bookingInformation
  );

  const user = useSelector((state: RootState) => state.auth.user);

  // Fetch all bookings when the component mounts if the list is empty
  useEffect(() => {
    if (bookings.length === 0) {
      dispatch(fetchAllBookings({ photographerId: user?.id }));
    }
  }, [dispatch, bookings.length, user]);

  return (
    <div className={styles.container}>
      {loading ? (
        <LoadingSection />
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : bookings.length === 0 ? (
        <ErrorSection />
      ) : (
        <CartSection />
      )}
    </div>
  );
};

export default BookingDetails;
