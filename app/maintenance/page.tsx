import React from "react";
import styles from "./page.module.css";
import Image from "next/image";

const MaintenancePage = () => {
  return (
    <div className={styles.mainDiv}>
      <Image
        src="/maintenance.svg"
        width={500}
        height={500}
        alt="Maintenance"
      />
      <h2>Website under maintenance. See you back soon</h2>
    </div>
  );
};

export default MaintenancePage;
