"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBookings } from "@/app/redux/features/bookingInformation";
import { RootState, AppDispatch } from "@/app/redux/store";
import styles from "./page.module.css";
import SearchBar from "@/app/components/BookingDetails/SearchBar";
import CartSection from "@/app/components/BookingDetails/CartSection";

const BookingDetails = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { bookings, loading, error } = useSelector((state: RootState) => state.booking);

    useEffect(() => {
        if (bookings.length === 0) {
            dispatch(fetchAllBookings());
        }
    }, [dispatch, bookings.length]);

    return (
        <div className={styles.container}>
            <SearchBar />
            {loading ? (
                <p>Loading bookings...</p>
            ) : error ? (
                <p className={styles.error}>{error}</p>
            ) : bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <CartSection />
            )}
        </div>
    );
};

export default BookingDetails;
