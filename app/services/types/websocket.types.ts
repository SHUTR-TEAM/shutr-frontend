// import { Chat } from "@/app/redux/types/chat.types";
import { Message } from "@/app/redux/types/message.types";

export type WebSocketCallbackData = Message;

export type WebSocketCallback = (data: WebSocketCallbackData) => void;

export type WebSocketMessage = Message;
