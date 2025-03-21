import React from "react";
import styles from "./index.module.css";
import { RegisterForm } from "@/app/components/Auth/forms";


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
      <RegisterForm />
        <div className={styles.grid}>
          
          {/* <label className={authStyles.inputLabel}>
            <span>NIC</span>
            <input type="text" placeholder="Enter your email address" />
          </label> */}
          <hr></hr>
          <p className={styles.elseText}>Already have a account? {' '}
             <a
              href='../LoginForm/index.tsx' >Login here</a>
          </p>
        </div>
    
    </div>
  );
};

export default SignupForm;
