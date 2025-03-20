import React from "react";
import styles from "./index.module.css";
import authStyles from "../auth.module.css";
import { RegisterForm } from "../forms";


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
        <div className={styles.grid}>
          <RegisterForm />
          {/* <label className={authStyles.inputLabel}>
            <span>NIC</span>
            <input type="text" placeholder="Enter your email address" />
          </label> */}
          <hr></hr>
          <p>Already have a account? {' '} 
             <a href=' annonimus' >Login here</a>
          </p>
        </div>
    </div>
  );
};

export default SignupForm;
