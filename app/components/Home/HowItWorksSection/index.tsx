import React from "react";
import styles from "./index.module.css";
import {
  LuCalendarClock,
  LuPenTool,
  LuScanSearch,
  LuSwitchCamera,
} from "react-icons/lu";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <LuScanSearch />,
      title: "AI-Powered Search",
      description:
        "Matches clients with photographers based on their needs and preferences.",
    },
    {
      icon: <LuCalendarClock />,
      title: "Comprehensive Booking System",
      description:
        "Allows clients to book sessions with photographers easily and securely.",
    },
    {
      icon: <LuPenTool />,
      title: "Portfolio Management Tools",
      description:
        "Provides photographers with tools to build, edit, and display their portfolios.",
    },
    {
      icon: <LuSwitchCamera />,
      title: "Event Planning Features",
      description:
        "Facilitates collaboration between clients and photographers for successful events.",
    },
  ];

  return (
    <section className={styles.mainDivWrapper}>
      <div className={styles.mainDiv}>
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
          {steps.map((step, index) => (
            <div className={styles.step} key={index}>
              <div className={styles.icon}>{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
          {/* <div className={styles.step}>
            <div className={styles.icon}>
            <LuScanSearch />
            </div>
            <h3>Search</h3>
            <p>
              Find professional photographers for every occasion—from weddings
              to corporate events, all in one place.
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
