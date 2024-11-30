import React from "react";
import styles from "./index.module.css";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <div className={styles.heroContent}>
          <h1>Capture Your Moments with the Perfect Photographer</h1>
          <p>
            Find professional photographers for every occasion—from weddings to
            corporate events, all in one place.
          </p>
          <div className={styles.heroButtons}>
            <button className={styles.btnPrimary}>Find a Photographer</button>
            <button className={styles.btnSecondary}>Join Us</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
