import React from "react";
import styles from "./page.module.css";
import SignupForm from "@/app/components/Auth/SignupForm";

const Signup = () => {
  return (
    <div className={styles.mainDiv}>
      <SignupForm />
    </div>
  );
};

export default Signup;
