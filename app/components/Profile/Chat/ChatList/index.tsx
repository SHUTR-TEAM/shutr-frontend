"use client";

import React, { useEffect } from "react";
import ChatCard from "../ChatCard";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { getAllChats } from "@/app/redux/features/chat";

const ChatList = () => {
  // const dataList = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     lastMessage: "Hello there",
  //     time: "1:00 PM",
  //     imgUrl: "/pp.png",
  //     unreadCount: 2,
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Doe",
  //     lastMessage: "Hello there",
  //     time: "1:00 PM",
  //     imgUrl: "/pp.png",
  //     unreadCount: 2,
  //   },
  //   {
  //     id: 3,
  //     name: "John Doe",
  //     lastMessage: "Hello there",
  //     time: "1:00 PM",
  //     imgUrl: "/pp.png",
  //     unreadCount: 2,
  //   },
  //   {
  //     id: 4,
  //     name: "Jane Doe",
  //     lastMessage: "Hello there",
  //     time: "1:00 PM",
  //     imgUrl: "/pp.png",
  //     unreadCount: 2,
  //   },
  // ];

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    // fetch all chats
    dispatch(getAllChats({ participantId: "" }));
  }, [dispatch]);

  const allChats = useSelector((state: RootState) => state.chat.allChats);

  return (
    <div className={styles.mainDiv}>
      {allChats.data &&
        allChats.data.map((data) => (
          <div key={data.id}>
            <ChatCard
              id={data.id}
              name={data.name}
              lastMessage={data.last_message?.text}
              time={data.last_message?.timestamp}
              imgUrl={"/pp.png"}
              unreadCount={0}
            />
          </div>
        ))}
    </div>
  );
};

export default ChatList;
