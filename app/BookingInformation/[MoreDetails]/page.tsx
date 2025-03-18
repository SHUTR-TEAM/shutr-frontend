'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { useRouter } from 'next/navigation';
import style from './page.module.css';
import ClientInformation from '@/app/components/BookingDetails/clientInformation';
import BookingDetailsCom from '@/app/components/BookingDetails/bookingDetailsCom';
import EventTimeline from '@/app/components/BookingDetails/eventTimeline';
import { FaArrowLeft } from 'react-icons/fa';

const MoreDetails = () => {
  const router = useRouter();
  const booking = useSelector((state: RootState) => state.booking.selectedBooking);

  if (!booking) {
    return (
      <div className={style.error}>
        <p>No booking details found!</p>
      </div>
    );
  }

  return (
    <>
      <div className={style.cover}>
        <div className={style.topic}>
          <div className={style.backBtn}>
            <FaArrowLeft className={style.arrow} onClick={() => router.push('../BookingInformation')} />
          </div>
          <div className={style.word}>Booking Details</div>
        </div>
        <div className={style.mainContainer}>
          <div className={style.left}>
            <ClientInformation clients={[booking.client]} />
            <BookingDetailsCom
              eventType={booking.details.eventType}
              dateTime={booking.details.dateTime}
              duration={booking.details.duration}
              location={booking.details.location}
              packageType={booking.details.packageType}
              price={booking.details.price}
            />
          </div>
          <div className={style.right}>
            <EventTimeline />
          </div>
        </div>
        <div className={style.btnContainer}>
          <button className={style.btn1}>Mark as Completed</button>
          <button className={style.btn2}>Message Client</button>
        </div>
      </div>
    </>
  );
};

export default MoreDetails;
