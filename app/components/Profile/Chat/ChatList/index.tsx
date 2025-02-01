import React from "react";
import ChatCard from "../ChatCard";
import styles from "./index.module.css";

const ChatList = () => {
  const dataList = [
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hello there",
      time: "1:00 PM",
      imgUrl: "/pp.png",
      unreadCount: 2,
    },
    {
      id: 2,
      name: "Jane Doe",
      lastMessage: "Hello there",
      time: "1:00 PM",
      imgUrl: "/pp.png",
      unreadCount: 2,
    },
    {
      id: 3,
      name: "John Doe",
      lastMessage: "Hello there",
      time: "1:00 PM",
      imgUrl: "/pp.png",
      unreadCount: 2,
    },
    {
      id: 4,
      name: "Jane Doe",
      lastMessage: "Hello there",
      time: "1:00 PM",
      imgUrl: "/pp.png",
      unreadCount: 2,
    },
  ];
  return (
    <div className={styles.mainDiv}>
      {dataList.map((data) => (
        <div key={data.id}>
          <ChatCard
            id={data.id}
            name={data.name}
            lastMessage={data.lastMessage}
            time={data.time}
            imgUrl={data.imgUrl}
            unreadCount={data.unreadCount}
          />
        </div>
      ))}
    </div>
  );
};

export default ChatList;
