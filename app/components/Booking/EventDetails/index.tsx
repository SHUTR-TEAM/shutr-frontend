"use client";

import { useFormContext, useFormState } from "react-hook-form";
import styles from "./index.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
// import { useState } from "react";
// import { Value } from "react-calendar/dist/esm/shared/types.js";

export default function EventDetails() {
  const { register, setValue } = useFormContext();
  const { errors } = useFormState();
  const disabledDates = [new Date(2025, 2, 15), new Date(2025, 2, 20)];

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>Event Details</h3>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="eventType">Event Type *</label>
          <input
            id="eventType"
            placeholder="Wedding, Portrait, Corporate, etc."
            {...register("event.type", { required: "Field is required" })}
          />
          {errors.event &&
            (errors.event as Record<string, { message: string }>).type
              ?.message && (
              <p className={styles.error}>
                {
                  (errors.event as Record<string, { message: string }>).type
                    .message
                }
              </p>
            )}
        </div>

        {/* <div className={styles.formGroup}>
          <label htmlFor="eventDate">Event Date *</label>
          <input
            id="eventDate"
            type="date"
            {...register("eventDate", { required: true })}
          />
        </div> */}

        {/* <div className={styles.formGroup}>
          <label htmlFor="startTime">Start Time *</label>
          <input
            id="startTime"
            type="time"
            {...register("startTime", { required: true })}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="endTime">End Time *</label>
          <input
            id="endTime"
            type="time"
            {...register("endTime", { required: true })}
          />
        </div> */}

        <div className={styles.formGroup}>
          <label htmlFor="location">Event Location *</label>
          <input
            id="location"
            placeholder="Enter event location"
            {...register("event.address", { required: "Field is required" })}
          />
          {errors.event &&
            (errors.event as Record<string, { message: string }>).address
              ?.message && (
              <p className={styles.error}>
                {
                  (errors.event as Record<string, { message: string }>).address
                    .message
                }
              </p>
            )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="guestCount">Guest Count *</label>
          <input
            id="guestCount"
            type="number"
            min="1"
            placeholder="Number of guests"
            {...register("event.guest_count", {
              required: "Field is required",
              min: 1,
            })}
          />
          {errors.event &&
            (errors.event as Record<string, { message: string }>).guest_count
              ?.message && (
              <p className={styles.error}>
                {
                  (errors.event as Record<string, { message: string }>)
                    .guest_count.message
                }
              </p>
            )}
        </div>

        <div className={styles.formGroupFull}>
          <label>Event Setting *</label>
          {/* <RadioGroup defaultValue="indoor" className={styles.radioGroup}>
            <div className={styles.radioOption}>
              <RadioGroupItem value="indoor" id="indoor" {...register("eventSetting", { required: true })} />
              <label htmlFor="indoor">Indoor</label>
            </div>
            <div className={styles.radioOption}>
              <RadioGroupItem value="outdoor" id="outdoor" {...register("eventSetting", { required: true })} />
              <label htmlFor="outdoor">Outdoor</label>
            </div>
          </RadioGroup> */}

          <div className={styles.radioGroup}>
            <div className={styles.radioOption}>
              <input
                type="radio"
                id="eventSetting"
                value="outdoor"
                {...register("event.event_setting", {
                  required: "Field is required",
                })}
              />
              <label htmlFor="outdoor">Outdoor</label>
            </div>
            <div className={styles.radioOption}>
              <input
                type="radio"
                id="eventSetting"
                value="indoor"
                {...register("event.event_setting", {
                  required: "Field is required",
                })}
              />
              <label htmlFor="indoor">Indoor</label>
            </div>
          </div>
          {errors.event &&
            (errors.event as Record<string, { message: string }>).event_setting
              ?.message && (
              <p className={styles.error}>
                {
                  (errors.event as Record<string, { message: string }>)
                    .event_setting.message
                }
              </p>
            )}
        </div>
      </div>
      <div className={styles.calendarContainer}>
        <span>Select Date *</span>
        <Calendar
          onChange={(value) => {
            setValue("event.date", value?.toString());
          }}
          tileDisabled={({ date }) =>
            disabledDates.some(
              (disabledDate) =>
                date.getFullYear() === disabledDate.getFullYear() &&
                date.getMonth() === disabledDate.getMonth() &&
                date.getDate() === disabledDate.getDate()
            )
          }
        />

        {errors.event &&
          (errors.event as Record<string, { message: string }>).date
            ?.message && (
            <p className={styles.error}>
              {
                (errors.event as Record<string, { message: string }>).date
                  .message
              }
            </p>
          )}
        {/* <input
          type="hidden"
          id="eventDate"
          value={selectedDate?.toLocaleString() || ""}
          {...register("eventDate", { required: true })}
        /> */}
      </div>
    </div>
  );
}
