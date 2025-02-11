import { Message } from "./message.types";
import { User } from "./user.types";

export interface ChatState {
  allChats: AllChats;
  activeChat: ActiveChat;
  createChat: CreateChat;
}

export interface AllChats {
  isLoading: boolean;
  isSuccessful: boolean;
  serverMessage: string;
  data: Chat[] | null;
}

export interface ActiveChat {
  isLoading: boolean;
  isSuccessful: boolean;
  serverMessage: string;
  data: ChatDetails;
}

export interface CreateChat {
  isLoading: boolean;
  isSuccessful: boolean;
  serverMessage: string;
  data: Chat | null;
}

export interface ChatDetails {
  chat: Chat | null;
  messages: Message[];
}

export interface Chat {
  id: string;
  name: string;
  participants: string[];
  participant_details: User[];
  last_message: Message;
}
