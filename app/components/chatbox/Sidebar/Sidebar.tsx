import React from "react";
import styles from "../Sidebar/Sidebar.module.css";
 import { AiOutlineHome, AiOutlineMessage, AiOutlineCalendar, AiOutlineUser, AiOutlineSetting } from "react-icons/ai";

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <h2>SHUTR</h2>
      <nav>
        <ul>
          <li >
            <AiOutlineHome className={styles.icon} /> Home
          </li>
          <li className={styles.active}>
            <AiOutlineMessage className={styles.icon} /> Messages
          </li>
          <li>
            <AiOutlineCalendar className={styles.icon} /> Calendar
          </li>
          <li>
            <AiOutlineUser className={styles.icon} /> Profile
          </li>
          <li>
            <AiOutlineSetting className={styles.icon} /> Settings
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;