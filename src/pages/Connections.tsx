import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserCheck, UserPlus, Send, Search, Filter, MoreVertical, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "matches", label: "Matches", icon: UserCheck, count: 24, color: "cyan" },
  { id: "requests", label: "Requests", icon: UserPlus, count: 12, color: "purple" },
  { id: "sent", label: "Sent", icon: Send, count: 8, color: "pink" },
];

const connections = {
  matches: [
    { id: 1, name: "Priya Sharma", role: "Alumni", dept: "Computer Science", avatar: "PS", status: "Online", color: "cyan" },
    { id: 2, name: "Rahul Verma", role: "Student", dept: "Electrical Eng.", avatar: "RV", status: "Away", color: "purple" },
    { id: 3, name: "Ananya Iyer", role: "Alumni", dept: "MBA", avatar: "AI", status: "Online", color: "pink" },
  ],
  requests: [
    { id: 4, name: "Karthik Nair", role: "Student", dept: "Mechanical Eng.", avatar: "KN", time: "2h ago", color: "cyan" },
    { id: 5, name: "Sneha Reddy", role: "Alumni", dept: "Design", avatar: "SR", time: "5h ago", color: "purple" },
  ],
  sent: [
    { id: 6, name: "Vikram Singh", role: "Student", dept: "Civil Eng.", avatar: "VS", status: "Pending", color: "pink" },
  ],
};

export default function Connections() {
  const [activeTab, setActiveTab] = useState("matches");
  const [searchQuery, setSearchQuery] = useState("");

  const currentList = connections[activeTab as keyof typeof connections] || [];

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      
      {/* ✨ Header Section */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10"
      >
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Your <span className="text-gradient-cyan-purple">Network</span></h1>
          <p className="text-muted-foreground mt-1">Manage your professional and academic connections</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search people..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/[0.03] border-white/10 pl-10 h-11 rounded-xl focus-visible:ring-cyan/50"
            />
          </div>
          <Button variant="ghost" className="h-11 w-11 rounded-xl bg-white/[0.03] border border-white/10">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </motion.div>

      {/* 🔮 Animated Tabs */}
      <div className="flex items-center gap-2 bg-white/[0.02] border border-white/5 p-1.5 rounded-2xl mb-8 w-fit">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300",
              activeTab === tab.id ? "text-white" : "text-muted-foreground hover:text-white"
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab-bg"
                className="absolute inset-0 bg-white/[0.08] shadow-glass rounded-xl -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <tab.icon className={cn("h-4 w-4", activeTab === tab.id && `text-${tab.color}`)} />
            {tab.label}
            <Badge className={cn(
              "ml-1 text-[10px] h-5 px-1.5 border-none",
              activeTab === tab.id ? `bg-${tab.color} text-premium-900` : "bg-white/5 text-muted-foreground"
            )}>
              {tab.count}
            </Badge>
          </motion.button>
        ))}
      </div>

      {/* 🚀 Connection Cards List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
        <AnimatePresence mode="popLayout">
          {currentList.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.2 } }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 100 }}
            >
              <Card className="glass-card border-none rounded-3xl p-4 md:p-6 hover:bg-white/[0.05] transition-all group overflow-hidden relative">
                <div className="flex items-center gap-6 relative z-10">
                  {/* Status Indicator for avatar */}
                  <div className="relative">
                    <div className={`h-16 w-16 rounded-[1.25rem] bg-${item.color}/20 border border-${item.color}/30 flex items-center justify-center font-bold text-2xl text-${item.color} shadow-${item.color}`}>
                      {item.avatar}
                    </div>
                    {item.status === "Online" && (
                      <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-cyan border-2 border-premium-900 shadow-cyan-glow" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan transition-colors">{item.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          {item.dept} • {item.role}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground rounded-xl hover:bg-white/5">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 mt-4">
                      {activeTab === "matches" && (
                        <>
                          <Button className="h-9 px-4 bg-cyan text-premium-900 font-bold rounded-xl hover:shadow-cyan text-xs gap-2">
                             <MessageSquare className="h-3.5 w-3.5" /> Send Message
                          </Button>
                          <Button variant="outline" className="h-9 px-4 border-white/10 hover:bg-white/5 text-white text-xs rounded-xl">
                            View Profile
                          </Button>
                        </>
                      )}
                      
                      {activeTab === "requests" && (
                        <>
                          <Button className="h-9 px-4 bg-cyan text-premium-900 font-bold rounded-xl hover:shadow-cyan text-xs">
                            Accept Request
                          </Button>
                          <Button variant="outline" className="h-9 px-4 border-white/10 hover:bg-pink/10 hover:text-pink hover:border-pink/30 text-white text-xs rounded-xl">
                            Decline
                          </Button>
                        </>
                      )}
                      
                      {activeTab === "sent" && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                          <span className="h-2 w-2 rounded-full bg-pink animate-pulse" />
                          Waiting for response
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Subtle background glow on hover */}
                <div className={`absolute top-0 right-0 h-32 w-32 rounded-full bg-${item.color}/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity -z-10`} />
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {currentList.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="h-24 w-24 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center mb-6">
              <Search className="h-10 w-10 text-muted-foreground/30" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No connections found</h3>
            <p className="text-muted-foreground max-w-xs">
              Try adjusting your search or explore new people to build your network.
            </p>
            <Button className="mt-8 rounded-2xl bg-cyan-purple px-8 h-12 font-bold shadow-cyan">
               Discover People
            </Button>
          </motion.div>
        )}
      </div>

    </div>
  );
}
