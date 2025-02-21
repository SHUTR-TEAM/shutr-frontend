import React from "react";
import styles from "./index.module.css";
import Image from "next/image";
import { FaClock } from "react-icons/fa";
import { IoMdCamera } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import Link from "next/link";

interface CartSectionProps {
    //'data' is an array of objects containing details of each event/item
    data: {
        picture: string;
        name: string;
        status: string;
        time: string;
        event: string;
        location: string;
    }[];
}

// Define the functional component 'CartSection' that takes 'data' as a prop
const CartSection: React.FC<CartSectionProps> = ({data}) => {

    return(
        <div>
            <div className={styles.cardsContainer}>
                {data.map((item,index)=>(
                    // Loop through the 'data' array and create a card for each item
                    <Link href={" "} key={index} className={styles.cardContainer}>
                        <div className={styles.image}>
                            <Image src={item.picture}alt={item.name} width={190} height={150}/>
                        </div>
                        <div className={styles.status}>
                            <span>{item.status}</span>
                            <span > <FaClock className={styles.clockIcon}/>{item.time}</span>
                        </div>
                        <div className={styles.details}>
                            <div className={styles.name}>{item.name}</div>
                            <div className={styles.type}> <IoMdCamera className={styles.icons}/>{item.event}</div>
                            <div className={styles.location}> <IoLocationSharp className={styles.icons}/>{item.location}</div>
                        </div>              
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default CartSection;