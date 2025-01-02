import React from "react";
import styles from "../Header/Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1>Dashboard</h1>
      <div>
        <span>John Doe</span>
        <img src="/pp.png" alt="Profile" className={styles.profilePic} />
      </div>
    </header>
  );
};

export default Header;
