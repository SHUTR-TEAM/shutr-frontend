import React from "react";
import styles from "./index.module.css"

/* LoadingSection component displays a loading message while content is being fetched or processed. */
 
export default function LoadingSection() {
    return (
        <div>
            <div className={styles.mainContainer}>
                <div className={styles.container}>
                    <div className={styles.errorMsgContainer}>
                        <div className={styles.errorMsg}>
                            <p>Loading...</p>                      
                        </div>                       
                    </div>
                </div>
            </div>
        </div>
    );
}