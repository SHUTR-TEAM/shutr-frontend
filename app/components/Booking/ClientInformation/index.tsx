"use client";

import { useFormContext } from "react-hook-form";
import styles from "./index.module.css";

import React from "react";

const ClientInformation = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>Client Information</h3>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="firstName">First Name *</label>
          <input
            id="firstName"
            placeholder="Enter your first name"
            {...register("client.first_name", {
              required: "Field is required",
            })}
          />
          {errors.firstName && (
            <p className={styles.error}>
              {errors.firstName.message?.toString()}
            </p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastName">Last Name *</label>
          <input
            id="lastName"
            placeholder="Enter your last name"
            {...register("client.last_name", { required: "Field is required" })}
          />
          {errors.lastName && (
            <p className={styles.error}>
              {errors.lastName.message?.toString()}
            </p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="contactNumber">Contact Number *</label>
          <input
            id="contactNumber"
            placeholder="Enter your phone number"
            {...register("client.phone", { required: "Field is required" })}
          />
          {errors.contactNumber && (
            <p className={styles.error}>
              {errors.contactNumber.message?.toString()}
            </p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email Address *</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("client.email", {
              required: "Field is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message?.toString()}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address">Address (Optional)</label>
          <input
            id="address"
            placeholder="Enter your address"
            {...register("client.address")}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="nic">NIC number *</label>
          <input
            id="nic"
            placeholder="Enter your NIC number"
            {...register("client.nic", { required: "Field is required" })}
          />
          {errors.nic && (
            <p className={styles.error}>{errors.nic.message?.toString()}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientInformation;
