import Image from "next/image";
import React from "react";
import styles from "./index.module.css";

const AboutUsSection = () => {
  return (
    <section>
      <div className={`boxWrapper ${styles.aboutUsWrapper}`}>
        <div className={styles.aboutUsContent}>
          <h1>About Us</h1>
          <p>
            At <span className={styles.highlight}>SHUTR</span>, we believe that
            every moment tells a story, and our mission is to help you{" "}
            <b>capture it beautifully.</b> Whether it’s a{" "}
            <b>wedding, a birthday, a corporate event,</b> or a{" "}
            <b>personal photoshoot,</b> we connect you with professional
            photographers who can turn fleeting moments into lasting memories.
            <br />
            <br />
            We understand that finding the <b>right photographer</b> can be
            overwhelming, which is why we’ve created a seamless platform that
            makes booking effortless. With just a few clicks, you can{" "}
            <b>browse, compare,</b> and <b>book skilled photographers</b> who
            match your style, budget, and event needs.
            <br />
            <br />
            Photography is more than just taking pictures—it’s about preserving
            emotions, milestones, and experiences. At{" "}
            <span className={styles.highlight}>SHUTR</span>, we are committed to
            making <b>professional photography</b> accessible and stress-free so
            you can focus on enjoying your special moments while we take care of
            capturing them.
          </p>
        </div>

        <Image
          src="/aboutUs.jpeg"
          alt="Photography Studio"
          width={1024}
          height={1024}
          className={styles.aboutUsImage}
        />
      </div>
    </section>
  );
};

export default AboutUsSection;
