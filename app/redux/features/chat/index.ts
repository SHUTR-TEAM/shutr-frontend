import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ChatState } from "../../types/chat.types";
import axios, { AxiosError } from "axios";
import { webSocketManager } from "@/app/services/webSocketManager";
import { Message } from "../../types/message.types";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const ROUTE_URL = `${BACKEND_BASE_URL}/api/chat/rooms`;

const initialState: ChatState = {
  allChats: {
    isLoading: false,
    isSuccessful: false,
    serverMessage: "",
    data: null,
  },
  activeChat: {
    isLoading: false,
    isSuccessful: false,
    serverMessage: "",
    data: {
      chat: null,
      messages: [],
    },
  },
  createChat: {
    isLoading: false,
    isSuccessful: false,
    serverMessage: "",
    data: null,
  },
};

export const getAllChats = createAsyncThunk(
  "chat/get-all",
  async ({ participantId }: { participantId: string }, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        participantId,
      },
    };

    try {
      return await axios.get(ROUTE_URL, config).then((res) => res.data);
    } catch (error) {
      const e = error as AxiosError;
      return rejectWithValue(e.message);
    }
  }
);

// Web sockets
export const sendChatMessage = createAsyncThunk(
  "chat/sendMessage",
  async (
    { text, senderId }: { text: string; senderId: string },
    { rejectWithValue }
  ) => {
    try {
      const message: Message = {
        chat: "",
        sender: senderId,
        text: text,
        media_url: "media_url",
        timestamp: new Date().toISOString(),
      };

      webSocketManager.sendMessage("chat", message);
      return message;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to send message");
    }
  }
);

export const getAllMessages = createAsyncThunk(
  "chat/get-all-messages",
  async ({ chatId }: { chatId: string }, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        chat: chatId,
      },
    };

    try {
      return await axios
        .get(`${BACKEND_BASE_URL}/api/chat/messages`, config)
        .then((res) => res.data);
    } catch (error) {
      const e = error as AxiosError;
      return rejectWithValue(e.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // newChatMessage(state, action: PayloadAction<Message>) {
    //   state.activeChat.data.messages.push(action.payload);
    // },
    // connectToChatWebSocket(
    //   state,
    //   action: PayloadAction<{ participantId: string }>
    // ) {
    //   const { participantId } = action.payload;
    //   const wsUrl = `${process.env.NEXT_PUBLIC_CHAT_WS_URL}?participantId=${participantId}`;
    //   webSocketManager.connect("chat", wsUrl);
    //   webSocketManager.subscribe("chat", (message) => {
    //     chatSlice.caseReducers.newChatMessage(state, {
    //       payload: message,
    //       type: "chat/newChatMessage",
    //     });
    //   });
    // },
    // disconnectFromChatWebSocket() {
    //   webSocketManager.disconnect("chat");
    // },
  },
  extraReducers: (builder) => {
    // Get all chats
    // Pending
    builder.addCase(getAllChats.pending, (state) => {
      state.allChats = {
        isLoading: true,
        isSuccessful: false,
        serverMessage: "",
        data: null,
      };
    });

    // Fulfilled
    builder.addCase(getAllChats.fulfilled, (state, action) => {
      state.allChats = {
        isLoading: false,
        isSuccessful: true,
        serverMessage: "",
        data: action.payload,
      };
    });

    // Rejected
    builder.addCase(getAllChats.rejected, (state, action) => {
      state.allChats = {
        isLoading: false,
        isSuccessful: false,
        serverMessage: action.payload as string,
        data: null,
      };
    });

    // Send chat message
    // Pending
    builder.addCase(sendChatMessage.pending, (state) => {
      state.activeChat = {
        ...state.activeChat,
        isLoading: true,
        isSuccessful: false,
        serverMessage: "",
      };
    });

    // Fulfilled
    builder.addCase(sendChatMessage.fulfilled, (state, action) => {
      state.activeChat = {
        ...state.activeChat,
        isLoading: false,
        isSuccessful: true,
        serverMessage: "",
        data: {
          ...state.activeChat.data,
          messages: [...state.activeChat.data.messages, action.payload],
        },
        // .messages.push(action.payload);
      };
    });

    // Rejected
    builder.addCase(sendChatMessage.rejected, (state, action) => {
      state.activeChat = {
        ...state.activeChat,
        isLoading: false,
        isSuccessful: false,
        serverMessage: action.payload as string,
      };
    });

    // Get all messages
    // Pending
    builder.addCase(getAllMessages.pending, (state) => {
      state.activeChat = {
        ...state.activeChat,
        isLoading: true,
        isSuccessful: false,
        serverMessage: "",
      };
    });

    // Fulfilled
    builder.addCase(getAllMessages.fulfilled, (state, action) => {
      console.log(action.payload);
      state.activeChat = {
        ...state.activeChat,
        isLoading: false,
        isSuccessful: true,
        serverMessage: "",
        data: {
          ...state.activeChat.data,
          messages: [...action.payload, ...state.activeChat.data.messages],
        },
      };
    });

    // Rejected
    builder.addCase(getAllMessages.rejected, (state, action) => {
      state.activeChat = {
        ...state.activeChat,
        isLoading: false,
        isSuccessful: false,
        serverMessage: action.payload as string,
      };
    });
  },
});

export default chatSlice.reducer;
