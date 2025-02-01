import Image from "next/image";
import React from "react";
import styles from "./index.module.css";

const AboutUsSection = () => {
  return (
    <section className={styles.aboutUsWrapper}>
      <div className={styles.aboutUs}>
        <div className={styles.headerWrapper}>
          <div className={styles.header}>
            <span>About Us</span>
            <h2>Capture Your Moments with the Perfect Photographer</h2>
          </div>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum minus
            eaque adipisci cumque cupiditate iusto tempore vel laboriosam dolore
            distinctio. Quo, corrupti consectetur
          </p>
        </div>

        <Image
          src="/pic.png"
          alt="Photography Studio"
          width={400}
          height={300}
          className={styles.aboutUsImage}
        />
      </div>
    </section>
  );
};

export default AboutUsSection;
