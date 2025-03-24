"use client";

import { useFormContext } from "react-hook-form";
import styles from "./index.module.css";
import { useFormState } from "react-hook-form";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

const ClientInformation = () => {
  const { register } = useFormContext();
  const { errors } = useFormState();

  const user = useSelector((state: RootState) => state.auth.user);

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
            onClick={() => console.log(errors)}
            defaultValue={user?.first_name}
          />
          {errors.client &&
            (errors.client as Record<string, { message: string }>).first_name
              ?.message && (
              <p className={styles.error}>
                {
                  (errors.client as Record<string, { message: string }>)
                    .first_name.message
                }
              </p>
            )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastName">Last Name *</label>
          <input
            id="lastName"
            placeholder="Enter your last name"
            {...register("client.last_name", { required: "Field is required" })}
            defaultValue={user?.last_name}
          />
          {errors.client &&
            (errors.client as Record<string, { message: string }>).last_name
              ?.message && (
              <p className={styles.error}>
                {
                  (errors.client as Record<string, { message: string }>)
                    .last_name.message
                }
              </p>
            )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="contactNumber">Contact Number *</label>
          <input
            id="contactNumber"
            placeholder="Enter your phone number"
            {...register("client.phone", { required: "Field is required" })}
            defaultValue={user?.phone_num}
          />
          {errors.client &&
            (errors.client as Record<string, { message: string }>).phone
              ?.message && (
              <p className={styles.error}>
                {
                  (errors.client as Record<string, { message: string }>).phone
                    .message
                }
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
            defaultValue={user?.email}
          />
          {errors.client &&
            (errors.client as Record<string, { message: string }>).email
              ?.message && (
              <p className={styles.error}>
                {
                  (errors.client as Record<string, { message: string }>).email
                    .message
                }
              </p>
            )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address">Address (Optional)</label>
          <input
            id="address"
            placeholder="Enter your address"
            {...register("client.address")}
            defaultValue={user?.address}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="nic">NIC number *</label>
          <input
            id="nic"
            placeholder="Enter your NIC number"
            {...register("client.nic", { required: "Field is required" })}
            defaultValue={user?.nic}
          />
          {errors.client &&
            (errors.client as Record<string, { message: string }>).nic
              ?.message && (
              <p className={styles.error}>
                {
                  (errors.client as Record<string, { message: string }>).nic
                    .message
                }
              </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default ClientInformation;
