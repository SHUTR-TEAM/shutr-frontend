import React from "react";
import styles from "./index.module.css";

const HowItWorksSection = () => {
  return (
    <section className={styles.mainDiv}>
      <div className={styles.text}>
        <div>
          <h2 className={styles.title}>How It Works</h2>
          <p className={styles.subtitle}>
            Capture Your Moments with the
            <br />
            Perfect Photographer
          </p>
        </div>
        <div className={styles.sectionDesc}>
          <p>
            Find professional photographers for every <br /> occasion—from
            weddings to corporate
            <br />
            events, all in one place.
          </p>
        </div>
      </div>

      <div className={styles.steps}>
        <div className={styles.step}>
          <div className={styles.icon}>🔍</div>
          <h3>Search</h3>
          <p>
            Find professional photographers for every occasion—from weddings to
            corporate events, all in one place.
          </p>
        </div>
        <div className={styles.step}>
          <div className={styles.icon}>📅</div>
          <h3>Book</h3>
          <p>
            Book the perfect photographer based on reviews and availability.
          </p>
        </div>
        <div className={styles.step}>
          <div className={styles.icon}>📸</div>
          <h3>Capture</h3>
          <p>Enjoy memorable moments captured by professionals.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
