// services/webSocketManager.ts

import { WebSocketCallback, WebSocketMessage } from "./types/websocket.types";

// type WebSocketCallback = (data: any) => void;

class WebSocketManager {
  private connections: Map<string, WebSocket> = new Map();
  private messageCallbacks: Map<string, WebSocketCallback[]> = new Map();

  connect(key: string, url: string) {
    if (this.connections.has(key)) return; // Prevent duplicate connections

    const socket = new WebSocket(url);

    socket.onopen = () => console.log(`WebSocket (${key}) connected to ${url}`);
    socket.onclose = () => {
      console.log(`WebSocket (${key}) disconnected`);
      this.connections.delete(key);
      this.messageCallbacks.delete(key);
    };
    socket.onerror = (error) =>
      console.error(`WebSocket (${key}) error:`, error);

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const callbacks = this.messageCallbacks.get(key) || [];
      callbacks.forEach((cb) => cb(message));
    };

    this.connections.set(key, socket);
  }

  sendMessage(key: string, message: WebSocketMessage) {
    const socket = this.connections.get(key);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.warn(`WebSocket (${key}) is not connected or ready.`);
    }
  }

  subscribe(key: string, callback: WebSocketCallback) {
    if (!this.messageCallbacks.has(key)) {
      this.messageCallbacks.set(key, []);
    }
    this.messageCallbacks.get(key)?.push(callback);
  }

  unsubscribe(key: string, callback: WebSocketCallback) {
    const callbacks = this.messageCallbacks.get(key) || [];
    this.messageCallbacks.set(
      key,
      callbacks.filter((cb) => cb !== callback)
    );
  }

  disconnect(key: string) {
    const socket = this.connections.get(key);
    if (socket) {
      socket.close();
    }
  }

  disconnectAll() {
    this.connections.forEach((socket) => socket.close());
    this.connections.clear();
    this.messageCallbacks.clear();
  }
}

export const webSocketManager = new WebSocketManager();
