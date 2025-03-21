"use client";

import React from "react";
import Image from "next/image";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { formatDateWithDayAndMonth } from "@/app/utils/dateFormatter";

const ProfileOverview: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const formattedDate: string = formatDateWithDayAndMonth(new Date());

  const profileDetails = [
    {
      title: "Email",
      value: user?.email,
    },
    {
      title: "Phone Number",
      value: user?.phone_num,
    },
    {
      title: "NIC",
      value: user?.nic,
    },
    {
      title: "Address",
      value: user?.address,
    },
  ];

  return (
    <div className={styles.mainDiv}>
      <h3>Profile Overview</h3>
      <div>
        {profileDetails.map((detail) => (
          <div key={detail.title} className={styles.profileDetail}>
            <span>{detail.title}</span>
            <p>{detail.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileOverview;
