import React from "react";
import Image from "next/image";
import styles from "../Inbox/Inbox.module.css";

const Inbox: React.FC = () => {
  return (
    <div className={styles.inbox}>
      <h2>Inbox</h2>
      <ul>
        <li>
          <div className={styles.message}>
            <Image
              src="/pp.png"
              alt="Jane Morrison"
              width={40}
              height={40}
              className={styles.avatar}
            />
            <div className={styles.text}>
              <span className={styles.name}>Jane Morrison</span>
              <span className={styles.messagePreview}>
                Hello! I need to make an appointment...
              </span>
            </div>
            <span className={styles.badge}>3</span>
          </div>
        </li>
        <li>
          <div className={styles.message}>
            <Image
              src="/pp.png"
              alt="Jane Morrison"
              width={40}
              height={40}
              className={styles.avatar}
            />
            <div className={styles.text}>
              <span className={styles.name}>Jane Morrison</span>
              <span className={styles.messagePreview}>
                Hello! I need to make an appointment...
              </span>
            </div>
            <span className={styles.badge}>3</span>
          </div>
        </li>
        <li>
          <div className={styles.message}>
            <Image
              src="/pp.png"
              alt="Jane Morrison"
              width={40}
              height={40}
              className={styles.avatar}
            />
            <div className={styles.text}>
              <span className={styles.name}>Jane Morrison</span>
              <span className={styles.messagePreview}>
                Hello! I need to make an appointment...
              </span>
            </div>
            <span className={styles.badge}>3</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Inbox;