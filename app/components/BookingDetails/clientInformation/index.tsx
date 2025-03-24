'use client';
import { FC } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineMailOutline } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import styles from './index.module.css';

// Define the Booking interface to ensure type safety
interface Booking {
  client: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
}

const ClientInformation: FC<{ booking: Booking }> = ({ booking }) => {
  if (!booking || !booking.client) {
    return <p>No client information available.</p>;
  }

  // Destructure client details from the booking object
  const { first_name, last_name, email, phone } = booking.client;

  return (
    <div className={styles.clientInfo}>
      <div className={styles.topic}>
        <h2>Client Information</h2>
      </div>
      <div className={styles.userDetails}>
        <p><FaRegUser className={styles.icon} /> {first_name} {last_name}</p>
        <p><MdOutlineMailOutline className={styles.icon} /> {email}</p>
        <p><IoCallOutline className={styles.icon} /> {phone}</p>
      </div>
    </div>
  );
};

export default ClientInformation;
