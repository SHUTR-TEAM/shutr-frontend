import React from "react";
import styles from "../ChatWindow/ChatWindow.module.css";

const ChatWindows: React.FC = () => {
  const messages = [
    { id: 1, text: "Hello! SHUTR", isSent: false, timestamp: "9:50 AM" },
    { id: 2, text: "Hello! SHUTR", isSent: true, timestamp: "9:50 AM" },
    { id: 3, text: "Hello! SHUTR", isSent: true, timestamp: "9:50 AM" },
  ];

  return (
    <div className={styles.chatWindow}>
      <div className={styles.header}>
        <img
          src="/pic.png"
          alt="User Avatar"
          className={styles.avatar}
        />
        <span className={styles.userName}>John Doe</span>
      </div>
      <div className={styles.messages}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${
              message.isSent ? styles.sent : styles.received
            }`}
          >
            {!message.isSent && (
              <img
                src="/pic.png"
                alt="Avatar"
                className={styles.messageAvatar}
              />
            )}
            <div className={styles.messageContent}>
              <p>{message.text}</p>
              <span className={styles.timestamp}>{message.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <button className={styles.fileButton}>
          📎
        </button>
        <input
          type="text"
          placeholder="Write your message here"
          className={styles.input}
          
        />
        <button className={styles.sendButton} >
          ➤
        </button>
      </div>
    </div>
  );
};

export default ChatWindows;