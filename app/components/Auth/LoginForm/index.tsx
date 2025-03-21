import React from "react";
import styles from "./index.module.css";
import { LoginForm } from "../forms";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className={styles.formContainer}>
      {/* header */}
      <div className={styles.header}>
        <h2>Welcome Back!</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque rerum
          perspiciatis beatae odit tempora velit, error numquam similique minus?
          Hic?
        </p>
      </div>

      {/* form */}
      <LoginForm />
      <div>
        <p className={styles.elseText}>
          Don&apos;t have a account?
          <Link href="/signup"> Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
