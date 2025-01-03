// components/CalendarWidget.tsx
import React from "react";
import styles from "../CalendarWidget/CalendarWidget.module.css";

const CalendarWidget: React.FC = () => {
  return (
    <div className={styles.calendarContainer}>
      <header className={styles.calendarHeader}>
        <h2>March, 2024</h2>
        <div>14 Events</div>
      </header>
      <div className={styles.weekView}>
        <div className={styles.dayColumn}>
          <span>15</span> Tuesday
        </div>
        {/* Grid Implementation */}
        {/** Calendar Grid */}
      </div>
    </div>
  );
};

export default CalendarWidget;
