"use client";

import { useRegister } from "../hooks";
import { Form } from ".";
import styles from "./index.module.css";

export default function PhotographerRegisterForm() {
  const {
    first_name,
    last_name,
    email,
    password,
    re_password,
    phone_num,
    nic,
    isLoading,
    onChange,
    onSubmit,
    setRole,
  } = useRegister();

  setRole("photographer");

  const config = [
    {
      labelText: "First name",
      labelId: "first_name",
      type: "text",
      value: first_name,
      required: true,
    },
    {
      labelText: "Last name",
      labelId: "last_name",
      type: "text",
      value: last_name,
      required: true,
    },
    {
      labelText: "Email address",
      labelId: "email",
      type: "email",
      value: email,
      required: true,
    },
    {
      labelText: "Phone Number",
      labelId: "phone_num",
      type: "text",
      value: phone_num,
      required: true,
    },
    {
      labelText: "Password",
      labelId: "password",
      type: "password",
      value: password,
      required: true,
    },
    {
      labelText: "Confirm password",
      labelId: "re_password",
      type: "password",
      value: re_password,
      required: true,
    },
    {
      labelText: "NIC",
      labelId: "nic",
      type: "text",
      value: nic,
      required: true,
    },
  ];

  return (
    <div className={styles.grid}>
      <Form
        config={config}
        isLoading={isLoading}
        btnText="Sign up"
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
