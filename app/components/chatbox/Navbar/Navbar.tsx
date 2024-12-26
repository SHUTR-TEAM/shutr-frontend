import React from "react";
import styles from "../Navbar/Navbar.module.css";

const Navbar: React.FC = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.links}>
        <a href="/">Home</a>
        <a href="/about">About Us</a>
      </div>
      <div className={styles.profile}>
        <span>John Doe</span>
        <img
          src="./pic.png"
          alt="Profile"
          className={styles.avatar}
        />
      </div>
    </div>
  );
};

export default Navbar;
