"use client";

import { useFormContext } from "react-hook-form";
import styles from "./index.module.css";

export default function Agreements() {
  const { register } = useFormContext();

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>Additional Notes & Agreements</h3>

      <div className={styles.formSection}>
        <label htmlFor="additional_notes">Additional Notes</label>
        <textarea
          id="additional_notes"
          placeholder="Add any additional notes or requests here"
          className={styles.textarea}
          {...register("additional_notes")}
        />
      </div>

      <div className={styles.agreements}>
        {/* <div className={styles.agreement}>
          <input
            type="checkbox"
            id="permissions"
            {...register("permissions", { required: true })}
          />
          <label htmlFor="permissions" className={styles.agreementlabel}>
            I understand and agree to the photography permissions and
            restrictions
          </label>
        </div> */}

        <div className={styles.agreement}>
          {/* <Checkbox id="terms" {...register("terms", { required: true })} /> */}
          <input
            type="checkbox"
            id="terms_and_conditions_agreed"
            {...register("terms_and_conditions_agreed", { required: true })}
          />
          <label
            htmlFor="terms_and_conditions_agreed"
            className={styles.agreementlabel}
          >
            I have read and accept the terms and conditions
          </label>
        </div>

        <div className={styles.agreement}>
          {/* <Checkbox id="cancellation" {...register("cancellation", { required: true })} /> */}
          <input
            type="checkbox"
            id="cancellation_policy_agreed"
            {...register("cancellation_policy_agreed", { required: true })}
          />
          <label
            htmlFor="cancellation_policy_agreed"
            className={styles.agreementlabel}
          >
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
