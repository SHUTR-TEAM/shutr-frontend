'use client'
import React from "react";
import style from "./page.module.css";
import ClientInformation from "@/app/components/BookingDetails/clientInformation";
import BookingDetailsCom from "@/app/components/BookingDetails/bookingDetailsCom";
import EventTimeline from "@/app/components/BookingDetails/eventTimeline";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation"; 

const clients = [
  { name: 'John Doe', email: 'john.doe@example.com', phone: '+1 (234) 567-8901' },
];

const bookingData = {
  eventType: 'Wedding',
  dateTime: '2025-03-15 14:00',
  duration: '4 hours',
  location: 'Central Park',
  packageType: 'Gold',
  price: '$2000'
};

const MoreDetails = () => {
  const router = useRouter();
  
    return(
      <>
        <div className={style.cover}>
          <div className={style.topic}>
            <div className={style.backBtn}><FaArrowLeft className={style.arrow} onClick={() => router.push("../BookingInformation")}/></div>      
            <div className={style.word}>Booking Details</div>      
          </div> 
          <div className={style.mainContainer}>
            <div className={style.left}>
              <ClientInformation clients={clients}/>   
              <BookingDetailsCom 
                eventType={bookingData.eventType}
                dateTime={bookingData.dateTime}
                duration={bookingData.duration}
                location={bookingData.location}
                packageType={bookingData.packageType}
                price={bookingData.price}
              />
            </div>
            <div className={style.right}>
              <EventTimeline/>
            </div>
          </div>
          <div className={style.btnContainer}>
            <button className={style.btn1} >Mark as Completed</button>
            <button className={style.btn2}>Message Client</button>
          </div>               
        </div>
      </>
    )
}

export default MoreDetails;