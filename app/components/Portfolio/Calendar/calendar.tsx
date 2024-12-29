// import React, { useState } from 'react';
// import styles from './Calendar.module.css';

// const Calendar: React.FC = () => {
//   const [currentMonth, setCurrentMonth] = useState(2); // March (0-based index)
//   const [currentYear, setCurrentYear] = useState(2024);
//   const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

//   const handlePrevMonth = () => {
//     setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
//     setCurrentYear((prev) => (currentMonth === 0 ? prev - 1 : prev));
//   };

//   const handleNextMonth = () => {
//     setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
//     setCurrentYear((prev) => (currentMonth === 11 ? prev + 1 : prev));
//   };

//   const getMonthName = (month: number) =>
//     new Date(currentYear, month).toLocaleString('default', { month: 'long' });

//   const renderDays = () => {
//     const firstDay = new Date(currentYear, currentMonth, 1).getDay();
//     const calendarDays = Array.from({ length: 42 }, (_, index) => {
//       const day = index - firstDay + 1;
//       return day > 0 && day <= daysInMonth ? day : '';
//     });

//     return calendarDays.map((day, index) => (
//       <div
//         key={index}
//         className={`${styles.day} ${day ? styles.activeDay : ''}`}
//       >
//         {day}
//       </div>
//     ));
//   };

//   return (
//     <div className={styles.calendarContainer}>
//       <div className={styles.calendarHeader}>
//         <button className={styles.prevBtn} onClick={handlePrevMonth}>
//           &lt;
//         </button>
//         <span className={styles.monthYear}>
//           {getMonthName(currentMonth)} {currentYear}
//         </span>
//         <button className={styles.nextBtn} onClick={handleNextMonth}>
//           &gt;
//         </button>
//       </div>
//       <div className={styles.calendarGrid}>
//         {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
//           <div key={day} className={styles.weekday}>
//             {day}
//           </div>
//         ))}
//         {renderDays()}
//       </div>
//       <div className={styles.calendarFooter}>
//         <button className={styles.cancelBtn}>Cancel</button>
//         <button className={styles.applyBtn}>Apply</button>
//       </div>
//     </div>
//   );
// };

// export default Calendar;


// import React from "react";
// import styles from "./Calendar.module.css";

// interface CalendarProps {
//   currentMonth: number;
//   currentYear: number;
//   onPrevMonth: () => void;
//   onNextMonth: () => void;
// }

// const Calendar: React.FC<CalendarProps> = ({
//   currentMonth,
//   currentYear,
//   onPrevMonth,
//   onNextMonth,
// }) => {
//   const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

//   const getMonthName = (month: number) =>
//     new Date(currentYear, month).toLocaleString("default", { month: "long" });

//   const renderDays = () => {
//     const firstDay = new Date(currentYear, currentMonth, 1).getDay();
//     const calendarDays = Array.from({ length: 42 }, (_, index) => {
//       const day = index - firstDay + 1;
//       return day > 0 && day <= daysInMonth ? day : "";
//     });

//     return calendarDays.map((day, index) => (
//       <div
//         key={index}
//         className={`${styles.day} ${day ? styles.activeDay : ""}`}
//       >
//         {day}
//       </div>
//     ));
//   };

//   return (
//     <div className={styles.calendarContainer}>
//       <div className={styles.calendarHeader}>
//         <button className={styles.prevBtn} onClick={onPrevMonth}>
//           &lt;
//         </button>
//         <span className={styles.monthYear}>
//           {getMonthName(currentMonth)} {currentYear}
//         </span>
//         <button className={styles.nextBtn} onClick={onNextMonth}>
//           &gt;
//         </button>
//       </div>
//       <div className={styles.calendarGrid}>
//         {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
//           <div key={day} className={styles.weekday}>
//             {day}
//           </div>
//         ))}
//         {renderDays()}
//       </div>
//       <div className={styles.calendarFooter}>
//         <button className={styles.cancelBtn}>Cancel</button>
//         <button className={styles.applyBtn}>Apply</button>
//       </div>
//     </div>
//   );
// };

// export default Calendar;


import React from "react";
import styles from "./Calendar.module.css";

interface CalendarProps {
  currentMonth: number;
  currentYear: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const Calendar: React.FC<CalendarProps> = ({
  currentMonth,
  currentYear,
  onPrevMonth,
  onNextMonth,
}) => {
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const getMonthName = (month: number) =>
    new Date(currentYear, month).toLocaleString("default", { month: "long" });

  const renderDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const calendarDays = Array.from({ length: 42 }, (_, index) => {
      const day = index - firstDay + 1;
      return day > 0 && day <= daysInMonth ? day : "";
    });

    return calendarDays.map((day, index) => (
      <div
        key={index}
        className={`${styles.day} ${day ? styles.activeDay : ""}`}
        aria-hidden={!day}
      >
        {day}
      </div>
    ));
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeader}>
        <button
          className={styles.navButton}
          onClick={onPrevMonth}
          aria-label="Previous Month"
        >
          &lt;
        </button>
        <span className={styles.monthYear} aria-live="polite">
          {getMonthName(currentMonth)} {currentYear}
        </span>
        <button
          className={styles.navButton}
          onClick={onNextMonth}
          aria-label="Next Month"
        >
          &gt;
        </button>
      </div>
      <div className={styles.calendarGrid}>
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className={styles.weekday} aria-hidden="true">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
      <div className={styles.calendarFooter}>
        <button className={styles.cancelBtn}>Cancel</button>
        <button className={styles.applyBtn}>Apply</button>
      </div>
    </div>
  );
};

export default Calendar;
