import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

const PaymentSuccessPage = () => {
  return (
    <div className={styles.mainDivWrapper}>
      <div className={styles.mainDiv}>
        <div>
          <div>
            <h1>Payment Successful!</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt
              similique debitis itaque eum corporis numquam dolorem labore aut
              eveniet est!
            </p>
          </div>
          <div className={styles.details}>
            <Link href={""} className={styles.supportLink}>
              Contact Support
            </Link>
          </div>
        </div>
        <Image
          src="/illustrations/success.png"
          alt="payment"
          className={styles.image}
          width={500}
          height={500}
          layout="responsive"
        />
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
