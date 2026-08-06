import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, MoreVertical, Phone, Video, 
  Send, Smile, Paperclip, ChevronLeft,
  Check, CheckCheck, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { connectionsApi, messagesApi, type ConnectionItem, type MessageType } from "@/lib/api";
import socketClient, { connectSocket, disconnectSocket, sendMessageSocket, onMessageNew, onMessageSent, emitTyping, onTyping, onUserOnline, onUserOffline } from '@/lib/socket';
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";

import { PageTransition } from "@/components/PageTransition";

export default function Messages() {
  const { user } = useAuth();
  const location = useLocation();
  const [threads, setThreads] = useState<ConnectionItem[]>([]);
  const [activeThread, setActiveThread] = useState<ConnectionItem | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingThreads, setIsLoadingThreads] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch threads (matches)
  const fetchThreads = useCallback(async (selectUserFromState?: any) => {
    try {
      setIsLoadingThreads(true);
      const res = await connectionsApi.getConnections();
      setThreads(res.matches);

      if (res.matches.length > 0) {
        // If navigated with selectUser state, find/select that thread
        if (selectUserFromState) {
          const matchThread = res.matches.find(t => t.user._id === selectUserFromState._id);
          if (matchThread) {
            setActiveThread(matchThread);
          } else {
            setActiveThread(res.matches[0]);
          }
        } else {
          setActiveThread(res.matches[0]);
        }
      }
    } catch {
      toast.error("Failed to load conversation threads.");
    } finally {
      setIsLoadingThreads(false);
    }
  }, []);

  // Fetch messages for active thread
  const fetchMessages = useCallback(async (recipientId: string, silent = false) => {
    try {
      if (!silent) setIsLoadingMessages(true);
      const res = await messagesApi.getMessages(recipientId);
      setMessages(res.messages);
    } catch {
      if (!silent) toast.error("Failed to load message history.");
    } finally {
      if (!silent) setIsLoadingMessages(false);
    }
  }, []);

  useEffect(() => {
    const state = location.state as { selectUser?: any };
    fetchThreads(state?.selectUser);
    // connect socket for realtime updates
    try {
      connectSocket();
    } catch (err) {
      console.warn('Socket connect failed', err);
    }
  }, [fetchThreads, location.state]);

  // Load messages when active thread changes
  useEffect(() => {
    if (activeThread) {
      fetchMessages(activeThread.user._id);
      setThreads((prevThreads) => prevThreads.map((thread) =>
        thread._id === activeThread._id
          ? { ...thread, unreadCount: 0 }
          : thread
      ));
    } else {
      setMessages([]);
    }
  }, [activeThread, fetchMessages]);

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Poll for new messages every 4 seconds
  // Subscribe to realtime events (message incoming, typing, online status)
  useEffect(() => {
    const handleIncoming = (payload: any) => {
      const msg = payload.message;
      if (!msg) return;
      // If message is for active thread, append
      if (activeThread && (msg.sender === activeThread.user._id || msg.recipient === activeThread.user._id)) {
        setMessages((prev) => {
          // avoid duplicates
          if (prev.some(m => m._id === msg._id)) return prev;
          return [...prev, msg];
        });
      }

      // Update threads' last message and unread counts
      setThreads((prevThreads) => prevThreads.map((thread) => {
        if (thread.user._id === (msg.sender === user?._id ? msg.recipient : msg.sender)) {
          const isActive = activeThread?._id === thread._id;
          return {
            ...thread,
            lastMessage: { text: msg.text, createdAt: msg.createdAt, sender: msg.sender },
            unreadCount: isActive ? 0 : (thread.unreadCount || 0) + (msg.sender === thread.user._id ? 1 : 0),
          };
        }
        return thread;
      }));
    };

    const handleSent = (payload: any) => {
      const msg = payload.message;
      if (!msg) return;
      setMessages((prev) => {
        if (prev.some(m => m._id === msg._id)) return prev;
        return [...prev, msg];
      });
      setThreads((prevThreads) => prevThreads.map((thread) => thread._id === activeThread?._id ? { ...thread, lastMessage: { text: msg.text, createdAt: msg.createdAt, sender: msg.sender } } : thread));
    };

    const handleTyping = (payload: any) => {
      if (!activeThread) return;
      if (payload.from === activeThread.user._id) {
        setIsTyping(!!payload.isTyping);
      }
    };

    const handleOnline = ({ userId }: any) => {
      setThreads(prev => prev.map(t => t.user._id === userId ? { ...t, user: { ...t.user, isOnline: true } } : t));
    };

    const handleOffline = ({ userId }: any) => {
      setThreads(prev => prev.map(t => t.user._id === userId ? { ...t, user: { ...t.user, isOnline: false } } : t));
    };

    onMessageNew(handleIncoming);
    onMessageSent(handleSent);
    onTyping(handleTyping);
    onUserOnline(handleOnline);
    onUserOffline(handleOffline);

    return () => {
      // cleanup listeners
      try {
        if (socketClient) {
          socketClient && socketClient.connect && disconnectSocket();
        }
      } catch (err) {
        // noop
      }
    };
  }, [activeThread, user, activeThread?._id]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeThread) return;
    const textToSend = newMessage;
    setNewMessage("");
    try {
      if (socketClient) {
        // emit via socket and let server persist and broadcast
        sendMessageSocket(activeThread.user._id, textToSend);
      } else {
        const res = await messagesApi.sendMessage(activeThread.user._id, textToSend);
        setMessages(prev => [...prev, res.message]);
      }
      setThreads((prevThreads) => prevThreads.map((thread) =>
        thread._id === activeThread._id
          ? {
              ...thread,
              lastMessage: {
                text: textToSend,
                createdAt: new Date().toISOString(),
                sender: user?._id,
              },
              unreadCount: 0,
            }
          : thread
      ));
    } catch (err) {
      console.error('Send message error', err);
      toast.error("Failed to send message.");
    }
  };

  // Typing indicator debounce
  useEffect(() => {
    if (!activeThread) return;
    let timeout: any;
    if (newMessage.length > 0) {
      emitTyping(activeThread.user._id, true);
      timeout = setTimeout(() => emitTyping(activeThread.user._id, false), 1500);
    } else {
      emitTyping(activeThread.user._id, false);
    }
    return () => clearTimeout(timeout);
  }, [newMessage, activeThread]);

  const filteredThreads = threads.filter(t => 
    t.user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      
      {/* 🔮 Chats Sidebar */}
      <div className={cn(
        "w-full md:w-80 lg:w-96 flex flex-col glass border-r border-slate-200 transition-all",
        "absolute md:relative z-20 h-full",
      )}>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search chats..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border-slate-200 pl-10 h-11 rounded-xl focus-visible:ring-cyan-200 focus-visible:border-cyan-500 text-slate-900"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-3 space-y-1">
          {isLoadingThreads ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-6 w-6 text-cyan-600 animate-spin" />
            </div>
          ) : filteredThreads.map((thread) => {
            const initials = thread.user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
            const isActive = activeThread?._id === thread._id;
            const previewSender = thread.lastMessage?.sender === user?._id ? 'You: ' : '';
            const previewText = thread.lastMessage?.text ?? 'No messages yet';
            const previewTime = thread.lastMessage?.createdAt
              ? new Date(thread.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              : '';

            return (
              <motion.button
                key={thread._id}
                whileHover={{ x: 4 }}
                onClick={() => setActiveThread(thread)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-2xl transition-all",
                  isActive ? "bg-slate-100 shadow-sm" : "hover:bg-slate-50"
                )}
              >
                <div className="relative">
                  {thread.user.avatarUrl ? (
                    <img src={thread.user.avatarUrl} alt={thread.user.fullName} className="h-12 w-12 rounded-xl object-cover" />
                  ) : (
                    <div className="h-12 w-12 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center font-bold text-cyan-600">
                      {initials}
                    </div>
                  )}
                  {thread.user.isOnline && (
                    <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-cyan-500 border-2 border-white shadow-lg" />
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-1 gap-3">
                    <span className="font-bold text-slate-800 truncate">{thread.user.fullName}</span>
                    {thread.unreadCount ? (
                      <span className="inline-flex min-w-[1.75rem] items-center justify-center rounded-full bg-cyan-600 px-2 py-0.5 text-[10px] font-bold text-white">
                        {thread.unreadCount}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-xs text-slate-500 truncate">
                    {previewSender}{previewText}
                  </p>
                </div>
                <div className="text-right text-[10px] text-slate-400">
                  {previewTime}
                </div>
              </motion.button>
            );
          })}

          {!isLoadingThreads && filteredThreads.length === 0 && (
            <p className="text-center text-slate-400 text-sm py-10">No active conversations yet.</p>
          )}
        </div>
      </div>

      {/* 🚀 Chat Window */}
      <div className="flex-1 flex flex-col relative">
        {activeThread ? (
          <>
            {/* Header */}
            <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200 px-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="md:hidden rounded-xl">
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <div className="h-10 w-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center font-bold text-cyan-600">
                  {activeThread.user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{activeThread.user.fullName}</h3>
                  <p className="text-[10px] text-cyan-650 flex items-center gap-1 font-semibold">
                    {activeThread.user.isOnline ? <><span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" /> Online</> : <span className="text-slate-400">Offline</span>}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"><Phone className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon" className="rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"><Video className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon" className="rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"><MoreVertical className="h-5 w-5" /></Button>
              </div>
            </header>

            {/* Messages List */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-slate-50/30"
            >
              {isLoadingMessages ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="h-8 w-8 text-cyan-600 animate-spin" />
                </div>
              ) : (
                messages.map((msg) => {
                  const isMe = msg.sender === user?._id;
                  const initials = activeThread.user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

                  return (
                    <motion.div
                      key={msg._id}
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className={cn(
                        "flex items-end gap-3",
                        isMe ? "flex-row-reverse" : "flex-row"
                      )}
                    >
                      {!isMe && (
                        <div className="h-8 w-8 rounded-lg bg-cyan-50 border border-cyan-100 flex items-center justify-center text-[10px] font-bold text-cyan-650">
                          {initials}
                        </div>
                      )}
                      <div className={cn(
                        "max-w-[70%] p-4 rounded-2xl relative shadow-sm",
                        isMe 
                          ? "bg-gradient-to-br from-cyan-500 to-purple-500 text-white rounded-br-none" 
                          : "bg-white border border-slate-200 text-slate-800 rounded-bl-none"
                      )}>
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                        <div className={cn(
                          "flex items-center gap-1 mt-2 text-[9px] opacity-60",
                          isMe ? "justify-end text-cyan-100" : "justify-start text-slate-400"
                        )}>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          {isMe && (
                            <span className="inline-flex items-center gap-1">
                              <Check className="h-3 w-3" />
                              <span className={msg.isRead ? 'opacity-100' : 'opacity-50'}>
                                {msg.isRead ? 'Read' : 'Sent'}
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-slate-50/20 border-t border-slate-100">
              <div className="relative flex items-center gap-3 bg-white border border-slate-200 rounded-2xl p-2 px-4 focus-within:border-cyan-500/50 transition-all shadow-sm">
                <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-slate-700"><Smile className="h-6 w-6" /></Button>
                <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-slate-700"><Paperclip className="h-6 w-6" /></Button>
                <input 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent border-none outline-none text-slate-800 text-sm placeholder:text-slate-400 py-3"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md"
                >
                  <Send className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50/30">
            <h3 className="text-xl font-bold text-slate-800 mb-2">No conversation selected</h3>
            <p className="text-slate-400 max-w-xs">Select a match from the list on the left to start messaging.</p>
          </div>
        )}
      </div>

    </div>
  );
}
