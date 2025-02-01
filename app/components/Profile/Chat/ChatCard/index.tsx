import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./index.module.css";

interface ChatCardProps {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  imgUrl: string;
  unreadCount: number;
}

const ChatCard = ({
  id,
  name,
  lastMessage,
  time,
  imgUrl,
  unreadCount,
}: ChatCardProps) => {
  return (
    <div className={styles.mainDiv}>
      <Link href={`/chat/${id}`}>
        <div className={styles.chatCardLeft}>
          <Image src={imgUrl} alt={name} width={50} height={50} />
          <div>
            <h4>{name}</h4>
            <p>{lastMessage}</p>
          </div>
        </div>
        <div className={styles.chatCardRight}>
          {unreadCount > 0 && (
            <span className={styles.unreadCount}>{unreadCount}</span>
          )}
          <p>{time}</p>
        </div>
      </Link>
    </div>
  );
};

export default ChatCard;
