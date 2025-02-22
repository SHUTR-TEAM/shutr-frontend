import React from "react";
import styles from "./index.module.css";
import Image from "next/image";

const FeatureSection = () => {
  const features = [
    {
      icon: "/icons/ai.svg",
      title: "AI-Powered Search",
      description:
        "Matches clients with photographers based on their needs and preferences.",
    },
    {
      icon: "/icons/bookmark.svg",
      title: "Comprehensive Booking System",
      description:
        "Allows clients to book sessions with photographers easily and securely.",
    },
    {
      icon: "/icons/pen.svg",
      title: "Portfolio Management Tools",
      description:
        "Provides photographers with tools to build, edit, and display their portfolios.",
    },
    {
      icon: "/icons/team.svg",
      title: "Event Planning Features",
      description:
        "Facilitates collaboration between clients and photographers for successful events.",
    },
  ];

  return (
    <section className={styles.mainDivWrapper}>
      <div className={`boxWrapper ${styles.mainDiv}`}>
        <h3>Innovative Features to Elevate Your Photography Journey</h3>
        <p className={styles.description}>
          {`At SHUTR, we are redefining the way clients and photographers connect.
          Our platform offers cutting-edge tools to simplify the booking
          process, enhance collaboration, and provide seamless event planning.
          `}
        </p>
        <div className={styles.steps}>
          {features.map((feature, index) => (
            <div className={styles.step} key={index}>
              <div className={styles.stepHeader}>
                <div className={styles.stepTitle}>
                  <span>Try</span>
                  <h3>{feature.title}</h3>
                </div>
                <div className={styles.icon}>
                  <Image
                    src={feature.icon}
                    width={50}
                    height={50}
                    alt={feature.title}
                  />
                </div>
              </div>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
