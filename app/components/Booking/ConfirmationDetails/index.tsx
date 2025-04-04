import React from "react";
import styles from "./index.module.css";
import { BadgeDollarSign, Camera, ShieldCheck } from "lucide-react";

const ConfirmationDetails = () => {
  return (
    <div className={styles.mainDiv}>
      {/* <div className={styles.itemWrapper}>
        <h2>Review Booking Details</h2>
        <p>Review the details below and click submit to confirm your booking</p>

        <div>
          <h3>Event Details</h3>
          <p>Wedding</p>
          <p>12th December 2022</p>
          <p>12:00 PM - 5:00 PM</p>
          <p>Location: 1234 Wedding Hall, Lahore</p>
          <p>Guest Count: 200</p>
        </div>

        <table className={styles.priceTable}>
          <tbody>
            <tr>
              <td>Standard Package</td>
              <td>Rs. 130,000</td>
            </tr>
            <tr>
              <td>Booking fee</td>
              <td>Rs. 10,000</td>
            </tr>
            <tr className={styles.totalRow}>
              <td>Grand total</td>
              <td>Rs. 140,000</td>
            </tr>
          </tbody>
        </table>
      </div> */}

      <div className={styles.itemWrapper}>
        <h2>Book with confidence</h2>
        <div className={styles.features}>
          <div className={styles.featureWrapper}>
            <ShieldCheck />
            <div>
              <h4>Secure Payments</h4>
              <p>
                Your transactions are safe and protected with our trusted
                payment system.
              </p>
            </div>
          </div>

          <div className={styles.featureWrapper}>
            <BadgeDollarSign />
            <div>
              <h4>Competitive Prices</h4>
              <p>
                We offer competitive pricing to ensure you get the best deal for
                your photography session.
              </p>
            </div>
          </div>

          <div className={styles.featureWrapper}>
            <Camera />
            <div>
              <h4>Trusted Photographers</h4>
              <p>
                Our network includes verified professionals to deliver
                high-quality photography services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDetails;
