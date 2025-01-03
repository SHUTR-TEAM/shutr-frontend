// import Header from "@/app/components/Profile/Dashboard/Header/Header";
import EventList from "@/app/components/Profile/Dashboard/EventList/EventList";
import ProfileOverview from "@/app/components/Profile/Dashboard/ProfileOverview/ProfileOverview";
import Inbox from "@/app/components/Profile/Dashboard/Inbox/Inbox";
import styles from "./page.module.css";

function DashboardPage() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.mainContent}>
        {/* <Header /> */}

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
}

export default DashboardPage;
