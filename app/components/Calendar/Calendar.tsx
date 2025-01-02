
import React from "react";
import styles from "../Calendar/Calendar.module.css";
import Sidebar from "../Calendar/Sidebar/Sidebar";
import Header from "../Calendar/Header/Header";
import CalendarWidget from "../Calendar/CalendarWidget/CalendarWidget";
// import EventList from "../../components/Dashboard/EventList/EventList";
// import ProfileOverview from "../../components/Dashboard/ProfileOverview/ProfileOverview";
// import Inbox from "../../components/Dashboard/Inbox/Inbox";

const Calendar: React.FC = () => {
  return (
    <div className={styles.calendar}>
      <Sidebar />

      <div className={styles.mainContent}>
        {/* <CalendarWidget /> */}
        {/* <Header /> */}
         

        {/* <div className={styles.grid}>
         
          <div className={styles.leftColumn}>
            <EventList />
          </div>

         
          <div className={styles.rightColumn}>
            <ProfileOverview />
            <Inbox />
          </div>
        </div> */}
        
      </div>
    </div>
  );
};

export default Calendar;
