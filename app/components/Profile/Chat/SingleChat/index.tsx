"use client";

import React, { FormEvent, useEffect, useState } from "react";
import styles from "./index.module.css";
import { ImAttachment } from "react-icons/im";
import { LuSend } from "react-icons/lu";
// import { usePathname } from "next/navigation";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { webSocketManager } from "@/app/services/webSocketManager";
import { getAllMessages, sendChatMessage } from "@/app/redux/features/chat";

const SingleChat = () => {
  // const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const activeChat = useSelector((state: RootState) => state.chat.activeChat);

  const [messageInput, setMessageInput] = useState("");
  // const [userId, setUserId] = useState<string>("");
  const userId = "67486d75ae68256f9138068c";

  useEffect(() => {
    webSocketManager.connect(
      "chat",
      "ws://localhost:8000/ws/chat/67a4fa3243112c57452c6392"
    );

    webSocketManager.subscribe("chat", (incomingMessage) => {
      console.log("New message received:", incomingMessage);
      // You can dispatch an action to update Redux state here if needed
    });

    return () => {
      webSocketManager.disconnect("chat");
    };
  }, []);

  // useEffect(() => {
  //   const id = pathname.split("/").pop();
  //   if (id) setUserId(id);
  // }, [pathname]);

  useEffect(() => {
    dispatch(getAllMessages({ chatId: "67a4fa3243112c57452c6392" }));
  }, [dispatch]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();

    // setMessageInput("");

    dispatch(sendChatMessage({ text: messageInput, senderId: userId }));
    setMessageInput("");
    console.log("Message sent");
  };

  return (
    <div className={styles.mainDiv}>
      <div>
        {/* image */}
        <h4>John Doe</h4>
      </div>

      <div className={styles.messageList}>
        {activeChat.data.messages.map((message, index) =>
          message.sender === userId ? (
            <OutgoingMessage
              key={index}
              message={message.text}
              time={message.timestamp}
            />
          ) : (
            <IncomingMessage
              key={index}
              message={message.text}
              time={message.timestamp}
            />
          )
        )}
      </div>

      <form className={styles.messageInput} onSubmit={handleSendMessage}>
        <button type="button">
          <ImAttachment />
        </button>
        <input
          type="text"
          placeholder="Write your message here"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button>
          <LuSend />
        </button>
      </form>
    </div>
  );
};

interface messageProps {
  message: string;
  time: string;
}

const IncomingMessage = ({ message, time }: messageProps) => {
  return (
    <div className={styles.incomingMessageWrapper}>
      <div className={styles.incomingMessage}>
        <p>{message}</p>
      </div>
      <span>{time}</span>
    </div>
  );
};

const OutgoingMessage = ({ message, time }: messageProps) => {
  return (
    <div className={styles.outgoingMessageWrapper}>
      <div className={styles.outgoingMessage}>
        <p>{message}</p>
      </div>
      <span>{time}</span>
    </div>
  );
};

export default SingleChat;
