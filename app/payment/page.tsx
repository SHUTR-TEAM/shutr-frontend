"use client";

import Image from "next/image";
import React from "react";
import styles from "./page.module.css";
import md5 from "crypto-js/md5";
import { useParams } from "next/navigation";

const PaymentPage = () => {
  const params = useParams<{ userId: string; photographerId: string }>();

  // const user = useSelector((state: any) => state.auth.userDetails.details);
  // const video = useSelector((state: any) => state.video.activeVideo);

  // const path = usePathname();
  // const pathArray = path.split("/");
  // const videoId = pathArray[pathArray.length - 1];

  // const BASE_URL = "https://backend.correctlearner.com/api";
  const notify_url = `http://localhost:3000`;
  const cancel_url = `http://localhost:3000`;
  const return_url = `http://localhost:3000`;

  const merchant_id = 1229874;
  const merchantSecret = "MTkzNTI1OTQyMjAyOTYzMzg5MjY4MjQwMTM4NzEyNTMxMTI2NTM=";

  const now = new Date().getTime();
  const orderId = `${now}-${params.userId}-${params.photographerId}`;
  const hashedSecret = md5(merchantSecret).toString().toUpperCase();
  const amountFormated = 25000;
  const currency = "LKR";
  const hash = md5(
    merchant_id + orderId + amountFormated + currency + hashedSecret
  )
    .toString()
    .toUpperCase();

  return (
    <div className={styles.mainDivWrapper}>
      <div className={styles.mainDiv}>
        <div>
          <div>
            <h1>Please pay the due amount</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt
              similique debitis itaque eum corporis numquam dolorem labore aut
              eveniet est!
            </p>
          </div>
          <div className={styles.paymentDetails}>
            <h3>25,000 LKR</h3>
            <form
              method="post"
              action="https://sandbox.payhere.lk/pay/checkout"
            >
              <input type="hidden" name="merchant_id" value={merchant_id} />
              <input type="hidden" name="return_url" value={return_url} />
              <input type="hidden" name="cancel_url" value={cancel_url} />
              <input type="hidden" name="notify_url" value={notify_url} />
              <input type="hidden" name="order_id" value={orderId} />
              <input type="hidden" name="items" value={""} />
              <input type="hidden" name="currency" value={currency} />
              <input type="hidden" name="amount" value={amountFormated} />
              <input type="hidden" name="first_name" value={"kk"} />
              <input type="hidden" name="last_name" value="kk" />
              <input type="hidden" name="email" value="pabodhap01@gmail.com" />
              <input type="hidden" name="phone" value="234" />
              <input type="hidden" name="address" value="No.1, Galle Road" />
              <input type="hidden" name="city" value="Colombo" />
              <input type="hidden" name="country" value="Sri Lanka" />
              <input type="hidden" name="hash" value={hash} />
              <button className={styles.payBtn}>Proceed to Pay</button>
            </form>
          </div>
        </div>
        <Image
          src="/illustrations/payment.png"
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

export default PaymentPage;
