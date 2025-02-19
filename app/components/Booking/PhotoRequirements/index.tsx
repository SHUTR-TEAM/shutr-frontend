"use client";

import { useFormContext } from "react-hook-form";
import styles from "./index.module.css";

export default function PhotoRequirements() {
  const { register } = useFormContext();

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>Photography Requirements</h3>

      {/* <div className={styles.formSection}>
        <label>Coverage Duration *</label>
        <Select defaultValue="4" {...register("coverageDuration", { required: true })}>
          <SelectTrigger>
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">2 Hours</SelectItem>
            <SelectItem value="4">4 Hours</SelectItem>
            <SelectItem value="6">6 Hours</SelectItem>
            <SelectItem value="8">8 Hours</SelectItem>
            <SelectItem value="full">Full Day (10+ Hours)</SelectItem>
          </SelectContent>
        </Select>
      </div> */}

      <div className={styles.formSection}>
        <label>Required Shots *</label>
        <div className={styles.checkboxGrid}>
          <div className={styles.checkboxItem}>
            <input
              type="checkbox"
              id="couplePortraits"
              {...register("requiredShots")}
              value="couplePortraits"
            />
            <label htmlFor="couplePortraits">Couple Portraits</label>
          </div>
          <div className={styles.checkboxItem}>
            <input
              type="checkbox"
              id="groupPhotos"
              {...register("requiredShots")}
              value="groupPhotos"
            />
            <label htmlFor="groupPhotos">Group Photos</label>
          </div>
          <div className={styles.checkboxItem}>
            <input
              type="checkbox"
              id="candidMoments"
              {...register("requiredShots")}
              value="candidMoments"
            />
            <label htmlFor="candidMoments">Candid Moments</label>
          </div>
          <div className={styles.checkboxItem}>
            <input
              type="checkbox"
              id="venueShots"
              {...register("requiredShots")}
              value="venueShots"
            />
            <label htmlFor="venueShots">Venue Shots</label>
          </div>
          <div className={styles.checkboxItem}>
            <input
              type="checkbox"
              id="detailShots"
              {...register("requiredShots")}
              value="detailShots"
            />
            <label htmlFor="detailShots">Detail Shots</label>
          </div>
          <div className={styles.checkboxItem}>
            <input
              type="checkbox"
              id="familyPortraits"
              {...register("requiredShots")}
              value="familyPortraits"
            />
            <label htmlFor="familyPortraits">Family Portraits</label>
          </div>
        </div>
      </div>

      <div className={styles.formSection}>
        <label>Special Requests</label>
        <textarea
          placeholder="Any special moments or shots you'd like us to capture?"
          className={styles.textarea}
          {...register("specialRequests")}
        />
      </div>
    </div>
  );
}
