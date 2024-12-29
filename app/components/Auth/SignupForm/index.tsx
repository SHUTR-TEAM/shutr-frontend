import React from "react";
import styles from "./index.module.css";
import authStyles from "../auth.module.css";
import Image from "next/image";

const SignupForm = () => {
  return (
    <div className={styles.formContainer}>
      {/* header */}
      <div>
        <h2>Sign up</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque rerum
          perspiciatis beatae odit tempora velit, error numquam similique minus?
          Hic?
        </p>
      </div>

      {/* form */}
      <form>
        <div className={styles.grid}>
          <label className={authStyles.inputLabel}>
            <span>First Name</span>
            <input type="text" placeholder="Enter your first name" />
          </label>
          <label className={authStyles.inputLabel}>
            <span>Last Name</span>
            <input type="text" placeholder="Enter your last name" />
          </label>
          <label className={authStyles.inputLabel}>
            <span>Email</span>
            <input type="text" placeholder="Enter your email address" />
          </label>
          <label className={authStyles.inputLabel}>
            <span>Mobile No</span>
            <input type="text" placeholder="Enter your mobile no" />
          </label>
          {/* <label className={authStyles.inputLabel}>
            <span>NIC</span>
            <input type="text" placeholder="Enter your email address" />
          </label> */}
          <label className={authStyles.inputLabel}>
            <span>Password</span>
            <input type="password" placeholder="Enter a password" />
          </label>
          <label className={authStyles.inputLabel}>
            <span>Confirm Password</span>
            <input type="password" placeholder="Enter the password again" />
          </label>
        </div>
        <button type="submit" className={styles.ctaBtn}>
          Sign up
        </button>
      </form>

      <div>
        <div className={styles.elseText}>
          <hr />
          <span>or sign up with</span>
        </div>

        <div className={styles.btnWrapper}>
          <button className={styles.linkBtn}>
            <Image
              src="/icons/google-icon.svg"
              alt="Google icon"
              width={16}
              height={16}
            />
            <span>Google</span>
          </button>
          <button className={styles.linkBtn}>
            <Image
              src="/icons/facebook-icon.svg"
              alt="Facebook icon"
              width={16}
              height={16}
            />
            <span>Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
