import React from "react";
import styles from "./page.module.css";
import CustomerSignupForm from "@/app/components/Auth/SignupForm/customerSignUp";

const Signup = () => {
  return (
    <div className={styles.mainDiv}>
      <CustomerSignupForm />
    </div>
  );
};

export default Signup;
