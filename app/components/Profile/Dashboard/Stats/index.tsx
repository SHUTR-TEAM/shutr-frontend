"use client";

import { CalendarPlus2Icon, Pen } from "lucide-react";
import React from "react";
import styles from "./index.module.css";
import { FaGoogleDrive } from "react-icons/fa";
import { useGoogleCalendarInitMutation } from "@/app/redux/features/auth/authApiSlice";
import { useDispatch } from "react-redux";

const ProfileStats = () => {
  const [calendarApi, { isLoading }] = useGoogleCalendarInitMutation();
  const dispatch = useDispatch();

  const handleCalendarInit = async () => {
    try {
      // Make the API call to your backend
      const response = await calendarApi({}).unwrap();

      // Check if the response contains the authorization URL
      if (response.authorization_url) {
        // Redirect to the authorization URL
        window.location.href = response.authorization_url;
      } else {
        console.error("Authorization URL not found in the response.");
      }
    } catch (error) {
      console.error("Failed to Connect Google Calendar:", error);
    }
  };

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
      <div onClick={handleCalendarInit}>
        <CalendarPlus2Icon />
        <span>Connect to Google Calendar</span>
      </div>
    </div>
  );
};

export default ProfileStats;
