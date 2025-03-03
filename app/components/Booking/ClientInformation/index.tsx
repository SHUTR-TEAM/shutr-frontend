"use client";

import { useFormContext } from "react-hook-form";
import styles from "./index.module.css";

import React from "react";

const ClientInformation = () => {
  const { register } = useFormContext();

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>Client Information</h3>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="firstName">First Name *</label>
          <input
            id="firstName"
            placeholder="Enter your first name"
            {...register("firstName", { required: true })}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastName">Last Name *</label>
          <input
            id="lastName"
            placeholder="Enter your last name"
            {...register("lastName", { required: true })}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="contactNumber">Contact Number *</label>
          <input
            id="contactNumber"
            placeholder="Enter your phone number"
            {...register("contactNumber", { required: true })}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email Address *</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address">Address (Optional)</label>
          <input
            id="address"
            placeholder="Enter your address"
            {...register("address")}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="nic">NIC number *</label>
          <input
            id="nic"
            placeholder="Enter your NIC number"
            {...register("nic")}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientInformation;
