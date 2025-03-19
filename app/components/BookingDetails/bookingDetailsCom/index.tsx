'use client';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import styles from './index.module.css';

const BookingDetailsCom: FC = () => {
  const selectedBooking = useSelector((state: RootState) => state.booking.selectedBooking);

  if (!selectedBooking || !selectedBooking.details) {
    return <p>No booking details available.</p>;
  }

  const { eventType, dateTime, duration, location, packageType, price } = selectedBooking.details;

  return (
    <div className={styles.bookingDetails}>
      <div className={styles.topic}>
        <h2>Booking Details</h2>
      </div>
      <div className={styles.row}>
        <div className={styles.name}>Event Type</div>
        <div className={styles.data}>{eventType}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.name}>Date & Time</div>
        <div className={styles.data}>{dateTime}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.name}>Duration</div>
        <div className={styles.data}>{duration}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.name}>Location</div>
        <div className={styles.data}>{location}</div>
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
