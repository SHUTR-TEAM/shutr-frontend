
"use client";
import React, { useState } from "react";
import styles from "./CalendarWidgetContainer.module.css";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import CalendarWidget from "./CalendarWidget/CalendarWidget";
import CalendarWorklist from "./CalendarWidget/CalendarWorklist";
// import EventList from "../../components/Dashboard/EventList/EventList";
// import ProfileOverview from "../../components/Dashboard/ProfileOverview/ProfileOverview";
// import Inbox from "../../components/Dashboard/Inbox/Inbox";

const CalendarWidgetContainer: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth((nextMonth) => (nextMonth === 11 ? 0 : nextMonth + 1));
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
    }
  };

  return (
    <div className={styles.CalendarWidgetContainer}>
      
      <Sidebar />
      <div className={styles.mainContent}>
        <div className={styles.calendarWrapper}>
          <CalendarWidget
            currentMonth={currentMonth}
            currentYear={currentYear}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />
          
          {/* <Header /> */}
          
          <div className={styles.grid}>
            <div className={styles.leftColumn}>
              {/* <EventList /> */}
              
            </div>

            {/* <div className={styles.rightColumn}>
              <ProfileOverview />
              <Inbox />
              <CalendarWorklist />
            </div> */}
          </div>
        </div>
      </div>
      <CalendarWorklist/>
      
    </div>
  );
};

export default CalendarWidgetContainer;
