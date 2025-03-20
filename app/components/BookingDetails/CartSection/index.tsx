"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { fetchBookingDetails } from "@/app/redux/features/bookingInformation";
import { RootState, AppDispatch } from "@/app/redux/store";
import styles from "./index.module.css";
import Image from "next/image";
import { FaClock } from "react-icons/fa";
import { IoMdCamera } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";

const CartSection: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const bookings = useSelector((state: RootState) => state.booking.bookings);

    // Map event types to corresponding images
    const eventImages: { [key: string]: string } = {
        "Wedding": "/wedding.jpg",
        "Birthday": "/birthday.jpg",
        "Corporate": "/images/corporate.jpg",
        "Concert": "/festival.jpg",
        "Sports": "/images/sports.jpg",
        "Engagement": "/images/engagement.jpg",
        "Other": "/event.jpg" // Default image for unknown types
    };

    const handleClick = (id: string) => {
        if (!id) {
            console.error("Booking ID is undefined!");
            return;
        }
        dispatch(fetchBookingDetails(id));
        router.push(`/BookingInformation/${id}`);
    };
    
    return (
        <div className={styles.cardsContainer}>
            {bookings.map((item) => {
                // Determine the appropriate image based on event type
                const eventType = item.event.type || "Other"; // Default to "Other" if type is missing
                const imageSrc = eventImages[eventType] || eventImages["Other"]; // Fallback to default

                return (
                    <div key={item.id} className={styles.cardContainer} onClick={() => handleClick(item.id)}>
                        {/* Display dynamic event image */}
                        <div className={styles.image}>
                            <Image
                                src={imageSrc}
                                alt={`${item.event.type} event`}
                                width={190}
                                height={150}
                            />
                        </div>

                        {/* Status & Date */}
                        <div className={styles.status}>
                            <span>{item.status}</span>
                            <span>
                                <FaClock className={styles.clockIcon} /> {item.event.date}
                            </span>
                        </div>

                        {/* Booking Details */}
                        <div className={styles.details}>
                            <div className={styles.name}>
                                {item.client.first_name} {item.client.last_name}
                            </div>
                            <div className={styles.type}>
                                <IoMdCamera className={styles.icons} /> {item.event.type}
                            </div>
                            <div className={styles.location}>
                                <IoLocationSharp className={styles.icons} /> {item.event.address}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CartSection;
