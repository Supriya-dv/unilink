import { Link, useLocation } from "react-router-dom";
import { Home, Users, MessageCircle, User, Settings, LogOut, Compass, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", icon: Home, path: "/dashboard", color: "cyan" },
  { label: "Discover", icon: Compass, path: "/discover", color: "purple" },
  { label: "Connections", icon: Users, path: "/connections", color: "pink" },
  { label: "Messages", icon: MessageCircle, path: "/messages", color: "cyan" },
  { label: "Profile", icon: User, path: "/profile", color: "purple" },
  { label: "Settings", icon: Settings, path: "/settings", color: "pink" },
];

export const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* 🔮 Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? "80px" : "280px" }}
        className="hidden md:flex flex-col h-screen glass-dark border-r border-white/5 p-4 z-40 relative transition-all duration-300 ease-in-out shadow-2xl overflow-hidden"
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-2 mb-10 h-12">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-purple shadow-cyan cursor-pointer"
          >
            <span className="font-display text-lg font-bold text-white">U</span>
          </motion.div>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-display text-xl font-bold tracking-tight text-white bg-clip-text text-transparent bg-cyan-purple"
            >
              UniLink
            </motion.span>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative group flex items-center h-12 rounded-2xl px-3 transition-all duration-200",
                  isActive(item.path) 
                    ? "bg-white/[0.08] text-white shadow-glass" 
                    : "text-muted-foreground hover:bg-white/[0.04] hover:text-white"
                )}
              >
                {isActive(item.path) && (
                  <motion.div
                    layoutId="active-pill"
                    className={cn(
                      "absolute left-0 w-1 h-6 rounded-full",
                      item.color === "cyan" ? "bg-cyan shadow-cyan-glow" : 
                      item.color === "purple" ? "bg-purple shadow-purple-glow" : "bg-pink shadow-pink-glow"
                    )}
                  />
                )}
                <item.icon className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  isActive(item.path) && item.color === "cyan" ? "text-cyan" :
                  isActive(item.path) && item.color === "purple" ? "text-purple" :
                  isActive(item.path) && item.color === "pink" ? "text-pink" : ""
                )} />
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="ml-3 font-medium text-sm"
                  >
                    {item.label}
                  </motion.span>
                )}
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-2 py-1 bg-premium-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                    {item.label}
                  </div>
                )}
              </motion.div>
            </Link>
          ))}
        </nav>

        {/* Profile Card / Logout */}
        <div className="pt-4 border-t border-white/5 space-y-2">
          {!isCollapsed ? (
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3 mb-2"
            >
              <div className="h-10 w-10 rounded-xl bg-purple/20 border border-purple/30 flex items-center justify-center font-bold text-purple shadow-purple-glow">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">Premium Member</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-pink hover:bg-pink/10">
                <LogOut className="h-4 w-4" />
              </Button>
            </motion.div>
          ) : (
             <Button variant="ghost" size="icon" className="w-full h-12 rounded-2xl hover:bg-white/10">
               <LogOut className="h-5 w-5 text-muted-foreground" />
             </Button>
          )}
          
          <Button
            variant="ghost"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full text-xs text-muted-foreground/50 hover:text-white"
          >
            {isCollapsed ? "→" : "Collapse Sidebar"}
          </Button>
        </div>
      </motion.aside>

      {/* 📱 Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 glass-dark border-t border-white/5 z-50 flex items-center justify-around px-2">
        {navItems.slice(0, 5).map((item) => (
          <Link key={item.path} to={item.path} className="flex flex-col items-center gap-1">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={cn(
                "p-2 rounded-xl transition-all",
                isActive(item.path) ? "bg-white/10 text-white" : "text-muted-foreground"
              )}
            >
              <item.icon className={cn(
                "h-6 w-6",
                isActive(item.path) && item.color === "cyan" ? "text-cyan" :
                isActive(item.path) && item.color === "purple" ? "text-purple" :
                isActive(item.path) && item.color === "pink" ? "text-pink" : ""
              )} />
              {isActive(item.path) && (
                <motion.div layoutId="active-dot" className="absolute -bottom-1 h-1 w-1 bg-white rounded-full mx-auto" />
              )}
            </motion.div>
          </Link>
        ))}
      </nav>
    </>
  );
};
