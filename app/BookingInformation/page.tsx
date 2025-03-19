'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBookings } from '@/app/redux/features/bookingInformation';
import { RootState, AppDispatch } from '@/app/redux/store';
import styles from './page.module.css';
import SearchBar from "@/app/components/BookingDetails/SearchBar";
import CartSection from "@/app/components/BookingDetails/CartSection";

const BookingDetails = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { bookings, loading, error } = useSelector((state: RootState) => state.booking);

    useEffect(() => {
        dispatch(fetchAllBookings()); 
    }, [dispatch]);

    if (loading) return <p>Loading bookings...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <SearchBar />
            <CartSection />
        </div>
    );
};

export default BookingDetails;
