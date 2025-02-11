// import { Chat } from "./chat.types";
// import { User } from "./user.types";

export interface Message {
  // chat: Chat;
  // sender: User;
  chat: string;
  sender: string;
  text: string;
  media_url: string;
  timestamp: string;
}
