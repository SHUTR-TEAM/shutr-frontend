import React from "react";
import ProfileSidebarLayout from "../components/Profile/Layout";
import styles from "./layout.module.css";

const ProfileLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className={styles.mainDiv}>
      <ProfileSidebarLayout />
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default ProfileLayout;
