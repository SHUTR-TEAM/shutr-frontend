'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setBooking } from '../../../redux/features/bookingInformation';
import styles from './index.module.css';
import Image from 'next/image';
import { FaClock } from 'react-icons/fa';
import { IoMdCamera } from 'react-icons/io';
import { IoLocationSharp } from 'react-icons/io5';

interface CartSectionProps {
  data: {
    picture: string;
    name: string;
    status: string;
    time: string;
    event: string;
    location: string;
    client: { name: string; email: string; phone: string };
    details: {
      eventType: string;
      dateTime: string;
      duration: string;
      location: string;
      packageType: string;
      price: string;
    };
  }[];
}

const CartSection: React.FC<CartSectionProps> = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = (item: CartSectionProps['data'][0], index: number) => {
    dispatch(setBooking(item));
    router.push(`/BookingInformation/${index}`);
  };

  return (
    <div className={styles.cardsContainer}>
      {data.map((item, index) => (
        <div key={index} className={styles.cardContainer} onClick={() => handleClick(item, index)}>
          <div className={styles.image}>
            <Image src={item.picture} alt={item.name} width={190} height={150} />
          </div>
          <div className={styles.status}>
            <span>{item.status}</span>
            <span>
              <FaClock className={styles.clockIcon} />
              {item.time}
            </span>
          </div>
          <div className={styles.details}>
            <div className={styles.name}>{item.name}</div>
            <div className={styles.type}>
              <IoMdCamera className={styles.icons} />
              {item.event}
            </div>
            <div className={styles.location}>
              <IoLocationSharp className={styles.icons} />
              {item.location}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartSection;
