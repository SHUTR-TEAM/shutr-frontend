"use client";

import { CalendarPlus2Icon } from "lucide-react";
import React from "react";
import styles from "./index.module.css";
import { useGoogleCalendarInitMutation } from "@/app/redux/features/auth/authApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
// import { useDispatch } from "react-redux";

const ProfileStats = () => {
  const [calendarApi] = useGoogleCalendarInitMutation();
  const user = useSelector((state: RootState) => state.auth.user);
  // const dispatch = useDispatch();

  const handleCalendarInit = async () => {
    if (!user?.google_access_token) {
      try {
        const response = await calendarApi({}).unwrap();

        if (response.authorization_url) {
          window.location.href = response.authorization_url;
        } else {
          console.error("Authorization URL not found in the response.");
        }
      } catch (error) {
        console.error("Failed to Connect Google Calendar:", error);
      }
    }
  };

  return (
    <div className={styles.mainDiv}>
      {/* <div>
        <span>Clients this month</span>
        <h4>100</h4>
      </div>
      <div>
        <span>Pending Requests</span>
        <h4>10</h4>
      </div> */}
      <div>
        <span>Your Rating</span>
        <h4>5.0</h4>
      </div>
      <div
        onClick={handleCalendarInit}
        className={user?.google_access_token ? styles.calendarConnected : ""}
      >
        <CalendarPlus2Icon />
        <span>
          {user?.google_access_token
            ? "Google Calendar Connected"
            : "Connect to Google Calendar"}
        </span>
      </div>
    </div>
  );
};

export default ProfileStats;
