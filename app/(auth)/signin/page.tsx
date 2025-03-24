import React from "react";
import styles from "./page.module.css";
import LoginPage from "@/app/components/Auth/LoginForm";

const Signin = () => {
  return (
    <div className={styles.mainDiv}>
      <LoginPage />
    </div>
  );
};

export default Signin;
