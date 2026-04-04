import { Search, Bell, Menu, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { motion } from "framer-motion";

export const TopBar = () => {
  return (
    <header className="sticky top-0 z-20 w-full glass-dark border-b border-white/5 px-6 h-16 flex items-center justify-between">
      
      {/* 🔍 Search Input */}
      <div className="relative w-full max-w-md hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search for connections, topics..." 
          className="bg-white/[0.03] border-white/10 pl-10 h-10 rounded-2xl focus-visible:ring-cyan/50 focus-visible:border-cyan/50 transition-all placeholder:text-muted-foreground/50"
        />
      </div>

      <div className="md:hidden">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-purple shadow-cyan">
          <span className="font-display text-lg font-bold text-white">U</span>
        </div>
      </div>

      {/* 🔔 Actions */}
      <div className="flex items-center gap-3">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/10">
            <Bell className="h-5 w-5 text-foreground" />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-pink shadow-pink-glow" />
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="md:hidden">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white/[0.03] border border-white/10">
            <User className="h-5 w-5 text-foreground" />
          </Button>
        </motion.div>
      </div>

    </header>
  );
};
