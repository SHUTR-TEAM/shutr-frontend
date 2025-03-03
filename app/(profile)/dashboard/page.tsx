// import Header from "@/app/components/Profile/Dashboard/Header/Header";
import ProfileOverview from "@/app/components/Profile/Dashboard/ProfileOverview";
import styles from "./page.module.css";
import Inbox from "@/app/components/Profile/Dashboard/Inbox";
import EventList from "@/app/components/Profile/Dashboard/EventList";

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
