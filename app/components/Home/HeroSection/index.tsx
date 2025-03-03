import React from "react";
import styles from "./index.module.css";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className={styles.mainDiv}>
      <div className={styles.hero}>
        <div className={styles.overlay}>
          <div className={styles.heroContent}>
            <h1>Capture Your Moments with the Perfect Photographer</h1>
            <p>
              Find professional photographers for every occasion—from weddings
              to corporate events, all in one place.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/maintenance" className={styles.btnPrimary}>
                Find a Photographer
              </Link>
              <Link href="/maintenance" className={styles.btnSecondary}>
                Join Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
