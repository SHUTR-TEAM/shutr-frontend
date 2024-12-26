import React from "react";
import Sidebar from "../chatbox/Sidebar/Sidebar";
//import Navbar from "../chatbox/Navbar/Navbar";
import ChatWindows from "../chatbox/ChatWindow/ChatWindow";

const Home: React.FC = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* <Navbar /> */}
        <ChatWindows />
      </div>
    </div>
  );
};

export default Home;