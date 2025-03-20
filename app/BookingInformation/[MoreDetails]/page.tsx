"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { fetchBookingDetails } from "@/app/redux/features/bookingInformation";
import styles from "./page.module.css";
import ClientInformation from "@/app/components/BookingDetails/clientInformation";
import BookingDetailsCom from "@/app/components/BookingDetails/bookingDetailsCom";
import EventTimeline from "@/app/components/BookingDetails/eventTimeline";
import { FaArrowLeft } from "react-icons/fa";

const MoreDetails = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { selectedBooking, loading, error } = useSelector((state: RootState) => state.booking);
    const [bookingId, setBookingId] = useState<string | null>(null);
    
    useEffect(() => {
        const pathParts = window.location.pathname.split("/");    
        const idFromUrl = pathParts[pathParts.length - 1];
       
        if (idFromUrl !== "undefined") {
            setBookingId(idFromUrl);
        }
    }, []);
    
    useEffect(() => {
        if (bookingId && !selectedBooking) {
            dispatch(fetchBookingDetails(bookingId));
        }
    }, [bookingId, selectedBooking, dispatch]);
    
    
    // Handle loading state
    if (loading) return <p>Loading booking details...</p>;

    // Handle errors or missing booking
    if (!selectedBooking || error) {
        return (
            <div className={styles.noBooking}>
                <p>{error || "No booking details found!"}</p>
            </div>
        );
    }

    return (
        <div className={styles.cover}>
            <div className={styles.topic}>
                <div className={styles.backBtn}>
                    <FaArrowLeft className={styles.arrow}  onClick={() => router.push('/BookingInformation')}/>
                </div> 
                <div className={styles.word}>Booking Details</div>
            </div>

            <div className={styles.mainContainer}>
                <div className={styles.left}>
                    <ClientInformation booking={selectedBooking} />
                    <BookingDetailsCom booking={selectedBooking} />
                </div>
                <div className={styles.right}>
                    <EventTimeline booking={selectedBooking} />
                </div>
            </div>

            <div className={styles.btnContainer}>
                <button className={styles.btn1}>Mark as Completed</button>
                <button className={styles.btn2}>Message Client</button>
            </div>
        </div>
    );
};

export default MoreDetails;
