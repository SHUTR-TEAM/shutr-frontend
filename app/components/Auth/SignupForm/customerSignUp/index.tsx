import React from "react";
import styles from "./index.module.css";
import Link from "next/link";
import UserRegisterForm from "../../forms/UserRegisterForm";

const CustomerSignupForm = () => {
  return (
    <div className={styles.formContainer}>
      {/* header */}
      <div className={styles.header}>
        <h2>Welcome to SHUTR!</h2>
        <p>
          Join SHUTR and connect with your ideal professional photographers.
          Sign up to explore stunning portfolios, book photography sessions, and
          create unforgettable memories. Let’s capture your moments together!
        </p>
      </div>

      {/* form */}
      <UserRegisterForm />
      <div className={styles.grid}>
        <p className={styles.elseText}>
          Already have a account? <Link href="/signin">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default CustomerSignupForm;
