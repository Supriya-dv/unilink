import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { 
  Heart, X, MapPin, Briefcase, School, 
  Sparkles, Zap, Info, ShieldCheck 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type UserCard = {
  id: number;
  name: string;
  age: number;
  location: string;
  distance: string;
  occupation: string;
  education: string;
  bio: string;
  image: string;
  interests: string[];
  matchScore: number;
};

const initialUsers: UserCard[] = [
  {
    id: 1,
    name: "Sophia",
    age: 23,
    location: "Brooklyn, NY",
    distance: "2 miles",
    occupation: "Product Designer",
    education: "NYU",
    bio: "Creating beautiful things • Coffee addict • Always exploring new art galleries.",
    image: "https://images.unsplash.com/photo-1494790108777-766fd36f7b41?w=600&h=800&fit=crop",
    interests: ["Design", "Travel", "Art"],
    matchScore: 98,
  },
  {
    id: 2,
    name: "James",
    age: 24,
    location: "SoHo, NYC",
    distance: "1.5 miles",
    occupation: "Software Engineer",
    education: "Columbia",
    bio: "Building cool stuff • Guitar player • Looking for someone to join my jam sessions.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop",
    interests: ["Coding", "Music", "Tech"],
    matchScore: 85,
  },
  {
    id: 3,
    name: "Emma",
    age: 22,
    location: "Williamsburg",
    distance: "3 miles",
    occupation: "Marketing Intern",
    education: "Parsons",
    bio: "Art enthusiast • Plant mom • Let's go for a walk in the park!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop",
    interests: ["Art", "Fashion", "Nature"],
    matchScore: 92,
  },
  {
    id: 4,
    name: "Leo",
    age: 25,
    location: "Manhattan",
    distance: "4 miles",
    occupation: "Content Creator",
    education: "NYU",
    bio: "Storyteller & Visionary. Exploring the intersection of tech and humanity.",
    image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&h=800&fit=crop",
    interests: ["Photography", "Philosophy", "Tech"],
    matchScore: 78,
  }
];

// ⭐ DiscoveryCard Sub-component
// Memoized to prevent re-renders when parent state changes but props don't
const DiscoveryCard = memo(({ user, isTop, onSwipe }: { user: UserCard, isTop: boolean, onSwipe?: () => void }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const yesOpacity = useTransform(x, [50, 150], [0, 1]);
  const noOpacity = useTransform(x, [-50, -150], [0, 1]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      onSwipe?.();
    } else if (info.offset.x < -100) {
      onSwipe?.();
    } else {
      x.set(0);
    }
  };

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
      {/* 🔴 Swipe Indicators (only for top card) */}
      {isTop && (
        <>
          <motion.div style={{ opacity: yesOpacity }} className="absolute top-10 left-10 z-20 border-4 border-cyan rounded-xl px-4 py-2 rotate-[-15deg] pointer-events-none">
            <span className="text-3xl font-bold text-cyan uppercase tracking-widest">Like</span>
          </motion.div>
          <motion.div style={{ opacity: noOpacity }} className="absolute top-10 right-10 z-20 border-4 border-pink rounded-xl px-4 py-2 rotate-[15deg] pointer-events-none">
            <span className="text-3xl font-bold text-pink uppercase tracking-widest">Nope</span>
          </motion.div>
        </>
      )}

      {/* 🔮 Card Frame */}
      <div className="w-full h-full rounded-[2.5rem] overflow-hidden glass-card relative group shadow-2xl">
        
        {/* 🔥 GPU Optimized Image Container */}
        <div className="absolute inset-0 z-0">
          <img 
            src={user.image} 
            alt={user.name}
            style={{ transform: "translateZ(0)" }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        
        {/* Overlays */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-premium-900 via-premium-900/60 to-transparent p-8 flex flex-col justify-end z-10">
          
          {/* User Info Header */}
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-4xl font-bold text-white flex items-center gap-2">
                {user.name}, {user.age}
                <ShieldCheck className="h-6 w-6 text-cyan" />
              </h2>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{user.location} • {user.distance}</span>
              </div>
            </div>
            
            {/* Match Percentage SVG */}
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full border-2 border-cyan/30 flex items-center justify-center p-1 relative">
                 <svg className="absolute inset-0 w-full h-full -rotate-90">
                   <circle cx="32" cy="32" r="28" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-white/10" />
                   <motion.circle 
                     cx="32" cy="32" r="28" fill="transparent" stroke="currentColor" strokeWidth="4"
                     strokeDasharray={176} initial={{ strokeDashoffset: 176 }}
                     animate={{ strokeDashoffset: 176 - (176 * user.matchScore) / 100 }}
                     transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                     className="text-cyan drop-shadow-[0_0_8px_rgba(0,245,255,0.5)]"
                   />
                 </svg>
                 <span className="text-xs font-bold text-cyan">{user.matchScore}%</span>
              </div>
              <span className="text-[10px] text-muted-foreground mt-1 uppercase tracking-tighter">Match</span>
            </div>
          </div>

          <p className="text-white/80 text-sm line-clamp-2 mb-4 leading-relaxed font-medium">
            {user.bio}
          </p>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-white/5 border-white/10 rounded-xl px-3 py-1 text-xs text-white flex gap-1.5 items-center">
              <Briefcase className="h-3 w-3" /> {user.occupation}
            </Badge>
            <Badge variant="outline" className="bg-white/5 border-white/10 rounded-xl px-3 py-1 text-xs text-white flex gap-1.5 items-center">
              <School className="h-3 w-3" /> {user.education}
            </Badge>
            {user.interests.map(interest => (
              <Badge key={interest} variant="outline" className="bg-cyan/10 border-cyan/20 rounded-xl px-3 py-1 text-xs text-cyan">
                #{interest}
              </Badge>
            ))}
          </div>
        </div>

        <div className="absolute top-4 right-4 z-20">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white">
            <Info className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
});

DiscoveryCard.displayName = "DiscoveryCard";

import { PageTransition } from "@/components/PageTransition";

export default function Discovery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Image Preloading Engine
  useEffect(() => {
    const preload = (idx: number) => {
      if (initialUsers[idx]) {
        const img = new Image();
        img.src = initialUsers[idx].image;
      }
    };
    preload(currentIndex + 1);
    preload(currentIndex + 2);
  }, [currentIndex]);

  const handleSwipe = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const [showHeartBurst, setShowHeartBurst] = useState(false);

  const handleLike = () => {
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 1000);

    const likedUser = initialUsers[currentIndex];
    if (likedUser) {
      const currentUserId = 0; // John Doe (from Profile page)
      const existingRequests = JSON.parse(localStorage.getItem("requests") || "[]");
      
      // Check if already liked (avoid duplicates)
      const isDuplicate = existingRequests.some(
        (req: any) => req.from === currentUserId && req.to === likedUser.id
      );

      if (!isDuplicate) {
        const newRequest = {
          id: Date.now(),
          from: currentUserId,
          to: likedUser.id,
          status: "pending",
          user: {
            id: likedUser.id,
            name: likedUser.name,
            role: "Student", // Defaulting role since UserCard doesn't have it
            dept: likedUser.occupation,
            avatar: likedUser.name.split(' ').map(n => n[0]).join(''),
            color: "cyan", // Defaulting color
            image: likedUser.image
          }
        };
        
        const updatedRequests = [...existingRequests, newRequest];
        localStorage.setItem("requests", JSON.stringify(updatedRequests));
        
        // Trigger UI update across pages
        window.dispatchEvent(new Event("requestUpdated"));
        
        // Show success toast
        toast.success(`Request sent to ${likedUser.name}!`, {
          description: "They'll see your interest in their network tab.",
          className: "glass-card border-cyan/20 text-white",
        });
      }
    }
    
    // Delay swipe slightly so heart burst can be seen
    setTimeout(handleSwipe, 300);
  };

  const usersLeft = initialUsers.length - currentIndex;

  return (
    <PageTransition className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 md:p-8 relative overflow-visible">
      
      {/* ✨ Discovery Header */}
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-8 relative z-30">
        <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
          Discover <Sparkles className="h-6 w-6 text-cyan animate-pulse" />
        </h1>
        <p className="text-muted-foreground mt-1">Finding your perfect college connection</p>
      </motion.div>

      <div className="relative w-full max-w-[400px] aspect-[3/4.5] perspective-1000 z-10">
        
        {/* ❤️ Heart Burst Overlay */}
        <AnimatePresence>
          {showHeartBurst && (
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -45 }}
              animate={{ scale: [0, 1.5, 1.2], opacity: [0, 1, 0], rotate: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
            >
              <Heart className="h-48 w-48 fill-cyan text-cyan drop-shadow-[0_0_50px_rgba(0,245,255,0.8)]" />
              
              {/* Particle sparks */}
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
                  className="absolute h-3 w-3 rounded-full bg-cyan shadow-[0_0_10px_cyan]"
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {usersLeft > 0 ? (
          <AnimatePresence>
            {/* We render the current card AND the next card behind it */}
            {initialUsers[currentIndex + 1] && (
              <DiscoveryCard 
                key={initialUsers[currentIndex + 1].id} 
                user={initialUsers[currentIndex + 1]} 
                isTop={false} 
              />
            )}
            {initialUsers[currentIndex] && (
              <DiscoveryCard 
                key={initialUsers[currentIndex].id} 
                user={initialUsers[currentIndex]} 
                isTop={true} 
                onSwipe={handleSwipe}
              />
            )}
          </AnimatePresence>
        ) : (
          <div className="flex flex-col items-center justify-center h-full glass-card rounded-[2.5rem] text-center p-8">
            <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-cyan via-purple to-pink p-1 animate-spin-slow mb-6">
              <div className="h-full w-full rounded-full bg-premium-900 flex items-center justify-center">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">That's everyone!</h2>
            <p className="text-muted-foreground mb-6">Check back soon for more campus connections.</p>
            <Button onClick={() => setCurrentIndex(0)} className="rounded-xl bg-cyan-purple px-8">Refresh Discovery</Button>
          </div>
        )}
      </div>

      {/* 🚀 Actions Bar */}
      {usersLeft > 0 && (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center gap-6 mt-12 relative z-30">
          <motion.button
            whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.9 }}
            onClick={handleSwipe}
            className="h-20 w-20 rounded-full glass-dark border border-pink/30 flex items-center justify-center text-pink shadow-pink transition-all bg-premium-800"
          >
            <X className="h-10 w-10" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.2, y: -5 }} whileTap={{ scale: 0.9 }}
            className="h-16 w-16 rounded-full glass-dark border border-purple/30 flex items-center justify-center text-purple shadow-purple transition-all bg-premium-800"
          >
            <Zap className="h-8 w-8" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className="h-20 w-20 rounded-full glass-dark border border-cyan/30 flex items-center justify-center text-cyan shadow-cyan transition-all bg-premium-800"
          >
            <Heart className="h-10 w-10 fill-cyan" />
          </motion.button>
        </motion.div>
      )}

      {/* 🔢 User Count */}
      <p className="mt-8 text-sm text-muted-foreground font-medium relative z-30">
        Discovering connections around <span className="text-white">New York</span>
      </p>

    </PageTransition>
  );
}