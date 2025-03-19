'use client';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineMailOutline } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import styles from './index.module.css';

const ClientInformation: FC = () => {
  const selectedBooking = useSelector((state: RootState) => state.booking.selectedBooking);

  if (!selectedBooking || !selectedBooking.client) {
    return <p>No client information available.</p>;
  }

  const { name, email, phone } = selectedBooking.client;

  return (
    <div className={styles.clientInfo}>
      <div className={styles.topic}>
        <h2>Client Information</h2>
      </div>
      <div className={styles.userDetails}>
        <p><FaRegUser className={styles.icon} /> {name}</p>
        <p><MdOutlineMailOutline className={styles.icon} /> {email}</p>
        <p><IoCallOutline className={styles.icon} /> {phone}</p>
      </div>
    </div>
  );
};

export default ClientInformation;
