import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { 
  Heart, X, MapPin, Briefcase, School, 
  Sparkles, Zap, Info, ShieldCheck, Loader2, Crown, MessageSquare, Filter, SlidersHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { api, discoveryApi, type DiscoveryCardType } from "@/lib/api";
import { PageTransition } from "@/components/PageTransition";

const DiscoveryCard = memo(({ 
  user, 
  isTop, 
  onSwipe, 
  userTier, 
  onDirectMessage 
}: { 
  user: DiscoveryCardType, 
  isTop: boolean, 
  onSwipe?: (action: 'like' | 'pass') => void,
  userTier: string,
  onDirectMessage?: (user: DiscoveryCardType) => void
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const yesOpacity = useTransform(x, [0, 150], [0, 1]);
  const noOpacity = useTransform(x, [-150, 0], [1, 0]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      onSwipe?.('like');
    } else if (info.offset.x < -100) {
      onSwipe?.('pass');
    }
  };

  const displayName = user.fullName;
  const displayAge = user.age || 21;
  const displayOccupation = user.occupationTitle || (user.role === 'alumni' ? 'Alumni' : 'Student');
  const displayUniversity = user.university || user.department || 'Campus';
  const displayLocation = user.location || 'New York, NY';
  const displayBio = user.bio || 'Passionate about connecting and building great things together.';
  const avatarUrl = user.avatarUrl || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop`;
  const matchScore = Math.floor(Math.random() * 20) + 80;

  return (
    <motion.div
      style={isTop ? { x, rotate, opacity } : { scale: 0.95, opacity: 0.5, y: 15 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      initial={isTop ? { scale: 0.9, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ x: x.get() > 0 ? 1000 : -1000, opacity: 0, transition: { duration: 0.3 } }}
      className={`absolute inset-0 z-10 touch-none will-change-transform ${isTop ? "cursor-grab active:cursor-grabbing" : ""}`}
    >
      {/* Swipe Indicators */}
      {isTop && (
        <>
          <motion.div style={{ opacity: yesOpacity }} className="absolute top-10 left-10 z-20 border-4 border-cyan-500 rounded-xl px-4 py-2 rotate-[-15deg] pointer-events-none">
            <span className="text-3xl font-bold text-cyan-600 uppercase tracking-widest">Like</span>
          </motion.div>
          <motion.div style={{ opacity: noOpacity }} className="absolute top-10 right-10 z-20 border-4 border-pink-500 rounded-xl px-4 py-2 rotate-[15deg] pointer-events-none">
            <span className="text-3xl font-bold text-pink-600 uppercase tracking-widest">Nope</span>
          </motion.div>
        </>
      )}

      {/* Card Frame */}
      <div className="w-full h-full rounded-[2.5rem] overflow-hidden glass-card relative group shadow-xl bg-white/70 border-black/[0.05]">
        
        <div className="absolute inset-0 z-0">
          <img 
            src={avatarUrl} 
            alt={displayName}
            style={{ transform: "translateZ(0)" }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        
        {/* Soft text overlay */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent p-8 flex flex-col justify-end z-10">
          
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-4xl font-bold text-white flex items-center gap-2">
                {displayName}, {displayAge}
                <ShieldCheck className="h-6 w-6 text-cyan-400" />
              </h2>
              <div className="flex items-center gap-2 text-slate-300 mt-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{displayLocation}</span>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full border-2 border-cyan-400/30 flex items-center justify-center p-1 relative">
                 <svg className="absolute inset-0 w-full h-full -rotate-90">
                   <circle cx="32" cy="32" r="28" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-white/10" />
                   <motion.circle 
                     cx="32" cy="32" r="28" fill="transparent" stroke="currentColor" strokeWidth="4"
                     strokeDasharray={176} initial={{ strokeDashoffset: 176 }}
                     animate={{ strokeDashoffset: 176 - (176 * matchScore) / 100 }}
                     transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                     className="text-cyan-400 drop-shadow-[0_0_8px_rgba(0,245,255,0.5)]"
                   />
                 </svg>
                 <span className="text-xs font-bold text-cyan-400">{matchScore}%</span>
              </div>
              <span className="text-[10px] text-slate-300 mt-1 uppercase tracking-tighter">Match</span>
            </div>
          </div>

          <p className="text-slate-100 text-sm line-clamp-2 mb-4 leading-relaxed font-medium">
            {displayBio}
          </p>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-white/10 border-white/20 rounded-xl px-3 py-1 text-xs text-white flex gap-1.5 items-center">
              <Briefcase className="h-3 w-3" /> {displayOccupation}
            </Badge>
            <Badge variant="outline" className="bg-white/10 border-white/20 rounded-xl px-3 py-1 text-xs text-white flex gap-1.5 items-center">
              <School className="h-3 w-3" /> {displayUniversity}
            </Badge>
            {user.interests && user.interests.map(interest => (
              <Badge key={interest} variant="outline" className="bg-cyan-500/20 border-cyan-400/30 rounded-xl px-3 py-1 text-xs text-cyan-300">
                #{interest}
              </Badge>
            ))}
          </div>
        </div>

        {/* Top-Right Action Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          {/* Alumni Direct VIP Feature: Direct DM without matching */}
          {userTier === "alumni_direct" && (
            <Button 
              onClick={(e) => { e.stopPropagation(); onDirectMessage?.(user); }}
              size="sm" 
              className="h-10 px-4 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-lg flex items-center gap-1.5"
            >
              <MessageSquare className="h-4 w-4" /> Direct DM
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white">
            <Info className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
});

DiscoveryCard.displayName = "DiscoveryCard";

export default function Discovery() {
  const navigate = useNavigate();
  const [cards, setCards] = useState<DiscoveryCardType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showHeartBurst, setShowHeartBurst] = useState(false);

  // User subscription tier state
  const isPremium = localStorage.getItem("unilink_is_premium") === "true";
  const userTier = localStorage.getItem("unilink_user_tier") || (isPremium ? "pro" : "free");

  // Free Tier Daily Swipe Limit counter (Max 5/day for free users)
  const [swipesCount, setSwipesCount] = useState(() => {
    return parseInt(localStorage.getItem("unilink_swipes_today") || "0", 10);
  });

  // Alumni Direct Filter state
  const [roleFilter, setRoleFilter] = useState<"all" | "alumni" | "student">("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");

  const fetchCards = async () => {
    try {
      setIsLoading(true);
      const res = await discoveryApi.getCards();
      setCards(res.cards);
      setCurrentIndex(0);
    } catch {
      toast.error("Failed to load networking suggestions.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();

    const handleTierChange = () => {
      // Force component re-render when tier changes
      window.location.reload();
    };
    window.addEventListener("premiumUpdated", handleTierChange);
    return () => window.removeEventListener("premiumUpdated", handleTierChange);
  }, []);

  const handleSwipeAction = async (action: 'like' | 'pass') => {
    // Check Free tier limit
    if (userTier === "free" && swipesCount >= 5) {
      toast.error("Daily Swipe Limit Reached! Upgrade to Pro for unlimited swipes.");
      return;
    }

    const swipedUser = filteredCards[currentIndex];
    if (!swipedUser) return;

    if (action === 'like') {
      setShowHeartBurst(true);
      setTimeout(() => setShowHeartBurst(false), 1000);
    }

    try {
      const res = await discoveryApi.swipe(swipedUser._id, action);
      if (res.isMatch) {
        toast.success(`You matched with ${swipedUser.fullName}! 🚀`, {
          description: "Go to Messages to start chatting.",
        });
      } else if (action === 'like') {
        toast.success(`Request sent to ${swipedUser.fullName}!`, {
          description: "They will see your profile in their connection requests.",
        });
      }
      
      // Increment free daily swipes counter
      if (userTier === "free") {
        const nextCount = swipesCount + 1;
        setSwipesCount(nextCount);
        localStorage.setItem("unilink_swipes_today", nextCount.toString());
      }

      window.dispatchEvent(new Event("requestUpdated"));
    } catch {
      toast.error("Action could not be saved.");
    }

    setCurrentIndex(prev => prev + 1);
  };

  const handleDirectMessage = (user: DiscoveryCardType) => {
    navigate("/messages", { state: { selectUser: user } });
  };

  // Filter cards based on Alumni Direct advanced filters
  const filteredCards = cards.filter(card => {
    if (roleFilter !== "all" && card.role !== roleFilter) return false;
    if (departmentFilter !== "all" && card.department && !card.department.toLowerCase().includes(departmentFilter.toLowerCase())) return false;
    return true;
  });

  const usersLeft = filteredCards.length - currentIndex;
  const isFreeLimitReached = userTier === "free" && swipesCount >= 5;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <Loader2 className="h-10 w-10 text-cyan-600 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Finding potential matches...</p>
      </div>
    );
  }

  return (
    <PageTransition className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 md:p-8 relative overflow-visible">
      
      {/* Header */}
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-6 relative z-30">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
          Discover <Sparkles className="h-6 w-6 text-cyan-600 animate-pulse" />
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          {userTier === "free" ? `Free Tier (${5 - swipesCount} swipes remaining today)` : `${userTier.toUpperCase().replace("_", " ")} Active • Unlimited Swiping`}
        </p>
      </motion.div>

      {/* 🌟 ALUMNI DIRECT VIP ADVANCED FILTERS BAR */}
      {userTier === "alumni_direct" && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 z-30 flex flex-wrap items-center justify-center gap-3 bg-white/80 border border-purple-200 p-2.5 rounded-2xl shadow-sm backdrop-blur-md"
        >
          <div className="flex items-center gap-1.5 text-purple-700 text-xs font-bold px-2">
            <Crown className="h-4 w-4" /> Advanced Alumni Filters:
          </div>
          <div className="flex items-center gap-1.5">
            {["all", "alumni", "student"].map(r => (
              <button
                key={r}
                onClick={() => { setRoleFilter(r as any); setCurrentIndex(0); }}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold capitalize transition-all ${roleFilter === r ? "bg-purple-600 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="h-4 w-[1px] bg-slate-200" />
          <div className="flex items-center gap-1.5">
            {["all", "Computer Science", "Electrical"].map(d => (
              <button
                key={d}
                onClick={() => { setDepartmentFilter(d); setCurrentIndex(0); }}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all ${departmentFilter === d ? "bg-slate-900 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                {d === "all" ? "All Depts" : d}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      <div className="relative w-full max-w-[400px] aspect-[3/4.5] perspective-1000 z-10">
        
        {/* Heart Burst Overlay */}
        <AnimatePresence>
          {showHeartBurst && (
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -45 }}
              animate={{ scale: [0, 1.5, 1.2], opacity: [0, 1, 0], rotate: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
            >
              <Heart className="h-48 w-48 fill-cyan-500 text-cyan-500 drop-shadow-[0_0_50px_rgba(0,245,255,0.8)]" />
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                  animate={{ 
                    opacity: 0, 
                    scale: Math.random() * 2 + 1,
                    x: (Math.random() - 0.5) * 300, 
                    y: (Math.random() - 0.5) * 300 
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan]"
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* FREE TIER DAILY LIMIT PAYWALL OVERLAY */}
        {isFreeLimitReached ? (
          <div className="flex flex-col items-center justify-center h-full glass-card rounded-[2.5rem] text-center p-8 bg-white/90 border border-amber-200 shadow-xl">
            <div className="h-20 w-20 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-4 shadow-inner">
              <Crown className="h-10 w-10 animate-bounce" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Daily Swipes Reached!</h2>
            <p className="text-slate-500 text-sm mb-6">
              You've used your 5 free discovery swipes for today. Upgrade to UniLink Pro for unlimited swipes & requests unblur!
            </p>
            <Button 
              onClick={() => navigate('/premium')}
              className="w-full h-13 rounded-2xl bg-cyan-purple text-white font-bold shadow-md hover:scale-[1.02] text-base"
            >
              Upgrade to Pro (₹799)
            </Button>
          </div>
        ) : usersLeft > 0 ? (
          <AnimatePresence>
            {filteredCards[currentIndex + 1] && (
              <DiscoveryCard 
                key={filteredCards[currentIndex + 1]._id} 
                user={filteredCards[currentIndex + 1]} 
                isTop={false} 
                userTier={userTier}
              />
            )}
            {filteredCards[currentIndex] && (
              <DiscoveryCard 
                key={filteredCards[currentIndex]._id} 
                user={filteredCards[currentIndex]} 
                isTop={true} 
                onSwipe={handleSwipeAction}
                userTier={userTier}
                onDirectMessage={handleDirectMessage}
              />
            )}
          </AnimatePresence>
        ) : (
          <div className="flex flex-col items-center justify-center h-full glass-card rounded-[2.5rem] text-center p-8 bg-white/80 border border-black/[0.05]">
            <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-cyan via-purple to-pink p-1 animate-spin-slow mb-6">
              <div className="h-full w-full rounded-full bg-slate-50 flex items-center justify-center">
                <Sparkles className="h-10 w-10 text-slate-800" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">That's everyone!</h2>
            <p className="text-slate-500 mb-6">Check back soon for more campus connections.</p>
            <Button onClick={fetchCards} variant="outline" className="rounded-xl border-slate-200 text-slate-700 bg-white">
              Refresh Discovery
            </Button>
          </div>
        )}
      </div>

      {/* Actions Bar */}
      {usersLeft > 0 && !isFreeLimitReached && (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center gap-6 mt-12 relative z-30">
          <motion.button
            whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipeAction('pass')}
            className="h-20 w-20 rounded-full border border-pink-200 flex items-center justify-center text-pink-600 shadow-md bg-white hover:bg-slate-50 transition-all"
          >
            <X className="h-10 w-10" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.2, y: -5 }} whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipeAction('like')}
            className="h-16 w-16 rounded-full border border-purple-200 flex items-center justify-center text-purple-650 shadow-md bg-white hover:bg-slate-50 transition-all"
          >
            <Zap className="h-8 w-8" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipeAction('like')}
            className="h-20 w-20 rounded-full border border-cyan-200 flex items-center justify-center text-cyan-600 shadow-md bg-white hover:bg-slate-50 transition-all"
          >
            <Heart className="h-10 w-10 fill-cyan-650" />
          </motion.button>
        </motion.div>
      )}

      {/* User Count */}
      <p className="mt-8 text-sm text-slate-500 font-medium relative z-30">
        Discovering connections in your area
      </p>

    </PageTransition>
  );
}