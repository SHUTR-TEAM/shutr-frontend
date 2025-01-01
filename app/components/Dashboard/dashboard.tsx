
import React from "react";
import styles from "../Dashboard/Dashboard.module.css";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import Header from "../../components/Dashboard/Header/Header";
import EventList from "../../components/Dashboard/EventList/EventList";
import ProfileOverview from "../../components/Dashboard/ProfileOverview/ProfileOverview";
import Inbox from "../../components/Dashboard/Inbox/Inbox";

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <Sidebar />

      <div className={styles.mainContent}>
        <Header />

        <div className={styles.grid}>
         
          <div className={styles.leftColumn}>
            <EventList />
          </div>

         
          <div className={styles.rightColumn}>
            <ProfileOverview />
            <Inbox />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
