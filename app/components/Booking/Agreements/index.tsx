"use client";

import { useFormContext } from "react-hook-form";
import styles from "./index.module.css";

export default function Agreements() {
  const { register } = useFormContext();

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>Additional Notes & Agreements</h3>

      <div className={styles.formSection}>
        <label htmlFor="weatherPlan">
          Weather Backup Plan (for outdoor events)
        </label>
        <textarea
          id="weatherPlan"
          placeholder="Describe your backup plan in case of bad weather"
          className={styles.textarea}
          {...register("weatherPlan")}
        />
      </div>

      <div className={styles.agreements}>
        <div className={styles.agreement}>
          {/* <Checkbox id="permissions" {...register("permissions", { required: true })} /> */}
          <input
            type="checkbox"
            id="permissions"
            {...register("permissions", { required: true })}
          />
          <label htmlFor="permissions" className={styles.agreementlabel}>
            I understand and agree to the photography permissions and
            restrictions
          </label>
        </div>

        <div className={styles.agreement}>
          {/* <Checkbox id="terms" {...register("terms", { required: true })} /> */}
          <input
            type="checkbox"
            id="terms"
            {...register("terms", { required: true })}
          />
          <label htmlFor="terms" className={styles.agreementlabel}>
            I have read and accept the terms and conditions
          </label>
        </div>

        <div className={styles.agreement}>
          {/* <Checkbox id="cancellation" {...register("cancellation", { required: true })} /> */}
          <input
            type="checkbox"
            id="cancellation"
            {...register("cancellation", { required: true })}
          />
          <label htmlFor="cancellation" className={styles.agreementlabel}>
            I agree to the cancellation and rescheduling policies
          </label>
        </div>
      </div>

      <div className={styles.notice}>
        <p>By submitting this booking request, you acknowledge that:</p>
        <ul>
          <li>
            A 25% non-refundable deposit is required to secure your booking
          </li>
          <li>The remaining balance is due 7 days before the event</li>
          <li>
            Rescheduling must be requested at least 14 days before the event
          </li>
          <li>All raw files remain the property of the photographer</li>
        </ul>
      </div>
    </div>
  );
}
