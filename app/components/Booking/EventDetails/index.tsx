"use client";

import { useFormContext } from "react-hook-form";
import styles from "./index.module.css";

export default function EventDetails() {
  const { register } = useFormContext();

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>Event Details</h3>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="eventType">Event Type *</label>
          <input
            id="eventType"
            placeholder="Wedding, Portrait, Corporate, etc."
            {...register("eventType", { required: true })}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="eventDate">Event Date *</label>
          <input
            id="eventDate"
            type="date"
            {...register("eventDate", { required: true })}
          />
        </div>

        <div className={styles.formGroup}>
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
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="location">Event Location *</label>
          <input
            id="location"
            placeholder="Enter event location"
            {...register("location", { required: true })}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="guestCount">Guest Count *</label>
          <input
            id="guestCount"
            type="number"
            min="1"
            placeholder="Number of guests"
            {...register("guestCount", { required: true, min: 1 })}
          />
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
                {...register("eventSetting", { required: true })}
              />
              <label htmlFor="outdoor">Outdoor</label>
            </div>
            <div className={styles.radioOption}>
              <input
                type="radio"
                id="eventSetting"
                value="indoor"
                {...register("eventSetting", { required: true })}
              />
              <label htmlFor="indoor">Indoor</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
