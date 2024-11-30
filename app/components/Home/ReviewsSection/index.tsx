import Image from "next/image";
import React from "react";
import styles from "./index.module.css";

const ReviewsSection = () => {
  return (
    <section className={styles.testimonials}>
      <h2>Capture Your Moments with the Perfect Photographer</h2>
      <div className={styles.testimonialSlider}>
        <div className={styles.testimonial}>
          <div className={styles.testimonialHeader}>
            <Image
              src="/paboda.jpg"
              alt="Pabodha M. Pathirana"
              className={styles.testimonialImage}
              width={50}
              height={50}
            />
            <div className={styles.testimonialInfo}>
              <p className={styles.testimonialName}>Pabodha M. Pathirana</p>
              <div className={styles.testimonialRating}>{"★".repeat(5)}</div>
            </div>
          </div>
          <p className={styles.testimonialText}>
            Find professional photographers for every occasion—from weddings to
            corporate events, all in one place. Find professional photographers
            for every occasion—from weddings to corporate events, all in one
            place.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
