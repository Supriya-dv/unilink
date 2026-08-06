import { io, Socket } from 'socket.io-client';

const TOKEN_KEY = 'unilink_token';

let socket: Socket | null = null;

interface ImportMetaEnv {
  readonly VITE_SERVER_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export const connectSocket = () => {
  if (socket && socket.connected) return socket;
  const token = localStorage.getItem(TOKEN_KEY);
  const url = String((import.meta as ImportMeta).env.VITE_SERVER_URL || (typeof window !== 'undefined' ? window.location.origin : ''));
  socket = io(url, {
    auth: { token },
    autoConnect: true,
  });
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const onMessageNew = (cb: (payload: any) => void) => {
  if (!socket) return;
  socket.on('message:new', cb);
};

export const onMessageSent = (cb: (payload: any) => void) => {
  if (!socket) return;
  socket.on('message:sent', cb);
};

export const sendMessageSocket = (recipientId: string, text: string) => {
  if (!socket) return;
  socket.emit('message:send', { recipientId, text });
};

export const emitTyping = (to: string, isTyping: boolean) => {
  if (!socket) return;
  socket.emit('typing', { to, isTyping });
};

export const onTyping = (cb: (payload: any) => void) => {
  if (!socket) return;
  socket.on('typing', cb);
};

export const onUserOnline = (cb: (payload: any) => void) => {
  if (!socket) return;
  socket.on('user:online', cb);
};

export const onUserOffline = (cb: (payload: any) => void) => {
  if (!socket) return;
  socket.on('user:offline', cb);
};

export default {
  connectSocket,
  disconnectSocket,
  sendMessageSocket,
  onMessageNew,
  onMessageSent,
  emitTyping,
  onTyping,
  onUserOnline,
  onUserOffline,
};
