import { ChangeEvent } from "react";
import Link from "next/link";
import styles from "./index.module.css";

interface Props {
  labelId: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  children: React.ReactNode;
  link?: {
    linkText: string;
    linkUrl: string;
  };
  required?: boolean;
}

export default function Input({
  labelId,
  type,
  onChange,
  value,
  children,
  link,
  required = false,
}: Props) {
  return (
    <div>
      <div>
        <label htmlFor={labelId} className={styles.inputLabel}>
          {children}
        </label>
      </div>
      <div>
        <input
          id={labelId}
          name={labelId}
          type={type}
          onChange={onChange}
          value={value}
          required={required}
          className={styles.inputField}
        />
      </div>
      {link && (
        <div className={styles.linkWrapper}>
          <Link href={link.linkUrl}>{link.linkText}</Link>
        </div>
      )}
    </div>
  );
}
