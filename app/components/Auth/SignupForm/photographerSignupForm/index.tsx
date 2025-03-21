import React from "react";
import styles from "./index.module.css";
import Link from "next/link";
import { PhotographerRegisterForm } from "../../forms";

const PhotographerSignupForm = () => {
  return (
    <div className={styles.formContainer}>
      {/* header */}
      <div className={styles.header}>
        <h2>Welcome to SHUTR!</h2>
        <p>
          Join SHUTR as a professional photographer and showcase your talent to
          clients worldwide. Create your profile, manage bookings, and grow your
          business with ease. Let your lens tell stories that inspire!
        </p>
      </div>

      {/* form */}
      <PhotographerRegisterForm />
      <div className={styles.grid}>
        {/* <hr></hr> */}
        <p className={styles.elseText}>
          Already have a account? <Link href="/signin">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default PhotographerSignupForm;
