import React from "react";
import styles from "./page.module.css";
import PhotographerSignupForm from "@/app/components/Auth/SignupForm/photographerSignupForm";

const Signup = () => {
  return (
    <div className={styles.mainDiv}>
      <PhotographerSignupForm />
    </div>
  );
};

export default Signup;
