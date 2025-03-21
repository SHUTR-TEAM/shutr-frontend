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
import LoadingSection from "@/app/components/BookingDetails/loadingComponent";
import ErrorSection from "@/app/components/BookingDetails/errorComponent";

const MoreDetails = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    // Extract relevant data from Redux store
    const { selectedBooking, loading, error } = useSelector((state: RootState) => state.booking);

    // State to store the booking ID extracted from the URL
    const [bookingId, setBookingId] = useState<string | null>(null);
    
    // Extract booking ID from the URL when the component mounts
    useEffect(() => {
        // Get the parts of the URL path
        const pathParts = window.location.pathname.split("/");    
        const idFromUrl = pathParts[pathParts.length - 1];
       
        if (idFromUrl !== "undefined") {
            setBookingId(idFromUrl);
        }
    }, []);
    
    // Fetch booking details when booking ID is available and not already selected
    useEffect(() => {
        if (bookingId && !selectedBooking) {
            dispatch(fetchBookingDetails(bookingId));
        }
    }, [bookingId, selectedBooking, dispatch]);
    
    
    if (loading) return <LoadingSection/>;

    if (!selectedBooking || error) {
        return (
            <ErrorSection/>
        );
    }

    return (
        <div className={styles.cover}>
            <div className={styles.topic}>
                 {/* Back button to navigate to the Booking Information page */}
                <div className={styles.backBtn}>
                    <FaArrowLeft className={styles.arrow}  onClick={() => router.push('/BookingInformation')}/>
                </div> 
                <div className={styles.word}>Booking Details</div>
            </div>

            <div className={styles.mainContainer}>
                {/*passing the selected booking */}
                <div className={styles.left}>
                    <ClientInformation booking={selectedBooking} />
                    <BookingDetailsCom booking={selectedBooking} />
                </div>
                <div className={styles.right}>
                    <EventTimeline booking={{ ...selectedBooking, additional_notes: selectedBooking.additional_notes || "" }} />
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
