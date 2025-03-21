"use client";
import { FC, useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import styles from "./index.module.css";

// Define Booking Type
interface Booking {
  event: {
    type: string;
    date: string;
    address: string;
  };
  additional_notes: string;
}

// Accept booking as a prop instead of using Redux
const EventTimeline: FC<{ booking: Booking }> = ({ booking }) => {
  // Used to store the events
  const [eventList, setEventList] = useState<string[]>([]);

  // Load existing event details when the component mounts
  useEffect(() => {
    if (booking) {
      setEventList([booking.additional_notes]);
      console.log(booking.additional_notes);
    }
  }, [booking]);

  return (
    <div className={styles.notes}>
      <div className={styles.topic}>
        <h2>Additional Notes</h2>
      </div>

      <div className={styles.note}>
        <ul className={styles.list}>
          {eventList.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventTimeline;

