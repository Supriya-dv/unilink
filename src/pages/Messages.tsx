import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";

const conversations = [
  { name: "Priya Sharma", avatar: "PS", lastMsg: "Thanks for connecting!", time: "2m" },
  { name: "Rahul Verma", avatar: "RV", lastMsg: "Sure, let's discuss the project.", time: "1h" },
  { name: "Ananya Iyer", avatar: "AI", lastMsg: "Happy to help with your resume!", time: "3h" },
];

const messages = [
  { from: "them", text: "Hi! Thanks for connecting on UniLink.", time: "10:00 AM" },
  { from: "me", text: "Hey Priya! I loved reading about your journey at Google.", time: "10:02 AM" },
  { from: "them", text: "Thank you! Happy to chat. What would you like to know?", time: "10:03 AM" },
  { from: "me", text: "I'm curious about how you prepared for your interviews. Any tips?", time: "10:05 AM" },
  { from: "them", text: "Absolutely! Focus on data structures and system design. I can share some resources if you'd like.", time: "10:06 AM" },
];

const Messages = () => {
  const [activeChat, setActiveChat] = useState(0);
  const [newMsg, setNewMsg] = useState("");

  return (
    <div className="container max-w-5xl py-8">
      <h1 className="mb-6 font-display text-2xl font-bold">Messages</h1>

      <Card className="overflow-hidden shadow-card">
        <div className="grid md:grid-cols-3" style={{ height: "calc(100vh - 200px)", minHeight: 500 }}>
          {/* Conversation list */}
          <div className="border-r">
            <div className="border-b p-3">
              <Input placeholder="Search messages..." className="text-sm" />
            </div>
            <div className="overflow-y-auto">
              {conversations.map((conv, i) => (
                <button
                  key={i}
                  onClick={() => setActiveChat(i)}
                  className={`flex w-full items-center gap-3 border-b p-4 text-left transition-colors hover:bg-muted ${
                    activeChat === i ? "bg-muted" : ""
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
                    {conv.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{conv.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{conv.lastMsg}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{conv.time}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Chat area */}
          <div className="flex flex-col md:col-span-2">
            {/* Header */}
            <div className="flex items-center gap-3 border-b p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
                {conversations[activeChat].avatar}
              </div>
              <span className="font-semibold">{conversations[activeChat].name}</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.from === "me"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className={`mt-1 text-[10px] ${msg.from === "me" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  className="flex-1"
                />
                <Button variant="hero" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Messages;
