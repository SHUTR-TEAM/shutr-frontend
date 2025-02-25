
// import React, { useState } from "react";
// import styles from "./CalendarWorklist.module.css";

// const Calendar = () => {
//   const [view, setView] = useState("week"); // 'day' or 'week'

//   const events = [
//     {
//       title: "Meeting with client",
//       startTime: "09:00 AM",
//       endTime: "10:00 AM",
//       date: "2024-03-15",
//     },
//     {
//       title: "Meeting with client",
//       startTime: "09:00 AM",
//       endTime: "11:00 AM",
//       date: "2024-03-16",
//     },
//     {
//       title: "Mr Kasun's Wedding",
//       startTime: "10:00 AM",
//       endTime: "03:00 PM",
//       date: "2024-03-17",
//     },
//   ];

//   const days = ["15", "16", "17"];
//   const weekdays = ["Tuesday", "Wednesday", "Thursday"];
//   const times = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"];

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1 className={styles.title}>March, 2024</h1>
//         <div>
//           <button
//             className={`${styles.button} ${view === "day" ? styles.active : ""}`}
//             onClick={() => setView("day")}
//           >
//             Day
//           </button>
//           <button
//             className={`${styles.button} ${view === "week" ? styles.active : ""}`}
//             onClick={() => setView("week")}
//           >
//             Week
//           </button>
//         </div>
//       </div>

//       <table className={styles.calendarTable}>
//         <thead>
//           <tr>
//             <th className={styles.timeColumn}>UTC +5:30</th>
//             {days.map((day, index) => (
//               <th key={day} className={styles.dayHeader}>
//                 {day} <br /> {weekdays[index]}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {times.map((time) => (
//             <tr key={time}>
//               <td className={styles.timeSlot}>{time}</td>
//               {days.map((day, index) => (
//                 <td key={`${time}-${day}`} className={styles.cell}>
//                   {events.map((event, eventIndex) => {
//                     if (event.startTime === time && event.date.endsWith(day)) {
//                       return (
//                         <div key={eventIndex} className={styles.event}>
//                           <p className={styles.eventTitle}>{event.title}</p>
//                           <p className={styles.eventTime}>
//                             {event.startTime} - {event.endTime}
//                           </p>
//                         </div>
//                       );
//                     }
//                     return null;
//                   })}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Calendar;
import React from "react";
import styles from "./CalendarWorklist.module.css";

interface Event {
  title: string;
  start: string;
  end: string;
  date: string;
}

const events: Event[] = [
  { title: "Meeting with client", start: "09:00", end: "10:00", date: "2024-07-15" },
  { title: "Meeting with client", start: "09:00", end: "11:00", date: "2024-07-16" },
  { title: "Meeting with client", start: "11:00", end: "12:00", date: "2024-07-15" },
  { title: "Mr Kasun’s Wedding", start: "10:00", end: "15:00", date: "2024-07-17" },
];

const dates = ["2024-07-15", "2024-07-16", "2024-07-17"];
const times = Array.from({ length: 10 }, (_, i) => `${i + 9}:00`); // 9:00 AM - 6:00 PM

const Calendar: React.FC = () => {
  return (
    <div className={styles.calendarContainer}>
      <table className={styles.calendarTable}>
        <thead>
          <tr>
            <th className={styles.timeColumn}>UTC +5:30</th>
            {dates.map((date) => (
              <th key={date}>{new Date(date).toDateString()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time) => (
            <tr key={time}>
              <td className={styles.timeColumn}>{time} A.M</td>
              {dates.map((date) => {
                const event = events.find(
                  (e) => e.date === date && e.start === time
                );
                return (
                  <td key={date}>
                    {event && (
                      <div className={styles.event}>
                        <span className={styles.eventTitle}>{event.title}</span>
                        <span className={styles.eventTime}>{event.start} - {event.end}</span>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
