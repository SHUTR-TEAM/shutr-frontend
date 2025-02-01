"use client";

import React, { FormEvent, useState } from "react";
import styles from "./index.module.css";
import { ImAttachment } from "react-icons/im";
import { LuSend } from "react-icons/lu";

const SingleChat = () => {
  const userId = 1;
  const [chatMessages, setChatMessages] = useState([
    {
      userId: 1,
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate doloribus facere officia asperiores possimus? Voluptatem sequi soluta labore ad non.",
      time: "10:00 AM",
    },
    {
      userId: 2,
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate doloribus facere officia asperiores possimus? Voluptatem sequi soluta labore ad non.",
      time: "11:00 AM",
    },
  ]);

  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = (e: FormEvent) => {
    console.log("Message sent");
    e.preventDefault();

    setChatMessages((prev) => [
      ...prev,
      {
        userId: userId,
        message: messageInput,
        time: new Date().toLocaleTimeString(),
      },
    ]);

    setMessageInput("");
  };
  return (
    <div className={styles.mainDiv}>
      <div>
        {/* image */}
        <h4>John Doe</h4>
      </div>

      <div className={styles.messageList}>
        {chatMessages.map((message, index) =>
          message.userId === userId ? (
            <OutgoingMessage
              key={index}
              message={message.message}
              time={message.time}
            />
          ) : (
            <IncomingMessage
              key={index}
              message={message.message}
              time={message.time}
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
