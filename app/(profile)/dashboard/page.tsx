import styles from "./page.module.css";
import ProfileStats from "@/app/components/Profile/Dashboard/Stats";
import ProfileHeader from "@/app/components/Profile/Dashboard/ProfileHeader";
import Calendar from "@/app/components/NewCalendar/Calendar";

function DashboardPage() {
  return (
    <div className={styles.mainDiv}>
      <ProfileHeader />
      <ProfileStats />
      <h2>Your Calendar</h2>
      <Calendar />
    </div>
  );
}

export default DashboardPage;
