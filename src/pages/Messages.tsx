import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, MoreVertical, Phone, Video, 
  Send, Smile, Paperclip, ChevronLeft,
  CheckCheck, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const chats = [
  { id: 1, name: "Priya Sharma", lastMsg: "See you at the event!", time: "2:30 PM", unread: 2, online: true, avatar: "PS", color: "cyan" },
  { id: 2, name: "Rahul Verma", lastMsg: "Did you check the docs?", time: "1:45 PM", unread: 0, online: false, avatar: "RV", color: "purple" },
  { id: 3, name: "Ananya Iyer", lastMsg: "The proposal looks great.", time: "Yesterday", unread: 0, online: true, avatar: "AI", color: "pink" },
];

const initialMessages = [
  { id: 1, sender: "Priya Sharma", text: "Hey! Are you coming to the networking event tomorrow?", time: "2:25 PM", isMe: false },
  { id: 2, sender: "Me", text: "Yes, definitely! I'll be there around 6 PM.", time: "2:26 PM", isMe: true },
  { id: 3, sender: "Priya Sharma", text: "Awesome! Let's catch up then. I have some ideas for the project.", time: "2:28 PM", isMe: false },
  { id: 4, sender: "Me", text: "Sounds good. See you at the event!", time: "2:30 PM", isMe: true },
];

export default function Messages() {
  const [activeChat, setActiveChat] = useState(chats[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const msg = {
      id: messages.length + 1,
      sender: "Me",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    setMessages([...messages, msg]);
    setNewMessage("");
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      
      {/* 🔮 Chats Sidebar */}
      <div className={cn(
        "w-full md:w-80 lg:w-96 flex flex-col glass-dark border-r border-white/5 transition-all",
        "absolute md:relative z-20 h-full",
      )}>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-white mb-6">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search chats..." 
              className="bg-white/[0.03] border-white/10 pl-10 h-11 rounded-xl focus-visible:ring-purple/50"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-3 space-y-1">
          {chats.map((chat) => (
            <motion.button
              key={chat.id}
              whileHover={{ x: 4 }}
              onClick={() => setActiveChat(chat)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-2xl transition-all",
                activeChat.id === chat.id ? "bg-white/[0.08] shadow-glass" : "hover:bg-white/[0.03]"
              )}
            >
              <div className="relative">
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br from-${chat.color}-500/20 to-transparent border border-${chat.color}-500/30 flex items-center justify-center font-bold text-${chat.color}-400 shadow-lg`}>
                  {chat.avatar}
                </div>
                {chat.online && (
                  <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-cyan-500 border-2 border-slate-900 shadow-lg" />
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white truncate">{chat.name}</span>
                  <span className="text-[10px] text-slate-400">{chat.time}</span>
                </div>
                <p className="text-xs text-slate-400 truncate">{chat.lastMsg}</p>
              </div>
              {chat.unread > 0 && (
                <Badge className="bg-pink-500 text-white h-5 w-5 rounded-full flex items-center justify-center p-0 text-[10px] border-none shadow-pink-500/50 shadow-lg">
                  {chat.unread}
                </Badge>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* 🚀 Chat Window */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <header className="h-20 bg-slate-900/50 backdrop-blur-xl border-b border-white/5 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden rounded-xl">
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <div className={`h-10 w-10 rounded-xl bg-${activeChat.color}-500/20 border border-${activeChat.color}-500/30 flex items-center justify-center font-bold text-${activeChat.color}-400`}>
              {activeChat.avatar}
            </div>
            <div>
              <h3 className="font-bold text-white">{activeChat.name}</h3>
              <p className="text-[10px] text-cyan-400 flex items-center gap-1">
                {activeChat.online ? <><span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" /> Online</> : <span className="text-slate-400">Offline</span>}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-xl text-slate-400 hover:text-white hover:bg-white/5"><Phone className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" className="rounded-xl text-slate-400 hover:text-white hover:bg-white/5"><Video className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" className="rounded-xl text-slate-400 hover:text-white hover:bg-white/5"><MoreVertical className="h-5 w-5" /></Button>
          </div>
        </header>

        {/* Messages List */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar"
        >
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={cn(
                  "flex items-end gap-3",
                  msg.isMe ? "flex-row-reverse" : "flex-row"
                )}
              >
                {!msg.isMe && (
                  <div className={`h-8 w-8 rounded-lg bg-${activeChat.color}-500/20 flex items-center justify-center text-[10px] font-bold text-${activeChat.color}-400`}>
                    {activeChat.avatar}
                  </div>
                )}
                <div className={cn(
                  "max-w-[70%] p-4 rounded-2xl relative shadow-lg",
                  msg.isMe 
                    ? "bg-gradient-to-br from-cyan-500 to-purple-500 text-white rounded-br-none" 
                    : "bg-slate-800/80 backdrop-blur-md border border-white/10 text-white/90 rounded-bl-none"
                )}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <div className={cn(
                    "flex items-center gap-1 mt-2 text-[9px] opacity-60",
                    msg.isMe ? "justify-end" : "justify-start"
                  )}>
                    {msg.time}
                    {msg.isMe && <CheckCheck className="h-3 w-3" />}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs text-slate-400 pl-11">
                <div className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400/30 animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400/30 animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400/30 animate-bounce [animation-delay:0.4s]" />
                </div>
                {activeChat.name} is typing...
             </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6">
          <div className="relative flex items-center gap-3 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-2 px-4 focus-within:border-cyan-500/50 transition-all shadow-xl">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-white"><Smile className="h-6 w-6" /></Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-white"><Paperclip className="h-6 w-6" /></Button>
            <input 
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                // Simple typing effect
                setIsTyping(e.target.value.length > 0);
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-slate-500 py-3"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              className="h-10 w-10 rounded-xl bg-cyan-500 text-slate-900 flex items-center justify-center shadow-lg shadow-cyan-500/20"
            >
              <Send className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>

    </div>
  );
}
