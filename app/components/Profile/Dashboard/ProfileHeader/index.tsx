"use client";

import React from "react";
import Image from "next/image";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { formatDateWithDayAndMonth } from "@/app/utils/dateFormatter";

const ProfileHeader: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const formattedDate: string = formatDateWithDayAndMonth(new Date());

  return (
    <div className={styles.container}>
      <Image
        src={user?.profile_image_url ? user.profile_image_url : "/avatar.jpeg"}
        alt="Jane Morrison"
        width={44}
        height={44}
      />
      <div className={styles.welcomeMessage}>
        <h4>Hi there, {user?.first_name}</h4>
        <p>{formattedDate}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
