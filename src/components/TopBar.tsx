import { Search, Bell, Menu, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { motion } from "framer-motion";

export const TopBar = () => {
  return (
    <header className="sticky top-0 z-20 w-full glass border-b border-black/[0.05] px-6 h-16 flex items-center justify-between">
      
      {/* 🔍 Search Input */}
      <div className="relative w-full max-w-md hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input 
          placeholder="Search for connections, topics..." 
          className="bg-slate-100/50 border-slate-200 pl-10 h-10 rounded-2xl focus-visible:ring-cyan-500 focus-visible:border-cyan-500 transition-all text-slate-800 placeholder:text-slate-400"
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
          <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl bg-white border border-slate-200 hover:bg-slate-50">
            <Bell className="h-5 w-5 text-slate-700" />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-pink shadow-pink-glow" />
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="md:hidden">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white border border-slate-200">
            <User className="h-5 w-5 text-slate-700" />
          </Button>
        </motion.div>
      </div>

    </header>
  );
};
