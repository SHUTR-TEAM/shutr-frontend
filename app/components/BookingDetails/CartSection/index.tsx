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

  // Get booking data from Redux store
  const bookings = useSelector(
    (state: RootState) => state.bookingInformation.bookings
  );

  // Map event types to corresponding images
  const eventImages: { [key: string]: string } = {
    Wedding: "/wedding.jpg",
    "Birthday Party": "/Birthday.jpg",
    Corporate: "/images/corporate.jpg",
    Concert: "/festival.jpg",
    Sports: "/sports.jpg",
    Engagement: "/images/engagement.jpg",
    Other: "/event.jpg",
  };

  // Handle click event to navigate to booking details page
  const handleClick = (id: string) => {
    if (!id) {
      console.error("Booking ID is undefined!");
      return;
    }
    dispatch(fetchBookingDetails(id));
    router.push(`/booking-information/${id}`);
  };

  return (
    <div className={styles.cardsContainer}>
      {/* Iterate over the list of bookings */}
      {bookings.map((item) => {
        // Extract event type, use "Other" if not provided
        const eventType = item.event.type || "Other";
        // Get the corresponding image for the event type, default to "Other" image if not found
        const imageSrc = eventImages[eventType] || eventImages["Other"];

        return (
          <div
            key={item.id}
            className={styles.cardContainer}
            onClick={() => handleClick(item.id)}
          >
            {/*Image*/}
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
                <IoLocationSharp className={styles.icons} />{" "}
                {item.event.address}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartSection;
