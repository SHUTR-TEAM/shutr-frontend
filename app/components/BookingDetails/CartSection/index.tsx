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
            {bookings.map((item) => (
                
                <div key={item.id} className={styles.cardContainer} onClick={() => handleClick(item.id)}>
                    {/* Placeholder image as MongoDB data doesn't include pictures */}
                    
                    <div className={styles.image}>
                        <Image
                            src="/images/default_booking.jpg" // Use a default placeholder image
                            alt={`${item.client.first_name} ${item.client.last_name}'s Booking`}
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
            ))}
        </div>
    );
};

export default CartSection;
