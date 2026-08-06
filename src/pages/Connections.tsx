import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserCheck, UserPlus, Send, Search, Filter, MoreVertical, MessageSquare, Crown, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { connectionsApi, type ConnectionItem } from "@/lib/api";
import { toast } from "sonner";
import { PageTransition } from "@/components/PageTransition";

export default function Connections() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("matches");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(localStorage.getItem("unilink_is_premium") === "true");
  const [connections, setConnections] = useState<{
    matches: ConnectionItem[];
    requests: ConnectionItem[];
    sent: ConnectionItem[];
  }>({ matches: [], requests: [], sent: [] });

  const loadConnections = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await connectionsApi.getConnections();
      setConnections(res);
    } catch {
      toast.error("Failed to load your network connections.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadConnections();

    const checkPremium = () => {
      setIsPremium(localStorage.getItem("unilink_is_premium") === "true");
    };

    window.addEventListener("requestUpdated", loadConnections);
    window.addEventListener("storage", loadConnections);
    window.addEventListener("premiumUpdated", checkPremium);

    return () => {
      window.removeEventListener("requestUpdated", loadConnections);
      window.removeEventListener("storage", loadConnections);
      window.removeEventListener("premiumUpdated", checkPremium);
    };
  }, [loadConnections]);

  const handleAccept = async (id: string, name: string) => {
    try {
      await connectionsApi.acceptRequest(id);
      toast.success(`You are now connected with ${name}!`);
      loadConnections();
      // Dispatch event to update badges globally
      window.dispatchEvent(new Event("requestUpdated"));
    } catch {
      toast.error("Failed to accept request.");
    }
  };

  const handleDecline = async (id: string) => {
    try {
      await connectionsApi.declineRequest(id);
      toast.success("Request removed.");
      loadConnections();
      window.dispatchEvent(new Event("requestUpdated"));
    } catch {
      toast.error("Failed to update request.");
    }
  };

  const tabs = [
    { id: "matches", label: "Matches", icon: UserCheck, count: connections.matches.length, color: "cyan" },
    { id: "requests", label: "Requests", icon: UserPlus, count: connections.requests.length, color: "purple" },
    { id: "sent", label: "Sent", icon: Send, count: connections.sent.length, color: "pink" },
  ];

  // Filtering list based on search query
  const rawList = connections[activeTab as keyof typeof connections] || [];
  const currentList = rawList.filter(item => 
    item.user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.user.department && item.user.department.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <PageTransition className="container max-w-6xl mx-auto px-4 py-8">
      
      {/* ✨ Header Section */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10"
      >
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Your <span className="text-gradient-cyan-purple">Network</span></h1>
          <p className="text-slate-500 mt-1 font-medium">Manage your professional and academic connections</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search connections..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border-slate-200 pl-10 h-11 rounded-xl text-slate-800 focus:ring-cyan-200"
            />
          </div>
          <Button variant="ghost" className="h-11 w-11 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </motion.div>

      {/* 🔮 Premium Bar CTA if Free */}
      {!isPremium && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate('/premium')}
          className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-600/10 border border-amber-500/20 flex items-center justify-between cursor-pointer hover:bg-amber-500/[0.08] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center text-white">
              <Crown className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-900">Unlock Premium Match Benefits</h4>
              <p className="text-xs text-amber-700">See who liked you instantly, send direct messages, and use advanced search filters.</p>
            </div>
          </div>
          <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs">
            Go Pro
          </Button>
        </motion.div>
      )}

      {/* 🔮 Navigation Tabs */}
      <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 p-1.5 rounded-2xl mb-8 w-fit">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300",
              activeTab === tab.id ? "text-slate-800" : "text-slate-500 hover:text-slate-800"
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab-bg"
                className="absolute inset-0 bg-white shadow-sm rounded-xl -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <tab.icon className={cn("h-4 w-4", activeTab === tab.id ? "text-slate-800" : "text-slate-400")} />
            {tab.label}
            <Badge className={cn(
              "ml-1 text-[10px] h-5 px-1.5 border-none",
              activeTab === tab.id ? "bg-slate-800 text-white" : "bg-slate-200 text-slate-600"
            )}>
              {tab.count}
            </Badge>
          </motion.button>
        ))}
      </div>

      {/* 🚀 Connection Cards List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={`skeleton-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card border border-black/[0.05] rounded-3xl p-4 md:p-6 bg-white/70"
              >
                <div className="flex items-center gap-6">
                  <div className="h-16 w-16 rounded-[1.25rem] bg-slate-100 animate-pulse" />
                  <div className="flex-1 space-y-3">
                    <div className="h-5 w-1/3 bg-slate-100 rounded animate-pulse" />
                    <div className="h-4 w-1/4 bg-slate-100 rounded animate-pulse" />
                    <div className="flex gap-3 mt-4 pt-2">
                       <div className="h-9 w-32 bg-slate-100 rounded-xl animate-pulse" />
                       <div className="h-9 w-24 bg-slate-100 rounded-xl animate-pulse" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : currentList.map((item, i) => {
            const otherUser = item.user;
            const initials = otherUser.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
            const showPaywall = activeTab === "requests" && !isPremium;

            return (
              <motion.div
                key={item._id}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.2 } }}
                transition={{ delay: i * 0.05, type: "spring", stiffness: 100 }}
              >
                <Card className="glass-card border border-black/[0.05] rounded-3xl p-4 md:p-6 hover:bg-white transition-all bg-white/70 group overflow-hidden relative">
                  
                  {/* Paywall Overlay */}
                  {showPaywall && (
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-md z-20 flex flex-col items-center justify-center p-4 text-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-white mb-2 shadow-md">
                        <Crown className="h-5 w-5" />
                      </div>
                      <h4 className="text-sm font-black text-slate-900">Unlock Who Liked You</h4>
                      <p className="text-[10px] text-slate-500 max-w-[200px] mb-2 leading-tight">UniLink Pro members see requests instantly.</p>
                      <Button 
                        onClick={() => navigate('/premium')} 
                        className="h-8 px-4 rounded-xl bg-slate-950 text-white font-bold text-[10px] hover:bg-slate-800"
                      >
                        Unlock Now
                      </Button>
                    </div>
                  )}

                  <div className={cn("flex items-center gap-6 relative z-10", showPaywall && "filter blur-sm select-none pointer-events-none")}>
                    <div className="relative">
                      {otherUser.avatarUrl ? (
                        <img 
                          src={otherUser.avatarUrl} 
                          alt={otherUser.fullName}
                          className="h-16 w-16 rounded-[1.25rem] object-cover border border-slate-200" 
                        />
                      ) : (
                        <div className="h-16 w-16 rounded-[1.25rem] bg-cyan-50 border border-cyan-100 flex items-center justify-center font-bold text-2xl text-cyan-600">
                          {initials}
                        </div>
                      )}
                      {otherUser.isOnline && (
                        <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-cyan-500 border-2 border-white shadow-cyan-glow" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 
                            onClick={() => navigate(`/profile`)} 
                            className="text-xl font-bold text-slate-900 group-hover:text-cyan-600 transition-colors cursor-pointer"
                          >
                            {otherUser.fullName}
                          </h3>
                          <p className="text-sm text-slate-500 flex items-center gap-2">
                            {otherUser.department || "No Department"} • {otherUser.role.toUpperCase()}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 rounded-xl hover:bg-slate-100">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 mt-4">
                        {activeTab === "matches" && (
                          <>
                            <Button 
                              onClick={() => navigate("/messages", { state: { selectUser: otherUser } })}
                              className="h-9 px-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 text-xs gap-2"
                            >
                               <MessageSquare className="h-3.5 w-3.5" /> Send Message
                            </Button>
                            <Button 
                              onClick={() => navigate(`/profile`)}
                              variant="outline" 
                              className="h-9 px-4 border-slate-200 hover:bg-slate-50 text-slate-700 bg-white text-xs rounded-xl"
                            >
                              View Profile
                            </Button>
                          </>
                        )}
                        
                        {activeTab === "requests" && (
                          <>
                            <Button 
                              onClick={() => handleAccept(item._id, otherUser.fullName)}
                              className="h-9 px-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 text-xs"
                            >
                              Accept Request
                            </Button>
                            <Button 
                              onClick={() => handleDecline(item._id)}
                              variant="outline" 
                              className="h-9 px-4 border-slate-200 hover:bg-red-50 hover:text-red-650 hover:border-red-200 text-slate-700 bg-white text-xs rounded-xl"
                            >
                              Decline
                            </Button>
                          </>
                        )}
                        
                        {activeTab === "sent" && (
                          <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
                            <span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
                            Waiting for response
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {!isLoading && currentList.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="h-24 w-24 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mb-6">
            <Search className="h-10 w-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No connections found</h3>
          <p className="text-slate-500 max-w-xs">
            Try adjusting your search or explore new people to build your network.
          </p>
          <Button onClick={() => navigate('/discover')} className="mt-8 rounded-2xl bg-slate-900 text-white px-8 h-12 font-bold hover:bg-slate-800">
             Discover People
          </Button>
        </motion.div>
      )}

    </PageTransition>
  );
}
