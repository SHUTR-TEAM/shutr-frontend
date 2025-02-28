// components/BookingDetails.tsx
import { FC } from 'react';
import styles from './index.module.css';

interface BookingDetailsProps {
  eventType: string;
  dateTime: string;
  duration: string;
  location: string;
  packageType: string;
  price: string;
}

const BookingDetailsCom: FC<BookingDetailsProps> = ({ eventType, dateTime, duration, location, packageType, price }) => {
  return (
    <>
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
    </>
  );
};

export default BookingDetailsCom;