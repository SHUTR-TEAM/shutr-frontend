import React from "react";
import styles from "./index.module.css";

const EventList: React.FC = () => {
  const events = [
    {
      title: "Covering GDG DevFest Event",
      organizer: "Jane Morrison",
      date: "2024 / 12 / 12",
      daysLeft: "12 days left",
    },
    {
      title: "Covering GDG DevFest Event",
      organizer: "Jane Morrison",
      date: "2024 / 12 / 12",
      daysLeft: "12 days left",
    },
    {
      title: "Covering GDG DevFest Event",
      organizer: "Jane Morrison",
      date: "2024 / 12 / 12",
      daysLeft: "12 days left",
    },
  ];

  return (
    <div className={styles.eventsList}>
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index} className={styles.eventItem}>
            <div className={styles.eventDetails}>
              <div className={styles.eventInfo}>
                <h3>{event.title}</h3>
                <p>{event.organizer}</p>
              </div>
              <div className={styles.eventMeta}>
                <p>{event.date}</p>
                <p>{event.daysLeft}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button className={styles.viewAllButton}>View All Events</button>
    </div>
  );
};

export default EventList;
