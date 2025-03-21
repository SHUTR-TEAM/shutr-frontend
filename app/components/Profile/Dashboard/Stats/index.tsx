import { CalendarPlus2Icon, Pen } from "lucide-react";
import React from "react";
import styles from "./index.module.css";
import { FaGoogleDrive } from "react-icons/fa";

const ProfileStats = () => {
  return (
    <div className={styles.mainDiv}>
      <div>
        <span>Clients this month</span>
        <h4>100</h4>
      </div>
      <div>
        <span>Pending Requests</span>
        <h4>10</h4>
      </div>
      <div>
        <span>Avg package value</span>
        <h4>100,000 LKR</h4>
      </div>
      <div>
        <Pen />
        <span>Edit Profile</span>
      </div>
      <div>
        <span>Your Rating</span>
        <h4>5</h4>
      </div>
      <div>
        <CalendarPlus2Icon />
        <span>Connect to Google Calendar</span>
      </div>
    </div>
  );
};

export default ProfileStats;
