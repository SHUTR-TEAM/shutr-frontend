import React from "react";
import Image from "next/image";
import styles from "./index.module.css";

const ProfileOverview: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <div className={styles.profileImage}>
          <Image
            src="/pp.png"
            alt="Jane Morrison"
            width={100}
            height={100}
            className={styles.image}
          />
        </div>
        <h2>Jane Morrison</h2>
        <p className={styles.username}>@janemorrison</p>
        <button className={styles.viewProfileButton}>View Profile</button>
      </div>

      <div className={styles.overviewCard}>
        <h3>Profile Overview</h3>
        <div className={styles.overviewDetails}>
          <p>
            <span>Rating:</span> <span>(300) 4.2 ⭐</span>
          </p>
          <p>
            <span>Clients:</span> <span>390</span>
          </p>
          <p>
            <span>Experience Level:</span> <span>Expert</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
