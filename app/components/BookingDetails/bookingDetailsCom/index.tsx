"use client";
import { FC } from "react";
import styles from "./index.module.css";

// Define Booking Type
interface Booking {
  event: {
    type: string;
    date: string;
    address: string;
  };
  package_id?: string;
  payment: {
    total_amount: number;
  };
}

const BookingDetailsCom: FC<{ booking: Booking }> = ({ booking }) => {
  if (!booking || !booking.event) {
    return <p>No booking details available.</p>;
  }

  // Destructure event details from the booking object
  const { type, date, address } = booking.event;
  const packageType = booking.package_id || "N/A";
  // const price = `$${booking.payment?.total_amount.toFixed(2)}`;
  const price = "100000 LKR";

  return (
    <div className={styles.bookingDetails}>
      {/*Display the event details */}
      <div className={styles.topic}>
        <h2>Booking Details</h2>
      </div>
      <div className={styles.row}>
        <div className={styles.name}>Event Type</div>
        <div className={styles.data}>{type}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.name}>Date</div>
        <div className={styles.data}>{date}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.name}>Location</div>
        <div className={styles.data}>{address}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.name}>Package</div>
        <div className={styles.data}>{packageType}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.name}>Price</div>
        <div className={styles.data}>{price}</div>
      </div>
    </div>
  );
};

export default BookingDetailsCom;
