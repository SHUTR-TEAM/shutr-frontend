import React from "react";
import styles from "./index.module.css"
import Image from "next/image";

/* ErrorSection component displays an error message indicating that there are no bookings available. */

export default function ErrorSection() {
    return (
        <div>
            <div className={styles.mainContainer}>
                <div className={styles.container}>
                    <div className={styles.errorMsgContainer}>
                        <div className={styles.errorMsg}>
                            <p>There are no bookings available.</p>
                        <div className={styles.errorImage}>
                            <Image src="/ErrorImage.png" alt="Error" width={280} height={200} />
                        </div>                       
                        </div>                       
                    </div>
                </div>
            </div>
        </div>
    );
}