"use client";

import React, { useState } from "react";
import styles from "./index.module.css";

export interface Step {
  number: number;
  title: string;
  description: string;
}

const HowItWorksSection = () => {
  const photographerSteps: Step[] = [
    {
      number: 1,
      title: "Sign Up & Get Verified",
      description:
        "Join SHUTR, complete your profile, and verify your identity to start receiving bookings.",
    },
    {
      number: 2,
      title: "Showcase Your Talent",
      description:
        "Create a stunning portfolio by uploading your best work to attract more clients.",
    },
    {
      number: 3,
      title: "Deliver Exceptional Experiences",
      description:
        "Work closely with clients, capture their moments beautifully, and build lasting relationships.",
    },
  ];

  const customerSteps: Step[] = [
    {
      number: 1,
      title: "Find Your Perfect Photographer",
      description:
        "Browse through verified photographers based on style, budget, and location to find the best match for your event.",
    },
    {
      number: 2,
      title: "Book with Ease",
      description:
        "Select your preferred photographer, choose your package, and confirm your booking with a secure payment.",
    },
    {
      number: 3,
      title: "Enjoy & Relive Your Moments",
      description:
        "Relax and enjoy your event while your photographer captures every special moment. Receive and cherish high-quality photos.",
    },
  ];
  const [activeTab, setActiveTab] = useState<"photographers" | "customers">(
    "photographers"
  );

  return (
    <div className={styles.container}>
      <div className={` boxWrapper ${styles.container}`}>
        <h1 className={styles.title}>How SHUTR Works</h1>

        <div className={styles.tabContainer}>
          <button
            onClick={() => setActiveTab("photographers")}
            className={`${styles.tabButton} ${
              activeTab === "photographers"
                ? styles.tabButtonPhotographers
                : styles.tabButtonPhotographersInactive
            }`}
          >
            For Photographers
          </button>
          <button
            onClick={() => setActiveTab("customers")}
            className={`${styles.tabButton} ${
              activeTab === "customers"
                ? styles.tabButtonCustomers
                : styles.tabButtonCustomersInactive
            }`}
          >
            For Customers
          </button>
        </div>

        <div className={styles.stepsGrid}>
          {(activeTab === "photographers"
            ? photographerSteps
            : customerSteps
          ).map((step, index) => (
            <div key={step.number} className={styles.stepItem}>
              <div className={styles.stepNumberContainer}>
                <div className={styles.stepNumber}>{step.number}</div>
                {index <
                  (activeTab === "photographers"
                    ? photographerSteps
                    : customerSteps
                  ).length -
                    1 && <div className={styles.stepLine} />}
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
