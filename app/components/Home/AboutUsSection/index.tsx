import Image from "next/image";
import React from "react";
import styles from "./index.module.css";

const AboutUsSection = () => {
  return (
    <section className={styles.aboutUs}>
      <div className={styles.content}>
        <h2>About Us</h2>
        <p>
          Find professional photographers for every occasion—from weddings to
          corporate events, all in one place. Find professional photographers
          for every occasion—from weddings to corporate events, all in one
          place. Find professional photographers for every occasion—from
          weddings to corporate events, all in one place. Find professional
          photographers for every occasion—from weddings to corporate events,
          all in one place.
        </p>
      </div>
      <div className={styles.image}>
        <Image
          src="/pic.png"
          alt="Photography Studio"
          width={400}
          height={300}
        />
      </div>
    </section>
  );
};

export default AboutUsSection;
