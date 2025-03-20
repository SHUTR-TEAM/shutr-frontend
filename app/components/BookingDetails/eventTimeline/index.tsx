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
}

// Accept booking as a prop instead of using Redux
const EventTimeline: FC<{ booking: Booking }> = ({ booking }) => {
  // Used to store the events
  const [eventList, setEventList] = useState<{ time: string; occasion: string }[]>([]);

  // Store new event details
  const [newEvent, setNewEvent] = useState({
    time: "",
    occasion: ""
  });

  // This state is used to toggle the input field visibility
  const [showInput, setShowInput] = useState(false);

  // Load existing event details when the component mounts
  useEffect(() => {
    if (booking && booking.event) {
      setEventList([{ time: booking.event.date, occasion: booking.event.type }]);
    }
  }, [booking]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const addEvent = () => {
    setEventList([...eventList, newEvent]);
    setNewEvent({ time: "", occasion: "" });
    setShowInput(false);
  };

  return (
    <div className={styles.timeline}>
      <div className={styles.topic}>
        <h2>Event Timeline</h2>
        <span className={styles.plus} onClick={() => setShowInput(true)}>
          <FaPlus />
        </span>
      </div>

      {/* Show input field when plus icon is clicked */}
      {showInput && (
        <div className={styles.inputContainer}>
          <div>
            <IoMdCloseCircle onClick={() => setShowInput(false)} className={styles.icon} />
          </div>
          <div className={styles.box}>
            <input
              type="text"
              name="time"
              placeholder="Time"
              value={newEvent.time}
              onChange={handleInputChange}
              className={styles.inputBoxTime}
            />
            <input
              type="text"
              name="occasion"
              placeholder="Occasion"
              value={newEvent.occasion}
              onChange={handleInputChange}
              className={styles.inputBoxOccasion}
            />
          </div>
          <div className={styles.btn}>
            <button onClick={addEvent}>Add Event</button>
          </div>
        </div>
      )}

      {/* Display event list */}
      <div className={styles.events}>
        <ul>
          {eventList.map((event, index) => (
            <li key={index}>
              <div className={styles.time}>{event.time}</div>
              <div className={styles.event}>{event.occasion}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventTimeline;
