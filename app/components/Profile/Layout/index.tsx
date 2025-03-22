"use client";

import React from "react";
import {
  AiOutlineHome,
  AiOutlineMessage,
  // AiOutlineCalendar,
  AiOutlineUser,
} from "react-icons/ai";
import styles from "./index.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsBook } from "react-icons/bs";

const ProfileSidebarLayout: React.FC = () => {
  const fullPath = usePathname();
  const path = fullPath.split("/")[1];

  return (
    <nav className={styles.sidebar}>
      <ul>
        <li className={path === "dashboard" ? styles.active : ""}>
          <Link href="/dashboard">
            <AiOutlineHome className={styles.icon} />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className={path === "chat" ? styles.active : ""}>
          <Link href="/chat">
            <AiOutlineMessage className={styles.icon} />
            <span>Messages</span>
          </Link>
        </li>
        {/* <li className={path === "calendar" ? styles.active : ""}>
          <Link href="/calendar">
            <AiOutlineCalendar className={styles.icon} />
            <span>Calendar</span>
          </Link>
        </li> */}
        <li className={path === "profile" ? styles.active : ""}>
          <Link href="/profile">
            <AiOutlineUser className={styles.icon} />
            <span>Profile</span>
          </Link>
        </li>
        <li className={path === "booking-information" ? styles.active : ""}>
          <Link href="/booking-information">
            <BsBook className={styles.icon} />
            <span>My Bookings</span>
          </Link>
        </li>
        {/* <li className={path === "settings" ? styles.active : ""}>
          <Link href="/settings">
            <AiOutlineSetting className={styles.icon} />
            <span>Settings</span>
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default ProfileSidebarLayout;
